<thinking>
The user wants me to create a comprehensive text summary of the entire lecture content in English, formatted as markdown for a README.md file. Let me go through all the uploaded HTML files and extract the key information.

The lecture is "Lecture 8: ML Fundamentals for Biomedical Data" and covers:

Part 1: Biomedical Data Challenges
- High Dimensionality
- Small Sample Sizes
- Class Imbalance
- Missing Data
- Batch Effects
- Feature Selection
- Dimensionality Reduction

Part 2: ML Methods for Biomedical Applications
- Supervised vs Unsupervised Learning
- Classification
- Regression
- Clustering
- Cross-validation Strategies
- Performance Metrics
- ROC and PR Curves

Part 3: Clinical ML and Validation
- Survival Analysis
- Cox Regression
- Kaplan-Meier Curves
- Time-to-Event Analysis
- Risk Scores
- Interpretable ML
- SHAP Values
- Clinical Validation

Plus hands-on sections for scikit-learn and lifelines.

Let me create a comprehensive markdown document that captures all this information in a well-organized format.
</thinking>

# Lecture 8: ML Fundamentals for Biomedical Data

**Subtitle:** ML meets medicine - Success stories & Challenges

---

## Table of Contents

### Part 1: Biomedical Data Challenges
- Unique characteristics of biomedical data
- Statistical considerations
- Preprocessing strategies

### Part 2: ML Methods for Biomedical Applications
- Algorithm taxonomy
- Model selection strategies
- Performance evaluation
- Interpretability requirements

### Part 3: Clinical ML and Validation
- Survival analysis methods
- Risk prediction models
- Interpretability requirements

---

## Part 1: Biomedical Data Challenges

### 1. High Dimensionality

**⚠️ The Curse of Dimensionality**
- When features (P) greatly exceed samples (N): P >> N

**Challenges:**
- **Overfitting Risks:** Models memorize training data rather than learning generalizable patterns
- **Distance Metrics Fail:** All points appear equidistant in very high dimensions
- **Sparse Data Space:** Data points become increasingly sparse in high-dimensional space
- **Computational Cost:** Training time and memory requirements grow exponentially

**Data Sparsity Visualization:**
- 1D: Dense data ✓
- 2D: Sparse data ⚠
- 3D+: Very Sparse data ✗

**Solutions & Strategies:**
- Regularization (L1/L2)
- Feature Selection
- Dimensionality Reduction
- Cross-validation
- Domain Knowledge

---

### 2. Small Sample Sizes

**📊 Statistical Power Challenge**
- Limited samples reduce ability to detect true effects and increase risk of false discoveries

**Strategies:**

1. **Cross-validation**
   - K-fold, stratified, leave-one-out strategies for robust evaluation

2. **Bootstrap Methods**
   - Resampling techniques to estimate uncertainty and confidence intervals

3. **Data Augmentation**
   - Generate synthetic samples while preserving statistical properties

4. **Transfer Learning**
   - Leverage pre-trained models from larger datasets or related domains

5. **Regularization**
   - Penalize model complexity to prevent overfitting on small datasets

6. **Domain Priors**
   - Incorporate biological knowledge to guide model learning

---

### 3. Class Imbalance

**⚠️ The Accuracy Paradox**
- 99% accuracy is useless if 99% of samples are negative!
- Model predicting all negatives achieves high accuracy but zero clinical utility

**Sampling Strategies:**
- Random oversampling
- Random undersampling
- SMOTE (Synthetic Minority Oversampling Technique)
- ADASYN (Adaptive Synthetic Sampling)

**Cost-sensitive Learning:**
- Weighted loss functions
- Class weights in sklearn
- Focal loss for deep learning
- Penalize misclassifications differently

**✓ Proper Evaluation Metrics:**
- Precision
- Recall
- F1-score
- PR-AUC (Precision-Recall Area Under Curve)
- Balanced Accuracy
- Matthews Correlation Coefficient
- Cohen's Kappa
- G-mean

---

### 4. Missing Data

**Three Mechanisms:**

1. **MCAR (Missing Completely At Random)**
   - Missingness unrelated to data
   - Random pattern

2. **MAR (Missing At Random)**
   - Related to observed variables
   - Depends on other observed features

3. **MNAR (Missing Not At Random)**
   - Related to unobserved values
   - Systematic pattern (e.g., missing if high value)

**Imputation Strategies:**

- **Mean/Median:** Simple but biased
- **K-NN:** Uses similar samples
- **MICE:** Multiple Imputation by Chained Equations
- **MissForest:** Random Forest based
- **EM Algorithm:** Maximum Likelihood estimation
- **Deep Learning:** Autoencoders, GANs

---

### 5. Batch Effects

**⚠️ Technical Variation Problem**
- Non-biological variations from different labs, instruments, or time periods can overwhelm true biological signals

**Correction Methods:**
- ComBat (most popular)
- Limma removeBatchEffect
- Harmony (single-cell)
- Seurat CCA integration
- Deep learning approaches

**Best Practices:**
- Randomize across batches
- Include batch in study design
- Balance classes per batch
- Use supervised correction
- Validate on independent data

---

### 6. Feature Selection

**Three Main Approaches:**

#### 1. Filter Methods 🔍
**Independent of model**
- Correlation analysis
- Chi-square test
- ANOVA F-test
- Mutual information

**Process:** Features (P >> N) → Statistical Test → Top K features

#### 2. Wrapper Methods 📦
**Greedy search with model evaluation**
- Forward selection
- Backward elimination
- Recursive Feature Elimination (RFE)
- Genetic algorithms

**Process:** Iterative loop of model training and feature add/remove

#### 3. Embedded Methods 🎯
**Built into model training**
- Lasso (L1 regularization)
- Ridge (L2 regularization)
- Elastic Net
- Tree-based feature importance

**Process:** Training + Selection with L1/L2 penalty

**✓ Advanced & Clinical Considerations:**
- Stability Selection
- Permutation Importance
- Clinical Interpretability
- Domain Knowledge Integration

---

### 7. Dimensionality Reduction

*Content covered in uploaded files - techniques for reducing feature space while preserving important information*

---

## Part 2: ML Methods for Biomedical Applications

### 1. Supervised vs Unsupervised Learning

#### Supervised Learning ⏱
**Learn from labeled data - input-output pairs with known targets**

**Training Process:**
- Data + Labels (X₁, y₁), (X₂, y₂) → Model f: X → y → Prediction ŷ
- Minimize: Loss(y, ŷ)

**Clinical Examples:**
- Disease diagnosis (healthy/sick)
- Drug response prediction
- Survival time estimation
- Risk score calculation

#### Unsupervised Learning 📊
**Discover patterns in unlabeled data - no predefined targets**

**Pattern Discovery:**
- Unlabeled Data → Algorithm (Clustering) → Clusters Found
- Maximize: Internal Structure

**Clinical Examples:**
- Patient subtype discovery
- Gene expression clustering
- Anomaly detection
- Feature extraction

#### Hybrid Approaches 🔀
- Semi-supervised Learning
- Self-supervised Learning
- Weakly-supervised Learning

---

### 2. Cross-validation Strategies

#### K-Fold CV
- Split data into K folds, train on K-1, test on 1, repeat K times
- Standard: K=5 or 10
- Rotation ensures all data used for both training and testing

#### Stratified CV
- Preserve class distribution in each fold
- Crucial for imbalanced data
- **Use for classification tasks**

#### Leave-One-Out CV (LOOCV)
- Train on N-1 samples, test on 1, repeat N times
- **For very small N**
- Maximum use of data but computationally expensive

#### Nested CV
- Outer loop: Evaluation
- Inner loop: Hyperparameter tuning
- **Provides unbiased performance estimates**

#### Time Series Split
- Train on past, test on future
- Respects temporal order
- **For longitudinal data**

#### Group CV
- Keep all samples from same patient/site together
- **Prevents data leakage**
- Critical for avoiding optimistic bias

**⚠️ Biomedical Pitfall:**
Multiple samples from same patient must stay in same fold to avoid optimistic bias!

---

### 3. Performance Metrics

#### Confusion Matrix

|                    | **Predicted Positive** | **Predicted Negative** |
|--------------------|------------------------|------------------------|
| **Actual Positive** | True Positive (TP)     | False Negative (FN)    |
| **Actual Negative** | False Positive (FP)    | True Negative (TN)     |

#### Key Metrics

1. **Sensitivity (Recall)**
   - Formula: TP / (TP + FN)
   - Meaning: How many actual positives detected

2. **Specificity**
   - Formula: TN / (TN + FP)
   - Meaning: How many actual negatives identified

3. **PPV (Precision)**
   - Formula: TP / (TP + FP)
   - Meaning: Positive predictive value

4. **NPV**
   - Formula: TN / (TN + FN)
   - Meaning: Negative predictive value

5. **F1 Score**
   - Formula: 2·Precision·Recall / (Precision+Recall)
   - Meaning: Harmonic mean of Precision & Recall

6. **Matthews Correlation Coefficient**
   - Balanced measure even for imbalanced data
   - Range: -1 to +1, 0 = random

---

### 4. ROC and PR Curves

#### ROC Curve (Receiver Operating Characteristic)
**Plots TPR vs FPR at various thresholds**

- **AUC (Area Under Curve):**
  - 0.5 = random classifier
  - 1.0 = perfect classifier
- Good for balanced datasets
- Threshold-independent metric
- Shows trade-off between sensitivity and specificity

#### PR Curve (Precision-Recall)
**Plots Precision vs Recall**

- Better for imbalanced data
- Focus on positive class
- More informative for rare diseases
- Baseline depends on class prevalence

**Clinical Decision:** Choose operating point based on cost of FP vs FN

---

## Part 3: Clinical ML and Validation

### 1. Survival Analysis

*Methods for analyzing time-to-event data with censoring*

Key concepts:
- Time-to-event outcomes
- Censoring (right, left, interval)
- Survival function
- Hazard function

---

### 2. Cox Regression

*Proportional hazards model for survival analysis*

Features:
- Semi-parametric approach
- Hazard ratios for risk factors
- Does not require parametric assumptions about baseline hazard
- Assumes proportional hazards over time

---

### 3. Kaplan-Meier Curves

*Non-parametric survival curve estimation*

Characteristics:
- Step function showing survival probability over time
- Accounts for censored observations
- Can compare survival between groups
- Visual representation of survival data

---

### 4. Time-to-Event Analysis

*Specialized methods for temporal clinical outcomes*

Applications:
- Disease progression
- Treatment response time
- Mortality analysis
- Recurrence prediction

---

### 5. Risk Scores

*Quantitative measures of clinical risk*

Purpose:
- Patient stratification
- Treatment decision support
- Prognosis prediction
- Resource allocation

---

### 6. Interpretable ML for Clinical Adoption

**⚠️ Black Box Problem:** Clinicians won't trust models they can't understand

#### Glass Box Models
**Inherently interpretable models**

**Interpretability-Performance Trade-off:**
- High Interpretability: Linear Regression, Decision Trees
- Medium: GAMs (Generalized Additive Models)
- Lower: Random Forest
- Low Interpretability: Deep Learning

**Glass Box Methods:**
- Linear/Logistic Regression
- Decision Trees
- GAMs (Generalized Additive Models)
- Rule-based systems

#### Post-hoc Explanations
**Making Black Boxes Transparent**

Methods:
- **Feature Importance:** Random Forest, XGBoost variable importance
- **Partial Dependence Plots (PDP):** Show feature effect on predictions
- **LIME (Local Interpretable Model-agnostic Explanations):** Local approximations
- **SHAP Values:** Unified approach to explain predictions

**Process:** Black Box Model → Explanation Methods → Interpretable Output

**Clinical Acceptance Requires:**
- Model explanation
- Clinical validation
- Physician trust
- Regulatory approval

---

### 7. SHAP Values

*SHapley Additive exPlanations*

Features:
- Game theory-based approach
- Consistent and locally accurate
- Model-agnostic
- Shows contribution of each feature to individual predictions

---

### 8. Clinical Validation

*Rigorous testing for clinical deployment*

Requirements:
- External validation on independent datasets
- Prospective validation studies
- Clinical utility demonstration
- Regulatory compliance
- Ethical considerations

---

## Hands-on Sessions

### 1. scikit-learn for Biomedical Data

#### Pipeline Creation
```python
from sklearn.pipeline import Pipeline
pipe = Pipeline([
  ('scaler', StandardScaler()),
  ('selector', SelectKBest()),
  ('clf', LogisticRegression())
])
```

#### Model Selection
```python
from sklearn.model_selection import GridSearchCV
gs = GridSearchCV(pipe, params,
  cv=StratifiedKFold(5),
  scoring='roc_auc')
```

#### 🧪 Practice Tasks
- Load biomedical dataset
- Handle missing values
- Scale features appropriately
- Deal with class imbalance
- Build classification pipeline
- Perform nested CV
- Generate evaluation report
- Plot ROC and PR curves

---

### 2. lifelines for Survival Analysis

**Python library for survival analysis in clinical research**

#### Kaplan-Meier
```python
from lifelines import KaplanMeierFitter
kmf = KaplanMeierFitter()
kmf.fit(T, E, label='Group A')
kmf.plot_survival_function()
```

#### Cox Regression
```python
from lifelines import CoxPHFitter
cph = CoxPHFitter()
cph.fit(df, 'T', 'E')
cph.print_summary()
```

#### 🧪 Practice Tasks
- Load clinical trial data
- Plot KM curves by treatment
- Fit Cox model
- Test proportional hazards assumption
- Calculate C-index
- Make predictions

---

## Summary

This lecture covers the essential machine learning fundamentals for biomedical data analysis, including:

1. **Unique challenges** in biomedical data (high dimensionality, small samples, class imbalance, missing data, batch effects)
2. **Preprocessing strategies** (feature selection, dimensionality reduction, imputation)
3. **ML methods** tailored for biomedical applications (supervised/unsupervised learning, proper cross-validation)
4. **Evaluation metrics** appropriate for clinical contexts (beyond accuracy, ROC/PR curves)
5. **Clinical applications** (survival analysis, risk prediction, interpretable models)
6. **Validation requirements** for clinical deployment

**Next Steps:**
- Practice with real biomedical datasets
- Case studies and applications
- Office hours by appointment

---
