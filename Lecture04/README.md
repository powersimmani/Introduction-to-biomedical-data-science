plicates: 80% power for lowly expressed genes
```

#### Read Depth

**Recommendations:**

| Application | Reads per Sample |
|-------------|-----------------|
| **Gene expression profiling** | 20-40 million |
| **Differential expression** | 20-40 million |
| **Isoform analysis** | 50-100 million |
| **Novel transcript discovery** | 80-100 million |
| **Allele-specific expression** | 100-200 million |

**Coverage Calculation:**
```
Human transcriptome: ~100,000 transcripts
30 million reads
= ~300 reads per transcript on average
(varies widely by expression level)
```

#### Strand-Specific Protocols

**Importance:**
- Distinguish sense from antisense transcripts
- Improved accuracy for overlapping genes
- Better detection of non-coding RNAs

**Methods:**
- dUTP method (most common)
- Directional ligation
- Template switching

#### Batch Effect Correction

**Sources of Batch Effects:**
- Different sequencing runs
- RNA extraction batches
- Library preparation dates
- Sequencers

**Correction Methods:**
```R
# Using ComBat (sva package)
library(sva)
batch <- c(1,1,2,2)
modcombat <- model.matrix(~1, data=coldata)
combat_counts <- ComBat(dat=counts, batch=batch, mod=modcombat)

# Using RUVSeq
library(RUVSeq)
set <- newSeqExpressionSet(counts)
set <- RUVg(set, control_genes, k=1)
```

### Single-Cell RNA-seq (scRNA-seq)

**Overview:**
- Profile individual cells (not bulk tissue)
- Reveals cellular heterogeneity
- Identifies rare cell populations
- Trajectory analysis

**Key Differences from Bulk RNA-seq:**

| Feature | Bulk RNA-seq | scRNA-seq |
|---------|-------------|-----------|
| **Input** | Millions of cells | Individual cells |
| **Reads/Sample** | 20-40M | 50K-1M per cell |
| **Genes Detected** | ~15,000 | ~2,000-5,000 per cell |
| **Cost** | $100-300/sample | $1-5 per cell |
| **Dropout** | Minimal | High (~90% zeros) |
| **Analysis** | Average expression | Cell clustering, trajectories |

**Popular Platforms:**
- 10x Genomics Chromium
- Drop-seq
- Smart-seq2
- CITE-seq (RNA + protein)

---

## 5. ChIP-seq

### Overview

ChIP-seq (Chromatin Immunoprecipitation Sequencing) is a powerful technique for analyzing protein-DNA interactions genome-wide. It identifies where specific proteins (transcription factors, histones) bind to DNA.

### ChIP-seq Principle & Workflow

#### Complete ChIP-seq Workflow

```
┌──────────────────┐
│  1. Crosslink    │
│  Protein to DNA  │
└────────┬─────────┘
         ↓
    Formaldehyde
    (Fix interactions)
         ↓
┌──────────────────┐
│  2. Fragment     │
│  Chromatin       │
└────────┬─────────┘
         ↓
    Sonication
    (200-500 bp fragments)
         ↓
┌──────────────────┐
│  3. Immuno-      │
│  precipitation   │
└────────┬─────────┘
         ↓
    Antibody (specific)
    + Protein A/G beads
         ↓
┌──────────────────┐
│  4. Reverse      │
│  Crosslink       │
└────────┬─────────┘
         ↓
    65°C overnight
    (Purify DNA)
         ↓
┌──────────────────┐
│  5. Library Prep │
│  & Sequencing    │
└────────┬─────────┘
         ↓
    NGS Output
```

### Detailed Step-by-Step Process

#### Step 1: Crosslinking

**Purpose:** Covalently link proteins to DNA

```
Living Cells
      ↓
Add Formaldehyde (1%)
10-15 minutes, RT
      ↓
Protein ═══ DNA bonds formed
      ↓
Quench with Glycine
      ↓
Fixed Cells
```

**Parameters:**
- Formaldehyde: 1% final concentration
- Time: 10-15 minutes (transcription factors)
        30-45 minutes (histones)
- Temperature: Room temperature
- Quenching: 125 mM glycine

#### Step 2: Chromatin Fragmentation

**Sonication:**
```
Crosslinked Chromatin
        ↓
    Sonication
   (Multiple cycles)
        ↓
   ═══ ═══ ═══ ═══
   (200-500 bp fragments)
```

**Optimization:**
- Fragment size: 200-500 bp optimal
- Too small: Loss of material
- Too large: Poor resolution
- Check on agarose gel

**Alternative:** Enzymatic digestion (MNase)

#### Step 3: Immunoprecipitation

**Process:**
```
Fragmented Chromatin
        ↓
Add Specific Antibody
(anti-TF or anti-histone mark)
   4°C overnight
        ↓
Add Protein A/G Beads
(Magnetic or agarose)
   2-4 hours, 4°C
        ↓
Wash (stringent)
• Low salt
• High salt
• LiCl wash
• TE wash
        ↓
Elute bound DNA
```

**Critical Factors:**
- Antibody quality (CRUCIAL)
- Antibody amount (2-10 μg)
- Chromatin amount (10-50 μg)
- Washing stringency

#### Step 4: DNA Purification

**Reverse Crosslinking:**
```
Eluted DNA-Protein
        ↓
65°C overnight
(with Proteinase K)
        ↓
Protein ═══ DNA bonds broken
        ↓
Purify DNA
(Phenol-chloroform or columns)
        ↓
Pure DNA
(IP and Input)
```

#### Step 5: Library Preparation & Sequencing

```
ChIP DNA + Input DNA
        ↓
Library Preparation
(End repair, A-tailing, ligation)
        ↓
Size Selection
        ↓
PCR Amplification
        ↓
NGS Sequencing
(Single-end 50-75 bp)
        ↓
FASTQ Files
```

**Sequencing Depth:**
- Transcription factors: 20-30 million reads
- Histone marks: 30-50 million reads
- Input control: Match IP depth

### ChIP-seq Data Analysis Pipeline

#### Step 1: Quality Control & Alignment

```bash
# QC
fastqc ChIP.fastq.gz Input.fastq.gz

# Alignment
bowtie2 -x genome_index \
        -U ChIP.fastq.gz \
        -S ChIP.sam

bowtie2 -x genome_index \
        -U Input.fastq.gz \
        -S Input.sam

# Convert to BAM
samtools view -bS ChIP.sam | samtools sort -o ChIP.bam
samtools view -bS Input.sam | samtools sort -o Input.bam

# Index
samtools index ChIP.bam
samtools index Input.bam
```

#### Step 2: Peak Calling

**Using MACS2 (Model-based Analysis of ChIP-Seq):**

```bash
# For sharp peaks (transcription factors)
macs2 callpeak -t ChIP.bam \
               -c Input.bam \
               -f BAM \
               -g hs \
               -n TF_peaks \
               --outdir peaks/ \
               -q 0.05

# For broad peaks (histone marks)
macs2 callpeak -t ChIP.bam \
               -c Input.bam \
               -f BAM \
               -g hs \
               -n Histone_peaks \
               --outdir peaks/ \
               --broad \
               --broad-cutoff 0.1
```

**Output Files:**
- `_peaks.narrowPeak` - Peak locations (TFs)
- `_peaks.broadPeak` - Broad regions (histones)
- `_summits.bed` - Peak summits
- `_model.r` - R script for visualization

#### Step 3: Peak Annotation

**Using ChIPseeker (R):**

```R
library(ChIPseeker)
library(TxDb.Hsapiens.UCSC.hg38.knownGene)

# Read peaks
peaks <- readPeakFile("TF_peaks_peaks.narrowPeak")

# Annotate peaks
peakAnno <- annotatePeak(peaks, 
                         tssRegion=c(-3000, 3000),
                         TxDb=TxDb.Hsapiens.UCSC.hg38.knownGene)

# Visualize annotation
plotAnnoPie(peakAnno)
plotDistToTSS(peakAnno)

# Get peak-associated genes
peak_genes <- as.data.frame(peakAnno)
```

**Genomic Feature Distribution:**
```
Peak Distribution:
Promoter (30%)  ████████████
5' UTR (5%)     ██
3' UTR (10%)    ████
Exon (15%)      ██████
Intron (25%)    ██████████
Intergenic (15%) ██████
```

#### Step 4: Motif Analysis

**Using HOMER:**

```bash
# Find enriched motifs
findMotifsGenome.pl TF_peaks_peaks.narrowPeak \
                    hg38 \
                    motif_output/ \
                    -size 200 \
                    -mask

# Results include:
# - Known motif enrichment
# - De novo motif discovery
# - Motif locations
# - Comparison to databases
```

**Example Output:**
```
Top Enriched Motifs:
1. JUN-AP1  (p=1e-250) ████████████████████
2. FOS      (p=1e-180) ███████████████
3. ATF3     (p=1e-120) ████████████
```

### ChIP-seq Peak Visualization

**Example: Peak Profile at Target Gene**

```
Gene Structure:
TSS                                      TES
 ↓                                        ↓
 ═══════════════════════════════════════
 Exon1   Intron    Exon2   Intron   Exon3

Input DNA (Control):
 ═══════════════════════════════════════
 (Uniform coverage)

ChIP Signal:
        ████████████
        ↑
     Peak at Promoter
     (Transcription factor binding)

Coverage:
100 ┤       ▲
    │      ███
 50 ┤     █████
    │    ███████
  0 └────────────────────────────────
     TSS  +1kb  +2kb  +3kb  +4kb  TES
```

### Common ChIP-seq Targets

#### Transcription Factors

**Examples:**
- **p53:** Tumor suppressor, DNA damage response
- **NF-κB:** Immune response, inflammation
- **STAT3:** Cell signaling, cancer
- **CTCF:** Chromatin architecture, insulator

**Peak Characteristics:**
- Sharp, narrow peaks
- Usually at promoters/enhancers
- High enrichment over background
- Specific sequence motifs

#### Histone Modifications

**Active Marks:**

| Mark | Location | Function |
|------|----------|----------|
| **H3K4me3** | Promoters | Active transcription start |
| **H3K27ac** | Enhancers/Promoters | Active regulatory elements |
| **H3K36me3** | Gene bodies | Active transcription |
| **H3K4me1** | Enhancers | Primed/active enhancers |

**Repressive Marks:**

| Mark | Location | Function |
|------|----------|----------|
| **H3K27me3** | Large domains | Polycomb repression |
| **H3K9me3** | Heterochromatin | Constitutive silencing |

**Peak Characteristics:**
- Broad domains (especially repressive marks)
- Can span kilobases
- Lower fold-enrichment than TFs

### Critical Controls

#### 1. Input DNA Control

**Purpose:**
- Account for sequencing bias
- GC content bias
- Mappability issues
- Background signal

**Requirement:**
- ESSENTIAL for all ChIP-seq
- Sequence to same depth as IP

#### 2. IgG Control

**Purpose:**
- Non-specific antibody binding
- Bead binding artifacts
- Chromatin accessibility bias

**Use:**
- Secondary control
- Quality assessment
- Less commonly used than Input

#### 3. Biological Replicates

**Recommendations:**
- Minimum: 2 biological replicates
- Ideal: 3-4 replicates
- Improves statistical power
- Required for publication

### Quality Metrics

#### Fraction of Reads in Peaks (FRiP)

```
FRiP = (Reads in Peaks) / (Total Aligned Reads)

Good Quality:
• Transcription factors: FRiP > 5%
• Histone marks: FRiP > 10%
```

#### Cross-Correlation (Phantompeakqualtools)

**Metrics:**
- NSC (Normalized Strand Coefficient): >1.05
- RSC (Relative Strand Coefficient): >0.8

#### Library Complexity

**Non-Redundant Fraction (NRF):**
```
NRF = Unique Reads / Total Reads

Good: NRF > 0.8
Acceptable: NRF 0.6-0.8
Poor: NRF < 0.6
```

### Applications

#### 1. Transcription Factor Binding Sites

**Example Study:**
```
Research Question: Where does p53 bind in response to DNA damage?

Experiment:
• Cells: Untreated vs. DNA damage (doxorubicin)
• ChIP: anti-p53 antibody
• Result: 5,234 p53 binding sites identified

Findings:
• Enrichment at known p53 target genes (CDKN1A, BBC3)
• Novel binding sites discovered
• p53 motif highly enriched
• Association with DNA repair genes
```

#### 2. Histone Modification Mapping

**Active Promoter Analysis:**
```
Combined ChIP-seq:
H3K4me3 (promoter mark)
    +
H3K27ac (active mark)
    =
Active promoters identified

Integration with RNA-seq:
• Validate active transcription
• Correlate marks with expression
• Identify poised promoters
```

#### 3. Enhancer Discovery

**Strategy:**
```
H3K4me1 peaks
    ∩
H3K27ac peaks
    −
H3K4me3 peaks
    =
Active Enhancers

Example Results:
• 45,000 enhancer regions
• Tissue-specific activity
• Disease-associated SNPs enriched
• Super-enhancers at key genes
```

#### 4. Chromatin Accessibility

**DNase-seq / ATAC-seq Complement:**
- ChIP-seq: Specific proteins
- ATAC-seq: Open chromatin
- Integration reveals regulatory landscape

### Antibody Validation

**CRITICAL IMPORTANCE:**

Poor antibody = Unreliable results

**Validation Methods:**

1. **Western Blot:**
   - Single band at correct size
   - Specific to target protein

2. **Knockout/Knockdown:**
   - No signal in KO cells
   - Reduced signal in KD cells

3. **Positive/Negative Controls:**
   - Known binding sites (positive)
   - Non-binding regions (negative)

4. **Multiple Antibodies:**
   - Test multiple antibodies to same target
   - Concordant results

**Resources:**
- Antibody validation databases
- Published validation studies
- Manufacturer data (critical review needed)

### Troubleshooting Common Issues

| Problem | Possible Cause | Solution |
|---------|---------------|----------|
| **No peaks** | Poor antibody | Validate antibody |
|  | Low enrichment | Optimize IP conditions |
|  | Wrong peak caller | Try different parameters |
| **Too many peaks** | Non-specific antibody | Stricter filtering |
|  | Contamination | Check controls |
| **Uneven coverage** | PCR bias | Reduce PCR cycles |
|  | GC bias | Use specialized aligners |
| **Low FRiP** | Poor enrichment | Optimize protocol |
|  | High background | Improve washing |

---

## 6. ATAC-seq

### Overview

ATAC-seq (Assay for Transposase-Accessible Chromatin using sequencing) is a technique for assessing genome-wide chromatin accessibility. It identifies open chromatin regions that are accessible to transcription factors and regulatory proteins.

### Key Specifications

| Feature | Specification |
|---------|--------------|
| **Cell Input** | 500-50,000 cells |
| **Protocol Time** | ~3 hours |
| **Read Depth** | 50 million paired-end reads |
| **Fragment Sizes** | ~50 bp (nucleosome-free), ~200 bp (mono-nucleosome) |
| **Library Prep** | Simplified (no IP required) |
| **Applications** | Chromatin accessibility, TF footprinting, nucleosome positioning |

### ATAC-seq Advantages

#### Technical Benefits

✅ **Fast Protocol:** ~3 hours vs. days for ChIP-seq
✅ **Low Cell Input:** 500-50,000 cells vs. millions for DNase-seq
✅ **No Antibodies:** Enzyme-based, no IP needed
✅ **Less Hands-On:** Simpler workflow, fewer steps
✅ **Integrated Information:** Chromatin accessibility + nucleosome positioning

#### Biological Insights

✅ **Nucleosome Positioning:** Fragment size distribution reveals nucleosome organization
✅ **TF Footprinting:** Infer bound transcription factors from protection patterns
✅ **Regulatory Landscape:** Map all accessible regulatory elements genome-wide
✅ **Gene Activity Prediction:** Open chromatin correlates with active genes

### Detailed Workflow

#### Step 1: Cell Preparation & Lysis

```
Fresh or Frozen Cells
(500-50,000 cells)
         ↓
    Cold Lysis Buffer
   (IGEPAL CA-630)
    5 min on ice
         ↓
   Isolated Nuclei
  (Pellet, remove cytoplasm)
         ↓
Nuclear membrane permeabilized
Chromatin integrity maintained
```

**Critical Points:**
- Gentle lysis preserves chromatin structure
- Remove cytoplasm completely
- Wash nuclei to remove debris
- Keep cold (4°C) throughout

#### Step 2: Transposition Reaction

```
Purified Nuclei
      ↓
Add Tn5 Transposase
(loaded with adapters)
      ↓
Incubate 37°C, 30 min
      ↓
Tagmentation
(Fragmentation + Adapter addition)
```

**Tn5 Transposase:**
- Hyperactive mutant enzyme
- Pre-loaded with sequencing adapters
- Simultaneously:
  1. Fragments accessible DNA
  2. Inserts adapters at cut sites

**Reaction:**
```
Accessible Chromatin:
Open region ════════════ (accessible to Tn5)

Tn5 inserts here ↓
════[Adapter]════════[Adapter]════

Closed Chromatin:
Nucleosome ●●●●●●●● (protected from Tn5)

Tn5 cannot access ✗
```

#### Step 3: DNA Purification

```
Tagmented DNA
      ↓
MinElute Purification
(Column-based)
      ↓
Remove:
• Enzymes
• Proteins
• Buffers
• Debris
      ↓
Purified Tagged DNA
```

#### Step 4: PCR Amplification

```
Purified DNA
      ↓
Limited PCR (5-12 cycles)
• Add i5/i7 indices
• Amplify library
      ↓
Amplified Library
      ↓
Size Selection
(SPRI beads)
      ↓
Final Library
```

**PCR Cycle Optimization:**

| Cell Input | Recommended Cycles |
|-----------|-------------------|
| 50,000 cells | 5 cycles |
| 25,000 cells | 6-7 cycles |
| 10,000 cells | 8-9 cycles |
| 5,000 cells | 10-11 cycles |
| 500 cells | 12-13 cycles |

⚠️ **Over-amplification** causes bias and artifacts

#### Step 5: Library QC & Sequencing

**Quality Control:**
```
Bioanalyzer/TapeStation:

Expected Size Distribution:
         NFR peak
           (~100 bp)
            ▲
      ▲    ███    ▲
     ███  █████  ███
    █████████████████
    ↑    ↑    ↑    ↑
   <100 100  200  400
         ↑
    Nucleosome-free
    fragments
```

**Sequencing:**
- Platform: Illumina
- Read type: Paired-end
- Read length: 2×50 or 2×75 bp
- Depth: 50 million read pairs per sample

### Chromatin Accessibility

#### Open vs. Closed Chromatin

**Closed Chromatin (Inaccessible):**
```
Nucleosomes (tightly packed):
●●●●●●●●●●●●●●
DNA wrapped around histones
Tn5 cannot access ✗
Transcriptionally inactive
```

**Open Chromatin (Accessible):**
```
Nucleosome-depleted region:
═══════════════════
DNA accessible
Tn5 inserts adapters ✓
Active regulatory elements
Transcription factor binding sites
```

**Key Concept:**
ATAC-seq exploits differential chromatin accessibility. Tn5 transposase only inserts into DNA regions not wrapped around histones, creating a map of regulatory regions.

### Data Analysis Pipeline

#### Step 1: Alignment

```bash
# Align with Bowtie2
bowtie2 -X 2000 \
        --very-sensitive \
        -x genome_index \
        -1 sample_R1.fastq.gz \
        -2 sample_R2.fastq.gz |
        samtools sort -o aligned.bam

# Remove duplicates
picard MarkDuplicates \
  I=aligned.bam \
  O=dedup.bam \
  M=metrics.txt \
  REMOVE_DUPLICATES=true

# Filter
samtools view -b -q 30 -F 1804 dedup.bam > filtered.bam
samtools index filtered.bam
```

**Filtering:**
- MAPQ ≥ 30 (uniquely mapped)
- Remove duplicates
- Remove unmapped, mate unmapped, secondary alignments
- Remove reads mapping to mitochondria

#### Step 2: Peak Calling

**Using MACS2:**

```bash
macs2 callpeak -t filtered.bam \
               -f BAMPE \
               -g hs \
               -n sample_peaks \
               --shift -75 \
               --extsize 150 \
               --nomodel \
               -B \
               --SPMR \
               --keep-dup all \
               -q 0.05
```

**Expected Peak Numbers:**
- Human cells: 50,000-150,000 peaks
- Mouse cells: 40,000-120,000 peaks

#### Step 3: Peak Annotation

```bash
# Using ChIPseeker or HOMER
annotatePeaks.pl sample_peaks_peaks.narrowPeak \
                 hg38 \
                 -gtf genes.gtf \
                 > annotated_peaks.txt
```

**Typical Distribution:**
```
Peak Annotation:
Promoter-TSS (±1kb):  25% ██████████
5' UTR:                3% ██
3' UTR:                5% ███
Exon:                  8% ████
Intron:               35% ██████████████
Intergenic:           24% ██████████
```

#### Step 4: Motif Analysis

```bash
# Find TF motifs in peaks
findMotifsGenome.pl sample_peaks_peaks.narrowPeak \
                    hg38 \
                    motif_output/ \
                    -size 200 \
                    -mask
```

**Identifies:**
- Known transcription factor binding motifs
- De novo motif discovery
- Enriched regulatory sequences
- Transcription factor families active in sample

### Transcription Factor Footprinting

#### Footprinting Principle

```
TF Binding Protection from Tn5

Accessible Region:
════════════════════════════

Without TF:
High Tn5 ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼

With TF Bound:
High ▼▼▼▼ (Protected) ▼▼▼▼ High
      ████ TF Protein ████
         No Tn5 cuts
      ↑
   Footprint
```

**Footprint Analysis:**
```
Coverage Profile:
  ▲
  │  ██          ██
  │ ████        ████
  │ ████  TF   ████
  │ ████  ▼▼   ████
  └──────────────────►
    -100  0  +100
        Position

Dip at TF binding site = Footprint
```

**Applications:**
- Identify bound transcription factors
- Cell type identification
- Regulatory network reconstruction
- Predict active TF motifs

**Tools:**
- HINT-ATAC
- TOBIAS
- PIQ
- Wellington

### Quality Control Metrics

#### 1. TSS Enrichment

**Definition:**
Enrichment of ATAC-seq signal at transcription start sites

```
TSS Enrichment:
Signal
  ▲
  │      ████
  │     ██████
  │    ████████
  │   ██████████
  │  ████████████
  └─────────────►
   -2kb TSS +2kb

TSS Enrichment Score:
Good: >7
Acceptable: 5-7
Poor: <5
```

**Calculation:**
```
TSS Enrichment = (Signal at TSS) / (Background Signal)
```

#### 2. FRiP Score

**Fraction of Reads in Peaks:**
```
FRiP = (Reads in Peaks) / (Total Mapped Reads)

Good: >0.3 (30%)
Acceptable: 0.2-0.3
Poor: <0.2
```

#### 3. Fragment Size Distribution

**Expected Pattern:**
```
Nucleosomal Pattern:

Count
  ▲
  │  ▲
  │ ███         ▲         ▲
  │████    ▲   ███   ▲   ███
  │████   ███  ███  ███  ███
  └─────────────────────────►
    <100  200  400  600  800
     ↑     ↑    ↑    ↑    ↑
    NFR  Mono  Di  Tri  Quad
         nucleosome

NFR: Nucleosome-free regions
Mono: Mononucleosome
Di/Tri: Di/Tri-nucleosomes
```

**Good Quality:**
- Clear peak at ~50-100 bp (NFR)
- Clear periodicity at ~200 bp intervals
- Mono-nucleosome peak visible

#### 4. Mapping Statistics

| Metric | Target |
|--------|--------|
| Alignment rate | >95% |
| Duplicate rate | <20% |
| Mitochondrial reads | <10% |
| Properly paired | >90% |

### Differential Accessibility Analysis

**Using DESeq2:**

```R
library(DESeq2)
library(DiffBind)

# Load peak counts
samples <- read.csv("sample_sheet.csv")
dba <- dba(sampleSheet=samples)

# Count reads in peaks
dba <- dba.count(dba)

# Differential accessibility
dba <- dba.contrast(dba, categories=DBA_CONDITION)
dba <- dba.analyze(dba)

# Get results
results <- dba.report(dba, th=0.05)

# Visualize
dba.plotMA(dba)
dba.plotVolcano(dba)
```

**Output:**
```
Differential Accessible Regions:
Total peaks: 75,234
Gained accessibility: 3,452 regions
Lost accessibility: 2,876 regions

Top gained regions:
chr1:123456-124567 (log2FC=4.2, FDR=1e-45)
chr5:678910-679012 (log2FC=3.8, FDR=3e-38)
```

### Applications & Examples

#### 1. Development & Differentiation

**Example: Hematopoiesis**
```
Study: Track chromatin changes during blood cell differentiation

Samples:
• Hematopoietic stem cells (HSC)
• Myeloid progenitors
• Mature neutrophils

Results:
• 15,000 stage-specific accessible regions
• Lineage-specific TF motifs enriched
• Identify key regulatory transitions
• Map enhancer activation timeline
```

#### 2. Cancer Research

**Example: Tumor Heterogeneity**
```
Study: Chromatin accessibility in cancer vs. normal

Samples:
• Normal breast tissue
• ER+ breast cancer
• Triple-negative breast cancer

Findings:
• Cancer-specific open chromatin regions
• Oncogenic TF binding sites
• Altered enhancer landscape
• Drug resistance mechanisms
```

#### 3. Single-Cell ATAC-seq

**scATAC-seq:**
- Profile chromatin accessibility in thousands of individual cells
- Identify cell types based on regulatory landscape
- Trajectory inference
- Rare cell population discovery

**Applications:**
```
Cell Type Identification:
• Cluster cells by accessibility patterns
• Identify cell type-specific regulators
• Map developmental trajectories
• Discover rare cell types

Example Results:
• 10,000 cells profiled
• 15 distinct cell types
• Continuous differentiation trajectory
• Novel regulatory elements
```

#### 4. Disease Mechanisms

**GWAS Integration:**
```
Strategy:
GWAS SNPs
    ∩
ATAC-seq peaks
    =
Functional variants in regulatory regions

Example:
• Disease GWAS: Type 2 diabetes
• 85 SNPs in ATAC peaks
• Located in islet-specific enhancers
• Disrupt TF binding motifs
• Implicate novel diabetes genes
```

### ATAC-seq vs. Other Chromatin Profiling Methods

| Method | Target | Cell Input | Time | Key Advantage | Limitation |
|--------|--------|-----------|------|---------------|------------|
| **ATAC-seq** | Open chromatin | 500-50K | ~3h | Fast, low input, no antibodies | Cannot identify specific proteins |
| **ChIP-seq** | Specific proteins | 1-10M | 2-3 days | Protein-specific information | Requires antibodies, high input |
| **DNase-seq** | Open chromatin | 1-5M | 1-2 days | Gold standard for accessibility | Higher cell input, more complex |
| **FAIRE-seq** | Nucleosome-depleted | ~10M | 1 day | No specialized enzymes | Lower resolution, high input |
| **MNase-seq** | Nucleosome positioning | 1-10M | 1-2 days | Precise nucleosome mapping | Doesn't directly measure accessibility |

**Why ATAC-seq is Popular:**
- Low cell input (critical for rare samples)
- Fast protocol
- High data quality
- No antibodies needed
- Works with clinical samples

---

## 7. Metagenomics

### Overview

Metagenomics is the study of genetic material recovered directly from environmental samples, allowing analysis of entire microbial communities without culturing individual organisms.

### What is Metagenomics?

**Core Concept:**
```
Traditional Microbiology:
Single Species → Culture → Isolate → Study
❌ >99% microbes unculturable

Metagenomics:
Environmental Sample → Extract All DNA → Sequence → Analyze
✓ Culture-independent
✓ Entire community profiled
✓ Discover novel organisms
```

**Applications:**
- Study microbial communities in natural environment
- Analyze human microbiome
- Discover novel genes and enzymes
- Understand ecosystem function
- Track pathogen outbreaks

### Approaches

#### 16S rRNA Sequencing

**Target:** 16S ribosomal RNA gene (~1.5 kb)

**Process:**
```
Total DNA
    ↓
Amplify 16S rRNA gene
(Universal primers)
    ↓
PCR Product
(V3-V4 or V4 region)
    ↓
NGS Sequencing
    ↓
Taxonomic Classification
```

**Characteristics:**

| Feature | Specification |
|---------|--------------|
| **Target** | 16S rRNA gene only |
| **Coverage** | Bacteria and Archaea only (not viruses/eukaryotes) |
| **Resolution** | Genus level (sometimes species) |
| **Cost** | $50-150 per sample |
| **Data Size** | 10,000-50,000 reads per sample |
| **Analysis** | Relatively straightforward |

**Advantages:**
- ✅ Cost-effective
- ✅ Well-established databases
- ✅ Rapid analysis
- ✅ Standardized protocols
- ✅ Low computational requirements

**Limitations:**
- ❌ No functional information
- ❌ Limited taxonomic resolution
- ❌ PCR bias
- ❌ Doesn't detect viruses/eukaryotes
- ❌ Copy number variation affects quantification

**Workflow:**
```bash
# Quality filtering
fastp -i reads_R1.fastq.gz \
      -I reads_R2.fastq.gz \
      -o filtered_R1.fastq.gz \
      -O filtered_R2.fastq.gz

# QIIME2 analysis
qiime tools import \
  --type 'SampleData[PairedEndSequencesWithQuality]' \
  --input-path manifest.tsv \
  --output-path demux.qza

# Denoise with DADA2
qiime dada2 denoise-paired \
  --i-demultiplexed-seqs demux.qza \
  --p-trunc-len-f 250 \
  --p-trunc-len-r 250 \
  --o-table table.qza \
  --o-representative-sequences rep-seqs.qza

# Taxonomic classification
qiime feature-classifier classify-sklearn \
  --i-classifier silva-138-classifier.qza \
  --i-reads rep-seqs.qza \
  --o-classification taxonomy.qza

# Diversity analysis
qiime diversity core-metrics-phylogenetic \
  --i-table table.qza \
  --i-phylogeny rooted-tree.qza \
  --p-sampling-depth 1000 \
  --m-metadata-file metadata.tsv \
  --output-dir diversity
```

#### Shotgun Metagenomics

**Target:** Entire genome (all DNA)

**Process:**
```
Total DNA
    ↓
Random Fragmentation
    ↓
Library Preparation
    ↓
Whole Genome Sequencing
    ↓
Taxonomic + Functional Analysis
```

**Characteristics:**

| Feature | Specification |
|---------|--------------|
| **Target** | All genomic DNA |
| **Coverage** | All domains (Bacteria, Archaea, Eukarya, viruses) |
| **Resolution** | Species and strain level |
| **Cost** | $300-1000+ per sample |
| **Data Size** | 10-100 million reads per sample |
| **Analysis** | Computationally intensive |

**Advantages:**
- ✅ Functional profiling (genes, pathways)
- ✅ No PCR bias
- ✅ Novel gene discovery
- ✅ Higher taxonomic resolution
- ✅ Detects all organisms (viruses, eukaryotes)
- ✅ Antimicrobial resistance genes

**Limitations:**
- ❌ Expensive
- ❌ Requires more computational resources
- ❌ Complex analysis
- ❌ Host DNA contamination (for human samples)
- ❌ Larger file sizes

**Workflow:**
```bash
# Quality control
fastp -i sample_R1.fastq.gz \
      -I sample_R2.fastq.gz \
      -o qc_R1.fastq.gz \
      -O qc_R2.fastq.gz

# Remove host sequences
bowtie2 -x human_genome \
        -1 qc_R1.fastq.gz \
        -2 qc_R2.fastq.gz \
        --un-conc-gz nonhost_%.fastq.gz

# Taxonomic classification (Kraken2)
kraken2 --db kraken2_db \
        --paired \
        nonhost_1.fastq.gz nonhost_2.fastq.gz \
        --report report.txt \
        --output kraken_output.txt

# Functional profiling (HUMAnN3)
humann --input concat.fastq.gz \
       --output humann_output \
       --nucleotide-database chocophlan \
       --protein-database uniref \
       --threads 16

# Assembly-based analysis
megahit -1 nonhost_1.fastq.gz \
        -2 nonhost_2.fastq.gz \
        -o assembly_output

# Binning (separate genomes)
metabat2 -i contigs.fa \
         -a depth.txt \
         -o bins/bin
```

### Comparison: 16S vs. Shotgun

| Aspect | 16S rRNA | Shotgun Metagenomics |
|--------|----------|---------------------|
| **What's sequenced** | Single gene (16S) | All genes |
| **Organisms detected** | Bacteria, Archaea | All (incl. viruses, eukaryotes) |
| **Taxonomic resolution** | Genus | Species/Strain |
| **Functional info** | No | Yes (genes, pathways) |
| **Novel discovery** | Limited | High |
| **Cost** | $ | $$$ |
| **Analysis complexity** | Low | High |
| **Best for** | Quick taxonomic profiling | Comprehensive analysis |

### Metagenomic Analysis Workflow

#### Taxonomic Profiling

**Kraken2 (Fast k-mer based):**
```bash
kraken2 --db standard_db \
        --paired reads_1.fq reads_2.fq \
        --output kraken.out \
        --report kraken_report.txt

# Visualize with Krona
ktImportTaxonomy -q 2 -t 3 kraken.out -o krona.html
```

**MetaPhlAn4 (Marker gene based):**
```bash
metaphlan reads.fastq.gz \
          --input_type fastq \
          --nproc 8 \
          -o profile.txt
```

**Example Output:**
```
Taxonomic Profile:
Kingdom: Bacteria (95%)
├─ Phylum: Firmicutes (60%)
│  ├─ Class: Clostridia (45%)
│  │  ├─ Order: Clostridiales
│  │  │  └─ Family: Ruminococcaceae (25%)
│  │  └─ Species: Faecalibacterium prausnitzii (15%)
├─ Phylum: Bacteroidetes (30%)
│  └─ Class: Bacteroidia
│     └─ Species: Bacteroides fragilis (20%)
└─ Phylum: Proteobacteria (5%)
```

#### Functional Profiling

**HUMAnN3 (Metabolic pathways):**
```bash
humann --input sample.fastq \
       --output humann_output \
       --threads 16

# Normalize
humann_renorm_table \
  --input genefamilies.tsv \
  --output genefamilies_cpm.tsv \
  --units cpm

# Pathway abundance
humann_regroup_table \
  --input genefamilies.tsv \
  --groups uniref90_ko \
  --output ko.tsv
```

**Output:**
```
Functional Capabilities:
Pathway: Glycolysis (PWY-5484)
  Abundance: 1,245 CPM
  Completeness: 95%

Pathway: Butyrate biosynthesis
  Abundance: 892 CPM
  Species: F. prausnitzii (major contributor)

Antimicrobial Resistance:
  Beta-lactamase genes: 3 variants detected
  Tetracycline resistance: 2 genes
```

### Applications & Examples

#### 1. Clinical Microbiome Studies

**Gut Microbiome & Disease:**
```
Study: IBD (Inflammatory Bowel Disease) vs. Healthy

Methods: Shotgun metagenomics
Samples: Stool (n=100 IBD, n=100 healthy)

Results:
Dysbiosis in IBD:
• Decreased: Faecalibacterium prausnitzii (-70%)
• Increased: Escherichia coli (+300%)
• Reduced diversity (Shannon index: 2.1 vs. 3.5)
• Altered metabolic functions:
  - Decreased butyrate production
  - Increased inflammatory pathways

Clinical Impact:
• Biomarker for disease severity
• Probiotic therapy targets
• Diet intervention strategies
```

**Example Applications:**
- Obesity and metabolic syndrome
- Diabetes
- Mental health (gut-brain axis)
- Cardiovascular disease
- Cancer (tumor microbiome)

#### 2. Environmental Ecology

**Ocean Metagenomics:**
```
Discovery: Pelagibacter ubique
• Most abundant marine bacterium
• 25% of ocean microbial cells
• Novel photosynthetic proteins (proteorhodopsins)
• Global carbon cycling impact

Methods:
• Shotgun metagenomics of seawater
• Assembly and binning
• Comparative genomics
```

**Soil Metagenomics:**
```
Applications:
• Antibiotic resistance gene reservoir
• Agricultural microbiome optimization
• Bioremediation potential
• Climate change impacts

Example Findings:
• 1000s of antibiotic resistance genes in pristine soil
• Novel cellulase enzymes for biofuel
• Nitrogen-fixing bacterial diversity
```

#### 3. Industrial Biotechnology

**Enzyme Discovery:**
```
Application: Biofuel production

Approach:
Metagenomic screening
    ↓
Compost/hot spring samples
    ↓
Shotgun sequencing
    ↓
Functional screening

Discoveries:
• Thermostable cellulases
• Novel laccases
• Xylanases for biomass degradation

Impact:
• Improved biofuel efficiency
• Textile processing enzymes
• Industrial applications
```

**Other Applications:**
- Biomining (metal extraction)
- Bioremediation (pollution cleanup)
- Food fermentation optimization
- Probiotic development

#### 4. Pathogen Detection & Surveillance

**Outbreak Investigation:**
```
Example: Novel pathogen detection

Case: Undiagnosed infection
Traditional testing: Negative

Metagenomic NGS (mNGS):
• Unbiased sequencing of all DNA/RNA
• No prior knowledge needed

Result:
Novel coronavirus detected
• 1,237 reads mapped
• 12.4% genome coverage
• Rapid identification (<48h)

Impact:
• Correct diagnosis
• Appropriate treatment
• Outbreak control
```

**Wastewater Surveillance:**
```
Application: COVID-19 monitoring

Methods:
• Weekly wastewater sampling
• RNA extraction + sequencing
• Variant tracking

Benefits:
• Population-level surveillance
• Early outbreak detection
• Variant emergence tracking
• No individual testing needed
```

#### 5. Agriculture & Food Science

**Soil Microbiome:**
```
Goal: Optimize crop productivity

Analysis:
• Rhizosphere metagenomics
• Nitrogen-fixing bacteria
• Plant growth-promoting microbes

Applications:
• Bio-fertilizer development
• Disease suppression
• Drought tolerance
```

**Fermented Foods:**
```
Study: Cheese microbiome

Findings:
• Lactobacillus species diversity
• Flavor compound production genes
• Quality control markers
• Starter culture optimization
```

### Bioinformatic Tools

#### Taxonomic Classification

**Kraken2:**
- Ultra-fast k-mer matching
- Processes millions of reads in minutes
- High accuracy

**MetaPhlAn4:**
- Clade-specific marker genes
- Species-level resolution
- Strain tracking

**QIIME2:**
- Comprehensive 16S analysis platform
- Diversity metrics
- Statistical testing
- Visualization

#### Functional Profiling

**HUMAnN3:**
- Metabolic pathway reconstruction
- Gene family profiling
- Species-stratified functions

**DIAMOND:**
- Fast protein alignment
- Functional annotation
- 20,000× faster than BLASTX

#### Assembly & Binning

**MEGAHIT:**
- Memory-efficient assembler
- Fast de novo assembly
- Handles complex communities

**metaSPAdes:**
- Specialized for metagenomes
- Better assembly quality
- Handles uneven coverage

**CheckM2:**
- Genome quality assessment
- Completeness and contamination
- Taxonomic assignment

**GTDB-Tk:**
- Taxonomic classification of MAGs
- Based on Genome Taxonomy Database
- Phylogenetic placement

### Key Concepts & Terminology

**Alpha Diversity:**
- Diversity within a single sample
- Metrics: Shannon index, Simpson index, Richness

```
Sample A: ████████ (8 species, even) → High diversity
Sample B: ██ (2 species, uneven) → Low diversity
```

**Beta Diversity:**
- Diversity between samples
- Compositional differences

```
Sample 1: A, B, C, D
Sample 2: A, B, E, F
Beta diversity: 50% different
```

**Operational Taxonomic Unit (OTU):**
- Cluster of similar sequences
- Typically 97% identity for 16S
- Proxy for species

**Amplicon Sequence Variant (ASV):**
- Unique exact sequence
- Higher resolution than OTUs
- No arbitrary threshold

**Metagenome-Assembled Genome (MAG):**
- Reconstructed genome from metagenomic assembly
- Binning separates genomes
- Quality assessed by completeness/contamination

**Read Depth:**
- Number of sequencing reads
- Higher depth → better detection of rare organisms

### Current Challenges

#### Computational Challenges

❌ **Massive Data Volumes:**
- 100+ GB per sample common
- High memory requirements
- Long processing times
- Need specialized infrastructure

❌ **Complex Analysis:**
- Multiple analysis steps
- Parameter optimization
- Tool selection critical
- Expertise required

#### Biological Challenges

❌ **Unknown Organisms:**
- >50% sequences unclassified
- Novel organisms lack references
- Function prediction difficult

❌ **Incomplete Databases:**
- Cultured organisms <1% of total
- Reference bias
- Missing metabolic pathways

❌ **Horizontal Gene Transfer:**
- Genes move between species
- Complicates taxonomic assignment
- Functional annotation challenging

#### Technical Challenges

❌ **DNA Extraction Bias:**
- Different organisms lyse differently
- Gram-positive harder to lyse
- Affects community representation

❌ **Host Contamination:**
- Human samples: 90-99% human DNA
- Reduces microbial sequencing depth
- Host depletion needed

❌ **Short Reads:**
- Difficult assembly
- Repetitive regions
- Genome reconstruction incomplete

#### Analytical Challenges

❌ **Batch Effects:**
- Different extraction methods
- Sequencing platform differences
- Temporal variation
- Standardization needed

❌ **Causation vs. Correlation:**
- Association doesn't prove causation
- Confounding factors
- Functional validation needed

### Future Directions

**Long-Read Metagen omics:**
- PacBio HiFi / Oxford Nanopore
- Complete genome assembly
- Resolve repeats and structural variants
- Full-length 16S sequences

**Single-Cell Genomics:**
- Combine with metagenomics
- Link taxonomy to function
- Rare organism characterization

**Multi-Omics Integration:**
- Metagenomics + Metatranscriptomics
- + Metaproteomics
- + Metabolomics
- Comprehensive functional understanding

**Machine Learning:**
- Pattern recognition
- Predictive modeling
- Disease classification
- Novel organism discovery

**Real-Time Monitoring:**
- Portable sequencers (MinION)
- Point-of-care testing
- Environmental monitoring
- Outbreak response

---

## 8. Clinical Sequencing

### Overview

Clinical sequencing applies NGS technologies to patient care for diagnosis, treatment selection, and disease monitoring. It represents the translation of genomics from research to medical practice.

### Clinical NGS Applications

#### 1. Diagnosis of Rare Genetic Diseases

**Overview:**
- Patients with suspected genetic disorders
- Failed standard diagnostic testing
- Unknown etiology

**Approach:**
```
Patient with unexplained symptoms
         ↓
Clinical evaluation
         ↓
Standard genetic tests (negative)
         ↓
Whole Exome/Genome Sequencing
         ↓
Variant analysis & interpretation
         ↓
Molecular diagnosis
```

**Success Rates:**
- WES diagnostic yield: 25-50%
- WGS diagnostic yield: 30-60%
- Trio sequencing (higher yield): 40-60%

**Example Case:**
```
Patient: 6-year-old boy
Presentation:
• Developmental delay
• Intellectual disability
• Seizures
• Dysmorphic features

Previous Testing:
• Karyotype: Normal
• Chromosomal microarray: Negative
• Targeted gene panels: Negative

WES Result:
Gene: SCN1A
Variant: c.3199G>A (p.Glu1067Lys)
Inheritance: De novo (not in parents)
Classification: Pathogenic

Diagnosis: Dravet syndrome (SCN1A-related epilepsy)

Impact:
• End of 4-year diagnostic odyssey
• Genetic counseling provided
• Treatment plan optimized
• Avoid contraindicated medications (Na+ channel blockers)
• Prognosis established
• Family planning guidance
```

#### 2. Cancer Precision Medicine

**Tumor Profiling:**
```
Cancer Patient
      ↓
Tumor Biopsy
      ↓
DNA/RNA Extraction
      ↓
Targeted Panel / WES / WGS
      ↓
Somatic Mutation Analysis
      ↓
Actionable Alterations Identified
      ↓
Targeted Therapy Selection
```

**Example: Lung Cancer**
```
Patient: 58-year-old, Stage IV NSCLC
Standard chemotherapy: Failed

Comprehensive Genomic Profiling:
Panel: 468 cancer genes

Findings:
1. EGFR exon 19 deletion (c.2235_2249del)
   → Actionable: FDA-approved EGFR TKI
   → Evidence Level: 1A (NCCN)
   → Treatment: Osimertinib

2. PD-L1 TPS: 60%
   → Eligible: Pembrolizumab

3. TMB: 15.2 mut/Mb (TMB-High)
   → Potential: Immunotherapy benefit

Treatment Decision:
• First-line: Osimertinib (EGFR TKI)
• Monitor: Serial ctDNA for T790M resistance
• Second-line option: Immunotherapy

Outcome:
• Partial response (tumor reduction 65%)
• Progression-free survival: 18 months
• Quality of life maintained
```

**Actionable Variants by Cancer:**

| Cancer Type | Common Targets |
|-------------|---------------|
| **Lung (NSCLC)** | EGFR, ALK, ROS1, BRAF, MET, KRAS G12C |
| **Breast** | HER2, PIK3CA, ESR1, BRCA1/2 |
| **Colorectal** | KRAS, NRAS, BRAF V600E, MSI-H |
| **Melanoma** | BRAF V600E/K, NRAS, KIT |
| **Ovarian** | BRCA1/2, HRD score |

#### 3. Pharmacogenomics

**Drug Response Prediction:**
```
Patient starting medication
         ↓
Pharmacogenomic testing
         ↓
Genotype key drug metabolism genes
         ↓
Predict drug response/toxicity
         ↓
Personalized dosing & drug selection
```

**Example: Antidepressant Selection**
```
Patient: 45-year-old woman with depression

PGx Panel Results:
CYP2D6: *4/*4 (Poor Metabolizer)
CYP2C19: *1/*17 (Rapid Metabolizer)
CYP2C9: *1/*1 (Normal Metabolizer)
SLCO1B1: *1/*1 (Normal Function)

Drug Recommendations:

✗ AVOID:
• Codeine → No analgesic effect (prodrug not activated)
• Tramadol → Reduced efficacy

⚠ REDUCE DOSE:
• Metoprolol → 75% dose reduction (cardiac)
• Nortriptyline → 50% of standard dose
• Paroxetine → 50% reduction

✓ STANDARD DOSE:
• Citalopram ← Selected
• Venlafaxine
• Sertraline

Selected: Citalopram at standard dose
Avoided: Paroxetine (would require dose reduction)
```

**Key Pharmacogenes:**

| Gene | Drugs Affected | Impact |
|------|---------------|--------|
| **CYP2D6** | Codeine, tramadol, metoprolol, tamoxifen | Metabolism variation (Poor to Ultra-rapid) |
| **CYP2C19** | Clopidogrel, PPIs, SSRIs | Activation/metabolism |
| **CYP2C9** | Warfarin, phenytoin, NSAIDs | Dose requirements |
| **TPMT** | Azathioprine, mercaptopurine | Toxicity risk |
| **SLCO1B1** | Statins | Myopyopathy risk |
| **DPYD** | 5-FU, capecitabine | Severe toxicity risk |

**Clinical Impact:**
- ~95% of people have actionable PGx variant
- ~30% reduction in adverse drug reactions
- 270+ FDA drug labels mention PGx
- Growing insurance coverage

#### 4. Prenatal & Newborn Screening

**Non-Invasive Prenatal Testing (NIPT):**
```
Pregnant woman (≥10 weeks)
         ↓
Maternal blood sample
         ↓
Cell-free fetal DNA (cffDNA)
         ↓
Shallow WGS (~0.1×)
         ↓
Copy number analysis
         ↓
Aneuploidy detection
```

**Timeline:**
```
10+ weeks: NIPT (cfDNA)
11-14 weeks: CVS (diagnostic)
15-20 weeks: Amniocentesis
24-48h after birth: Newborn screening
```

**NIPT Detection:**

| Condition | Detection Rate | False Positive Rate |
|-----------|---------------|-------------------|
| **Trisomy 21** (Down) | 99%+ | <0.1% |
| **Trisomy 18** (Edwards) | 97%+ | <0.1% |
| **Trisomy 13** (Patau) | 91%+ | <0.1% |
| **Sex chromosome** | 90-95% | ~0.5% |

**Newborn Screening (NBS):**
```
Newborn (24-48h old)
         ↓
Heel stick blood sample
         ↓
Biochemical + Genetic testing
         ↓
Screen for treatable conditions
         ↓
Early intervention if positive
```

**US Recommended Core Panel:** 35 conditions
- Organic acid disorders
- Fatty acid oxidation defects
- Amino acid disorders
- Hemoglobinopathies
- Endocrine disorders
- Others (CF, SCID, etc.)

**Example:**
```
Newborn: 48 hours old
Screen: State mandated panel

Positive Result:
Elevated C8 acylcarnitine

Diagnosis:
MCADD (Medium-chain acyl-CoA dehydrogenase deficiency)

Genetic Confirmation:
ACADM gene variants identified

Treatment Initiated:
• Avoid fasting
• High-carbohydrate diet
• Emergency protocol established

Impact:
Prevention of potentially fatal metabolic crisis
Normal development with proper management
```

#### 5. Infectious Disease Identification

**Metagenomic NGS (mNGS):**
```
Patient with undiagnosed infection
         ↓
Clinical sample (CSF, blood, BAL)
         ↓
Total nucleic acid extraction
         ↓
Unbiased sequencing (all DNA/RNA)
         ↓
Pathogen identification
         ↓
Targeted treatment
```

**Example: Encephalitis Case**
```
Patient: 14-year-old boy
Presentation:
• Altered consciousness
• Seizures
• Fever
• Encephalitis

Standard Testing:
• Bacterial cultures: Negative
• Viral PCR panel: Negative
• 1 week of empiric treatment

mNGS (CSF):
Sample: Cerebrospinal fluid
Turnaround: 48 hours

Results:
Pathogen: Balamuthia mandrillaris
Reads: 1,237 mapped
Genome coverage: 12.4%
Confidence: HIGH

Diagnosis: Rare amoebic encephalitis (GAE)

Treatment Change:
• Stop empiric antibiotics
• Start: Miltefosine + combination therapy
• Improved outcome

Impact:
Without mNGS: Likely fatal (>95% mortality)
With mNGS: Directed therapy, improved survival
```

**mNGS Report Example:**
```
=== Metagenomic NGS Report ===
Total reads: 28,456,891
Human reads: 28,442,108 (99.95%)
Non-human reads: 14,783 (0.05%)

PATHOGEN DETECTED:
Organism: Balamuthia mandrillaris
Kingdom: Amoebozoa
Reads mapped: 1,237
Genome coverage: 12.4%
Confidence: HIGH

Clinical Significance: PATHOGENIC
Causes: Granulomatous amoebic encephalitis (GAE)
Mortality: >95% if untreated

Other organisms: None significant
```

**Clinical Applications:**
- CNS infections (meningitis/encephalitis)
- Sepsis (culture-negative)
- Pneumonia (immunocompromised)
- Opportunistic infections
- Outbreak investigation

**Advantages:**
- ✓ Unbiased (no hypothesis needed)
- ✓ Detects novel/unexpected pathogens
- ✓ 24-48h turnaround
- ✓ Works when cultures fail
- ✓ Identifies co-infections
- ✓ Antimicrobial resistance genes

### Clinical Considerations

#### Quality Standards

**CLIA/CAP Certification:**
- Clinical Laboratory Improvement Amendments (CLIA)
- College of American Pathologists (CAP)
- Required for clinical testing
- Regular proficiency testing
- Quality control standards

**Quality Metrics:**

| Metric | Threshold |
|--------|-----------|
| **Coverage** | ≥30× for clinical WGS |
| **Mapping rate** | ≥95% |
| **Target coverage (WES)** | ≥95% at 20× |
| **Uniformity** | ≥80% bases within 0.2× mean |
| **Contamination** | <3% |

**Validated Pipelines:**
- Pre-analytical validation
- Analytical validation
- Clinical validation
- Ongoing quality monitoring

#### Variant Interpretation (ACMG Guidelines)

**ACMG/AMP Classification:**

```
Pathogenic (P)
• Disease-causing
• Clinical action recommended

Likely Pathogenic (LP)
• >90% certainty of pathogenicity
• Clinical action likely

Uncertain Significance (VUS)
• Insufficient evidence
• No clinical action

Likely Benign (LB)
• >90% certainty of benign
• No clinical action

Benign (B)
• Harmless variant
• No clinical action
```

**Evidence Types:**

**Pathogenic Evidence:**
- PVS1: Null variant (nonsense, frameshift) in LOF-intolerant gene
- PS1-4: Strong evidence (functional, segregation, de novo)
- PM1-6: Moderate evidence (missense, conservation)
- PP1-5: Supporting evidence (computational, frequency)

**Benign Evidence:**
- BA1: High allele frequency (>5%)
- BS1-4: Strong benign evidence
- BP1-7: Supporting benign evidence

**Example Classification:**
```
Variant: BRCA1 c.190G>T (p.Cys64Tyr)

Evidence:
PVS1: ✗ (not null variant)
PS3:  ✓ (Functional studies show LOF)
PM1:  ✓ (Critical functional domain)
PM2:  ✓ (Absent in population databases)
PP3:  ✓ (Multiple lines computational evidence)
PP5:  ✓ (Published as pathogenic)

Classification: PATHOGENIC
Criteria met: PS3, PM1, PM2, PP3, PP5
```

#### Actionable Findings

**Primary Findings:**
- Related to indication for testing
- Reported to ordering physician
- Clinical action appropriate

**Secondary Findings:**
- Incidental pathogenic variants
- ACMG recommends reporting 73 genes
- Medically actionable
- Patient can opt-out

**ACMG SF v3.1 Genes (73 genes):**
- Hereditary cancer (BRCA1/2, Lynch, etc.)
- Cardiovascular (FBN1, MYH7, KCNQ1, etc.)
- Familial hypercholesterolemia
- Malignant hyperthermia
- Others

#### Informed Consent

**Essential Elements:**
- Purpose of testing
- What will be tested
- Possible results
- Limitations
- Secondary findings policy
- Data storage and privacy
- Research use
- Cost and insurance

**Considerations:**
- Right not to know
- Family implications
- Psychologicalimpact
- Genetic discrimination concerns
- Re-analysis options

#### Genetic Counseling

**Pre-Test Counseling:**
- Family history
- Test selection
- Expectations
- Consent process

**Post-Test Counseling:**
- Result explanation
- Medical implications
- Family testing recommendations
- Psychological support
- Resource referrals

**Essential for:**
- Pathogenic/likely pathogenic findings
- VUS results (education)
- Secondary findings
- Family cascade testing

#### Reimbursement

**Insurance Coverage:**
- Medical necessity criteria
- Prior authorization often required
- CPT codes for billing
- Coverage varies by insurer

**Common CPT Codes:**
- 81415: Exome sequence analysis
- 81425: Genome sequence analysis
- 81445: Targeted cancer panel (51+ genes)
- 81455: Pharmacogenomic panel

**Considerations:**
- Out-of-pocket costs
- Financial assistance programs
- Cost-effectiveness data
- Policy changes over time

### Multidisciplinary Team

**Essential Members:**

**Clinician:**
- Orders test
- Clinical correlation
- Treatment decisions

**Genetic Counselor:**
- Pre/post-test counseling
- Pedigree analysis
- Family communication

**Laboratory Director:**
- Oversees testing
- Quality assurance
- Result validation

**Bioinformatician:**
- Pipeline management
- Variant calling
- Quality metrics

**Variant Scientist:**
- Variant interpretation
- Literature review
- Database curation

**Pathologist:**
- Tumor analysis
- Sample quality
- Result integration

---

# Hands-on Tutorials

## Hands-on: NGS Pipeline

### Standard NGS Analysis Pipeline

A typical NGS analysis workflow involves multiple steps from raw sequencing reads to filtered variant calls. Here's a comprehensive command-line pipeline:

```bash
# ============================================
# STEP 1: QUALITY CONTROL
# ============================================

# Run FastQC on raw reads
fastqc sample_R1.fastq.gz sample_R2.fastq.gz \
  -o fastqc_output/

# Aggregate QC reports with MultiQC
multiqc fastqc_output/ \
  -o multiqc_report/

# ============================================
# STEP 2: READ ALIGNMENT
# ============================================

# Align paired-end reads to reference genome
bwa mem -t 8 \
  -M \
  -R '@RG\tID:sample\tSM:sample\tPL:ILLUMINA' \
  reference.fa \
  sample_R1.fastq.gz \
  sample_R2.fastq.gz \
  > sample.sam

# Alternative: Align with read group info included
# Important for GATK downstream analysis

# ============================================
# STEP 3: SAM TO BAM CONVERSION & SORTING
# ============================================

# Convert SAM to BAM
samtools view -bS sample.sam > sample.bam

# Sort BAM by coordinate
samtools sort sample.bam -o sample.sorted.bam

# Index sorted BAM
samtools index sample.sorted.bam

# Clean up intermediate files
rm sample.sam sample.bam

# ============================================
# STEP 4: MARK DUPLICATES
# ============================================

# Mark PCR/optical duplicates
gatk MarkDuplicates \
  -I sample.sorted.bam \
  -O sample.dedup.bam \
  -M duplicate_metrics.txt \
  --CREATE_INDEX true

# Review metrics
cat duplicate_metrics.txt

# ============================================
# STEP 5: BASE QUALITY SCORE RECALIBRATION (BQSR)
# ============================================

# Build recalibration model
gatk BaseRecalibrator \
  -R reference.fa \
  -I sample.dedup.bam \
  --known-sites dbSNP.vcf \
  --known-sites known_indels.vcf \
  -O recal_data.table

# Apply recalibration
gatk ApplyBQSR \
  -R reference.fa \
  -I sample.dedup.bam \
  --bqsr-recal-file recal_data.table \
  -O sample.recal.bam

# ============================================
# STEP 6: VARIANT CALLING
# ============================================

# Call variants with HaplotypeCaller
gatk HaplotypeCaller \
  -R reference.fa \
  -I sample.recal.bam \
  -O sample.vcf \
  --emit-ref-confidence GVCF

# For cohort analysis, use GenotypeGVCFs
gatk GenotypeGVCFs \
  -R reference.fa \
  -V sample.g.vcf \
  -O sample.vcf

# ============================================
# STEP 7: VARIANT FILTERING
# ============================================

# Filter SNPs
gatk VariantFiltration \
  -R reference.fa \
  -V sample.vcf \
  -O sample.filtered.vcf \
  --filter-expression "QD < 2.0 || FS > 60.0 || MQ < 40.0 || MQRankSum < -12.5 || ReadPosRankSum < -8.0" \
  --filter-name "SNP_FILTER"

# Alternative: Variant Quality Score Recalibration (VQSR)
# For large cohorts (>30 samples)

# ============================================
# STEP 8: ANNOTATION
# ============================================

# Annotate with VEP
vep --input_file sample.filtered.vcf \
    --output_file sample.annotated.vcf \
    --format vcf \
    --vcf \
    --everything \
    --assembly GRCh38 \
    --species homo_sapiens

# Alternative: ANNOVAR
table_annovar.pl sample.filtered.vcf \
  humandb/ \
  -buildver hg38 \
  -out sample.annotated \
  -remove \
  -protocol refGene,gnomad_genome,clinvar \
  -operation g,f,f \
  -nastring . \
  -vcfinput

# ============================================
# PIPELINE VISUALIZATION
# ============================================

# Generate alignment statistics
samtools flagstat sample.recal.bam > flagstat.txt

# Calculate coverage
samtools depth sample.recal.bam > coverage.txt

# Count variants
bcftools stats sample.filtered.vcf > variant_stats.txt

# ============================================
# QUALITY METRICS SUMMARY
# ============================================

echo "=== Pipeline Quality Metrics ==="
echo "Alignment rate:" $(samtools flagstat sample.recal.bam | grep "mapped (" | awk '{print $5}')
echo "Duplicate rate:" $(grep "PERCENT_DUPLICATION" duplicate_metrics.txt | tail -1 | cut -f9)
echo "Mean coverage:" $(awk '{sum+=$3} END {print sum/NR}' coverage.txt)
echo "Total variants:" $(bcftools query -f '%CHROM\n' sample.filtered.vcf | wc -l)
```

### Pipeline Workflow Visualization

```
┌──────────────┐
│  Raw Reads   │
│    FASTQ     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│1. Quality    │
│   Control    │
│ FastQC/MultiQC│
└──────┬───────┘
       │
       ▼
┌──────────────┐
│2. Alignment  │
│   BWA-MEM    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│3. SAM → BAM  │
│   + Sort     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│4. Mark       │
│ Duplicates   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│5. BQSR       │
│ Recalibrate  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│6. Variant    │
│   Calling    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│7. Filter     │
│  Variants    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│8. Annotation │
│  VEP/ANNOVAR │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Filtered    │
│  Annotated   │
│   Variants   │
└──────────────┘
```

### Required Software

| Tool | Purpose | Installation |
|------|---------|-------------|
| **FastQC** | Quality control | `conda install -c bioconda fastqc` |
| **MultiQC** | Aggregate QC reports | `pip install multiqc` |
| **BWA** | Alignment | `conda install -c bioconda bwa` |
| **SAMtools** | BAM manipulation | `conda install -c bioconda samtools` |
| **GATK** | Variant calling | `conda install -c bioconda gatk4` |
| **Picard** | Mark duplicates | `conda install -c bioconda picard` |
| **VEP** | Annotation | `conda install -c bioconda ensembl-vep` |
| **BCFtools** | VCF manipulation | `conda install -c bioconda bcftools` |

### Typical Runtime

| Step | Time (30× WGS) | Notes |
|------|---------------|-------|
| **QC** | 10-30 min | Depends on file size |
| **Alignment** | 4-12 hours | 8 threads |
| **Sorting** | 1-2 hours | |
| **Mark Duplicates** | 1-2 hours | |
| **BQSR** | 2-4 hours | |
| **Variant Calling** | 6-12 hours | |
| **Filtering** | 30 min | |
| **Annotation** | 1-2 hours | |
| **Total** | ~24-48 hours | Single sample |

---

## Hands-on: Galaxy Platform

### Overview

Galaxy is a web-based platform for accessible, reproducible NGS analysis. It provides a graphical interface for bioinformatics tools without requiring command-line expertise.

### Galaxy Features

**User-Friendly Interface:**
- ✅ No command line required
- ✅ Point-and-click workflow
- ✅ Visual parameter selection
- ✅ Integrated help documentation

**Pre-Installed Tools:**
- ✅ 8,000+ bioinformatics tools
- ✅ Regular updates
- ✅ Version control
- ✅ Tool dependencies managed

**Reproducible Analysis:**
- ✅ Workflow capture
- ✅ Sharing capabilities
- ✅ Publication-ready
- ✅ Full audit trail

**Public Server:**
- ✅ usegalaxy.org (free)
- ✅ usegalaxy.eu (European)
- ✅ usegalaxy.org.au (Australian)
- ✅ Institutional servers

### Galaxy Workflow Example

#### Step 1: Upload Data

**Methods:**
```
Upload Options:
1. Upload from computer
   • Drag and drop
   • File browser
   
2. Upload from URL
   • Direct link to FASTQ
   • Public data repositories
   
3. Import from data libraries
   • Shared datasets
   • Reference genomes
```

**Process:**
1. Click "Upload Data" button (top left)
2. Choose source (computer/URL)
3. Select files (FASTQ, reference, etc.)
4. Set file type (auto-detect or manual)
5. Click "Start" to upload
6. Files appear in History panel (right)

#### Step 2: Quality Control

**Run FastQC:**
```
Tools → FASTQ Quality Control → FastQC

Parameters:
• Input FASTQ: Select uploaded file
• Contaminants: Default
• Limits: Default

Click "Execute"
```

**Review Reports:**
- HTML report generated
- Click eye icon to view
- Review quality metrics:
  - Per base quality
  - GC content
  - Adapter content
  - Duplication levels

**Trimming (if needed):**
```
Tools → FASTQ Quality Control → Trimmomatic

Parameters:
• Input FASTQ: Raw reads
• Adapter sequences: TruSeq3
• Sliding window: 4:20
• Minimum length: 36

Click "Execute"
```

#### Step 3: Alignment

**Map with BWA-MEM:**
```
Tools → Mapping → Map with BWA-MEM

Parameters:
• Select reference genome: hg38
• Single or Paired-end: Paired
• FASTQ R1: forward reads
• FASTQ R2: reverse reads
• Set read groups: Yes
  - ID: sample1
  - SM: patient1
  - PL: ILLUMINA

Click "Execute"
```

**Expected Output:**
- BAM file (aligned reads)
- Alignment statistics
- Processing time: 2-6 hours (depending on server load)

#### Step 4: Variant Calling

**Using FreeBayes:**
```
Tools → Variant Calling → FreeBayes

Parameters:
• BAM file: Aligned reads
• Reference genome: hg38
• Ploidy: 2 (diploid)
• Minimum base quality: 20
• Minimum mapping quality: 20

Click "Execute"
```

**Using GATK HaplotypeCaller:**
```
Tools → Variant Calling → GATK HaplotypeCaller

Parameters:
• Input BAM: Aligned reads
• Reference: hg38
• Output mode: EMIT_VARIANTS_ONLY

Click "Execute"
```

**Output:**
- VCF file with called variants
- Processing time: 1-4 hours

#### Step 5: Annotation

**Using SnpEff:**
```
Tools → Variant Annotation → SnpEff

Parameters:
• VCF file: Called variants
• Genome: GRCh38 (hg38)
• Create statistics file: Yes

Click "Execute"
```

**Output Files:**
- Annotated VCF
- HTML statistics report
- Variant effects summary

**Review Results:**
1. Click eye icon on annotated VCF
2. Review variant consequences
3. Filter by impact (HIGH, MODERATE, LOW)
4. Download for further analysis

### Galaxy Workflow Creation

**Create Reusable Workflow:**

1. **Perform analysis manually**
   - Complete all steps once
   - Verify results

2. **Extract workflow:**
   - Click "Workflow" menu (top)
   - Select "Extract Workflow"
   - Name: "NGS_Variant_Calling_v1"
   - Add description

3. **Edit workflow:**
   - Workflow editor opens
   - Connect tools
   - Set parameters
   - Add annotations
   - Save workflow

4. **Share workflow:**
   - Make public (optional)
   - Share with collaborators
   - Publish to community

**Run Workflow on New Data:**
```
1. Upload new FASTQ files
2. Click "Workflow" menu
3. Select saved workflow
4. Choose input files
5. Click "Run Workflow"
6. All steps execute automatically
```

### Galaxy Workflow Visualization

```
┌──────────────┐
│Upload Data   │
│  FASTQ Files │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  FastQC      │
│Quality Check │
└──────┬───────┘
       │
       ▼  (If needed)
┌──────────────┐
│ Trimmomatic  │
│Trim Adapters │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  BWA-MEM     │
│  Alignment   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ FreeBayes/   │
│    GATK      │
│Variant Calling│
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   SnpEff     │
│  Annotation  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Download    │
│   Results    │
└──────────────┘
```

### Available Tools in Galaxy

**Quality Control:**
- FastQC
- MultiQC
- Trimmomatic
- Cutadapt
- fastp

**Alignment:**
- BWA
- Bowtie2
- HISAT2
- STAR (RNA-seq)

**Variant Calling:**
- GATK HaplotypeCaller
- FreeBayes
- VarScan
- LoFreq (low frequency)

**Annotation:**
- SnpEff
- VEP
- ANNOVAR

**Visualization:**
- IGV
- JBrowse
- Trackster

**RNA-seq:**
- STAR
- featureCounts
- DESeq2
- edgeR

### Training Resources

**Galaxy Training Network:**
- URL: training.galaxyproject.org
- Free tutorials
- Step-by-step guides
- Sample datasets
- Video walkthroughs

**Tutorial Topics:**
- Introduction to Galaxy
- NGS data analysis
- Variant calling
- RNA-seq analysis
- ChIP-seq analysis
- Metagenomics
- Single-cell analysis

**Community Support:**
- Help forum
- Gitter chat
- Weekly webinars
- Annual conference (GCC)

### Galaxy Advantages

**For Beginners:**
- ✅ No programming required
- ✅ Graphical interface
- ✅ Built-in documentation
- ✅ Free to use

**For Researchers:**
- ✅ Reproducible workflows
- ✅ Share with collaborators
- ✅ Publication-ready
- ✅ Transparent methods

**For Teachers:**
- ✅ Educational resource
- ✅ Hands-on exercises
- ✅ No software installation
- ✅ Uniform environment

### Local Galaxy Installation

**For Large-Scale Analysis:**

```bash
# Install Galaxy locally
git clone https://github.com/galaxyproject/galaxy.git
cd galaxy
./run.sh

# Access at: http://localhost:8080
```

**Advantages of Local Install:**
- No data upload time
- No queue wait times
- Full control over tools
- Unlimited storage
- Custom tool integration

---

# Summary

This lecture covered the complete workflow of Next-Generation Sequencing, from basic sequencing technologies to advanced data processing pipelines and practical applications. 

## Key Topics Covered

### Part 1: Sequencing Technologies
- Traditional Sanger sequencing and its limitations
- NGS revolution and sequencing-by-synthesis
- Illumina short-read sequencing
- Detailed library preparation steps
- Paired-end vs. single-end strategies
- PacBio long-read SMRT sequencing
- Nanopore real-time sequencing

### Part 2: Data Processing
- FASTQ format and quality scores
- Quality control with FastQC
- Read alignment strategies
- SAM/BAM file formats
- Statistical variant calling methods
- VCF format for variant storage
- Annotation tools and databases

### Part 3: Applications
- Whole genome sequencing (WGS)
- Whole exome sequencing (WES)
- Targeted gene panels
- RNA-seq for transcriptomics
- ChIP-seq for protein-DNA interactions
- ATAC-seq for chromatin accessibility
- Metagenomics for microbiome analysis
- Clinical sequencing applications

### Hands-on Components
- Complete NGS analysis pipeline
- Galaxy platform for accessible analysis

## Learning Outcomes

Students should now be able to:
1. ✅ Understand different sequencing technologies and their applications
2. ✅ Process raw sequencing data through quality control
3. ✅ Align reads and call variants with confidence
4. ✅ Interpret variant annotation and clinical significance
5. ✅ Choose appropriate sequencing strategies for different research questions
6. ✅ Apply NGS in clinical and research settings

---

## Additional Resources

### Online Tools
- **Galaxy:** https://usegalaxy.org
- **IGV Browser:** https://igv.org
- **UCSC Genome Browser:** https://genome.ucsc.edu
- **Ensembl:** https://www.ensembl.org

### Databases
- **gnomAD:** https://gnomad.broadinstitute.org
- **ClinVar:** https://www.ncbi.nlm.nih.gov/clinvar
- **dbSNP:** https://www.ncbi.nlm.nih.gov/snp
- **COSMIC:** https://cancer.sanger.ac.uk/cosmic

### Documentation
- **GATK Best Practices:** https://gatk.broadinstitute.org/hc/en-us/sections/360007226651
- **SAMtools Documentation:** http://www.htslib.org/doc
- **Galaxy Training:** https://training.galaxyproject.org

### Software
- **BWA:** http://bio-bwa.sourceforge.net
- **SAMtools:** http://www.htslib.org
- **GATK:** https://gatk.broadinstitute.org
- **VEP:** https://www.ensembl.org/vep
- **ANNOVAR:** http://annovar.openbioinformatics.org

---

## Contact Information

**Instructor:** Ho-min Park  
**Email:** homin.park@ghent.ac.kr, powersimmani@gmail.com

---

*Thank you for attending Lecture 4: Next-Generation Sequencing and Genomics*