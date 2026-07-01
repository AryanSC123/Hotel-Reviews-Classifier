# Hotel Review Classifier & Sentiment Analytics Platform

An end-to-end, production-ready machine learning platform designed to parse, analyze, and classify unstructured hospitality review data. Built using a decoupled monorepo architecture, the system employs an advanced Natural Language Processing (NLP) pipeline on the backend to evaluate customer sentiments in real-time, feeding a modern enterprise dashboard on the frontend for business intelligence visualization.

## 🚀 Live Production Deployments

- **Web Interface (Netlify):** https://hotel-review-classifier.netlify.app/
- **ML API Engine (Render):** https://hotel-reviews-classifier.onrender.com

---

# 📌 1. Problem Statement & Objectives

## The Business Challenge

In the modern hospitality industry, user-generated content (UGC) across platforms such as TripAdvisor, Booking.com, and Yelp serves as one of the primary drivers of brand reputation and operational improvements. Processing thousands of customer reviews manually is inefficient, difficult to scale, and prone to inconsistency.

Unstructured textual data contains valuable insights about:

- Customer satisfaction
- Staff behavior
- Cleanliness
- Food quality
- Amenities
- Service experience

Traditional star ratings alone cannot capture these nuanced opinions.

## The Solution

This platform solves the problem by:

- Automating sentiment classification using an NLP pipeline.
- Instantly categorizing reviews as Positive, Neutral, or Negative.
- Providing both single-review prediction and analytical dashboards.
- Serving predictions through a production-ready REST API.
- Separating frontend and backend for easier deployment and maintenance.

---

# 🏗️ 2. System Architecture

```
Hotel-Reviews-Classifier/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── models/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env
│   └── package.json
│
└── README.md
```

## Infrastructure Workflow

```
        User Browser
              │
              ▼
      Netlify Frontend
              │
     HTTP POST (JSON)
              │
              ▼
     Render Flask API
              │
              ▼
   NLP + Machine Learning
```

---

## 🧪 3. Machine Learning & NLP Pipeline

The backend transforms raw hotel reviews into structured feature representations and performs sentiment classification using a **Voting Ensemble of Naive Bayes models**, combined with feature engineering and explainable AI techniques.

---

### 🔄 3.1 End-to-End Pipeline Overview

```
Raw Review Text
      │
      ▼
Text Preprocessing
- Lowercasing
- URL / email removal
- Special character cleaning
      │
      ▼
spaCy NLP Processing
- Tokenization
- Sentence segmentation
- POS tagging (used for ABSA)
      │
      ▼
Feature Engineering
├── Bag-of-Words (Count Vectorizer)
└── N-gram Vectorizer
      │
      ▼
Feature Concatenation (hstack)
      │
      ▼
Voting Classifier (Ensemble Model)
├── Multinomial Naive Bayes
├── Complement Naive Bayes
├── Bernoulli Naive Bayes
└── Gaussian Naive Bayes
      │
      ▼
Final Sentiment Prediction
```

---

### 🤖 3.2 Ensemble Learning Strategy

The production model is a **Voting Classifier ensemble** that combines multiple Naive Bayes variants trained on different statistical assumptions about text data:

| Model          | Feature Representation        | Strength                                |
| -------------- | ----------------------------- | --------------------------------------- |
| Multinomial NB | Word frequency counts         | Strong baseline for text classification |
| Complement NB  | Imbalanced text correction    | Handles class imbalance effectively     |
| Bernoulli NB   | Binary occurrence matrix      | Captures word presence/absence signals  |
| Gaussian NB    | Continuous feature assumption | Acts as a variance-sensitive estimator  |

The final prediction is generated using a **Voting Classifier (`voting_classifier.pkl`)**, which aggregates outputs from all base models.

---

### 📊 3.3 Feature Engineering

Two complementary vectorization strategies are used:

- **Bag-of-Words (BoW):** Captures raw term frequency patterns
- **N-gram Vectorizer:** Captures local word sequences and contextual patterns

These feature spaces are combined using horizontal stacking:

```python
X_combined = hstack([X_bow, X_ngram])
```

---

### 🧩 3.4 Aspect-Based Sentiment Analysis (ABSA)

Beyond overall sentiment classification, the system performs **fine-grained aspect extraction** using spaCy linguistic parsing.

Identified aspects include:

- Room / Room Quality
- Staff / Service
- Cleanliness
- Food / Dining
- Location
- Value / Price
- Amenities

Each review is split into clauses, and sentiment is evaluated per aspect independently.

---

### 🧠 3.5 Explainability with LIME

To improve interpretability, the system integrates **LIME (Local Interpretable Model-Agnostic Explanations)**:

- Explains individual predictions at word level
- Highlights features contributing to sentiment
- Works on isolated review clauses for precision

This ensures transparency in model decision-making.

---

### 📦 3.6 Production Model Output

The API returns:

- Final ensemble prediction (primary output)
- Individual Naive Bayes model predictions
- Aspect-level sentiment breakdown
- LIME-based word importance scores

---

# 💻 4. Tech Stack

## Backend

- Python 3.12.7
- Flask
- Gunicorn
- spaCy
- scikit-learn
- NumPy
- Pandas

## Frontend

- React 18
- Vite
- React Router DOM
- Tailwind CSS
- JavaScript
- HTML5
- CSS3

---

# ⚙️ 5. Local Setup & Installation

## Prerequisites

- Node.js 18+
- Python 3.12+

---

## Clone the Repository

```bash
git clone https://github.com/AryanSC123/Hotel-Reviews-Classifier.git

cd Hotel-Reviews-Classifier
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Linux / macOS
source venv/bin/activate

# Windows
venv\Scripts\activate

pip install -r requirements.txt

python app.py
```

The backend will run at:

```
http://127.0.0.1:5000
```

---

## Frontend Setup

Open another terminal.

```bash
cd frontend

npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://127.0.0.1:5000
```

Start the development server:

```bash
npm run dev
```

Visit:

```
http://localhost:5173
```

---

# 🌐 6. Deployment

## Backend (Render)

**Root Directory**

```
backend
```

**Runtime**

```
Python
```

**Environment Variable**

```
PYTHON_VERSION=3.12.7
```

**Build Command**

```bash
pip install -r requirements.txt && pip install gunicorn
```

**Start Command**

```bash
gunicorn app:app
```

---

## Frontend (Netlify)

**Base Directory**

```
frontend
```

**Build Command**

```bash
npm run build
```

**Publish Directory**

```
dist
```

**Environment Variable**

```env
VITE_API_URL=https://hotel-reviews-classifier.onrender.com
```

### React Router Redirect

Create a file named:

```
frontend/public/_redirects
```

Contents:

```
/*    /index.html    200
```

This ensures that refreshing any React Router route does not produce a 404 error.

---

# 📊 Features

- Real-time sentiment prediction
- REST API backend
- Interactive React dashboard
- Responsive UI
- NLP preprocessing with spaCy
- Machine Learning classification
- Production deployment support
- Modular monorepo architecture

---

# 📈 Future Improvements

- User authentication
- Review history storage
- Sentiment confidence visualization
- Review keyword extraction
- Aspect-based sentiment analysis
- Docker support
- CI/CD with GitHub Actions

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Aryan Chidumalla**

GitHub: https://github.com/AryanSC123/

![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Flask](https://img.shields.io/badge/Flask-Backend-black?logo=flask)
![License](https://img.shields.io/badge/License-MIT-green)
