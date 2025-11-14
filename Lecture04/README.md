# Lecture 4: Next-Generation Sequencing and Genomics

**Introduction to Biomedical Data Science**

Instructor: Ho-min Park  
Email: homin.park@ghent.ac.kr | powersimmani@gmail.com

---

## 📚 Lecture Structure

This module contains 30 slides covering NGS (Next-Generation Sequencing).

### Part 1: Sequencing Technologies (Slides 3–10)
- Review of Sanger Sequencing
- Overview of the NGS revolution
- Illumina Sequencing technology
- Library Preparation
- Paired-end vs Single-end
- Long-read Sequencing (PacBio)
- Nanopore Sequencing

### Part 2: Data Processing (Slides 11–18)
- FASTQ format
- Quality Control (FastQC)
- Read Alignment
- SAM/BAM formats
- Variant Calling
- VCF format
- Annotation Tools

### Part 3: Applications (Slides 19–29)
- Whole Genome Sequencing (WGS)
- Whole Exome Sequencing (WES)
- Targeted Gene Panels
- RNA-seq
- ChIP-seq
- ATAC-seq
- Metagenomics
- Clinical Sequencing
- Hands-on: NGS Pipeline
- Hands-on: Galaxy Platform

---

## 🚀 How to Use

### 1. Start from the index page
Open `index.html` in your browser to see the list of all slides.

### 2. View individual slides
Each slide is provided as a standalone HTML file:
- `Lecture04_01_Title.html` — Title
- `Lecture04_02_Contents.html` — Contents
- `Lecture04_03_Part1_Divider.html` — Part 1 Divider
- ... (30 slides total)
- `Lecture04_30_Thank_You.html` — Thank You

### 3. Presentation mode
- Slides are optimized for 960×540 resolution
- Fullscreen (F11) is recommended
- You can navigate with the browser Back/Forward buttons

---

## 🎨 Design Features

The design follows Lecture 1 for consistency:

- **Color scheme**: 
  - Primary Blue: #1E64C8
  - Gradient: #1E64C8 → #2874d8 / #5088d4
  - White backgrounds for content slides
  
- **Typography**:
  - Font: Aptos, 'Segoe UI', sans-serif
  - Title: 36–48px, Bold
  - Body: 16–20px
  
- **Layout**:
  - Slide size: 960px × 540px
  - Structured with info boxes, grids, bullet lists
  - Interactive feel with hover effects

---

## 📋 File List

```
index.html                              # Main navigation page
Lecture04_01_Title.html                # 01. Title
Lecture04_02_Contents.html             # 02. Contents
Lecture04_03_Part1_Divider.html        # 03. Part 1 Divider
Lecture04_04_Sanger_Sequencing.html    # 04. Sanger Sequencing
Lecture04_05_NGS_Revolution.html       # 05. NGS Revolution
Lecture04_06_Illumina_Sequencing.html  # 06. Illumina
Lecture04_07_Library_Preparation.html  # 07. Library Prep
Lecture04_08_Paired_End_vs_Single_End.html  # 08. Paired vs Single
Lecture04_09_PacBio_Long_Read.html     # 09. PacBio
Lecture04_10_Nanopore_Sequencing.html  # 10. Nanopore
Lecture04_11_Part2_Divider.html        # 11. Part 2 Divider
Lecture04_12_FASTQ_Format.html         # 12. FASTQ
Lecture04_13_Quality_Control.html      # 13. QC
Lecture04_14_Read_Alignment.html       # 14. Alignment
Lecture04_15_SAM_BAM_Formats.html      # 15. SAM/BAM
Lecture04_16_Variant_Calling.html      # 16. Variant Calling
Lecture04_17_VCF_Format.html           # 17. VCF
Lecture04_18_Annotation_Tools.html     # 18. Annotation
Lecture04_19_Part3_Divider.html        # 19. Part 3 Divider
Lecture04_20_Whole_Genome_Sequencing.html  # 20. WGS
Lecture04_21_Whole_Exome_Sequencing.html   # 21. WES
Lecture04_22_Targeted_Panels.html      # 22. Targeted Panels
Lecture04_23_RNAseq_Overview.html      # 23. RNA-seq
Lecture04_24_ChIPseq.html              # 24. ChIP-seq
Lecture04_25_ATACseq.html              # 25. ATAC-seq
Lecture04_26_Metagenomics.html         # 26. Metagenomics
Lecture04_27_Clinical_Sequencing.html  # 27. Clinical
Lecture04_28_Hands_on_NGS_Pipeline.html  # 28. NGS Pipeline
Lecture04_29_Hands_on_Galaxy.html      # 29. Galaxy
Lecture04_30_Thank_You.html            # 30. Thank You
```

---

## 💡 Key Topics

### Sequencing Technologies
- Comparison of Sanger vs NGS (~500,000× cost reduction)
- Principles of Illumina SBS (Sequencing by Synthesis)
- Pros and cons of long-read technologies (PacBio HiFi, Nanopore)

### Data Processing
- FASTQ quality scores (Phred Q30 = 99.9%)
- BWA/Bowtie2/STAR alignment tools
- GATK variant calling pipeline
- VCF format and variant annotation

### Applications
- WGS vs WES comparison (cost, coverage, diagnostic yield)
- RNA-seq workflow
- Epigenetic assays (ChIP-seq, ATAC-seq)
- Considerations for clinical sequencing

---

## 🔧 Tech Stack

- Pure HTML5 + CSS3 (no external libraries)
- Responsive design (optimized for 960×540)
- Modern browser compatibility (Chrome, Firefox, Safari, Edge)

---

## 📝 Editing and Customization

Each HTML file is independent and can be edited individually:

1. **Edit content**: modify each file’s body section
2. **Change styles**: update CSS inside the `<style>` tag
3. **Change colors**: replace #1E64C8 across files as needed

---

## 📧 Contact

Questions or suggestions are welcome:
- Email: homin.park@ghent.ac.kr
- Email: powersimmani@gmail.com

---

**Created**: Nov 9, 2025  
**Version**: 1.0
