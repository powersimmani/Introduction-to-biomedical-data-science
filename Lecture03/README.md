# Lecture 3: Biomedical Imaging Technologies

## 📘 Course Overview
**Introduction to Biomedical Datascience**  
*From Molecules to Organs: Clinical Impact Through Imaging Science*

This lecture comprehensively covers biomedical imaging technologies, from microscopy to medical imaging, and computational image analysis methodologies.

---

## 📑 Table of Contents

### Part 1: Microscopy Fundamentals
- Light Microscopy Principles
- Resolution and Magnification
- Fluorescence Microscopy
- Confocal Microscopy
- Two-Photon Microscopy
- Super-Resolution Techniques
- Electron Microscopy (SEM/TEM)

### Part 2: Medical Imaging Modalities
- X-ray Physics and Imaging
- CT Scan Principles
- MRI Physics Basics
- MRI Sequences and Contrast
- Ultrasound Imaging
- Doppler Ultrasound
- PET Imaging
- SPECT Imaging

### Part 3: Computational Image Analysis
- Digital Image Basics
- Image Preprocessing
- Segmentation Methods
- Feature Extraction
- Image Registration
- 3D Reconstruction
- DICOM Format
- Hands-on Sessions

---

# Part 1: Microscopy Fundamentals

## 🔬 Key Topics
- Resolution limits
- Contrast mechanisms
- Live vs fixed imaging
- 3D reconstruction

---

## 1. Light Microscopy Principles

### Core Concepts

#### **Köhler Illumination**
- Uniform field illumination technique
- Provides uniform illumination for high-quality image acquisition
- Requires precise alignment of condenser and light source

#### **Numerical Aperture (NA)**
- Light gathering power of objective
- Index indicating the light collection capability of an objective lens
- NA = n × sin(θ), where n is refractive index, θ is aperture angle

#### **Abbe Diffraction Limit**
- **d = λ/(2·NA) ≈ 200 nm**
- Theoretical resolution limit of optical microscopy
- Minimum resolution of approximately 200nm with visible light

#### **Point Spread Function (PSF)**
- 3D light distribution pattern
- Three-dimensional distribution when point light source passes through imaging system
- Key indicator for image quality and resolution evaluation

#### **Optical Aberrations**
- Spherical aberration
- Chromatic aberration
- Major causes of image quality degradation

---

## 2. Resolution and Magnification

### Core Concepts

#### **Rayleigh Criterion**
- Minimum resolvable distance
- Minimum distance to distinguish two points
- Resolution limitation due to diffraction limit

#### **Empty Magnification**
- Magnifying beyond resolution limit
- Magnification increase without resolution improvement
- No practical information gain

#### **Nyquist Sampling**
- 2× sampling above highest frequency
- Need to sample at more than twice the highest frequency
- Prevents information loss in digital images

#### **Digital Resolution**
- Pixel size vs optical resolution
- Appropriate matching between pixel size and optical resolution
- Prevention of under/over sampling

#### **Super-Resolution Preview**
- Breaking diffraction barrier
- Introduction to techniques surpassing diffraction limit
- Covered in detail in the next section

---

## 3. Fluorescence Microscopy

### Core Concepts

#### **Filter Cube Design**
- **Excitation filter**: Selects specific wavelength of excitation light
- **Dichroic mirror**: Separates excitation and emission light
- **Emission filter**: Detects only fluorescence signal

#### **Multichannel Imaging**
- Multiple fluorophores simultaneously
- Imaging multiple fluorophores at once
- Enables multi-target analysis

#### **Autofluorescence**
- Background from endogenous molecules
- Background signal from intrinsic molecules
- Causes signal-to-noise ratio degradation

#### **Phototoxicity**
- Cell damage from light exposure
- Cellular damage from light exposure
- Major consideration in live cell imaging

#### **Live Cell Considerations**
- Environmental control requirements
- Temperature, CO₂, humidity control needed
- Maintaining viability during long-term observation

---

## 4. Confocal Microscopy

### Core Principles

#### **Pinhole Principle**
- Rejection of out-of-focus light
- Blocks out-of-focus light
- Core of optical sectioning imaging

#### **Optical Sectioning**
- Thin optical slices through sample
- Observing samples as thin optical slices
- Improved Z-direction resolution

#### **Laser Scanning**
- Point-by-point image acquisition
- Point-by-point image acquisition
- High-resolution image generation

#### **Z-stack Acquisition**
- Series of optical sections
- Sequential optical section acquisition
- Data for 3D image reconstruction

#### **3D Rendering**
- Volumetric visualization from stacks
- Three-dimensional visualization from stack data
- Three-dimensional understanding of tissue structure

---

## 5. Two-Photon Microscopy

### Core Principles

#### **Nonlinear Excitation**
- Two photons absorbed simultaneously
- Excitation by simultaneous absorption of two photons
- Long wavelength (infrared) usage possible

#### **Deeper Penetration**
- Up to 1mm in tissue
- Penetration up to 1mm into tissue
- Observation of deep structures in vivo

#### **Reduced Photobleaching**
- Excitation only at focal point
- Excitation occurs only at focal point
- Minimal sample damage

#### **In Vivo Imaging**
- Live animal brain imaging
- Brain imaging in living animals
- Innovation in neuroscience research

#### **SHG Imaging**
- Second harmonic generation for collagen
- Imaging of non-centrosymmetric structures like collagen
- Observing tissue structure without labels

---

## 6. Super-Resolution Techniques

### Breaking the Diffraction Barrier

#### **STORM/PALM Principles**
- Single molecule localization (20-30 nm)
- Single molecule position determination
- Achieves 20-30nm resolution

#### **STED Microscopy**
- Stimulated Emission Depletion (~50 nm)
- Stimulated emission depletion method
- Approximately 50nm resolution

#### **SIM Principles**
- Structured Illumination Microscopy (~100 nm)
- Uses structured illumination
- Approximately 100nm resolution, relatively fast imaging

#### **Resolution Comparisons**
- 10× improvement over diffraction limit
- 10-fold improvement over diffraction limit
- Enables observation of subcellular fine structures

#### **Sample Requirements**
- Special fluorophores and preparation
- Requires special fluorophores
- Complex sample preparation process

---

## 7. Electron Microscopy (SEM/TEM)

### Core Concepts

#### **Electron Sources**
- Wavelength ~0.004 nm vs light ~500 nm
- Electron wavelength much shorter than light
- Atomic-level resolution possible

#### **Sample Preparation**
- Fixation
- Dehydration
- Coating (for SEM)
- Complex preprocessing required

#### **Contrast Mechanisms**
- Electron density differences
- Contrast generation by electron density differences
- Contrast enhancement with heavy metal staining

#### **Cryo-EM Revolution**
- Near-atomic resolution of proteins
- Protein structure determination at near-atomic resolution
- Nobel Prize-winning technology (2017)

#### **Correlative Microscopy**
- Combining light and electron microscopy
- Integration of optical and electron microscopy
- Integration of fluorescent labeling and high-resolution structural information

---

# Part 2: Medical Imaging Modalities

## 🏥 Key Topics
- Clinical modalities overview
- Contrast agents
- Radiation considerations
- Multi-modal imaging

---

## 8. X-ray Physics and Imaging

### Core Principles

#### **X-ray Production**
- High energy electrons hit metal target
- High-energy electrons collide with metal target
- Generation of characteristic X-rays and bremsstrahlung

#### **Attenuation Principles**
- Absorption varies with tissue density
- Absorption varies with tissue density
- Contrast between bone, soft tissue, and air

#### **Digital Detectors**
- CR (Computed Radiography)
- DR (Direct Radiography) systems replace film
- Film replacement, digital image processing

#### **Dose Considerations**
- **ALARA Principle**: As Low As Reasonably Achievable
- As low as reasonably achievable
- Minimizing patient radiation exposure

#### **Image Quality Metrics**
- Contrast, resolution, noise tradeoffs
- Balance of contrast, resolution, and noise
- Diagnostic quality optimization

---

## 9. CT Scan Principles

### Core Concepts

#### **Tomographic Reconstruction**
- Multiple X-ray projections create 3D volume
- 3D volume generation from multiple X-ray projections
- Uses backprojection algorithm

#### **Hounsfield Units (HU)**
- Standardized tissue density scale
- Standardized tissue density scale
- Water = 0 HU, Air = -1000 HU, Bone = +1000 HU

#### **Spiral/Helical CT**
- Continuous rotation and table movement
- Continuous rotation and table movement
- Fast scanning, volume data acquisition

#### **Dose Reduction Strategies**
- Iterative reconstruction: Iterative reconstruction algorithms
- Tube current modulation: Tube current adjustment
- Dose reduction while maintaining image quality

#### **Contrast Protocols**
- IV contrast timing for specific applications
- Intravenous contrast injection timing
- Optimal enhancement timing for vessels and organs

---

## 10. MRI Physics Basics

### Core Principles

#### **Nuclear Magnetic Resonance (NMR)**
- Hydrogen protons align in magnetic field
- Hydrogen nuclei alignment in strong magnetic field
- Resonance induced by radiofrequency waves

#### **Gradient Fields**
- Spatial encoding of signal
- Spatial location encoding of signal
- X, Y, Z directional position information

#### **K-space**
- Frequency domain data representation
- Frequency domain data representation
- Image reconstruction by Fourier transform

#### **Relaxation Times**
- **T1 relaxation**: Longitudinal relaxation (spin-lattice)
- **T2 relaxation**: Transverse relaxation (spin-spin)
- Each tissue has unique T1, T2 values

#### **Signal Equation**
- **S ∝ ρ·(1-e^(-TR/T1))·e^(-TE/T2)**
- ρ: Proton density
- TR: Repetition Time
- TE: Echo Time

---

## 11. MRI Sequences and Contrast

### Major Sequences

#### **T1-weighted Images**
- Fat: Bright (high signal)
- Water/CSF: Dark (low signal)
- Good anatomical structure visualization

#### **T2-weighted Images**
- Water/CSF: Bright
- Lesions and edema well visualized

#### **FLAIR (Fluid-Attenuated Inversion Recovery)**
- CSF signal suppression
- Periventricular lesion detection

#### **Diffusion-Weighted Imaging (DWI)**
- Acute stroke diagnosis
- Measures water molecule diffusion motion

#### **Contrast Agents**
- Gadolinium-based
- Vascular and tumor contrast enhancement
- Detection of blood-brain barrier breakdown

---

## 12. Ultrasound Imaging

### Core Principles

#### **Piezoelectric Transducers**
- Convert electrical to acoustic energy
- Converts electrical energy to acoustic energy
- Dual purpose for transmission and reception

#### **Acoustic Impedance**
- Tissue resistance to sound propagation
- Tissue resistance to sound wave propagation
- Z = ρ × c (density × sound velocity)

#### **Reflection and Refraction**
- Interface properties determine echoes
- Interface characteristics determine echoes
- Greater impedance difference results in stronger reflection

#### **Beamforming**
- Focusing and steering ultrasound beam
- Focusing and steering of ultrasound beam
- Uses array transducers

#### **Harmonic Imaging**
- Higher frequencies improve resolution
- Resolution improvement with high-frequency components
- Reduced tissue distortion

---

## 13. Doppler Ultrasound

### Core Concepts

#### **Doppler Shift Principle**
- Frequency change with moving blood
- Frequency change with blood flow movement
- Δf = (2 × f₀ × v × cos θ) / c

#### **Color Flow Mapping**
- Direction and velocity visualization
- Blood flow direction and velocity visualization
- Red: Approaching transducer, Blue: Moving away

#### **Power Doppler**
- More sensitive to low flow
- More sensitive to slow blood flow
- No directional information

#### **Spectral Analysis**
- Velocity vs time waveforms
- Velocity-time waveform analysis
- Diagnosis of vascular stenosis and regurgitation

#### **Clinical Applications**
- Vascular imaging
- Cardiac imaging: Echocardiography
- Obstetric imaging

---

## 14. PET Imaging

### Core Principles

#### **Positron Annihilation**
- 511 keV photons in opposite directions
- Emission of 511 keV photon pair in opposite directions
- Position determination by coincidence counting

#### **Coincidence Detection**
- Simultaneous detection localizes source
- Source localization by simultaneous detection
- Timing window: Several nanoseconds

#### **Radiotracers**
- **FDG (F-18 fluorodeoxyglucose)**: Most common tracer
- Measures glucose metabolism
- Diagnosis of cancer, cardiac, and brain diseases

#### **SUV Calculations**
- Standardized Uptake Value
- Quantification of tissue tracer uptake
- Tumor activity assessment

#### **PET/CT Integration**
- Functional and anatomical fusion
- Integration of functional and anatomical information
- Accurate lesion localization

---

## 15. SPECT Imaging

### Core Concepts

#### **Gamma Camera Principles**
- Scintillation crystal detects photons
- Photon detection with scintillation crystal
- Uses NaI(Tl) crystal

#### **Collimator Design**
- Determines sensitivity and resolution
- Determines sensitivity and resolution
- Parallel, converging, diverging types, etc.

#### **SPECT Tracers**
- **Tc-99m**: Most common radionuclide
- Half-life of 6 hours
- Can label various compounds

#### **Cardiac Applications**
- Myocardial perfusion imaging
- Myocardial perfusion imaging
- Diagnosis of ischemic heart disease

#### **SPECT/CT**
- Attenuation correction and localization
- Attenuation correction and localization
- Less expensive than PET, uses longer half-life tracers

---

# Part 3: Computational Image Analysis

## 💻 Key Topics
- Digital image fundamentals
- Processing pipeline
- Quantification methods
- AI integration

---

## 16. Digital Image Basics

### Core Concepts

#### **Pixel and Voxel Concepts**
- **Pixel**: 2D picture elements
- **Voxel**: 3D volume elements
- Basic units of digital images

#### **Bit Depth**
- 8-bit: 256 levels (2⁸)
- 16-bit: 65,536 levels (2¹⁶)
- Higher bit depth = finer gradation representation

#### **File Formats**
- **Lossless**: TIFF, PNG
- **Lossy**: JPEG (lossy compression)
- Lossless recommended for scientific imaging

#### **Compression Methods**
- Lossless vs lossy tradeoffs
- Balance between storage space and quality
- RLE, LZW, JPEG, etc.

#### **Metadata Standards**
- **EXIF**: Photo metadata
- **OME-TIFF**: Scientific microscopy images
- Storage of acquisition parameters and scale information

---

## 17. Image Preprocessing

### Core Techniques

#### **Noise Reduction**
- **Gaussian filter**: Linear smoothing
- **Median filter**: Salt-and-pepper noise removal
- **Bilateral filter**: Edge-preserving filter

#### **Contrast Enhancement**
- **Histogram stretching**: Histogram stretching
- **Adaptive methods**: Adaptive methods (CLAHE)
- Improvement of dark and bright regions

#### **Histogram Equalization**
- Uniform intensity distribution
- Uniform distribution of intensity values
- Utilization of full dynamic range

#### **Morphological Operations**
- **Erosion**: Object shrinking
- **Dilation**: Object expansion
- **Opening**: Opening (erosion followed by dilation), removes small structures
- **Closing**: Closing (dilation followed by erosion), fills small holes

#### **Registration Basics**
- Aligning multiple images
- Alignment of multiple images
- Time-series and multi-modal analysis

---

## 18. Segmentation Methods

### Major Techniques

#### **Thresholding Techniques**
- **Global thresholding**: Global threshold
- **Adaptive thresholding**: Adaptive threshold
- **Otsu's method**: Automatic threshold determination

#### **Region Growing**
- Seed-based similar pixel grouping
- Seed-based similar pixel grouping
- Finding connected similar regions

#### **Watershed Algorithm**
- Treating image as topographic surface
- Treats image as topographic surface
- Finding watershed, separating touching objects

#### **Active Contours**
- Energy-minimizing snakes
- Energy-minimizing snakes
- Precise object boundary tracking

#### **Machine Learning Methods**
- **U-Net**: Standard for medical image segmentation
- **Mask R-CNN**: Instance segmentation
- Large data learning, automatic segmentation

---

## 19. Feature Extraction

### Core Concepts

#### **Texture Analysis**
- **GLCM**: Gray Level Co-occurrence Matrix
- **LBP**: Local Binary Patterns
- Tissue characteristic quantification

#### **Shape Descriptors**
- **Area**: Area
- **Perimeter**: Perimeter
- **Circularity**: Circularity = 4π×area/perimeter²
- **Moments**: Moments, shape characteristics

#### **Intensity Statistics**
- Mean, standard deviation
- Min/max values
- Histogram metrics
- Brightness distribution characteristics

#### **Haralick Features**
- 14 texture features from GLCM
- Contrast, homogeneity, correlation, etc.
- Histopathology analysis

#### **Radiomics**
- High-throughput feature extraction
- Large-scale feature extraction
- Hundreds of quantitative features
- Prognosis prediction, treatment response assessment

---

## 20. Image Registration

### Core Concepts

#### **Rigid vs Non-rigid**
- **Rigid**: Translation + Rotation
- **Non-rigid**: Deformation, elastic registration

#### **Similarity Metrics**
- **Mutual information**: Multi-modal
- **Correlation**: Same modality
- **Mean squared error**: Mean squared error

#### **Optimization Methods**
- **Gradient descent**: Gradient descent
- **Genetic algorithms**: Genetic algorithms
- Searching for optimal transformation parameters

#### **Multi-modal Registration**
- Aligning different imaging modalities
- CT and MRI, PET and CT registration
- Primarily uses mutual information

#### **Validation Approaches**
- **Fiducial markers**: Reference markers
- **Dice coefficient**: Segmentation overlap measurement
- **Target registration error**: Target registration error

---

## 21. 3D Reconstruction

### Core Concepts

#### **Volume Rendering**
- Visualizing 3D data in 2D
- Transparency and color mapping

#### **Surface Extraction**
- Marching cubes algorithm
- Isosurface generation
- 3D mesh modeling

#### **Medical 3D Printing**
- Surgical planning
- Patient-specific implants
- Educational models
- FDM, SLA, SLS, and other technologies

#### **Workflow**
1. Image Acquisition (CT/MRI scan)
2. Segmentation (ROI extraction)
3. 3D Modeling (STL/OBJ file generation)
4. Model Optimization (smoothing, repair)
5. 3D Printing (layer-by-layer fabrication)

---

## 22. DICOM Format

### Core Concepts

#### **DICOM Structure**
- Digital Imaging and Communications in Medicine
- International standard for medical imaging
- Image + metadata

#### **Tags and Metadata**
- Patient information
- Acquisition parameters
- Thousands of standard tags

#### **PACS Systems**
- Picture Archiving and Communication Systems
- Medical image storage and transmission system
- Hospital-wide image management

#### **Anonymization**
- Removing protected health information (PHI)
- Personal information removal
- Essential for research data sharing

#### **Viewer Software**
- **Horos**: Free macOS viewer
- **3D Slicer**: Research-oriented, open-source
- **RadiAnt**: Professional Windows viewer

---

## 23. Hands-on: Medical Image Processing

### SimpleITK Tutorial

#### **Loading DICOM Series**
```python
import SimpleITK as sitk

# Read DICOM series
reader = sitk.ImageSeriesReader()
dicom_names = reader.GetGDCMSeriesFileNames(dicom_directory)
reader.SetFileNames(dicom_names)
image = reader.Execute()

# Convert to NumPy array
image_array = sitk.GetArrayFromImage(image)
```

#### **Basic Operations**
- **Filtering**: Gaussian, median filters
- **Thresholding**: Binarization
- **Morphology**: Erosion, dilation

#### **Segmentation Example**
- Region growing: Region growing algorithm
- Connected components: Connected component analysis
- Automatic organ segmentation

#### **3D Visualization**
- Integration with matplotlib
- VTK for advanced rendering
- Interactive 3D viewer

---

## 24. Hands-on: ImageJ and Python Imaging

### ImageJ Macro Basics

#### **Automating Tasks**
```javascript
// ImageJ macro example
open("image.tif");
run("Gaussian Blur...", "sigma=2");
setAutoThreshold("Otsu dark");
run("Analyze Particles...", "size=50-Infinity show=Outlines");
```

#### **Python with scikit-image**
```python
from skimage import io, filters, morphology

# Read image
image = io.imread('cells.tif')

# Preprocessing
blurred = filters.gaussian(image, sigma=2)
binary = blurred > filters.threshold_otsu(blurred)

# Morphological processing
cleaned = morphology.remove_small_objects(binary, min_size=50)
```

#### **Batch Processing**
- Automatic processing of multiple images
- Iteration through all files in folder
- Automatic result saving

#### **Custom Plugins**
- Extending ImageJ functionality
- Java or Python (PyImageJ)
- Development of specialized analysis tools

#### **Analysis Workflows**
- Cell counting
- Intensity measurements
- Colocalization analysis

---

## 🎯 Key Takeaways

### Imaging Breakthroughs
✅ **Precision Medicine**
- Personalized diagnosis and treatment
- Non-invasive early diagnosis

✅ **Super-resolution Microscopy**
- Molecular-level structure observation
- Real-time monitoring of intracellular processes

✅ **AI Transformation**
- Automated image analysis
- Improved diagnostic accuracy
- Workflow efficiency

✅ **Multi-modal Imaging**
- Anatomical + functional information
- Comprehensive diagnosis
- PET/CT, SPECT/CT, etc.

---

## 📚 Additional Resources

### Software Tools
- **ImageJ/Fiji**: Free image analysis software
- **Python**: NumPy, SciPy, scikit-image, OpenCV
- **SimpleITK/ITK**: Medical image processing library
- **3D Slicer**: 3D medical image analysis
- **MATLAB**: Image Processing Toolbox

### Online Resources
- NIH Image Analysis Resources
- Bioimage Analysis Course Materials
- Medical Imaging Community Forums

### Key Concepts Summary

| Imaging Type | Resolution | Depth | Live Imaging | Main Use |
|--------------|-----------|-------|--------------|----------|
| Light Microscopy | ~200 nm | <100 μm | ✓ | Cells, tissues |
| Confocal | ~200 nm | ~100 μm | ✓ | 3D cell imaging |
| Two-Photon | ~200 nm | ~1 mm | ✓ | Deep tissue, in vivo |
| Super-resolution | ~20 nm | <50 μm | Limited | Molecular structures |
| Electron Microscopy | ~0.1 nm | Surface/thin section | ✗ | Ultrastructure |
| X-ray | ~0.5 mm | Whole body | ✗ | Bones, dense structures |
| CT | ~0.5 mm | Whole body | ✗ | 3D anatomy |
| MRI | ~1 mm | Whole body | ✓ | Soft tissues |
| Ultrasound | ~1 mm | ~15 cm | ✓ | Real-time, portable |
| PET | ~4 mm | Whole body | ✓ | Metabolism, function |
| SPECT | ~8 mm | Whole body | ✓ | Perfusion, function |

---

## 🔬 From Molecules to Organs

This lecture covered imaging technologies at various scales **from molecular to organ level**:

1. **Nanoscale**: Electron microscopy, super-resolution microscopy
2. **Microscale**: Optical microscopy, fluorescence microscopy
3. **Mesoscale**: Confocal, two-photon microscopy
4. **Macroscale**: Medical imaging (CT, MRI, PET, etc.)

Imaging technologies at each scale are making revolutionary contributions to life science and medical research, and are becoming even more powerful with advances in computer-based image analysis and artificial intelligence.

---

## 📝 Conclusion

**Biomedical Imaging Technologies** are essential tools in modern medicine and life science research.

- Improved **diagnostic accuracy**
- Optimized **treatment planning**
- Accelerated **basic research**
- Support for **drug development**

The advancement of imaging technologies and the integration of computational analysis methods will continue to drive innovation in medicine and science.

---

**Thank you for exploring Biomedical Imaging Technologies!** 🎓

*Introduction to Biomedical Datascience*  
*Lecture 3: From Molecules to Organs - Clinical Impact Through Imaging Science*