import gaussian from "../assets/gaussian.jpg";
import complement from "../assets/complement.jpg";
import bernoulli from "../assets/bernoulli.jpg";
import multinomial from "../assets/multinomial.jpg";

export const models = [
  {
    id: "gaussian",
    title: "Gaussian Naive Bayes",
    accuracy: 0.724,
    image: gaussian,
    badge: "Continuous Variables",
    mathematicalAssumption:
      "Assumes continuous feature values follow a normal (Gaussian) distribution bell-curve.",
    description:
      "Evaluates numeric data points by measuring how many standard deviations an observation sits away from the mean of each target class.",
    bestFor:
      "Real-world sensor metrics, physical dimensions, temperature readings, and un-transformed continuous frequency counts.",
    limitations:
      "Performs poorly when text data is heavily skewed or does not exhibit standard normal-curve behaviors.",
  },
  {
    id: "multinomial",
    title: "Multinomial Naive Bayes",
    accuracy: 0.891,
    image: multinomial,
    badge: "Integer Count Vectors",
    mathematicalAssumption:
      "Assumes data points represent frequencies or discrete integer counts mapped to a multinomial distribution.",
    description:
      "Tracks exact token frequency. It calculates the raw probability of a specific category based on how often specific words repeat throughout the document.",
    bestFor:
      "Standard text classification, large-scale document sorting, topic tracking, and classic e-mail spam detection parameters.",
    limitations:
      "Vulnerable to severe class imbalance, causing it to over-predict the majority training class.",
  },
  {
    id: "bernoulli",
    title: "Bernoulli Naive Bayes",
    accuracy: 0.687,
    image: bernoulli,
    badge: "Binary Boolean Matrix",
    mathematicalAssumption:
      "Operates exclusively on multivariate Bernoulli distributions where features are strict binary outcomes (0 or 1).",
    description:
      "Binarizes input data. It completely ignores word repetitions or frequency, evaluating purely whether a key phrase or feature exists (True) or doesn't (False).",
    bestFor:
      "Short-form sentiment text mapping (e.g., tweets, SMS text logs), binary keyword matching systems, and sparse presence-checks.",
    limitations:
      "Loses all contextual nuance provided by word frequency modifiers or structural repetition in long-form essays.",
  },
  {
    id: "complement",
    title: "Complement Naive Bayes",
    accuracy: 0.885,
    image: complement,
    badge: "Imbalanced Text Core",
    mathematicalAssumption:
      "Corrects standard Multinomial weight calculations by computing probabilities using the complement (the opposite) of the target class.",
    description:
      "An advanced variation explicitly designed to stabilize parameter weights when working with wildly uneven training datasets.",
    bestFor:
      "Real-world text applications where one classification group drastically outnumbers alternative groups in historical logs.",
    limitations:
      "Slightly higher compute overhead compared to base Multinomial execution blocks.",
  },
];
