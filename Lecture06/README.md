# Lecture 6: Proteomics and Metabolomics
## Introduction to Biomedical Datascience

**From genes to function • Protein dynamics • Metabolic snapshots**

---

## Table of Contents

- [Part 1: Proteomics Technologies](#part-1-proteomics-technologies)
  - [Mass Spectrometry Basics](#mass-spectrometry-basics)
  - [Ionization Methods](#ionization-methods)
  - [Mass Analyzers](#mass-analyzers)
  - [Tandem MS (MS/MS)](#tandem-ms-msms)
  - [Bottom-up Proteomics](#bottom-up-proteomics)
  - [Top-down Proteomics](#top-down-proteomics)
  - [Quantitative Proteomics](#quantitative-proteomics)

- [Part 2: Protein Analysis](#part-2-protein-analysis)
  - [Protein Identification](#protein-identification)
  - [Database Searching](#database-searching)
  - [PTM Analysis](#ptm-analysis)
  - [Protein-Protein Interactions](#protein-protein-interactions)
  - [Structural Proteomics](#structural-proteomics)
  - [Clinical Proteomics](#clinical-proteomics)

- [Part 3: Metabolomics](#part-3-metabolomics)
  - [Metabolomics Overview](#metabolomics-overview)
  - [Sample Preparation](#sample-preparation)
  - [LC-MS Methods](#lc-ms-methods)
  - [GC-MS Methods](#gc-ms-methods)
  - [NMR Metabolomics](#nmr-metabolomics)
  - [Metabolite Identification](#metabolite-identification)
  - [Pathway Mapping](#pathway-mapping)
  - [Biomarker Discovery](#biomarker-discovery)
  - [Lipidomics](#lipidomics)

- [Hands-on Tutorials](#hands-on-tutorials)
  - [MaxQuant Analysis](#maxquant-analysis)
  - [MetaboAnalyst](#metaboanalyst)

---

# Part 1: Proteomics Technologies

## Mass Spectrometry Basics

Mass spectrometry (MS) is the cornerstone technology for proteomics and metabolomics analysis. It enables identification, quantification, and structural characterization of proteins and metabolites with high sensitivity and specificity.

### Core MS Workflow
1. **Ionization** → Convert molecules to gas-phase ions
2. **Mass Analysis** → Separate ions by mass-to-charge ratio (m/z)
3. **Detection** → Measure ion abundance
4. **Data Analysis** → Identify and quantify molecules

### Key Performance Metrics

#### 1. Resolution & Accuracy
- **Mass Resolution**: The ability to distinguish between ions of similar m/z ratios
  - Higher resolution allows separation of peaks differing by small mass units
  - Orbitrap analyzers achieve resolutions >100,000
  - Enables discrimination between peptides differing by <0.001 Da

- **Mass Accuracy**: Closeness of measured mass to true mass
  - Expressed in parts per million (ppm)
  - Modern instruments: <5 ppm (high-end: <1 ppm)
  - Essential for confident peptide identification

#### 2. Scan Modes
- **Full Scan**: Entire mass range analysis
- **Selected Ion Monitoring (SIM)**: Targeted ion detection
- **Data-Dependent Acquisition (DDA)**: Automatic selection of most abundant ions for fragmentation

#### 3. Sensitivity & Dynamic Range
- **Detection Sensitivity**: Femtomole (10⁻¹⁵ mol) to attomole (10⁻¹⁸ mol) levels
  - 1 femtomole ≈ 600,000 molecules
  - 1 attomole ≈ 600 molecules
  - Sufficient for single-cell proteomics

- **Dynamic Range**: Ratio between most and least abundant detectable proteins
  - Typical range: 10³ to 10⁵ (3-5 orders of magnitude)
  - Challenge: High-abundance proteins can mask low-abundance proteins
  - Solution: Fractionation + enrichment methods improve detection by 100-1000 fold

#### 4. Applications
- **Protein Identification**: Database matching of fragment ion patterns
- **Quantification**: Label-free or isotope labeling approaches
- **PTM Analysis**: Detection through characteristic mass shifts
  - Phosphorylation: +80 Da
  - Acetylation: +42 Da
  - Ubiquitination: +114 Da

---

## Ionization Methods

Ionization is the critical first step in mass spectrometry that converts neutral molecules into gas-phase ions for analysis.

### Electrospray Ionization (ESI)

**The Gold Standard for Biomolecule Analysis**

#### Principle of Operation
- Solution-phase ionization through electrospray
- Forms multiply charged ions from large molecules
- Continuous ionization source

#### Key Advantages
- **Multiple Charging States**: Extends mass range of analyzer
- **Direct LC Coupling**: Online liquid chromatography integration
- **Ideal for Peptides and Proteins**: Soft ionization preserves molecular integrity
- **Solution Compatibility**: Works with aqueous and organic solvents

#### Critical Considerations
- ESI efficiency depends on solution pH and solvent composition
- Optimal conditions: pH 2-3 (positive mode), pH 8-10 (negative mode)
- Non-volatile salts can significantly suppress ionization

#### Typical Applications
- Bottom-up proteomics
- Intact protein analysis
- Metabolomics (polar compounds)
- LC-MS coupling

### MALDI (Matrix-Assisted Laser Desorption/Ionization)

**High-Throughput Ionization for Solid Samples**

#### Principle of Operation
- Sample co-crystallized with UV-absorbing matrix
- Pulsed laser ionization
- Primarily produces singly charged ions

#### Key Advantages
- **High-Throughput Screening**: Automated sample plate analysis
- **Tolerance to Contaminants**: Less affected by salts and buffers
- **Direct Tissue Analysis**: Imaging mass spectrometry applications
- **Simple Sample Preparation**: Dried droplet method

#### Common Matrices
- **CHCA** (α-cyano-4-hydroxycinnamic acid): Peptides and small proteins
- **DHB** (2,5-dihydroxybenzoic acid): Oligosaccharides and lipids
- **Sinapinic Acid**: Large proteins (>10 kDa)

#### Critical Considerations
- Matrix selection is crucial for successful analysis
- Matrix must absorb laser energy and facilitate proton transfer
- Sweet spot selection important for reproducibility
- Crystal homogeneity affects data quality

### Nano-Electrospray (nESI)

**Enhanced Sensitivity for Limited Samples**

#### Key Features
- **Ultra-Low Flow Rates**: nL/min (vs. µL/min for conventional ESI)
- **10-100× More Sensitive**: Critical for limited sample amounts
- **Reduced Ion Suppression**: Better for complex mixtures
- **Limited Sample Volumes**: <1 µL analysis possible

#### Applications
- Single-cell proteomics
- Precious clinical samples
- Structural biology studies

### Atmospheric Pressure Chemical Ionization (APCI)

**Complementary to ESI**

#### Key Features
- **Small Molecule Focus**: Best for <1500 Da
- **Less Polar Compounds**: Suitable for non-polar metabolites
- **Gas-Phase Ionization**: Different mechanism from ESI
- **Thermal Stability Required**: Higher temperature operation

---

## Mass Analyzers

Mass analyzers are the heart of the mass spectrometer, separating ions based on their mass-to-charge (m/z) ratios.

### 1. Quadrupole Filters

#### Operating Principle
- Four parallel rods with RF/DC voltages
- Oscillating electric field creates stable/unstable trajectories
- Only ions with specific m/z pass through to detector

#### Performance Characteristics
- **Resolution**: Unit mass resolution (typically ~1 Da)
- **Scan Speed**: Fast (milliseconds per spectrum)
- **Mass Range**: m/z 10-4000
- **Sequential Ion Transmission**: One m/z at a time

#### Common Applications
- Targeted quantification (SRM/MRM)
- Triple quadrupole MS (QQQ)
- Precursor ion selection in hybrid instruments
- LC-MS routine analysis


### 2. Time-of-Flight (TOF)

#### Operating Principle
- Ions accelerated to constant kinetic energy
- Velocity-based separation in field-free flight tube
- KE = ½mv² → lighter ions arrive faster
- Time measurement determines m/z

#### Performance Characteristics
- **Resolution**: 10,000-40,000 (reflectron mode)
- **Mass Accuracy**: 5-10 ppm (high-end: <2 ppm)
- **Unlimited Mass Range**: Can detect very large molecules
- **High Scan Speed**: Full spectrum in microseconds

#### Key Technologies
- **Reflectron**: Improves resolution by correcting for kinetic energy spread
- **Orthogonal Acceleration**: Enhances duty cycle and resolution
- **Delayed Extraction**: Optimizes resolution for MALDI sources

#### Applications
- MALDI-TOF protein identification
- Q-TOF for proteomics (LC-MS/MS)
- Intact protein analysis
- High-resolution MS imaging

### 3. Orbitrap Technology

**Ultra-High Resolution Mass Analysis**

#### Operating Principle
- **Ion Orbital Trapping**: Ions orbit around central electrode
- **Electrostatic Field**: Creates harmonic oscillation
- **Frequency Detection**: Oscillation frequency ∝ √(m/z)
- **Fourier Transform**: Converts time-domain signal to frequency

#### Performance Characteristics
- **Ultra-High Resolution**: >100,000 to >500,000
- **Excellent Mass Accuracy**: <1 ppm (sub-ppm with calibration)
- **Wide Dynamic Range**: 5000-10,000
- **High Sensitivity**: Attomole detection limits

#### Advantages
- Industry-leading resolution and accuracy
- Does not require magnetic field (unlike FT-ICR)
- Compact design, lower cost than FT-ICR
- Excellent for complex mixture analysis

#### Applications
- High-resolution proteomics
- Intact protein analysis (top-down)
- Metabolomics and lipidomics
- PTM localization
- Clinical biomarker discovery

### 4. Ion Trap & Hybrid Systems

#### Ion Trap Principles
- **3D Ion Confinement**: RF field traps ions in space
- **Multiple MS/MS Stages**: MSⁿ capability
- **Resonant Ejection**: Mass-selective detection
- **Space-Charge Effects**: Capacity limitations

#### Hybrid Instruments

**Q-TOF (Quadrupole-Time-of-Flight)**
- Quadrupole for precursor selection
- Collision cell for fragmentation
- TOF for high-resolution MS/MS
- Applications: Proteomics, metabolomics

**Q-Orbitrap**
- Quadrupole mass filter
- HCD collision cell
- Orbitrap for high-resolution detection
- Gold standard for proteomics

**Orbitrap Tribrid (Fusion, Eclipse)**
- Quadrupole + Linear ion trap + Orbitrap
- Multiple fragmentation methods (CID, HCD, ETD)
- Parallel detection
- Maximum flexibility and performance

---

## Tandem MS (MS/MS)

Tandem mass spectrometry enables structural characterization through sequential stages of mass analysis and fragmentation.

### MS/MS Workflow

#### 1. Precursor Selection
- **Isolate Specific m/z Ions**: Narrow mass window (typically ±0.5-2 Da)
- **Top-N Data-Dependent Selection**: Automatically select N most abundant ions
- **Targeted Precursor Lists**: Pre-programmed inclusion list for specific peptides

**Selection Strategies**:
- **Data-Dependent Acquisition (DDA)**: Real-time selection based on abundance
  - Excludes previously fragmented ions (dynamic exclusion)
  - Adjusts based on charge state and mass
  - Typical: Top 10-20 precursors per cycle

- **Data-Independent Acquisition (DIA)**: Systematic fragmentation of all ions
  - No selection bias
  - Complete MS/MS coverage
  - Requires computational deconvolution

- **Targeted Selection**: Inclusion lists for known peptides
  - Ensures fragmentation of peptides of interest
  - Critical for targeted proteomics
  - Used in biomarker validation

#### 2. Fragmentation Methods

**Collision-Induced Dissociation (CID)**
- Most widely used fragmentation technique
- Ions collide with inert gas (N₂ or Ar)
- Kinetic energy → internal energy → bond cleavage
- Produces primarily b- and y-ions from peptides
- Preferential cleavage at peptide bonds
- Energy: 15-40 eV (low-energy CID in ion traps)

**Higher-Energy Collisional Dissociation (HCD)**
- Higher collision energies in dedicated cell
- Detects low m/z fragments (including reporter ions)
- C-trap enables detection in Orbitrap
- Essential for TMT/iTRAQ quantification
- Energy: 25-45% normalized collision energy

**Electron-Transfer Dissociation (ETD)**
- Radical-driven fragmentation
- Electron transfer from reagent anions
- Cleaves N-Cα bonds → c- and z-ions
- **Preserves Labile PTMs**: Phosphorylation, glycosylation
- Best for multiply charged peptides (≥3+)
- Complementary to CID/HCD

**Other Methods**:
- **ECD** (Electron Capture Dissociation): FT-ICR instruments
- **UVPD** (Ultraviolet Photodissociation): 213 nm laser
- **EThcD** (ETD with supplemental activation)

#### 3. Product Ion Spectra

**Peptide Fragmentation Nomenclature**:
- **b-ions**: N-terminal fragments (retain charge on N-terminus)
- **y-ions**: C-terminal fragments (retain charge on C-terminus)
- **a-ions**: b-ions minus CO
- **c/z-ions**: Produced by ETD

**Information Obtained**:
- **Amino Acid Sequence**: From b/y ion series
- **PTM Localization**: Mass shifts on specific residues
- **Structural Confirmation**: Fragment patterns validate identity

#### 4. Data Acquisition Strategies

**Data-Dependent Acquisition (DDA)**
- Real-time decision making
- Survey scan → select precursors → fragment
- Cycle time: 1-3 seconds
- Stochastic sampling (reproducibility ~60-70%)
- Best for discovery proteomics

**Data-Independent Acquisition (DIA)**
- Systematic fragmentation of all detectable ions
- SWATH-MS, MSᴱ, boxcar methods
- High reproducibility (>90%)
- Comprehensive coverage
- Requires spectral libraries or algorithms
- Growing adoption for quantitative studies

**Parallel Reaction Monitoring (PRM)**
- Targeted quantification
- High resolution and accuracy
- Scheduled precursor isolation
- Better than SRM for multiplexing
- Gold standard for validation studies

---

## Bottom-up Proteomics

Bottom-up (shotgun) proteomics is the most widely used approach, analyzing proteins after enzymatic digestion into peptides.

### 1. Protein Digestion

#### Why Digestion is Necessary
- **Improved Ionization**: Peptides ionize more efficiently than intact proteins
- **Better Separation**: LC separation of peptides more effective
- **Mass Range Compatibility**: Peptides fit well within analyzer range (300-2000 m/z)
- **Predictable Fragmentation**: Consistent b/y ion formation
- **Database Searching**: Computational tools optimized for peptides

#### Enzymatic Digestion Workflow

**Sample Preparation**:
1. Protein denaturation (urea, SDS, heat)
2. Reduction (DTT, TCEP) → break disulfide bonds
3. Alkylation (iodoacetamide, chloroacetamide) → block cysteine
4. Buffer exchange or cleanup

**Trypsin Digestion** (Most Common):
- **Specificity**: Cleaves C-terminal to lysine (K) and arginine (R)
- **Predictable Peptides**: 5-30 amino acids (ideal for MS)
- **Basic C-terminus**: Enhances positive-mode ionization
- **Optimal Peptide Generation**: Average 20-40 peptides per protein

**Digestion Conditions**:
- Enzyme:protein ratio = 1:50 to 1:100 (w/w)
- Temperature: 37°C
- Time: 4-16 hours (overnight common)
- pH: 7.5-8.5 (Tris-HCl buffer)

**Alternative Proteases**:
- **Lys-C**: Cleaves only after K (more specific than trypsin)
- **Glu-C**: Cleaves after E (acidic residues)
- **Chymotrypsin**: Cleaves after F, W, Y (aromatic)
- **Multi-protease**: Combined digestion for comprehensive coverage

#### Coverage and Completeness

**Typical Outcomes**:
- Human proteome: ~20,000 proteins
- Single LC-MS/MS run: 3,000-8,000 protein IDs
- Tryptic peptides per protein: 20-40
- Sequence coverage: 20-50% per protein

### 2. Peptide Separation

#### Reverse-Phase Liquid Chromatography (RP-LC)

**Column Chemistry**:
- **C18 stationary phase**: Octadecyl (18-carbon) chains
- **Particle size**: 1.7-3 µm (UHPLC), 3-5 µm (HPLC)
- **Pore size**: 100-300 Å (optimal for peptides)
- **Column dimensions**: 15-50 cm length, 50-75 µm ID (nanoLC)

**Mobile Phase System**:
- **Solvent A**: 0.1% formic acid in water
- **Solvent B**: 0.1% formic acid in acetonitrile
- **Gradient**: 5-40% B over 60-180 minutes
- **Flow rate**: 200-400 nL/min (nanoLC)

**Gradient Optimization**:
- Shallow gradients improve resolution
- Longer gradients increase protein IDs
- Trade-off: analysis time vs. depth of coverage

**Online LC-MS Coupling**:
- Direct connection to mass spectrometer
- Electrospray from analytical column
- No offline fraction collection
- Real-time analysis

#### Advanced Separation Strategies

**Multidimensional Chromatography**:
- **2D-LC**: SCX/SAX + RP-LC
- **High-pH RP + Low-pH RP**: Orthogonal separation
- **HILIC + RP-LC**: For modified peptides

**Fractionation Methods**:
- Pre-fractionation reduces complexity
- Increases dynamic range
- Essential for deep proteome coverage
- 12-96 fractions typical

### 3. Data Complexity

**Challenges in Data Analysis**:
- **Thousands of Peptides**: 10,000-100,000+ per experiment
- **Multiple Charge States**: Each peptide appears at 2+ charge states
- **Isomers and Isobars**: Same mass, different sequence
- **Dynamic Range**: Abundant proteins dominate signal

**Computational Requirements**:
- Database search algorithms (Mascot, SEQUEST, MaxQuant)
- False discovery rate (FDR) control
- Protein inference (shared peptides)
- Quantification algorithms

**Typical Workflow Output**:
- Raw data → Peak detection → Peptide identification → Protein inference → Quantification


## Top-down Proteomics

Top-down proteomics analyzes intact proteins without digestion, providing complete proteoform information.

### Workflow Advantages
- **No Digestion Required**: Eliminates inference problems
- **Analyze Whole Proteins**: Direct characterization
- **Complete PTM Patterns**: All modifications on same molecule
- **Proteoform Characterization**: Single gene → 10-100+ distinct proteoforms

### Technical Challenges
- **High Resolution Required**: Orbitrap or FT-ICR needed (>100,000 resolution)
- **Lower Sensitivity**: 10-100× less sensitive than bottom-up
- **Complex Spectra**: Multiple charge states, overlapping isotopes
- **Mass Range**: Best for 10-80 kDa proteins

### Applications
- Antibody characterization
- Proteoform discovery
- Native MS (protein complexes)
- Complete PTM mapping

---

## Quantitative Proteomics

### 1. Label-Free Quantification (LFQ)
**Methods**:
- Spectral counting (semi-quantitative)
- Peak intensity-based (MS1 precursor ion intensity)
- MaxLFQ algorithm (current gold standard)

**Advantages**: No labeling, unlimited samples, cost-effective  
**Limitations**: Run-to-run variability, requires careful normalization

### 2. SILAC (Stable Isotope Labeling)
**Principle**: Metabolic incorporation of heavy amino acids (¹³C, ¹⁵N)  
**Workflow**: Mix light and heavy samples early → co-process  
**Advantages**: Highest quantitative accuracy, eliminates processing variability  
**Limitations**: Cell culture only, expensive media

### 3. TMT/iTRAQ Isobaric Labeling
**Principle**: Chemical tags fragment to produce unique reporter ions  
**Multiplexing**: Up to 18 samples simultaneously (TMT 18-plex)  
**Advantages**: High throughput, ideal for clinical samples  
**Limitations**: Ratio compression (solved by SPS-MS3)

### 4. DIA vs DDA
**DDA**: Selective, stochastic, 60-70% reproducibility, best for discovery  
**DIA**: Comprehensive, systematic, >90% reproducibility, best for quantification

---

# Part 2: Protein Analysis

## Protein Identification

### Database Searching Workflow
1. **MS/MS Spectrum Acquisition** → Fragmentation spectra
2. **Database Selection** → UniProt, NCBI, species-specific
3. **In Silico Digestion** → Theoretical peptides
4. **Candidate Selection** → Filter by mass and modifications
5. **Scoring & Ranking** → Match experimental to theoretical spectra

### False Discovery Rate (FDR)
**Target-Decoy Approach**:
- Create decoy database (reversed/shuffled sequences)
- Search both target and decoy
- Calculate FDR: (Decoy hits × 2) / (Target + Decoy hits)
- Typical thresholds: 1% peptide FDR, 1% protein FDR

---

## Database Searching

### Major Search Engines
- **Mascot**: Probability-based scoring
- **SEQUEST**: Cross-correlation scoring
- **MaxQuant**: Andromeda engine, integrated LFQ
- **MS-GF+**: Spectral probability, database-size independent
- **X!Tandem**: Open-source, iterative searching

### Key Parameters
**Mass Tolerances**:
- Precursor: ±5 ppm (high-resolution), ±0.5-2 Da (low-resolution)
- Fragment: ±20 ppm (Orbitrap), ±0.5 Da (ion trap)

**Modifications**:
- Fixed: Carbamidomethyl (C)
- Variable: Oxidation (M), Acetyl (Protein N-term), Phospho (STY)

**Best Practices**:
- Limit to <5 variable modifications
- Use species-specific databases
- Include contaminants database
- FDR <1% for high-confidence IDs

---

## PTM Analysis

### Phosphorylation
**Target Residues**: Ser/Thr/Tyr  
**Mass Shift**: +79.966 Da  
**Enrichment**: TiO₂, IMAC, pTyr antibodies  
**Site Localization**: Ascore, PTM score algorithms

### Glycosylation
**Types**: N-linked (N-X-S/T), O-linked (S/T)  
**Analysis**: Intact glycopeptide or deglycosylation (PNGase F)  
**Detection**: Oxonium ions (204.09, 366.14 m/z)

### Acetylation & Methylation
**Acetylation**: +42.011 Da on lysine, histone PTMs, epigenetic regulation  
**Methylation**: +14.016 Da (mono), +28.031 Da (di), +42.047 Da (tri)  
**Applications**: Chromatin remodeling, gene transcription

### Enrichment Methods
- Immunoprecipitation (antibody-based)
- Affinity chromatography (TiO₂, IMAC, lectins)
- Chemical derivatization

---

## Protein-Protein Interactions

### 1. AP-MS (Affinity Purification-MS)
**Workflow**: Tag bait protein → Pull down → Identify partners by LC-MS/MS  
**Advantages**: Physiological complexes, quantitative  
**Challenges**: False positives, requires expression

### 2. Proximity Labeling (BioID/APEX/TurboID)
**Principle**: Enzyme-catalyzed biotinylation of nearby proteins  
**Labeling Radius**: <10-20 nm  
**Advantages**: Captures transient interactions, in vivo labeling

### 3. Cross-linking MS (XL-MS)
**Principle**: Chemical cross-linkers provide distance constraints  
**Common Cross-linkers**: DSS/BS3 (lysine-lysine, 11.4 Å spacer)  
**Information**: Protein topology, complex architecture, interaction interfaces

### 4. Network Construction
- Integrate multiple datasets (AP-MS, proximity, XL-MS)
- Public databases (STRING, BioGRID, IntAct)
- Pathway analysis (GO enrichment, KEGG mapping)

---

## Structural Proteomics

### 1. HDX-MS (Hydrogen-Deuterium Exchange)
**Principle**: Backbone amide H/D exchange rates reveal structure and dynamics  
**Information**: Flexible vs rigid regions, conformational changes, binding interfaces

### 2. Cross-linking MS
**Applications**: Large complexes, membrane proteins, integrative modeling

### 3. Limited Proteolysis
**Principle**: Proteases cleave accessible regions, structured domains resist  
**Information**: Domain boundaries, flexible linkers, folding states

### 4. Ion Mobility MS
**Principle**: Gas-phase separation by collision cross-section (CCS)  
**Information**: Protein shape, conformers, oligomeric states

---

## Clinical Proteomics

### Biomarker Discovery
**Study Design**: Case-control, adequate power (n>30-50/group), biological replicates  
**Workflow**: Discovery → Statistical analysis → Validation cohort → Clinical validation

### Plasma Proteomics
**Challenge**: >10 orders of magnitude dynamic range  
**Solution**: Depletion of abundant proteins (albumin, IgG), fractionation

### Tissue Proteomics
**FFPE Analysis**: Formalin-fixed paraffin-embedded samples  
**Spatial Proteomics**: Laser microdissection, MALDI imaging, multiplex IHC

### FDA-Approved Tests
- **MALDI-TOF Bacterial ID**: Bruker Biotyper (rapid species identification)
- **Targeted Panels**: MRM/SRM assays with extensive validation

---

# Part 3: Metabolomics

## Metabolomics Overview

### Targeted vs Untargeted
**Targeted**: Pre-defined metabolites, quantitative with standards, 50-500 compounds  
**Untargeted**: Broad profiling, semi-quantitative, 1000s of features

### Primary Metabolites
- **Central Carbon**: Glycolysis, TCA cycle, pentose phosphate pathway
- **Amino Acids**: 20 proteinogenic + derivatives
- **Nucleotides**: ATP, GTP, ADP, AMP, etc.

### Secondary Metabolites
- Plant natural products, signaling molecules, defense compounds

### Metabolic Flux Analysis
**¹³C Tracing**: Track carbon flow through pathways  
**MID**: Mass isotopomer distribution reveals active pathways

---

## Sample Preparation

### 1. Quenching Metabolism
**Critical**: Metabolite levels change in seconds without quenching  
**Methods**: -80°C methanol, liquid nitrogen, acid quenching  
**Timing**: <10 seconds for cells, <2 minutes for tissues

### 2. Extraction Methods
**Bligh-Dyer**: Biphasic (methanol/chloroform/water)  
- Upper phase: Polar metabolites
- Lower phase: Lipids

**SPE** (Solid-Phase Extraction): Selective retention, salt removal

### 3. Matrix Effects
**Problem**: Co-eluting compounds suppress ionization  
**Solutions**: Sample cleanup, chromatographic separation, isotope-labeled IS

### 4. Internal Standards
**Isotope-labeled**: Gold standard for quantification  
**QC Samples**: Pooled biological samples, CV <20%

---

## LC-MS Methods

### Column Chemistry
**C18 (Reverse-Phase)**: Non-polar and moderately polar metabolites  
**HILIC**: Polar metabolites (sugars, nucleotides, amino acids)  
**Mixed-Mode**: Broader coverage

### Gradient Optimization
- Balance resolution vs run time
- Typical: 15-20 minutes for metabolomics

### Ion Suppression
- Improve separation to prevent co-elution
- Sample cleanup removes salts
- Matrix-matched calibration

### Method Validation
- **Linearity**: R² ≥ 0.99
- **Precision**: CV <15% (intra-day), <20% (inter-day)
- **LLOQ**: Signal-to-noise ≥10

---

## GC-MS Methods

### Derivatization
**Purpose**: Make metabolites volatile  
**Silylation** (most common): Replace -OH, -NH, -SH with TMS groups  
**Best for**: Sugars, amino acids, organic acids

### EI Fragmentation
- 70 eV electrons create reproducible fragmentation
- Library matching (NIST, Fiehn)
- Structural information

### Retention Indices
- Normalize using n-alkane standards
- Cross-laboratory comparison

### GC-MS vs LC-MS
| Feature | GC-MS | LC-MS |
|---------|-------|-------|
| Coverage | 200-300 | 1000+ |
| Reproducibility | Excellent | Good |
| Requires derivatization | Yes | No |
| Best for | Volatiles, amino acids | Lipids, nucleotides |

---

## NMR Metabolomics

### Advantages
- **Non-destructive**: Sample recoverable
- **Quantitative**: No ionization bias, absolute concentration
- **No Standards Needed**: Single internal standard (TSP, DSS)

### 2D NMR
- COSY, TOCSY, HSQC, HMBC
- Enhanced resolution, structure elucidation

### Limitations
- **Lower Sensitivity**: µM-mM range (100-1000× less than MS)
- **Larger Sample Volume**: 500-600 µL vs 1-10 µL for MS

---

## Metabolite Identification

### MSI Levels
1. **Level 1**: Match to authentic standard (RT + m/z + MS/MS)
2. **Level 2**: Putative annotation (spectral match, no standard)
3. **Level 3**: Compound class
4. **Level 4**: Unknown

### Mass Accuracy
- <5 ppm for confident formula prediction
- Isotope patterns confirm molecular formula

### MS/MS Matching
- Spectral libraries: METLIN, HMDB, MassBank
- In silico fragmentation: CFM-ID, MetFrag

### Standards Confirmation
Match all three: Exact m/z (±5 ppm) + RT (±0.1 min) + MS/MS spectrum

---

## Pathway Mapping

### KEGG Pathways
- >500 reference pathways
- Map metabolites to biochemical networks
- Organism-specific pathway maps

### Metabolic Networks & Flux Balance Analysis
- Stoichiometry matrix defines mass balance
- Predict growth rates, gene essentiality
- Engineering applications

### Isotope Tracing
**¹³C-glucose, ¹³C-glutamine**: Track carbon flow  
**MID Patterns**: Reveal active pathways  
**Applications**: Cancer metabolism (Warburg effect), drug response

### Integration Tools
- **MetaboAnalyst**: Web-based statistical and pathway analysis
- **XCMS**: LC-MS data preprocessing
- Multi-omics integration

---

## Biomarker Discovery

### Study Design
- Case-control studies
- Adequate sample size (n>30-50 discovery, >100 validation)
- Biological replicates

### Statistical Analysis
**Univariate**: t-test, ANOVA, Mann-Whitney  
**Multivariate**: PCA, PLS-DA, OPLS-DA  
**Multiple Testing**: FDR correction (Benjamini-Hochberg)

### Validation
- Independent sample sets
- Different populations
- Cross-validation to avoid overfitting

### ROC Analysis
- Sensitivity vs specificity trade-off
- AUC interpretation: 0.7-0.8 (acceptable), 0.8-0.9 (excellent), >0.9 (outstanding)

---

## Lipidomics

### Lipid Classes
- Glycerophospholipids (PC, PE, PS, PI, PG)
- Sphingolipids (ceramides, sphingomyelins)
- Neutral lipids (TAG, DAG, cholesterol esters)
- 1000s of lipid species

### Extraction
**Folch**: Chloroform:methanol (2:1), gold standard  
**MTBE**: Less toxic, upper phase contains lipids

### Separation Strategies
**Shotgun Lipidomics**: Direct infusion, fast, high throughput  
**LC-MS**: Better separation, resolves isobaric species  
**SFC**: Supercritical fluid chromatography

### Nomenclature
- PC(16:0/18:1): Specific fatty acids
- PC(34:1): Total carbons:double bonds
- Lipid MAPS classification

---

# Hands-on Tutorials

## MaxQuant Analysis

### Raw File Processing
1. Load RAW files
2. Peak detection and isotope pattern recognition
3. Retention time alignment ("match between runs")
4. 3D feature assembly

### Parameter Settings
- Enzyme: Trypsin/P
- Fixed mods: Carbamidomethyl (C)
- Variable mods: Oxidation (M), Acetyl (Protein N-term)
- FDR: 1% peptide, 1% protein

### Perseus Downstream
- Load proteinGroups.txt
- Filter, log2 transform, imputation
- Statistical tests (t-test, ANOVA)
- Visualization (volcano plot, heatmap, PCA)

### Quality Assessment
- Identification rates (3000-8000 proteins typical)
- Mass error centered at 0 ppm
- Replicate correlation R² >0.9

---

## MetaboAnalyst

### Data Upload
- Peak intensity table format
- Rows: samples, Columns: metabolites
- Metabolite IDs (HMDB, KEGG, names)

### Normalization
- Sum, median, or reference sample normalization
- Log transformation
- Scaling: auto, pareto, or range

### Statistical Analysis
- Univariate: t-test, ANOVA, fold-change, volcano plot
- Multivariate: PCA, PLS-DA, OPLS-DA, heatmap
- VIP scores for feature importance

### Pathway Analysis
- Enrichment analysis (hypergeometric test)
- Topology analysis (impact scores)
- Visual pathway maps
- Multi-omics integration

---

# Future Directions

## Multi-Omics Integration
- Pathway-centric mapping
- Network-based analysis
- Machine learning across omics layers
- Systems biology understanding

## Technological Advances
- **Single-cell proteomics**: CellenONE + MS
- **Spatial omics**: MALDI imaging, DESI
- **Native MS**: Megadalton complexes
- **Ion mobility**: timsPASEF, 4D proteomics

## Computational Innovations
- Deep learning (Prosit, DeepMass, DIA-NN, AlphaFold)
- Cloud computing
- Public repositories (PRIDE, MetaboLights)

## Career Paths
- Academic research
- Biotechnology/pharmaceutical
- Clinical diagnostics
- Core facilities
- Bioinformatics/data science

---

# Summary

## Key Takeaways

### Proteomics
- Bottom-up is the workhorse for protein ID and quantification
- Top-down provides complete proteoform information
- Quantitative methods: LFQ, SILAC, TMT/iTRAQ
- PTM analysis requires enrichment and ETD/EThcD
- Clinical applications expanding

### Metabolomics
- LC-MS and GC-MS are complementary
- NMR provides unbiased quantification
- Sample preparation is critical
- Isotope tracing reveals pathway activity
- Pathway analysis integrates data into biological context

### The Extended Central Dogma
```
DNA → RNA → Protein → Metabolite → Phenotype
         ↑           ↑          ↑
   Transcriptomics  Proteomics  Metabolomics
```

Each omics layer provides unique and complementary information.

---

# Quick Reference

## Common PTM Mass Shifts
| Modification | Mass Shift | Target |
|--------------|------------|--------|
| Phosphorylation | +79.966 Da | S, T, Y |
| Acetylation | +42.011 Da | K, N-term |
| Methylation | +14.016 Da | K, R |
| Oxidation | +15.995 Da | M |
| Carbamidomethyl | +57.021 Da | C |

## MS Instrument Comparison
| Instrument | Resolution | Mass Accuracy | Sensitivity |
|------------|------------|---------------|-------------|
| Orbitrap | 100k-500k | <1 ppm | attomole |
| Q-TOF | 30k-60k | 2-5 ppm | femtomole |
| Triple Quad | Unit mass | 0.1 Da | femtomole |

## Software Tools
- **Proteomics**: MaxQuant, Proteome Discoverer, Skyline
- **Metabolomics**: XCMS, MZmine, MetaboAnalyst
- **Statistics**: Perseus, R (limma, MSstats)
- **Pathways**: KEGG, Reactome, Ingenuity

---

**END OF LECTURE 6: PROTEOMICS AND METABOLOMICS**

*This comprehensive guide provides a foundation for understanding and applying proteomics and metabolomics technologies in biomedical research and clinical applications.*