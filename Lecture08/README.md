# Lecture 8: ML Fundamentals for Biomedical Data

## 📚 Overview

Complete slide deck for **Introduction to Biomedical Data Science - Lecture 8**

- **Total Slides:** 30 interactive HTML slides
- **Design:** Matching the style of Lecture 1 reference materials
- **Format:** Individual HTML files viewable in any web browser

---

## 🎯 Lecture Structure

### Part 1: Biomedical Data Challenges (Slides 3-10)
- High Dimensionality (P >> N problem)
- Small Sample Sizes & Statistical Power
- Class Imbalance & Accuracy Paradox
- Missing Data (MCAR, MAR, MNAR)
- Batch Effects & Technical Variation
- Feature Selection Methods
- Dimensionality Reduction Techniques

### Part 2: ML Methods for Biomedical Applications (Slides 11-18)
- Supervised vs Unsupervised Learning
- Classification Algorithms (Logistic Regression, RF, SVM, Neural Networks)
- Regression for Continuous Outcomes
- Clustering for Disease Subtypes
- Cross-validation Strategies
- Performance Metrics (Confusion Matrix, F1, Matthews CC)
- ROC and PR Curves

### Part 3: Clinical ML and Validation (Slides 19-30)
- Survival Analysis Fundamentals
- Cox Proportional Hazards Model
- Kaplan-Meier Survival Curves
- Time-to-Event Prediction with ML
- Clinical Risk Scores & Nomograms
- Interpretable ML & SHAP Values
- Clinical Validation Framework
- Hands-on: scikit-learn for Biomedical Data
- Hands-on: lifelines for Survival Analysis
- Best Practices & Ethical Considerations

---

## 🚀 How to Use

1. **Start with Index:** Open `index.html` in your web browser
2. **Navigate:** Click on any slide card to view that slide
3. **Present:** Open individual slides in full-screen mode (F11)
4. **Sequential View:** Slides are numbered 01-30 for easy navigation

---

## 📁 File Structure

```
lecture08_biomedical_ml/
├── index.html                              # Navigation page
├── Lecture08_01_Title.html                 # Title slide
├── Lecture08_02_Contents.html              # Table of contents
├── Lecture08_03_Part1.html                 # Part 1 divider
├── Lecture08_04_High_Dimensionality.html
├── ...
├── Lecture08_30_Thank_You.html             # Closing slide
```

---

## 🎨 Design Features

- **Consistent Styling:** Matches Lecture 1 design system
  - Aptos font family
  - Blue gradient (#1E64C8) for divider slides
  - White background for content slides
  - Hover effects on interactive elements

- **Responsive Layout:** 960×540px slides optimized for presentation

- **Visual Elements:**
  - Color-coded boxes for warnings, tips, and solutions
  - Grid layouts for comparing multiple concepts
  - Icon integration for visual appeal
  - Professional medical/scientific aesthetic

---

## 📊 Key Topics Covered

### Machine Learning Fundamentals
- Overfitting prevention strategies
- Regularization techniques (L1/L2)
- Feature engineering for biomedical data
- Model selection and hyperparameter tuning

### Biomedical-Specific Challenges
- Dealing with high-dimensional omics data
- Handling rare diseases (class imbalance)
- Censored data in survival analysis
- Batch effects in multi-center studies

### Clinical Translation
- Model interpretability for physician acceptance
- External validation requirements
- Regulatory considerations (FDA)
- Real-world deployment challenges

### Practical Tools
- scikit-learn pipelines for biomedical workflows
- lifelines for survival analysis
- SHAP for model interpretation
- Cross-validation for small datasets

---

## 🔬 Learning Outcomes

After this lecture, students will be able to:

1. **Identify** unique challenges in biomedical ML (high dimensionality, small N, class imbalance)
2. **Apply** appropriate preprocessing techniques for biomedical data
3. **Select** suitable ML algorithms for different biomedical tasks
4. **Evaluate** models using clinically relevant metrics
5. **Interpret** model predictions using SHAP and other techniques
6. **Validate** models following clinical research standards
7. **Implement** survival analysis using Cox regression and KM curves

---

## 💡 Teaching Tips

- **Interactive Discussion:** Pause at warning boxes to discuss real clinical scenarios
- **Code Examples:** Use hands-on slides (28-29) for live coding demonstrations
- **Case Studies:** Reference clinical examples throughout (diabetes, cancer, ICU)
- **Group Activities:** Split class for different validation strategies discussion

---

## 🛠️ Technical Details

- **Format:** HTML5 with embedded CSS
- **Browser Compatibility:** Chrome, Firefox, Safari, Edge
- **No Dependencies:** Pure HTML/CSS, no external libraries required
- **File Size:** ~3-5 KB per slide (lightweight and fast loading)

---

## 📖 Additional Resources

For more detailed information on:
- **Feature Selection:** See Guyon & Elisseeff (2003)
- **Survival Analysis:** Lifelines documentation at https://lifelines.readthedocs.io
- **SHAP Values:** Original paper by Lundberg & Lee (2017)
- **Clinical Validation:** TRIPOD guidelines for prediction models

---

## 👥 Contact

For questions about the lecture materials or biomedical data science:
- Course: Introduction to Biomedical Data Science
- Lecture: 8 - ML Fundamentals for Biomedical Data

---

## 📝 Version

- **Created:** November 2025
- **Slide Count:** 30
- **Last Updated:** November 9, 2025

---

**Enjoy the lecture! 🎓**
