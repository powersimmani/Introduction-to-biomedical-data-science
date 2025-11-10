# Lecture 5: Transcriptomics and Single-Cell Analysis

## 📋 Overview

**Course:** Introduction to Biomedical Data Science  
**Lecture:** Transcriptomics and Single-Cell Analysis  
**Total Slides:** 30

This lecture covers the fundamentals and advanced methods of transcriptomics, from bulk RNA-seq to cutting-edge single-cell technologies.

---

## 🎯 Learning Objectives

1. **Understanding bulk RNA-seq** - Experimental design, normalization, and differential expression analysis
2. **Mastering single-cell technologies** - Platform comparison, data preprocessing, and quality control
3. **Analyzing single-cell data** - Clustering, cell type annotation, and trajectory inference
4. **Exploring advanced methods** - Spatial transcriptomics, multimodal omics, and RNA velocity
5. **Applying practical skills** - Hands-on with Seurat and Scanpy

---

## 📚 Lecture Structure

### Part 1: Bulk RNA-seq (Slides 3-10)
- RNA-seq workflow and experimental design
- Library preparation methods
- Normalization and differential expression
- Statistical testing and pathway analysis

### Part 2: Single-Cell Technologies (Slides 11-19)
- scRNA-seq overview and platforms
- Droplet-based vs plate-based methods
- Data preprocessing and quality control
- Dimensionality reduction and clustering
- Cell type annotation and trajectory analysis

### Part 3: Advanced Methods (Slides 20-30)
- Spatial transcriptomics technologies
- CITE-seq and multimodal omics
- RNA velocity analysis
- Cell-cell communication inference
- Batch effect correction and integration
- Hands-on tutorials with Seurat and Scanpy

---

## 🚀 How to Use

### Option 1: Index View
Open `index.html` to see all slides in a grid layout. Click any slide to view it directly.

### Option 2: Slideshow Mode
Open `slideshow.html` for a presentation-style view with navigation controls.

**Keyboard Shortcuts:**
- `→` or `Space`: Next slide
- `←`: Previous slide
- `Home`: First slide
- `End`: Last slide

---

## 💡 Key Concepts

### Bulk RNA-seq
- **Normalization:** TPM, DESeq2, TMM for accurate comparison
- **Differential Expression:** Negative binomial models with FDR control
- **Pathway Analysis:** GSEA for biological interpretation

### Single-Cell RNA-seq
- **Platform Trade-offs:** Throughput vs depth, cost vs sensitivity
- **Quality Control:** Filter cells by nGene, nUMI, %mitochondrial
- **Dimensionality Reduction:** PCA → t-SNE/UMAP for visualization
- **Clustering:** Graph-based methods (Leiden, Louvain)
- **Cell Type Annotation:** Marker genes and reference mapping

### Advanced Technologies
- **Spatial Transcriptomics:** Visium (55μm), MERFISH (subcellular)
- **CITE-seq:** Protein + RNA in same cells
- **Multimodal:** 10X Multiome (GEX + ATAC)
- **RNA Velocity:** Infer cell state dynamics from splicing
- **Integration:** Combine datasets with Seurat, Harmony, LIGER

---

## 🛠️ Tools & Frameworks

### R Ecosystem
- **Seurat:** Most popular scRNA-seq analysis package
- **DESeq2:** Differential expression for bulk RNA-seq
- **Monocle:** Trajectory inference
- **CellPhoneDB:** Cell-cell communication

### Python Ecosystem
- **Scanpy:** Python alternative to Seurat
- **scVelo:** RNA velocity analysis
- **LIGER:** Integrative analysis
- **squidpy:** Spatial transcriptomics

---

## 📖 Additional Resources

### Key Papers
- Tang et al. (2009): First single-cell RNA-seq
- Macosko et al. (2015): Drop-seq
- Stuart et al. (2019): Seurat v3 integration
- La Manno et al. (2018): RNA velocity

### Databases
- **Gene Ontology (GO):** Functional annotations
- **KEGG:** Pathway databases
- **CellMarker:** Cell type markers
- **Human Cell Atlas:** Reference datasets

### Online Tutorials
- Seurat: https://satijalab.org/seurat/
- Scanpy: https://scanpy.readthedocs.io/
- Analysis of single cell RNA-seq data: https://www.singlecellcourse.org/

---

## 🎓 Prerequisites

- Basic understanding of molecular biology (RNA, transcription)
- Familiarity with statistical concepts (hypothesis testing, p-values)
- Basic programming knowledge (R or Python helpful)
- Understanding of high-throughput sequencing

---

## 📊 Applications

### Research
- **Development Biology:** Cell differentiation trajectories
- **Disease Studies:** Identify disease-associated cell types
- **Immunology:** Characterize immune cell heterogeneity

### Clinical
- **Diagnostics:** Cell type signatures for disease classification
- **Drug Discovery:** Target identification and validation
- **Precision Medicine:** Patient-specific cell atlas

---

## 🔄 Updates

**Version 1.0** - Initial release with 30 comprehensive slides covering bulk RNA-seq, single-cell technologies, and advanced methods.

---

## 📧 Contact

For questions about the lecture materials, please refer to your course instructor.

---

## 📄 License

These materials are provided for educational purposes as part of the Introduction to Biomedical Data Science course.
