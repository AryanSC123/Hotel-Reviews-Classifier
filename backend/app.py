from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import pickle
import joblib
import re
import numpy as np
from scipy.sparse import hstack
import spacy
from lime.lime_text import LimeTextExplainer
import re

# Initialize Flask
app = Flask(__name__)
CORS(app)

# 1. Place this right under CORS(app) near the top of the file!
def preprocess_new_text(text):
    text = text.lower()
    text = re.sub(r'http\S+|www\S+|https\S+', '', text)  # Remove URLs
    text = re.sub(r'\S+@\S+', '', text)  # Remove emails
    text = re.sub(r'[^a-zA-Z\s]', '', text)  # Remove non-alphabetic characters
    return text

# 1. Initialize the English NLP parser and LIME Explainer
nlp = spacy.load("en_core_web_sm")
explainer = LimeTextExplainer(class_names=['Negative', 'Positive'])

# --- Keep your existing model loading code exactly as it was ---
with open('voting_classifier.pkl', 'rb') as model_file:
    voting_classifier = pickle.load(model_file)

with open('Bernoulli_Naive_Bayes.pkl', 'rb') as bernoulli_file:
    bernoulli_classifier = joblib.load(bernoulli_file)

with open('Complement_Naive_Bayes.pkl', 'rb') as complement_file:
    complement_classifier = joblib.load(complement_file)

with open('Gaussian_Naive_Bayes.pkl', 'rb') as gaussian_file:
    gaussian_classifier = joblib.load(gaussian_file)

with open('Multinomial_Naive_Bayes.pkl', 'rb') as multinomial_file:
    multinomial_classifier = joblib.load(multinomial_file)

with open('vectorizer.pkl', 'rb') as vectorizer_file:
    vectorizer = joblib.load(vectorizer_file)

with open('bow_transformer.pkl', 'rb') as bow_file:
    bow_transformer = pickle.load(bow_file)

with open('ngram_vectorizer.pkl', 'rb') as ngram_file:
    ngram_vectorizer = pickle.load(ngram_file)

def extract_english_aspect_contexts(review_text):
    """
    Parses English text to find specific hotel feature nouns (aspects) 
    and isolates the sentence context around them.
    """
    doc = nlp(review_text)
    extracted_blocks = []
    
    # Common English hotel targets tailored for English reviews
    target_aspects = {
        'room': 'Room/Room Quality',
        'bedroom': 'Room/Room Quality',
        'bathroom': 'Room/Room Quality',
        'bed': 'Bed/Comfort',
        'pillow': 'Bed/Comfort',
        'staff': 'Staff/Service',
        'service': 'Staff/Service',
        'breakfast': 'Food/Dining',
        'food': 'Food/Dining',
        'restaurant': 'Food/Dining',
        'location': 'Location',
        'view': 'Location',
        'cleanliness': 'Cleanliness',
        'pool': 'Amenities',
        'wi-fi': 'Amenities',
        'wifi': 'Amenities',
        'price': 'Value/Price',
        'value': 'Value/Price'
    }
    
    for sentence in doc.sents:
        sent_text = sentence.text.strip()
        sent_doc = nlp(sent_text)
        
        for token in sent_doc:
            # Check if the word is a noun and matches our English dictionary targets
            if token.pos_ in ["NOUN", "PROPN"] and token.lemma_.lower() in target_aspects:
                aspect_category = target_aspects[token.lemma_.lower()]
                
                # Ensure the sentence has descriptive words (adjectives/adverbs) like "clean" or "terrible"
                has_qualifiers = any(child.pos_ in ["ADJ", "ADV"] for child in sent_doc)
                
                if has_qualifiers:
                    extracted_blocks.append({
                        "aspect": aspect_category,
                        "context_text": sent_text
                    })
                    break 
                    
    return extracted_blocks

def lime_prediction_pipeline(raw_texts):
    """
    Optimized batch prediction pipeline for LIME.
    Passes variations directly to the transformers to preserve token alignment,
    ensuring accurate feature weights.
    """
    # 1. Gracefully handle empty rows without injecting artificial text
    safe_texts = [text if (text and text.strip()) else "" for text in raw_texts]
    
    # 2. Extract features using your ensemble transformers
    X_bow = bow_transformer.transform(safe_texts)
    X_ngram = ngram_vectorizer.transform(safe_texts)
    
    # 3. Stack features horizontally
    X_combined = hstack([X_bow, X_ngram])
    
    # 4. Generate prediction probabilities for the entire matrix
    proba = voting_classifier.predict_proba(X_combined)
    return proba

def process_explainable_absa(raw_review):
    """
    Advanced ABSA pipeline that splits sentences into distinct clauses
    so sentiments don't bleed into unrelated hotel aspects.
    """
    # 1. Map keywords to specific hotel categories
    aspect_lookup = {
        "Room/Room Quality": ["room", "bed", "bathroom", "dirty", "clean", "shower", "pillow"],
        "Staff/Service": ["staff", "service", "friendly", "helpful", "reception", "check", "good"],
        "Location": ["location", "close", "near", "walk", "distance", "view"],
        "Value/Price": ["price", "expensive", "cheap", "worth", "money", "cost"]
    }
    
    # 2. Split the review into separate clauses using punctuation and conjunctions
    # This turns "The room was dirty but the staff were good" into two distinct targets
    clauses = re.split(r'[,.;]|\bbut\b|\band\b|\bhowever\b|\balthough\b|\bwhile\b', raw_review, flags=re.IGNORECASE)
    
    results = []
    
    for clause in clauses:
        clause = clause.strip()
        if not clause:
            continue
            
        # 3. Check which aspect this specific clause belongs to
        for aspect, keywords in aspect_lookup.items():
            if any(kw in clause.lower() for kw in keywords):
                
                # 4. Compute vector shapes and predict JUST for this clause
                cleaned_clause = preprocess_new_text(clause)
                X_bow = bow_transformer.transform([cleaned_clause])
                X_ngram = ngram_vectorizer.transform([cleaned_clause])
                X_combined = hstack([X_bow, X_ngram])
                
                proba = voting_classifier.predict_proba(X_combined)[0]
                pred_idx = np.argmax(proba)
                
                sentiment = "Positive" if pred_idx == 1 else "Negative"
                confidence = proba[pred_idx]
                
                # 5. Run LIME explanations strictly on this isolated text pocket
                exp = explainer.explain_instance(
                    clause, 
                    lime_prediction_pipeline, 
                    num_features=4, 
                    labels=(pred_idx,)
                )
                
                results.append({
                    "aspect": aspect,
                    "sentiment": sentiment,
                    "confidence": float(confidence),
                    "context_analyzed": clause,
                    "word_impacts": exp.as_list(label=pred_idx)
                })
                
    return results

@app.route('/api/analyze', methods=['POST'])
def analyze_review():
    """
    API endpoint that combines your legacy model feature engineering paths
    with the local explainable ABSA + LIME processing pipeline.
    """
    try:
        data = request.get_json()
        if not data or 'review' not in data:
            return jsonify({"error": "Missing 'review' field in request JSON"}), 400
            
        raw_review = data['review']
        if not raw_review.strip():
            return jsonify({"error": "Review text cannot be empty"}), 400
            
        # --- 1. Vectorize for Voting Classifier (Ensemble Path) ---
        cleaned_text = preprocess_new_text(raw_review)
        X_new_bow = bow_transformer.transform([cleaned_text])
        X_new_ngram = ngram_vectorizer.transform([cleaned_text])
        X_new_combined = hstack([X_new_bow, X_new_ngram])
        
        # --- 2. Vectorize for Standalone Naive Bayes Models (Legacy Path) ---
        X_vectorized = vectorizer.transform([raw_review])
        X_dense_input = X_vectorized.toarray().reshape(1, -1)

        # Output label normalization helper
        def clean_label(pred_array):
            val = pred_array[0]
            if val == 1 or str(val).lower() == 'positive':
                return 'Positive'
            return 'Negative'

        # --- 3. Run Predictions through exact matching shapes ---
        voting_pred = clean_label(voting_classifier.predict(X_new_combined))
        bernoulli_pred = clean_label(bernoulli_classifier.predict(X_dense_input))
        complement_pred = clean_label(complement_classifier.predict(X_dense_input))
        gaussian_pred = clean_label(gaussian_classifier.predict(X_dense_input))
        multinomial_pred = clean_label(multinomial_classifier.predict(X_dense_input))

        # --- 4. Run Explainable ABSA Processing Pipeline ---
        analysis_results = process_explainable_absa(raw_review)
        
        # --- 5. Return Everything Together ---
        return jsonify({
            "status": "success",
            "review_analyzed": raw_review,
            "prediction": voting_pred,
            "bernoulli": bernoulli_pred,
            "complement": complement_pred,
            "gaussian": gaussian_pred,
            "multinomial": multinomial_pred,
            "results": analysis_results
        }), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
    
if __name__ == '__main__':
    app.run(debug=True, port=5000)