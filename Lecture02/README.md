# Lecture 2: Electromagnetic Spectrum and Biomedical Measurements
## From Photons to Diagnostics

**Instructor:** Ho-min Park  
**Email:** [contact information]

---

## Table of Contents

### Part 1: EM Spectrum Fundamentals
1. Light as wave and particle
2. Energy scales in biology
3. Photon-matter interactions
4. Absorption and emission principles
5. Scattering phenomena
6. Fluorescence foundations

### Part 2: Spectroscopy Methods
- Instrumentation • Detection Principles • Quantitative Analysis

### Part 3: Biological Applications
- Translation to Diagnostics • Clinical Implementation • Point-of-Care Devices

---

## Part 1: EM Spectrum Fundamentals

### Electromagnetic Wave Properties

**Wave Characteristics:**
- **Electric (E) and Magnetic (B) fields** oscillate perpendicular to each other
- **Wave equation:** E(x,t) = E₀ cos(kx - ωt + φ)
  - k = 2π/λ (wave number)
  - ω = 2πν (angular frequency)

**Key Properties:**

1. **Wavelength (λ)**
   - Distance between wave crests
   - Relationship: c = λν

2. **Frequency (ν)**
   - Oscillations per second
   - Measured in Hertz (Hz)

3. **Speed of Light (c)**
   - 3 × 10⁸ m/s in vacuum
   - Reduced in media: c/n

4. **Polarization**
   - Direction of E-field oscillation
   - Linear, circular, elliptical

5. **E and B Fields**
   - Perpendicular oscillating fields
   - Energy transport mechanism

6. **Coherence**
   - Phase relationship maintenance
   - Critical for interferometry

---

### Energy, Wavelength, Frequency Relationships

**Planck-Einstein Relation:**
```
E = hν = hc/λ
```
- h = 6.626 × 10⁻³⁴ J·s (Planck constant)

**Key Principles:**
- Higher frequency → Higher energy
- Shorter wavelength → Higher energy

**Useful Conversions:**
- **Energy in eV:** E(eV) = 1240 / λ(nm)
- **Wavelength Conversion:** λ(nm) = 10⁷ / ν(cm⁻¹)
- **Frequency Relation:** ν(Hz) = c / λ(m)
- **Photon Flux:** Φ = P / (hν) photons per second

**Biological Energy Scales:**
- **~2 eV:** Visible light photosynthesis
- **~0.1 eV:** IR vibrations, molecular bonds
- **~4 eV:** UV damage, DNA breaks
- **~25 meV:** kBT at 25°C, thermal energy

---

### Electromagnetic Spectrum Overview

**Spectrum Range:**
Radio waves → Microwaves → IR → Visible → UV → X-rays → Gamma rays
- Frequency: 10³ Hz to 10²⁰ Hz
- Wavelength: km to pm

**Biological Windows:**
- **Visible:** 400-700 nm (vision, photosynthesis)
- **NIR:** 700-1000 nm (deep tissue penetration)
- **UV-A:** 320-400 nm (minimal DNA damage)

**Atmospheric Transmission:**
- **Transparent:** Visible light, radio waves
- **Absorbed:** Most UV, IR, X-rays
- **Ozone layer:** Blocks harmful UV-C radiation

**Medical Imaging Regions:**
- **X-ray:** 0.01-10 nm (radiography, CT scanning)
- **Gamma:** <0.01 nm (PET, SPECT imaging)
- **Optical:** Microscopy, endoscopy

---

### Photon-Matter Interactions

**Primary Interaction Mechanisms:**

1. **Absorption**
   - Photon energy transferred to molecule
   - Excites electron to higher state
   - Cross-section σ(λ) determines probability

2. **Scattering**
   - Elastic (Rayleigh, Mie) or inelastic (Raman)
   - No energy absorption, direction change only

3. **Photoelectric Effect**
   - Complete photon absorption
   - Electron ejection (E > work function)
   - Basis for X-ray imaging

4. **Compton Scattering**
   - High-energy photon-electron collision
   - Partial energy transfer
   - Important for gamma rays

**⚠️ Biological Damage Thresholds:**
- **UV:** DNA damage, thymine dimers (<320 nm)
- **Ionizing (X-ray, γ):** Direct DNA breaks, ROS generation
- **Visible/NIR:** Generally safe, but high intensity causes thermal damage
- **Photobleaching:** Fluorophore destruction limits imaging time

---

### Absorption and Emission

**Beer-Lambert Law:**
```
A = εbc = -log₁₀(I/I₀)
```
- ε: molar absorptivity (M⁻¹cm⁻¹)
- b: path length (cm)
- c: concentration (M)
- A: absorbance
- I/I₀: transmitted/incident intensity

**Key Concepts:**
- Direct relationship between concentration and absorbance
- Linear range typically A = 0.1-1.0
- Beyond A=2: non-linear response

---

### Scattering Phenomena

**Types of Scattering:**

1. **Rayleigh Scattering**
   - Elastic scattering by particles << λ
   - Intensity ∝ 1/λ⁴
   - Why sky is blue

2. **Mie Scattering**
   - Particles ≈ λ
   - Direction-dependent
   - Cloud appearance

3. **Raman Scattering**
   - Inelastic scattering
   - Molecular vibrational information
   - Stokes and anti-Stokes lines

---

### Fluorescence Principles

**Jablonski Energy Diagram:**
- S₀ → S₁ (absorption, ~10⁻¹⁵ s)
- ↓ vibrational relaxation (~10⁻¹² s)
- S₁ → S₀ (emission, ~10⁻⁹ s)

**Stokes Shift:**
- λ_emission > λ_excitation
- Typically 20-100 nm
- Enables detection by wavelength separation

**Fluorophore Properties:**
- **Brightness:** ε × Φ (extinction × quantum yield)
- **Lifetime:** τ (1-10 ns typical)
- **Stokes shift:** 20-100 nm
- **Photostability:** varies widely between fluorophores

**Excitation/Emission Spectra:**
- Mirror image relationship due to vibrational structure
- Stokes shift separation enables detection
- Peak wavelengths for filter optimization
- Spectral overlap considerations for multicolor imaging

**⚠️ Photobleaching:**
- Irreversible fluorescence loss over time
- Reactive oxygen species (ROS) mediated damage
- Antifade reagents help preserve signal
- Limits long-term imaging duration

**🔗 FRET Basics:**
- **Förster Resonance Energy Transfer**
- Distance-dependent (2-10 nm range)
- Requires donor-acceptor pair
- Molecular ruler for protein interactions

---

## Part 2: Spectroscopy Methods

### UV-Vis Spectroscopy

**Beer's Law Application:**
```
A = εbc = -log₁₀(I/I₀)
```

**Spectrophotometer Design:**
1. **Light Source** → Monochromator → Sample → Detector
2. **Light Sources:** Deuterium (UV), Tungsten-halogen (Visible), Xenon flash lamps
3. **Monochromator:** Wavelength selection (prism/grating)
4. **Sample Cuvette:** 1 cm path length standard
5. **Detector:** Photomultiplier tube (PMT)

**🧬 Chromophores in Biology:**
- **Proteins:** Trp, Tyr (280 nm)
- **DNA/RNA:** 260 nm
- **Heme:** Soret band (420 nm)

**📊 Cuvette Selection:**
- **Quartz:** UV region
- **Glass/Plastic:** Visible only
- **Standard:** 1 cm path length

**Applications:**
- Protein quantification
- DNA/RNA purity
- Enzyme kinetics
- Drug screening

**⚙️ Baseline Corrections:**
- Buffer blank essential
- Scatter correction for turbid samples
- Temperature control

**📈 Linear Range:**
- A = 0.1-1.0 optimal
- Beyond A=2: non-linear
- Dilute if necessary

---

### Protein Concentration Measurement

**1. A280 Method**
- Direct, fast measurement
- Needs pure protein
- ε calculated from Trp/Tyr content
- Formula: c = A₂₈₀ / ε

**2. Bradford Assay**
- Coomassie dye binding to protein
- Color change: Brown → Blue complex
- Detection at A₅₉₅
- Sensitive (1-100 μg/mL)
- **Limitation:** Detergent interference

**3. BCA Assay**
- Two-step reaction:
  - Step 1: Protein reduces Cu²⁺ to Cu¹⁺
  - Step 2: BCA chelates Cu¹⁺ → Purple complex
- Detection at A₅₆₂ nm
- Temperature: 37°C
- Compatible with detergents
- Range: 20-2000 μg/mL

**⚠️ Interference Factors:**
- **DTT/β-ME:** Affects BCA ✗
- **SDS:** Affects Bradford ✗
- **Critical:** Check buffer compatibility!

---

### DNA/RNA Quantification

**A260 Measurement:**
- Nucleic acids absorb strongly at 260 nm
- **Pure DNA:** A260/A280 ≈ 1.8
- **Pure RNA:** A260/A280 ≈ 2.0
- Lower ratios indicate protein contamination

**Concentration Calculation:**
- **dsDNA:** 1 OD₂₆₀ = 50 μg/mL
- **ssDNA:** 1 OD₂₆₀ = 33 μg/mL
- **RNA:** 1 OD₂₆₀ = 40 μg/mL

**Quality Assessment:**
- A260/A280 ratio (protein contamination)
- A260/A230 ratio (organic contaminants)

---

### Infrared Spectroscopy

**Molecular Vibrations:**
- Stretch, bend, rock, wag, twist modes
- Each unique to molecular structure

**IR Spectral Regions:**
- **4000-2500 cm⁻¹:** O-H, N-H stretches
- **2000-1500 cm⁻¹:** C=O, C=C stretches
- **1500-400 cm⁻¹:** Fingerprint region

**Detailed IR Regions:**

**Functional Group Region (4000-1500 cm⁻¹):**
- 3600-3200: O-H stretch (alcohols, phenols)
- 3500-3300: N-H stretch (amines, amides)
- 3000-2850: C-H stretch (alkanes, alkenes)
- 1750-1650: C=O stretch (carbonyls)
- 1680-1600: C=C stretch (alkenes)

**Fingerprint Region (1500-400 cm⁻¹):**
- Complex pattern unique to each molecule
- Used for definitive compound identification
- C-O, C-N, C-C stretches and various bending modes

**Typical Frequencies:**
- C-H stretch: ~3000 cm⁻¹
- C=O stretch: ~1700 cm⁻¹
- C-C stretch: ~1000 cm⁻¹

---

### ATR-FTIR (Attenuated Total Reflectance)

**Working Principle:**
- IR beam undergoes total internal reflection at crystal-sample interface
- Evanescent wave penetrates sample (~0.5-5 μm depth)
- Sample absorbs specific wavelengths
- Reflected beam carries absorption information

**Key Advantages:**
- No sample preparation needed
- Works with solids, liquids, powders, films
- Quick analysis (1-2 minutes)
- Non-destructive

**Common Crystals:**
- **Diamond:** Hardest, most durable, wide range
- **ZnSe:** Good for most organic samples
- **Ge:** Best for strongly absorbing samples

**⚠️ Water Interference Problem:**

**The Problem:**
- Water shows very strong O-H stretching (~3400 cm⁻¹)
- H-O-H bending band at ~1640 cm⁻¹
- Overlaps with important functional groups (O-H, N-H)
- Moisture in air can interfere with measurements

**Solutions:**
- **Use D₂O:** Deuterium shifts O-D stretch to ~2500 cm⁻¹
- **Dry samples:** Store in desiccator before measurement
- **Background subtraction:** Measure pure water spectrum first
- **Purge instrument:** Continuously flow dry N₂ or air
- **Use ATR-FTIR:** Less sensitive to atmospheric water

**Best Practice:**
Always record background in same conditions as sample measurement

---

### FTIR for Biomolecules

**Protein Analysis:**
- **Amide I (1700-1600 cm⁻¹):** C=O stretch, secondary structure
- **Amide II (1600-1500 cm⁻¹):** N-H bend, C-N stretch
- **α-helix:** ~1650 cm⁻¹
- **β-sheet:** ~1630, 1680 cm⁻¹
- **Random coil:** ~1640 cm⁻¹

**Lipid Analysis:**
- C-H stretches (2850-2950 cm⁻¹)
- C=O ester (1740 cm⁻¹)
- Membrane fluidity studies

**Nucleic Acids:**
- Phosphate groups (1080, 1240 cm⁻¹)
- Base vibrations (1600-1700 cm⁻¹)
- Sugar-phosphate backbone

---

### Raman Spectroscopy

**Raman Scattering Energy Diagram:**
- **Rayleigh:** ν₀ (elastic, most intense)
- **Stokes:** ν₀ - ν_vib (energy loss, strong)
- **Anti-Stokes:** ν₀ + ν_vib (energy gain, weak)

**Raman Shift:**
```
Δν = ν₀ - ν_scattered
```
- Chemical fingerprint without labels
- Provides molecular vibrational information

**🔬 Biological Applications:**
- **Cell imaging:** Label-free analysis
- **Drug distribution:** Tissue mapping
- **Cancer diagnostics:** Tissue characterization
- **Protein structure:** Secondary structure analysis

**✨ SERS (Surface-Enhanced Raman Spectroscopy):**
- **Enhancement:** 10⁶-10¹⁴ fold
- Metal nanoparticles (Au, Ag)
- Single molecule detection possible
- Biosensing applications

**🗺️ Raman Imaging:**
- Spatial mapping of molecular composition
- Confocal Raman microscopy
- Chemical maps of cells/tissues
- Sub-micron resolution

**🆓 Label-free Analysis:**
- No fluorophores needed
- Native state biomolecules
- Non-destructive measurement
- Real-time monitoring possible

---

### Mass Spectrometry Basics

**Mass Spectrometer Workflow:**
Sample → Ion Source → Mass Analyzer → Detector → Data System

**Ionization Methods:**

1. **ESI (Electrospray Ionization)**
   - Soft ionization
   - Ideal for proteins, peptides
   - Multiple charging
   - Intact biomolecules

2. **MALDI (Matrix-Assisted Laser Desorption/Ionization)**
   - Laser-based ionization
   - Peptides, tissues
   - Imaging mass spectrometry
   - Single charge typically

**Mass Analyzers:**

- **TOF (Time-of-Flight):** Fast, high sensitivity
- **Quadrupole:** Selective, robust, affordable
- **Orbitrap:** High resolution, high accuracy
- **Ion Trap:** MS^n capability, compact

**Tandem MS (MS/MS):**
- Precursor ion selection
- Fragmentation (CID, HCD, ETD)
- Fragment ion analysis
- Structure elucidation
- **Essential for proteomics workflow**

**Resolution & Accuracy:**
- **Resolution:** Distinguishes isotopes
- **Accuracy:** <5 ppm for Orbitrap
- **Dynamic range:** 10⁴-10⁶

**Applications:**
- Proteomics and peptide sequencing
- Small molecule identification
- Post-translational modifications
- Metabolomics
- Drug discovery

---

### NMR Fundamentals

**Nuclear Spin in Magnetic Field:**
- ¹H, ¹³C, ¹⁵N, ³¹P nuclei have spin ½
- In magnetic field B₀:
  - α (↑): Lower energy state
  - β (↓): Higher energy state
  - ΔE = hν

**Chemical Shift (δ):**
- Electronic environment around nucleus
- Measured in ppm relative to TMS (0 ppm)
- **Common ranges (¹H NMR):**
  - Alkyl: 1-2 ppm
  - C-O: 3-4 ppm
  - Aromatic: 7-8 ppm
  - Aldehyde: 9-10 ppm

**J-coupling (Spin-Spin Splitting):**
- **n+1 rule:** Signal splits into n+1 peaks
- **Doublet:** 1 neighboring H
- **Triplet:** 2 neighboring H
- **Quartet:** 3 neighboring H
- Provides connectivity information

**2D NMR Techniques:**
- **COSY:** Correlation spectroscopy (¹H-¹H coupling)
- **NOESY:** Nuclear Overhauser effect (spatial proximity)
- **HSQC:** Heteronuclear single quantum coherence (¹H-¹³C)
- → Structure determination

**Biomolecular NMR:**
- Solution state structure determination
- Protein α-helix and β-sheet identification
- Dynamics information
- Ligand binding studies

---

## Part 3: Biological Applications

### Fluorescent Proteins and Tags

**Common Fluorescent Proteins:**

**GFP Family:**
- **EGFP:** Enhanced GFP (488/509 nm)
- **CFP:** Cyan FP (433/475 nm)
- **YFP:** Yellow FP (514/527 nm)

**Red-shifted Variants:**
- **mCherry:** (587/610 nm)
- **tdTomato:** Tandem dimer, bright
- **mKate2:** Far-red (588/633 nm)

**Photoactivatable/Photoswitchable:**
- **PA-GFP:** Photoactivatable
- **Dronpa:** Reversible photoswitching
- **mEos2:** Green→Red photoconversion

**Applications:**
- Protein localization
- Gene expression monitoring
- Live cell imaging
- Super-resolution microscopy (PALM, STORM)

**Tagging Strategies:**
- N-terminal vs C-terminal fusion
- Linker design important
- Verify protein function after tagging
- Multiple color combinations for co-localization

---

### FRET and Molecular Interactions

**Förster Resonance Energy Transfer Mechanism:**

**FRET Efficiency:**
```
E = R₀⁶ / (R₀⁶ + r⁶)
```
- R₀: Förster radius (typically 2-10 nm)
- r: Donor-acceptor distance
- When r = R₀, E = 50%

**Requirements:**
1. Spectral overlap between donor emission and acceptor absorption
2. Donor-acceptor distance 2-10 nm
3. Proper dipole orientation (κ²)
4. Donor quantum yield

**📏 R₀ Calculations:**
- Förster radius typically 2-10 nm
- Depends on spectral overlap J(λ)
- Quantum yield of donor
- Orientation factor κ²

**🎨 FRET Pairs:**
- **Classic:** CFP-YFP
- **Red-shifted:** GFP-RFP
- **Organic dyes:** Alexa Fluor, ATTO
- **Quantum dots:** Semiconductor nanocrystals

**🔬 Biosensor Design:**
- Conformational change sensors
- **Examples:** Ca²⁺, cAMP, kinase activity
- Protein-protein interactions
- Enzyme activity reporters

**🧫 Live Cell Applications:**
- Real-time protein interactions
- Signaling pathway dynamics
- Molecular proximity measurements
- Drug screening assays

---

### Flow Cytometry Principles

**Flow Cytometer System:**

**Components:**
1. **Fluidics System:** Hydrodynamic focusing
2. **Optics:** Lasers and detection
3. **Electronics:** Signal processing

**Key Specifications:**
- **Analysis Speed:** 10,000 cells/second
- **Typical Lasers:** 405, 488, 561, 640 nm
- **Parameters/Cell:** 20-50+

**💧 Fluidics System:**
- Hydrodynamic focusing creates single-cell stream
- Sheath fluid (PBS) surrounds sample
- Laminar flow for precise alignment

**💡 Laser Excitation:**
- Multiple lasers for multicolor detection
- Common: 405, 488, 561, 640 nm
- Each excites different fluorophores

**📡 Detection Channels:**
- **FSC (Forward Scatter):** Cell size
- **SSC (Side Scatter):** Granularity/complexity
- **FL1-FLn:** Fluorescence channels (PMTs)

**⚙️ Compensation:**
- Corrects spectral overlap between fluorophores
- Single-color controls essential
- Software or hardware compensation

**🔬 Applications:**
- Immunophenotyping
- Cell cycle analysis
- Apoptosis detection
- Rare cell identification
- Biomarker expression

---

### FACS Sorting

**Fluorescence-Activated Cell Sorting:**

**Mechanism:**
1. **Droplet Formation:** High-frequency vibration (~40 kHz)
2. **Laser Interrogation:** Fluorescence detection
3. **Sort Decision:** Electronics determine charge
4. **Charging:** Droplets charged (+, -, or neutral)
5. **Deflection:** Electrostatic plates (±3000-5000V)
6. **Collection:** Separate populations

**Key Features:**

**Droplet Formation:**
- High-frequency vibration creates uniform droplets
- Poisson statistics ensure one cell per droplet
- Timing critical for accurate sorting

**Charge Deflection:**
- Electrostatic deflection: ±3000-5000V
- Precise timing critical for accurate sorting
- Multiple collection tubes possible

**Purity vs Yield:**
- Tradeoff in gating strategy
- **Purity mode:** >99% purity
- **Yield mode:** Maximize recovery

**Index Sorting:**
- Link phenotype to well position
- Enables single-cell sequencing correlation
- Individual cell tracking

**Applications:**
- Cell subset isolation
- Single-cell cloning
- Stem cell purification
- Rare cell enrichment

---

### Spectroscopy in Diagnostics

**Clinical Applications:**

**Point-of-Care Testing:**
- Glucose monitoring
- Hemoglobin measurement
- Blood gas analysis
- Electrolyte panels

**Disease Diagnostics:**
- Cancer detection (Raman, fluorescence)
- Infectious disease (PCR, fluorescence)
- Metabolic disorders
- Genetic screening

**Tissue Analysis:**
- Surgical margin assessment
- Real-time pathology
- Molecular imaging

**Advantages:**
- Rapid results
- Minimal sample
- Non-invasive options
- Quantitative data

---

### Point-of-Care Devices

**Key Requirements:**
- Simple operation
- Rapid results (<30 min)
- Portable/handheld
- Minimal training
- Cost-effective

**Technologies:**
- Lateral flow assays
- Microfluidics
- Smartphone integration
- Biosensors

**Examples:**
- Glucose meters
- Pregnancy tests
- Rapid COVID tests
- Portable blood analyzers

**Advantages:**
- Decentralized testing
- Immediate clinical decisions
- Resource-limited settings
- Home monitoring

---

### Biosensor Technologies

**Biosensor Architecture:**

**Components:**
1. **Recognition Element** → 2. **Transducer** → 3. **Signal Processing** → 4. **Digital Output**

**Recognition Elements:**
- **Antibody:** High specificity
- **Aptamer:** Nucleic acid-based
- **Enzyme:** Catalytic amplification
- **MIP:** Molecularly imprinted polymer

**Transduction Methods:**

**Optical:**
- SPR (Surface Plasmon Resonance)
- SERS (Surface-Enhanced Raman)
- Fluorescence
- Chemiluminescence

**Electrochemical:**
- Amperometric (current)
- Potentiometric (voltage)
- Impedimetric (impedance)
- FET-based (field-effect)

**Piezoelectric:**
- QCM (Quartz Crystal Microbalance)
- SAW (Surface Acoustic Wave)
- Cantilever deflection

**Thermal:**
- Calorimetric measurements

**Surface Chemistry:**
- **SAMs:** Self-assembled monolayers
- **PEG:** Anti-fouling coating
- **Blocking:** BSA, casein
- Minimize non-specific binding

**Signal Amplification:**
- Enzyme cascades: HRP, ALP
- Nanoparticles: Au, Ag enhancement
- SERS: 10⁶-10¹⁴ fold enhancement
- Improve LOD to fM-aM range

**Key Parameters:**
- Sensitivity (LOD)
- Selectivity
- Response time
- Dynamic range
- Stability

---

## Hands-on Sessions

### Spectral Data Analysis

**Python/R for Spectral Analysis:**

**Libraries:**
- NumPy, SciPy, Matplotlib, pandas
- scikit-learn for machine learning

**Data Processing:**
- **Baseline correction:** Polynomial, asymmetric least squares
- **Peak fitting:** Gaussian, Lorentzian, Voigt profiles
- **Smoothing:** Savitzky-Golay filter
- **Normalization:** Area, height, internal standard

**Multivariate Analysis:**
- PCA (Principal Component Analysis)
- PLS-DA (Partial Least Squares Discriminant Analysis)
- Classification and clustering

**Quality Metrics:**
- SNR (Signal-to-Noise Ratio)
- Resolution
- Reproducibility
- Limit of Detection (LOD)

**Example Code:**
```python
import scipy.signal as signal
peaks, _ = signal.find_peaks(spectrum, height=0.1)
```

---

### Python for Signal Processing

**Signal Processing Essentials:**

**FFT Analysis:**
- Frequency domain transformation
- Identify periodic components
- Noise characterization

**Filtering:**
- Low-pass, high-pass, band-pass
- Savitzky-Golay smoothing
- Median filtering
- Wiener filter

**Noise Reduction:**
- Moving average
- Wavelet denoising
- Ensemble averaging

**Feature Extraction:**
- Peak detection and integration
- Moments calculation
- Statistical descriptors
- Pattern recognition

**Deconvolution:**
- Separate overlapping signals
- Richardson-Lucy algorithm
- Blind deconvolution

**Example Code:**
```python
from scipy.signal import savgol_filter
smoothed = savgol_filter(data, window=11, polyorder=2)
```

---

## Resources

### 📚 Recommended Textbooks
- Lakowicz: Principles of Fluorescence Spectroscopy
- Skoog: Principles of Instrumental Analysis

### 💻 Software Tools
- **Image Analysis:** ImageJ/Fiji
- **Programming:** Python (SciPy, scikit-learn, NumPy, Matplotlib)
- **Statistics:** R, MATLAB

### 🌐 Online Resources
- PhET Interactive Simulations
- Fluorophores.org
- Spectral databases
- Interactive spectrum explorers

### 🔬 Next Topics
- Advanced Imaging Techniques
- Super-resolution microscopy
- Light sheet microscopy
- Multiphoton imaging

---

## Summary

This lecture covered the fundamental principles of electromagnetic radiation and its application to biomedical measurements:

1. **EM Spectrum Fundamentals:** Wave-particle duality, energy-wavelength relationships, photon-matter interactions

2. **Spectroscopy Methods:** UV-Vis, IR, Raman, NMR, and Mass Spectrometry for biomolecule analysis

3. **Biological Applications:** Fluorescent proteins, FRET, flow cytometry, diagnostics, biosensors

**Key Takeaways:**
- Light-matter interactions provide rich information about biological systems
- Multiple spectroscopic techniques complement each other
- Modern biomedical research relies heavily on optical/spectroscopic methods
- Point-of-care and diagnostic applications bring lab techniques to clinic
- Computational tools essential for data analysis

---