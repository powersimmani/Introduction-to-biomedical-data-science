# Lecture 10: Drug Discovery and Molecular Machine Learning

**Introduction to Biomedical Datascience**

This comprehensive guide covers AI-powered drug discovery, molecular machine learning, and practical applications transforming pharmaceutical development.

---

## Executive Summary

Machine learning and artificial intelligence are revolutionizing drug discovery by:
- **Reducing timelines** from 10-15 years to potentially 5-7 years
- **Lowering costs** from $2.6B to under $1B per approved drug  
- **Improving success rates** from 10% to potentially 20-30%
- **Enabling precision medicine** and rare disease treatments

Over 20 AI-discovered drugs are currently in clinical development, with the first entering trials in 2020.

---

## Part 1: Drug Discovery Pipeline

### 1. Target Identification

**Goal:** Identify biological molecules whose modulation could treat disease

**Key Approaches:**
- Disease mechanism analysis
- Druggable genome screening (3,000-10,000 genes)
- Target validation (genetic, chemical, biomarker)
- Human genetic evidence (doubles success rate)
- Network biology approaches

**Success Example:** HER2 in breast cancer led to trastuzumab (Herceptin)

**Best Practices:**
- Multiple lines of evidence
- Human genetic support
- Early druggability assessment
- Safety consideration
- Biomarker strategy

---

### 2. Lead Discovery

**Goal:** Identify initial active compounds (hits)

**Methods:**
1. **High-throughput Screening (HTS):** 10⁶-10⁹ compounds, automated testing
2. **Virtual Screening:** Computational prediction before synthesis
3. **Fragment-based Design:** Small fragments (MW<300) grown into leads
4. **Natural Products:** Nature-inspired bioactive structures
5. **Diversity Libraries:** Broad chemical space coverage

**Typical Outcome:** 100-1,000 hit compounds from millions screened

---

### 3. Lead Optimization

**Goal:** Transform hits into optimized clinical candidates

**Optimization Parameters:**
- **Potency:** IC₅₀/EC₅₀ to nM range
- **Selectivity:** Reduce off-target effects
- **ADME:** Absorption, distribution, metabolism, excretion
- **Safety:** Toxicology screening
- **Physicochemical Properties:** Lipinski's Rule of 5

**Timeline:** 1-2 years, 100-1,000 analogs synthesized

---

### 4. Preclinical Studies

**Goal:** Establish safety and efficacy before human testing

**Components:**
- In vitro studies (cell-based assays)
- In vivo pharmacology (animal models)
- Pharmacokinetics (ADME profiling)
- Toxicology (acute, repeat-dose, genotoxicity)
- Regulatory package (IND preparation)

**Duration:** 1-2 years, $10-50M investment
**Success Rate:** ~12% progress to clinical trials

---

### 5. Clinical Trials

**Phase I:** Safety in 20-100 subjects (70% success rate)
**Phase II:** Efficacy in 100-500 patients (33% success rate)
**Phase III:** Confirmatory in 1,000-5,000 patients (25-30% approval rate)
**Phase IV:** Post-marketing surveillance

**Modern Innovations:**
- Biomarker strategies (patient selection)
- Adaptive trial designs (flexible protocols)
- Real-world evidence (EHR, claims data)

**Overall:** 6-7 years, $800M-$1B, 10% Phase I→Approval success

---

### 6. Computational Approaches

**Methods Transforming Discovery:**
- **Structure-based Drug Design:** Molecular docking, de novo design
- **Ligand-based Design:** Pharmacophore, 3D-QSAR
- **Molecular Dynamics:** Protein flexibility, binding simulations
- **Machine Learning/AI:** Property prediction, generative design
- **Quantum Mechanics:** Accurate binding calculations

**Impact:** 30-40% time reduction, 50-60% fewer compounds synthesized

---

## Part 2: Molecular Machine Learning

### 7. Molecular Representations

**Encoding molecules for ML:**

1. **Text-based:** SMILES (`CCO` for ethanol), InChI
2. **Fingerprints:** Binary vectors (ECFP, MACCS keys)
3. **Descriptors:** Physicochemical properties (MW, LogP, PSA)
4. **3D Conformations:** Spatial coordinates
5. **Graphs:** Atoms as nodes, bonds as edges

---

### 8. SMILES Notation

**Syntax:** Linear text representation of molecules
- Atoms: `C, N, O` (organic), `[NH4+]` (charged)
- Bonds: `-` single, `=` double, `#` triple
- Branches: `CC(C)C` (isobutane)
- Rings: `C1CCCCC1` (cyclohexane)
- Aromatic: `c1ccccc1` (benzene)

**Applications:**
- Database searching
- Machine learning input
- SMARTS pattern matching
- Data augmentation (randomization)

---

### 9. Graph Neural Networks (GNNs)

**Architecture for molecular graphs:**

**Components:**
- **Nodes:** Atoms with features (element, charge, hybridization)
- **Edges:** Bonds with features (type, stereochemistry)
- **Message Passing:** Nodes exchange information iteratively
- **Graph Convolutions:** Aggregate neighbor information
- **Attention Mechanisms:** Weight neighbor importance
- **Pooling:** Aggregate to graph-level representation

**Popular Models:** MPNN, D-MPNN, AttentiveFP, SchNet

**Advantages:** State-of-the-art performance, learns from structure directly

---

### 10. Property Prediction

**Predicting molecular properties with ML:**

**Key Properties:**
- Physicochemical (solubility, LogP, pKa)
- ADME (permeability, metabolism, clearance)
- Toxicity (hERG, hepatotoxicity, genotoxicity)
- Biological activity (IC₅₀, binding affinity)

**Methods:**
- Traditional ML: Random forests, SVM, gradient boosting
- Deep Learning: GNNs, CNNs, RNNs, transformers
- Transfer Learning: Pre-trained models (ChemBERTa, MolBERT)

**Validation:** Scaffold splits, external test sets, confidence intervals

---

### 11. QSAR Modeling

**Quantitative Structure-Activity Relationships:**

**Principle:** Activity = f(Structure)

**Workflow:**
1. Descriptor selection
2. Model development (MLR, PLS, RF, NN)
3. Validation (cross-validation, external test)
4. OECD principles compliance
5. Applicability domain definition

**Metrics:**
- R² > 0.6 (goodness of fit)
- Q² > 0.5 (predictive ability)
- Y-randomization test (not due to chance)

**Applications:** Virtual screening, lead optimization, toxicity prediction

---

### 12. Virtual Screening

**Computational filtering of large libraries:**

**Funnel Process:** 10⁸-10¹⁰ → 10⁶-10⁷ → 10⁴-10⁵ → 10²-10³ → 10-100 hits

**Methods:**
1. **Similarity Searching:** Tanimoto coefficient, fingerprints
2. **Pharmacophore Modeling:** 3D feature matching
3. **Molecular Docking:** Predict binding modes
4. **ML Scoring Functions:** Trained on binding data
5. **Consensus Approaches:** Combine multiple methods

**Metrics:** Enrichment factor, BEDROC, hit rate (5-20%)

---

### 13. Docking Simulation

**Predicting protein-ligand binding:**

**Components:**
- **Protein Preparation:** Add hydrogens, define binding site
- **Ligand Preparation:** 3D coordinates, conformations
- **Search Algorithms:** Genetic, Monte Carlo, incremental
- **Scoring Functions:** Force field, empirical, knowledge-based, ML

**Validation:** Self-docking (RMSD<2Å), cross-docking, virtual screening benchmarks

**Popular Tools:** AutoDock Vina, Glide, GOLD, rDock

---

## Part 3: Practical Applications

### 14. Drug-Target Interaction

**Predicting which drugs bind which targets:**

**Approaches:**
- Ligand-based (chemical similarity)
- Structure-based (docking, binding site comparison)
- Network-based (drug-target networks)
- Machine learning (joint drug-target models)
- Chemogenomics (proteochemometric modeling)

**Data:** ChEMBL (2M+ compounds, 15K+ targets)

**Applications:** Drug discovery, repurposing, polypharmacology, side effect prediction

---

### 15. Side Effect Prediction

**Predicting adverse drug reactions computationally:**

**Data Sources:** SIDER, FAERS, MedDRA, OFFSIDES

**Methods:**
1. **Network Approaches:** Drug-target-ADR networks
2. **Chemical Similarity:** Similar drugs → similar ADRs
3. **Target-based:** Off-target interactions → adverse effects
4. **Machine Learning:** Multi-task, multi-label classification

**Impact:** Early toxicity screening, reduce late-stage attrition, patient safety

---

### 16. Drug Repurposing

**Finding new uses for existing drugs:**

**Advantages:**
- Faster (3-12 years vs. 10-17 years)
- Cheaper ($300M vs. $2.6B)
- De-risked (known safety profile)

**Strategies:**
1. **Indication Expansion:** Related conditions
2. **Computational Predictions:** Signature matching, network-based
3. **Phenotypic Screening:** Test in disease models
4. **Real-World Evidence:** EHR mining

**Success Stories:**
- Sildenafil: Angina → Erectile dysfunction
- Metformin: Diabetes → Cancer research
- Dexamethasone: Inflammation → COVID-19

---

### 17. Bioactivity Prediction

**Estimating biological activity before testing:**

**Approaches:**
- Structure-Activity Relationships (SAR, QSAR, 3D-QSAR)
- Machine learning (RF, SVM, deep learning)
- Proteochemometric modeling (drug-target pairs)
- Graph neural networks (state-of-the-art)
- Transfer learning (pre-trained models)

**Data:** ChEMBL, PubChem BioAssay, BindingDB

**Applications:** Virtual screening, lead optimization, multi-task prediction

---

### 18. ADMET Prediction

**Predicting Absorption, Distribution, Metabolism, Excretion, Toxicity:**

**A - Absorption:**
- Oral bioavailability, intestinal permeability
- Lipinski's Rule of 5, solubility

**D - Distribution:**
- Volume of distribution, plasma protein binding
- Blood-brain barrier penetration

**M - Metabolism:**
- Metabolic stability, CYP450 interactions
- Site of metabolism, metabolite prediction

**E - Excretion:**
- Renal/hepatic clearance, half-life
- Total clearance prediction

**T - Toxicity:**
- hERG inhibition, hepatotoxicity, genotoxicity
- Organ toxicity, carcinogenicity

**Tools:** SwissADME, ADMETlab, pkCSM, commercial platforms

---

### 19. De Novo Design

**Generating novel molecules from scratch:**

**Strategies:**
1. **Fragment-based Assembly:** Build from molecular pieces
2. **Atom-by-atom Construction:** Sequential generation
3. **Evolutionary Algorithms:** Genetic operations on molecules
4. **Reinforcement Learning:** Learn optimal design policy
5. **Generative Models:** VAE, GAN, autoregressive, flow-based

**Objectives:** Multi-parameter optimization (potency, ADMET, synthesizability, novelty)

**Success:** HTL inhibitors, DDR1 kinase inhibitors (validated experimentally)

---

### 20. Generative Models

**AI models creating new molecular structures:**

**Architectures:**
1. **VAEs:** Continuous latent space, interpolation
2. **GANs:** Adversarial training, high quality
3. **Autoregressive:** RNN/Transformer, sequential generation
4. **Flow-based:** Invertible transformations, exact likelihood
5. **Diffusion:** Denoising process, stable training

**Property-Guided Generation:**
- Conditional generation
- Latent space optimization
- Reinforcement learning (REINVENT)
- Pareto optimization

**Evaluation:** Validity, uniqueness, novelty, drug-likeness, diversity

---

### 21. Clinical Trial Optimization

**AI transforming clinical development:**

**Applications:**
1. **Patient Selection:** EHR mining, predictive enrollment
2. **Trial Design:** Adaptive designs, platform trials
3. **Synthetic Control Arms:** Historical/real-world data
4. **Site Selection:** Performance prediction
5. **Real-time Monitoring:** Dropout prediction, safety signals
6. **Endpoint Prediction:** Digital biomarkers

**Impact:**
- 20-30% duration reduction
- 15-25% cost reduction
- 40-50% faster patient identification
- Higher data quality

---

### 22. Pharmacovigilance

**AI-driven drug safety monitoring:**

**Components:**
1. **Adverse Event Reporting:** Automated processing (NLP), FAERS analysis
2. **Signal Detection:** ML patterns, multi-source integration
3. **Causality Assessment:** Automated scoring, Bayesian networks
4. **Literature Surveillance:** Scan 30,000+ articles weekly
5. **Social Media Monitoring:** Twitter, forums, patient communities
6. **Risk Management:** Benefit-risk modeling, personalized predictions

**Benefits:**
- Earlier detection (weeks vs. months)
- Fewer false positives
- Better patient protection
- Efficient resource allocation

---

## Hands-on Implementation

### 23. RDKit and DeepChem

**Practical cheminformatics and ML:**

**RDKit Capabilities:**
- Molecule I/O (SMILES, SDF, MOL)
- Descriptor calculation (MW, LogP, TPSA)
- Fingerprints (Morgan, MACCS, RDK)
- Substructure searching (SMARTS)
- 3D conformation generation
- Visualization

**DeepChem Features:**
- Built-in datasets (MoleculeNet)
- Featurizers (fingerprints, graphs)
- Models (GraphConv, MPNN, Transformers)
- Multi-task learning
- Transfer learning

**Example Workflow:**
```python
# Load data
tasks, datasets, transformers = dc.molnet.load_tox21()

# Train model
model = dc.models.GraphConvModel(n_tasks=12, mode='classification')
model.fit(train, nb_epoch=100)

# Predict
predictions = model.predict(test)
```

---

### 24. Molecular Generation

**Implementing generative models:**

**SMILES RNN:**
- Character-level generation
- Sequential sampling
- Property conditioning

**VAE:**
- Encode to latent space
- Decode to molecules
- Latent space optimization

**Graph Generation:**
- Junction Tree VAE
- Graph VAE
- Node-by-node construction

**Reinforcement Learning:**
- Policy gradient (REINVENT)
- Multi-objective rewards
- Iterative optimization

**Evaluation:**
- Validity (chemically correct)
- Uniqueness (no duplicates)
- Novelty (not in training set)
- Drug-likeness (QED score)
- Diversity (internal similarity)

---

## Impact & Future

### Current Success (2024)

**AI-Discovered Drugs:**
- 20+ molecules in clinical development
- First entered trials in 2020 (Exscientia DSP-1181)
- Insilico Medicine: 18-month discovery timeline

**Performance Gains:**
- 30-50% timeline reduction
- 40-60% cost savings
- 2-3x better candidate quality
- 10-20% hit rates (vs 0.01-1% traditional)

**Investment:**
- $13B peak (2021)
- $5B current (2023)
- Major pharma partnerships ($100M-$1B)

### Future Outlook (2025-2030)

**Technological:**
- Foundation models for chemistry
- Multimodal AI (structure+omics+imaging)
- Quantum computing simulations
- Autonomous labs (closed-loop AI+robots)
- Explainable AI for medicinal chemistry

**Impact Projections:**
- Time: 10-15 years → 5-7 years
- Cost: $2.6B → <$1B
- Success: 10% → 20-30%
- Personalization: Most drugs with biomarkers

**Societal Benefits:**
- More rare disease treatments
- Pandemic rapid response
- Lower drug costs
- Personalized medicine

---

## Key Resources

**Software:**
- RDKit (cheminformatics)
- DeepChem (ML for molecules)
- PyTorch/TensorFlow (deep learning)
- AutoDock Vina (docking)

**Databases:**
- ChEMBL (bioactivity)
- PubChem (compounds)
- PDB (protein structures)
- DrugBank (drug information)

**Learning:**
- Deep Learning for Life Sciences (Ramsundar et al.)
- CS224W (Stanford)
- TeachOpenCADD

**Conferences:**
- MLDD (Machine Learning for Drug Discovery)
- NeurIPS (workshops)
- RECOMB

---

## Conclusion

AI and machine learning are fundamentally transforming drug discovery:

✅ **Proven Success:** 20+ AI-designed drugs in clinical trials  
✅ **Measurable Impact:** 30-50% faster, 40-60% cheaper  
✅ **Broad Applications:** Every stage from target ID to pharmacovigilance  
✅ **Continuous Innovation:** Rapid advancement in methods  
✅ **Future Potential:** Could reduce development to 5-7 years, <$1B cost  

The integration of human expertise with AI capabilities promises to revolutionize medicine, bringing life-saving treatments to patients faster and more efficiently than ever before.

---

**End of Lecture 10**

*This material provides a comprehensive overview of AI-powered drug discovery. For hands-on practice, explore the RDKit and DeepChem tutorials. For the latest developments, follow MLDD conferences and Nature Reviews Drug Discovery.*