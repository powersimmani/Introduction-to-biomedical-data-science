# Lecture 5: Transcriptomics and Single-Cell Analysis

## Overview

**Course:** Introduction to Biomedical Data Science  
**Topic:** From bulk to single-cell • Cell atlas projects • Resolution revolution

This comprehensive lecture covers the evolution of transcriptomics from bulk RNA-seq to cutting-edge single-cell and spatial technologies, providing both theoretical foundations and practical implementation strategies.

---

## Table of Contents

1. [Part 1: Bulk RNA-seq Analysis](#part-1-bulk-rna-seq-analysis)
2. [Part 2: Single-Cell Technologies](#part-2-single-cell-technologies)
3. [Part 3: Advanced Methods and Integration](#part-3-advanced-methods-and-integration)
4. [Hands-on Tutorials](#hands-on-tutorials)
5. [Key Applications](#key-applications)

---

## Part 1: Bulk RNA-seq Analysis

### Topics Covered
- Expression profiling
- Differential analysis
- Pathway enrichment
- Time series analysis

### 1.1 RNA-seq Workflow

The complete RNA-seq pipeline consists of five main stages:

#### Pipeline Overview
1. **Experimental Design** → Define hypotheses and controls
2. **Sample Preparation** → RNA extraction and library prep
3. **Sequencing** → NGS platform selection and run
4. **QC & Alignment** → Quality control and read mapping
5. **Analysis** → Differential expression and interpretation

#### Key Design Principles

**Critical Considerations:**
- Define clear biological hypotheses before starting
- Identify appropriate control groups
- Account for potential confounding variables
- Plan for both technical and biological variation
- Consider the statistical model for downstream analysis

**Replication Strategies:**
- **Technical replicates:** Same sample sequenced multiple times
- **Biological replicates:** Different biological samples from the same condition
- **Minimum recommendation:** 3-6 biological replicates per condition
- **Power analysis:** Calculate required sample size based on expected effect size

**Common Pitfalls:**
- Starting sequencing without a clear analysis plan
- Insufficient biological replication
- Confounding batch effects with biological variables
- Ignoring potential covariates

### 1.2 Library Preparation Methods

#### Method Comparison

| Method | Target | Cost | Information | Best Use Case |
|--------|--------|------|-------------|---------------|
| **PolyA Selection** | mRNA only | $$ | High | Standard gene expression |
| **Ribosomal Depletion** | All RNA types | $$$ | Highest | Non-coding RNA studies |
| **3' Tag-seq** | 3' ends only | $ | Medium | Large-scale screening |
| **Full-length** | Complete transcripts | $$$$ | Highest | Isoform analysis |

#### PolyA Selection

**Overview:** Most commonly used method for mRNA enrichment. Uses oligo(dT) beads to capture poly-adenylated transcripts.

**Advantages:**
- Cost-effective
- High mRNA enrichment (>90%)
- Well-established protocols
- Removes rRNA efficiently

**Limitations:**
- Misses non-polyadenylated RNAs
- 3' bias in degraded samples
- Cannot detect immature transcripts
- Loses some regulatory RNAs

#### Ribosomal Depletion

**Overview:** Removes ribosomal RNA while preserving all other RNA species including non-coding RNAs.

**Advantages:**
- Captures all RNA types
- Detects non-polyadenylated transcripts
- Better for degraded samples
- Identifies novel transcripts

**Limitations:**
- More expensive
- Requires more reads for coverage
- More complex data analysis
- Higher background noise

#### Strand Specificity

**Importance:** Preserves information about which DNA strand was transcribed

**Benefits:**
- Resolves overlapping genes on opposite strands
- Identifies antisense transcription
- Improves quantification accuracy
- Essential for non-coding RNA studies

#### UMI Incorporation

**Unique Molecular Identifiers (UMIs):** Short random sequences added to each molecule before amplification

**Purpose:**
- Distinguishes PCR duplicates from biological duplicates
- Enables accurate absolute quantification
- Removes amplification bias
- Critical for single-cell applications

### 1.3 Normalization Methods

Normalization is essential to account for technical variation and enable comparison between samples.

#### Common Normalization Approaches

##### 1. **CPM (Counts Per Million)**

```
CPM = (read count / total reads) × 10^6
```

**Use case:** Simple between-sample comparison  
**Advantages:** Easy to understand and compute  
**Limitations:** Doesn't account for library size differences effectively

##### 2. **RPKM/FPKM (Reads/Fragments Per Kilobase Million)**

```
RPKM = (read count / gene length in kb) / (total reads / 10^6)
```

**Use case:** Comparing expression within samples  
**Advantages:** Accounts for gene length  
**Limitations:** Not comparable across samples, biased by high expressers

##### 3. **TPM (Transcripts Per Million)**

```
TPM = (read count / gene length) / sum(read count / gene length) × 10^6
```

**Use case:** Between-sample and within-sample comparisons  
**Advantages:** Sum of TPM is constant across samples  
**Preferred over:** RPKM/FPKM for most applications

##### 4. **TMM (Trimmed Mean of M-values)**

**Method:** edgeR's approach to calculate normalization factors

**Process:**
1. Calculate log-fold-changes (M-values) between samples
2. Trim extreme values
3. Calculate weighted mean
4. Use as scaling factor

**Advantages:**
- Robust to highly expressed genes
- Accounts for RNA composition
- Works well for DE analysis

##### 5. **DESeq2 Size Factors**

**Method:** Median-of-ratios approach

**Process:**
1. Create pseudo-reference with geometric mean per gene
2. Calculate ratio of each sample to reference
3. Use median ratio as size factor

**Advantages:**
- Robust to outliers
- Handles zero counts well
- Integrated with DESeq2 pipeline

#### Normalization Decision Tree

```
Are you comparing:
├─ Within sample? → Use RPKM/FPKM or TPM
├─ Between samples? 
   ├─ For visualization? → Use TPM
   └─ For differential expression?
      ├─ Using edgeR? → Use TMM
      └─ Using DESeq2? → Use size factors
```

### 1.4 Differential Expression Analysis

Identifying genes with statistically significant expression changes between conditions.

#### Statistical Framework

**Key Concepts:**
- **Null hypothesis (H₀):** No difference in expression
- **Alternative hypothesis (H₁):** Significant difference exists
- **Test statistic:** Measures the strength of evidence against H₀
- **P-value:** Probability of observing the data if H₀ is true
- **False Discovery Rate (FDR):** Expected proportion of false positives

#### Major Tools & Methods

##### 1. **DESeq2** (Most Popular)

**Statistical Model:**
- Negative binomial distribution
- Generalized linear models (GLM)
- Empirical Bayes shrinkage

**Workflow:**
```R
# Load data
dds <- DESeqDataSetFromMatrix(countData, colData, design = ~ condition)

# Run analysis
dds <- DESeq(dds)

# Extract results
results <- results(dds, contrast = c("condition", "treated", "control"))

# Filter significant genes
sig_genes <- subset(results, padj < 0.05 & abs(log2FoldChange) > 1)
```

**Advantages:**
- Handles small sample sizes well
- Robust variance estimation
- Built-in shrinkage methods
- Comprehensive statistical framework

##### 2. **edgeR**

**Statistical Model:**
- Negative binomial distribution
- Empirical Bayes methods
- Quasi-likelihood F-test

**Key Features:**
- Fast computation
- Good for large datasets
- Flexible model design
- Excellent for complex experiments

##### 3. **limma-voom**

**Approach:**
- Transforms count data to log-CPM
- Estimates mean-variance relationship
- Applies linear models with precision weights

**Best for:**
- Large sample sizes
- Microarray-like analysis
- Combining with other limma features

#### Effect Size Measures

**Log2 Fold Change:**
- log₂(Treatment/Control)
- Positive = upregulated
- Negative = downregulated
- Magnitude indicates strength

**Interpretation Guide:**
- |log2FC| > 1: 2-fold change (moderate)
- |log2FC| > 2: 4-fold change (strong)
- |log2FC| > 3: 8-fold change (very strong)

### 1.5 Statistical Testing

#### The Multiple Testing Problem

**Issue:** Testing thousands of genes simultaneously increases false positive rate

**Example:**
- Test 20,000 genes at α = 0.05
- Expected false positives = 20,000 × 0.05 = 1,000 genes!
- Unacceptable false discovery rate

#### Multiple Testing Correction Methods

##### 1. **Bonferroni Correction**

```
Adjusted p-value = p-value × number of tests
```

**Characteristics:**
- Very conservative
- Controls family-wise error rate (FWER)
- Too stringent for genomics
- May miss true positives

##### 2. **Benjamini-Hochberg (FDR)**

**Most Common in RNA-seq**

**Procedure:**
1. Order p-values from smallest to largest
2. For each p-value at rank i:
   - Adjusted p = p × (n / i)
3. Controls false discovery rate

**Advantages:**
- Less conservative than Bonferroni
- Better power for discovery
- Interpretable (expected FDR)

**Common thresholds:**
- FDR < 0.05 (stringent, 5% false discoveries)
- FDR < 0.1 (moderate, 10% false discoveries)
- FDR < 0.25 (exploratory)

##### 3. **q-value**

**Extension of FDR:**
- Minimum FDR at which a test is called significant
- Provides local FDR estimates
- Useful for ranking genes

#### Volcano Plots

**Visualization:** Plot log2FC vs -log10(p-value)

**Interpretation:**
- **X-axis:** Effect size (fold change)
- **Y-axis:** Statistical significance
- **Upper corners:** Significant + large effect
- **Top center:** Significant but small effect
- **Bottom:** Not significant

**Typical thresholds:**
- Vertical lines: |log2FC| = 1
- Horizontal line: -log10(0.05) or FDR threshold

### 1.6 Pathway Analysis

Moving from gene lists to biological interpretation.

#### Types of Pathway Analysis

##### 1. **Over-Representation Analysis (ORA)**

**Approach:** Fisher's exact test or hypergeometric test

**Question:** Are pathway genes over-represented in my DE gene list?

**Process:**
1. Identify significant DE genes
2. For each pathway, create 2×2 contingency table
3. Test for enrichment
4. Correct for multiple testing

**Advantages:**
- Simple and fast
- Easy to interpret
- Widely used

**Limitations:**
- Binary (significant/not)
- Ignores effect sizes
- Sensitive to threshold choice

##### 2. **Gene Set Enrichment Analysis (GSEA)**

**Approach:** Rank-based method

**Advantages:**
- Uses all genes, not just significant ones
- Incorporates magnitude of change
- Detects coordinated changes
- More powerful than ORA

**Process:**
1. Rank all genes by statistic (e.g., log2FC)
2. For each gene set, calculate enrichment score
3. Assess statistical significance via permutation
4. Correct for multiple testing

**Key Concepts:**
- **Enrichment Score (ES):** Maximum deviation from zero
- **Normalized ES:** Accounts for gene set size
- **Leading Edge:** Subset driving enrichment

##### 3. **Functional Class Scoring**

**Examples:** GSVA, ssGSEA

**Purpose:**
- Per-sample pathway scores
- Enable pathway-level comparisons
- Useful for heterogeneous samples

#### Common Pathway Databases

| Database | Focus | Number of Terms | Update Frequency |
|----------|-------|-----------------|------------------|
| **GO (Gene Ontology)** | Biological processes, functions, components | 44,000+ | Regular |
| **KEGG** | Metabolic and signaling pathways | 500+ | Annual |
| **Reactome** | Curated biological pathways | 2,500+ | Quarterly |
| **MSigDB** | Comprehensive collection | 30,000+ | Biannual |
| **WikiPathways** | Community-curated | 2,800+ | Continuous |

#### Interpretation Guidelines

**Best Practices:**
- Look for consistency across multiple databases
- Consider pathway overlap and redundancy
- Validate key findings experimentally
- Be cautious of generic/broad terms
- Check for pathway crosstalk

**Red Flags:**
- Only significant pathways are very broad
- No biological coherence
- Pathway contains only 1-2 genes
- Contradictory pathway enrichments

---

## Part 2: Single-Cell Technologies

### Topics Covered
- Technology overview
- Cell isolation methods
- Quality control
- Analysis challenges

### 2.1 scRNA-seq Overview

#### Evolution of Single-Cell Technologies

**Timeline:**
- **2009:** Tang et al. - First single-cell RNA-seq
- **2013:** Smart-seq - Full-length transcripts
- **2015:** Drop-seq - High-throughput droplet-based
- **2017:** 10X Genomics v2 - Commercial platform
- **2020+:** Multi-modal and spatial technologies

#### Throughput vs Depth Trade-off

| Platform | Cells/Run | Genes/Cell | Cost/Cell | Best Use Case |
|----------|-----------|------------|-----------|---------------|
| **Smart-seq2/3** | 100s | ~10,000 | $$$ | Full transcript, isoforms |
| **10X Chromium** | 10,000s | ~3,000 | $ | Cell atlases, discovery |
| **Drop-seq** | 100,000s | ~2,000 | $ | Large-scale screening |
| **Plate-based** | <1,000 | ~10,000 | $$$$ | Rare cells, full coverage |

#### Key Applications

##### 1. **Cell Atlases**
- Human Cell Atlas project
- Mouse Cell Atlas
- Tissue-specific atlases
- Developmental atlases

##### 2. **Developmental Biology**
- Lineage tracing
- Cell fate decisions
- Differentiation trajectories
- Temporal dynamics

##### 3. **Disease Studies**
- Tumor heterogeneity
- Immune profiling
- Disease progression
- Treatment response

##### 4. **Drug Discovery**
- Target identification
- Cell-type specific effects
- Mechanism of action
- Toxicity profiling

### 2.2 Droplet-based Methods

#### 10X Genomics Chromium

**Principle:** Microfluidic partitioning of cells into droplets with barcoded beads

**Workflow:**
1. **Cell suspension** → Single-cell preparation
2. **Gel bead-in-emulsion (GEM)** → Encapsulation
3. **Barcoding** → Cell-specific + UMI barcodes
4. **Library prep** → Amplification and sequencing
5. **Demultiplexing** → Assign reads to cells

**Key Features:**
- **Throughput:** 500-10,000 cells per run
- **Capture efficiency:** ~50-70%
- **Detection:** ~1,000-5,000 genes/cell
- **UMIs:** Absolute quantification
- **3' or 5' counting:** Cost-effective

**Advantages:**
- High throughput
- Relatively low cost per cell
- Standardized protocol
- Good sensitivity
- UMI-based quantification

**Limitations:**
- 3'/5' bias (standard kit)
- Lower gene detection vs plate-based
- Limited cell size range
- Doublet formation (~1-5%)
- No full-length transcript

#### Drop-seq

**Open-source alternative to 10X**

**Differences from 10X:**
- DIY microfluidic setup
- Lower cost per cell
- More variable quality
- Requires technical expertise
- Customizable protocols

### 2.3 Plate-based Methods

#### Smart-seq2/Smart-seq3

**Principle:** Full-length cDNA amplification of single cells in wells

**Workflow:**
1. **Cell sorting** → FACS into wells
2. **Cell lysis** → RNA release
3. **Reverse transcription** → Template switching
4. **Amplification** → PCR
5. **Library prep** → Tagmentation
6. **Sequencing** → High depth

**Key Features:**
- **Throughput:** 96-384 cells per plate
- **Coverage:** Full-length transcripts
- **Detection:** 8,000-12,000 genes/cell
- **Quantification:** Read counts (no UMIs in v2)
- **Smart-seq3:** Added UMIs, higher sensitivity

**Advantages:**
- Full transcript coverage
- Isoform detection
- Allele-specific expression
- High genes/cell detection
- Better for low-input

**Limitations:**
- Lower throughput
- Higher cost per cell
- More labor intensive
- Amplification bias (v2)
- Batch effects

#### When to Use Each Method?

**Choose Droplet-based (10X) when:**
- Need high throughput (1,000s-10,000s cells)
- Discovering new cell types
- Large tissue profiling
- Budget-conscious
- Standard gene expression sufficient

**Choose Plate-based (Smart-seq) when:**
- Need full-length transcripts
- Studying alternative splicing
- Analyzing allele-specific expression
- Working with rare/precious cells
- Require high gene detection
- Need to track individual cells

### 2.4 Data Preprocessing

#### Quality Control Metrics

##### Cell-level QC

**Key Metrics:**
1. **Number of genes detected (nFeature)**
   - Too low: Poor quality/dead cells
   - Too high: Potential doublets
   - Typical range: 200-6,000

2. **Total UMI/read counts (nCount)**
   - Indicates library size
   - Correlates with nFeature
   - Typical range: 500-50,000

3. **Mitochondrial percentage**
   - High %: Dying/stressed cells
   - Threshold: Usually <5-20%
   - Tissue-dependent

4. **Ribosomal percentage**
   - High %: May indicate stress
   - Context-dependent interpretation

**Filtering Strategy:**
```
Remove cells with:
- nFeature < 200 OR nFeature > 6000
- nCount < 500
- percent.mt > 10% (adjust by tissue)
- Predicted doublets
```

##### Gene-level QC

**Filter genes expressed in:**
- Minimum 3 cells (common threshold)
- <1% of cells: Likely noise
- >95% of cells: Housekeeping (keep, but note)

#### Doublet Detection

**Problem:** Two cells captured in one droplet

**Detection Methods:**
1. **Scrublet:** Simulates doublets, compares to real data
2. **DoubletFinder:** Uses PCA and KNN
3. **Computational:** Cell size + gene count correlation

**Typical doublet rates:**
- 10X: 0.8% per 1,000 cells targeted
- 10,000 cells targeted ≈ 8% doublets

#### Ambient RNA Removal

**Problem:** Cell-free RNA in solution contaminates droplets

**Solutions:**
- **SoupX:** Estimates and removes ambient RNA
- **CellBender:** Probabilistic model for background
- **DecontX:** Bayesian approach

### 2.5 Dimensionality Reduction

Single-cell data: ~20,000 genes × 10,000 cells = 200 million data points!

#### Why Dimensionality Reduction?

**Challenges:**
- Curse of dimensionality
- Computational complexity
- Visualization impossible in high-D
- Noise dominates signal

**Goals:**
- Capture biological variation
- Remove technical noise
- Enable visualization
- Facilitate clustering

#### Principal Component Analysis (PCA)

**Concept:** Find directions of maximum variance

**Process:**
1. Scale data (z-score)
2. Calculate covariance matrix
3. Compute eigenvectors
4. Project data onto top PCs

**Characteristics:**
- Linear transformation
- Orthogonal components
- Ordered by variance explained
- First step in most pipelines

**PC Selection:**
- Elbow plot method
- % variance explained
- Typically use 20-50 PCs
- Jackstraw test for significance

#### t-SNE (t-Distributed Stochastic Neighbor Embedding)

**Purpose:** Non-linear visualization in 2D/3D

**Key Parameters:**
- **Perplexity:** Local neighborhood size (5-50)
- **Iterations:** Convergence (≥1,000)
- **Learning rate:** Step size

**Advantages:**
- Excellent for visualization
- Preserves local structure
- Reveals clusters clearly

**Limitations:**
- **Non-deterministic:** Different runs give different results
- **Distances misleading:** Don't interpret distance between clusters
- **Slow:** O(n²) complexity
- **No new data:** Can't project new cells

**Best Practices:**
- Run multiple times with different perplexities
- Don't over-interpret distances
- Use for visualization only, not clustering
- Complement with UMAP

#### UMAP (Uniform Manifold Approximation and Projection)

**Currently Most Popular for scRNA-seq**

**Key Parameters:**
- **n_neighbors:** Local neighborhood (5-50)
- **min_dist:** Minimum distance in embedding (0.001-0.5)
- **metric:** Distance metric (euclidean, cosine, etc.)

**Advantages:**
- Faster than t-SNE
- Better global structure preservation
- Deterministic with same seed
- Can project new data
- Scales to large datasets

**Characteristics:**
- Better for trajectory data
- More stable across runs
- Preserves both local and global structure

**Typical Settings:**
```python
umap = UMAP(
    n_neighbors=30,
    min_dist=0.3,
    n_components=2,
    metric='euclidean'
)
```

#### Comparison: t-SNE vs UMAP

| Aspect | t-SNE | UMAP |
|--------|-------|------|
| Speed | Slower | Faster |
| Global structure | Poor | Better |
| Local structure | Excellent | Excellent |
| Deterministic | No | Yes (with seed) |
| New data projection | No | Yes |
| Popular for | Clusters | Trajectories + Clusters |

### 2.6 Clustering Methods

#### Goal
Group cells with similar expression profiles into clusters representing cell types/states.

#### Graph-based Clustering (Most Common)

**Louvain Algorithm:**

**Process:**
1. Build k-nearest neighbor (KNN) graph
2. Calculate edge weights (Jaccard similarity)
3. Iteratively optimize modularity
4. Assign cells to communities

**Parameters:**
- **k neighbors:** Usually 10-50
- **Resolution:** Controls granularity (0.4-1.2)
  - Lower = fewer, larger clusters
  - Higher = more, smaller clusters

**Advantages:**
- Scalable to millions of cells
- Works well for scRNA-seq
- Fast computation
- Integrated in Seurat/Scanpy

**Leiden Algorithm:**
- Improved version of Louvain
- Better partitions
- Faster convergence
- Recommended over Louvain

#### K-means Clustering

**Approach:** Partition cells into k clusters

**Limitations for scRNA-seq:**
- Assumes spherical clusters
- Must specify k in advance
- Sensitive to initialization
- Poor for complex shapes

**When to use:**
- Quick exploration
- Small datasets
- Clear expectations of cell type number

#### Hierarchical Clustering

**Approach:** Build dendrogram of cell relationships

**Types:**
- **Agglomerative:** Bottom-up
- **Divisive:** Top-down

**Advantages:**
- Visualizes relationships
- Don't need to specify k
- Useful for subset analysis

**Limitations:**
- Slow for large datasets
- Sensitive to noise
- Less commonly used for full scRNA-seq

#### Cluster Validation

**Metrics:**
1. **Silhouette score:** Cluster separation (-1 to 1)
2. **Modularity:** Quality of graph partitions
3. **Stability:** Consistency across subsampling

**Biological validation:**
- Marker gene expression
- Comparison to known cell types
- Consistency with literature
- Experimental validation

### 2.7 Cell Type Annotation

#### Marker-based Annotation

**Approach:** Use known marker genes

**Process:**
1. Identify cluster-specific markers
2. Compare to literature/databases
3. Assign cell type labels

**Tools for Finding Markers:**
- Wilcoxon rank-sum test
- T-test
- Likelihood ratio test
- ROC analysis

**Marker Quality Metrics:**
- **Log fold change:** Effect size
- **Percentage expressed:** In cluster vs others
- **Adjusted p-value:** Statistical significance

**Example Immune Cell Markers:**
- T cells: CD3D, CD3E
- B cells: CD79A, MS4A1 (CD20)
- NK cells: NKG7, GNLY
- Monocytes: CD14, FCGR3A (CD16)
- Dendritic: FCER1A, CD1C

#### Reference-based Annotation

**Concept:** Compare to annotated reference datasets

**Tools:**

##### 1. **SingleR**
- Correlation-based method
- Uses reference transcriptomes
- Provides confidence scores

##### 2. **Azimuth**
- Reference mapping
- UMAP projection
- Prediction scores

##### 3. **CellTypist**
- Machine learning classifier
- Logistic regression
- Pre-trained models

##### 4. **scArches**
- Transfer learning
- Neural network-based
- Handles batch effects

**Reference Databases:**
- Human Primary Cell Atlas
- Immune Cell Reference
- Mouse Cell Atlas
- Tabula Sapiens
- PanglaoDB

#### Automated Annotation Workflow

```python
# Example with SingleR
import scanpy as sc

# Load reference
ref_data = load_reference('immune_cells')

# Predict cell types
sc.tl.ingest(adata, ref_data, obs='cell_type')

# Get prediction scores
predictions = celltypist.annotate(adata)
```

#### Best Practices

**Multi-level annotation:**
1. **Broad categories:** T cells, B cells, Myeloid
2. **Subtypes:** CD4+ T, CD8+ T, Regulatory T
3. **States:** Activated, naive, memory

**Validation:**
- Check marker expression in assigned types
- Look for consistency within clusters
- Validate unexpected cell types
- Consider tissue context

### 2.8 Trajectory Analysis

#### Pseudotime Concept

**Definition:** Computational ordering of cells along a developmental process

**Assumptions:**
- Continuous process
- Cells captured at different stages
- Asynchronous progression

#### Major Tools

##### 1. **Monocle 3**

**Features:**
- UMAP-based trajectories
- Branch point detection
- Gene expression dynamics

**Workflow:**
```R
# Learn graph
cds <- learn_graph(cds)

# Order cells
cds <- order_cells(cds, root_cells = root)

# Find genes changing with pseudotime
trajectory_genes <- graph_test(cds)
```

##### 2. **Slingshot**

**Approach:**
- Cluster-based minimum spanning tree
- Smooth principal curves
- Multiple lineages

**Advantages:**
- Works with any clustering
- Handles multiple trajectories
- Robust to noise

##### 3. **PAGA (Partition-based Graph Abstraction)**

**Concept:**
- Abstracted graph of clusters
- Connectivity scores
- Trajectory initialization

**Integration:**
- Built into Scanpy
- Works well with complex trajectories
- Visualizes topology

##### 4. **Palantir**

**Specialization:**
- Differentiation trajectories
- Fate probabilities
- Branch probabilities

#### Differential Expression Along Trajectories

**Approaches:**
1. **Binning:** Divide pseudotime into bins
2. **GAMs:** Generalized Additive Models
3. **Splines:** Smooth curves
4. **tradeSeq:** Test for trajectory patterns

**Pattern Types:**
- **Transient:** Peak in middle
- **Monotonic:** Continuous increase/decrease
- **Branch-dependent:** Different paths

---

## Part 3: Advanced Methods and Integration

### Topics Covered
- Spatial context
- Multi-modal data
- Velocity analysis
- Communication inference

### 3.1 Spatial Transcriptomics

#### Why Spatial Matters

**Traditional scRNA-seq limitations:**
- Loses spatial context
- No tissue architecture
- Missing cell-cell interactions
- Disrupts native environment

**Spatial advantages:**
- Preserves tissue structure
- Identifies spatial patterns
- Maps cell locations
- Reveals niches and zonation

#### Technologies

##### 1. **Visium (10X Genomics)**

**Approach:** Spatially barcoded array

**Specifications:**
- Spot size: 55 μm diameter
- Spot spacing: 100 μm center-to-center
- Coverage: 6.5 × 6.5 mm tissue
- Capture: ~5,000 spots
- Resolution: ~5-10 cells per spot

**Workflow:**
1. Place tissue on array
2. Staining and imaging
3. Permeabilization
4. cDNA capture with spatial barcodes
5. Library preparation
6. Sequencing + image analysis

**Advantages:**
- Whole transcriptome
- Established protocol
- Commercial support
- Image integration

**Limitations:**
- Multi-cell resolution
- Limited area coverage
- Cost per slide

##### 2. **Slide-seq / Slide-seq V2**

**Approach:** DNA-barcoded beads on surface

**Specifications:**
- Bead size: 10 μm
- Near single-cell resolution
- Larger tissue area
- Flexible array design

**Advantages:**
- Higher resolution
- Customizable
- Cost-effective

**Limitations:**
- More complex protocol
- Lower sensitivity
- Academic tool

##### 3. **MERFISH / seqFISH**

**Approach:** In situ sequencing/hybridization

**Specifications:**
- True single-cell resolution
- Subcellular localization
- 100s-1000s genes
- Multiple rounds of imaging

**Advantages:**
- Single-cell resolution
- Single-molecule detection
- Subcellular localization
- Multiplexing capability

**Limitations:**
- Limited gene coverage
- Expensive equipment
- Complex analysis
- Time-consuming

##### 4. **Xenium / CosMx**

**Commercial platforms for high-plex imaging**

**Xenium (10X):**
- In situ imaging
- 300+ genes (expandable)
- Single-cell resolution
- Whole transcriptome add-on

**CosMx (Nanostring):**
- 1,000+ plex
- Subcellular resolution
- Protein co-detection
- Automated workflow

#### Spatial Analysis Methods

**1. Spatial Variable Genes:**
- Genes with spatial patterns
- Tools: SpatialDE, SPARK

**2. Spatial Domains:**
- Region identification
- Similar to clustering
- Tools: BayesSpace, stLearn

**3. Cell-Cell Proximity:**
- Neighborhood enrichment
- Contact analysis
- Tools: Squidpy, CellPhoneDB

**4. Deconvolution:**
- Estimate cell type proportions per spot
- Tools: SPOTlight, cell2location, RCTD

### 3.2 CITE-seq (Cellular Indexing of Transcriptomes and Epitopes)

#### Concept

**Simultaneous measurement of:**
- RNA transcripts (scRNA-seq)
- Surface proteins (antibodies)
- In the same cells

**Technology:**
- Antibodies conjugated to oligonucleotides
- Protein tags sequenced alongside RNA
- Single-cell resolution

#### Workflow

1. **Staining:** Cells + antibody-oligo conjugates
2. **Encapsulation:** Same as scRNA-seq (10X, etc.)
3. **Library prep:** Separate RNA and ADT libraries
4. **Sequencing:** Both libraries
5. **Analysis:** Integrated multi-modal data

#### Advantages

**Protein vs RNA:**
- Proteins more stable
- Better cell type markers
- Direct functional measurement
- Complements mRNA data

**Applications:**
- Precise cell type identification
- Immunophenotyping
- Surface marker discovery
- Functional state assessment

#### Analysis Considerations

**Normalization:**
- Different distributions than RNA
- Centered log-ratio (CLR) transformation
- DSB normalization method

**Integration:**
- Weighted nearest neighbors (WNN)
- Combine RNA + protein
- Multi-modal UMAP

**Tools:**
- Seurat (WNN approach)
- CiteFuse
- totalVI (scvi-tools)

### 3.3 Multimodal Omics

#### DOGMA-seq / ASAP-seq

**Measures 3 modalities:**
- RNA
- Protein (ADT)
- Chromatin accessibility (ATAC)

**Use cases:**
- Regulatory mechanisms
- Transcription factor activity
- Epigenetic states

#### TEA-seq

**Adds:**
- T cell receptor (TCR) sequencing
- Or B cell receptor (BCR)

**Applications:**
- Immune repertoire
- Clonal tracking
- Antigen specificity

#### Integration Challenges

**Issues:**
- Different data distributions
- Different sparsity levels
- Technical noise varies
- Biological interpretation

**Solutions:**
- Weighted integration (WNN)
- Multi-modal VAE (totalVI)
- Diagonal integration
- Multi-omics factor analysis (MOFA)

### 3.4 RNA Velocity

#### Concept

**Idea:** Predict future cell states from unspliced/spliced RNA ratios

**Biology:**
- Unspliced mRNA = nascent transcription
- Spliced mRNA = mature
- Ratio indicates transcriptional dynamics

**Prediction:**
- Rising ratio → Gene being upregulated
- Falling ratio → Gene being downregulated
- Aggregate across genes → Cell trajectory direction

#### Methods

##### 1. **velocyto**
- First implementation
- Steady-state model
- Simple linear regression

##### 2. **scVelo**
- Dynamical model
- Accounts for kinetics
- Better predictions
- Most widely used

##### 3. **velocyto + CellRank**
- Combines velocity + pseudotime
- Identifies driver genes
- Terminal state prediction

#### Workflow

```python
import scvelo as scv

# Load spliced/unspliced counts
adata = scv.read('data.h5ad')

# Preprocessing
scv.pp.filter_and_normalize(adata)
scv.pp.moments(adata, n_pcs=30, n_neighbors=30)

# Compute velocity
scv.tl.velocity(adata, mode='dynamical')
scv.tl.velocity_graph(adata)

# Visualization
scv.pl.velocity_embedding_stream(adata, basis='umap')
```

#### Interpretation

**Arrows indicate:**
- Direction: Future state
- Length: Confidence/speed
- Convergence: Terminal states
- Divergence: Decision points

**Applications:**
- Development trajectories
- Differentiation paths
- Cell cycle phase
- Response dynamics

**Limitations:**
- Assumes specific kinetic model
- Requires sufficient unspliced reads
- Droplet methods have less unspliced signal
- Better with Smart-seq data

### 3.5 Cell-Cell Communication

#### Concept

**Goal:** Infer intercellular signaling from ligand-receptor expression

**Assumptions:**
- Co-expression of ligand (sender) and receptor (receiver)
- Known ligand-receptor pairs
- Spatial proximity (if spatial data available)

#### Major Tools

##### 1. **CellPhoneDB**

**Approach:**
- Curated ligand-receptor database
- Permutation-based significance
- Complex interactions (heteromers)

**Features:**
- 2,000+ interactions
- Statistical testing
- Dot plot visualization

##### 2. **CellChat**

**Advantages:**
- Quantitative communication probability
- Pattern detection
- Network analysis
- Comparison across conditions

**Outputs:**
- Communication networks
- Signaling pathway activity
- Dominant senders/receivers
- Information flow

##### 3. **NicheNet**

**Unique approach:**
- Predicts target genes
- Ligand activity scoring
- Regulatory network
- Prior knowledge integration

##### 4. **LIANA**

**Meta-tool:**
- Runs multiple methods
- Consensus scoring
- Method comparison
- Unified output

#### Analysis Workflow

```python
# Example with CellChat
import cellchat

# Create object
cc = cellchat.CellChat(adata, group_by='cell_type')

# Identify interactions
cc.compute_communication_probability()

# Identify significant interactions
cc.filter_communication(min_cells=10)

# Infer pathways
cc.compute_pathway_activity()

# Visualize
cc.plot_communication_network(pathway='CXCL')
```

#### Spatial Communication

**Enhanced methods with spatial data:**
- **COMMOT:** Optimal transport-based
- **SpatialDM:** Spatial differential modeling
- **Squidpy:** Proximity-weighted

**Advantages:**
- Physical distance constraints
- Tissue architecture
- Local microenvironments
- Directional signaling

### 3.6 Batch Effect Correction

#### The Batch Effect Problem

**Sources:**
- Different experimental batches
- Different platforms
- Different operators
- Different capture sites
- Processing time differences

**Impact:**
- Obscures biological signal
- Clusters by batch instead of biology
- Inflated false positives
- Reduced power

#### Experimental Design

**Prevention strategies:**
- Randomize samples across batches
- Include controls in each batch
- Process replicates together
- Balance conditions across batches

**When prevention fails → Computational correction**

#### Correction Methods

##### 1. **Harmony**

**Approach:** Iterative clustering and correction

**Advantages:**
- Fast and scalable
- Works in PCA space
- Preserves global structure
- Easy integration

**Usage:**
```R
# In Seurat
library(harmony)
seurat <- RunHarmony(seurat, group.by.vars = "batch")
```

##### 2. **Seurat Integration (CCA/RPCA)**

**Canonical Correlation Analysis:**
- Finds shared correlation structure
- Identifies anchors between datasets
- Projects into shared space

**Reciprocal PCA:**
- Faster than CCA
- Better for large datasets
- Comparable performance

**Workflow:**
```R
# Find integration anchors
anchors <- FindIntegrationAnchors(object.list)

# Integrate
integrated <- IntegrateData(anchorset = anchors)
```

##### 3. **scVI (Deep Learning)**

**Approach:**
- Variational autoencoder
- Learns latent representation
- Removes batch effects

**Advantages:**
- Handles complex batch structures
- Probabilistic framework
- Scalable
- Handles zeros well

**Tools:**
- scVI (RNA)
- totalVI (RNA + protein)
- scANVI (with labels)

##### 4. **Combat**

**Classical method:**
- Empirical Bayes
- Originally for microarrays
- Still used occasionally

**Limitations:**
- Assumes linear batch effects
- Less popular for scRNA-seq
- Other methods preferred

#### Method Comparison

| Method | Speed | Scalability | Preservation | Use Case |
|--------|-------|-------------|--------------|----------|
| **Harmony** | Fast | Excellent | Good | Large datasets |
| **Seurat CCA** | Medium | Good | Excellent | Complex batches |
| **scVI** | Slow | Good | Good | Multi-modal |
| **Combat** | Fast | Medium | Fair | Simple batches |

#### Evaluation

**Metrics:**
1. **Mixing of batches:** Cells from different batches intermingle
2. **Biological conservation:** Cell types remain separated
3. **kBET:** k-nearest neighbor batch effect test
4. **LISI:** Local inverse Simpson's index

**Visual inspection:**
- UMAP colored by batch (should mix)
- UMAP colored by cell type (should separate)
- Check if known markers still work

### 3.7 Integration Methods

#### Horizontal Integration

**Definition:** Combining datasets from different samples/batches

**Same modality (e.g., all scRNA-seq)**

**Challenges:**
- Batch effects
- Different depths
- Different cell type compositions

**Solutions:**
- Batch correction methods (above)
- Mutual nearest neighbors (MNN)
- Transfer learning

#### Vertical Integration

**Definition:** Combining different data modalities from same cells

**Examples:**
- RNA + Protein (CITE-seq)
- RNA + ATAC (Multiome)
- RNA + Spatial location

**Challenges:**
- Different scales
- Different sparsity
- Different information content

**Solutions:**
- Weighted nearest neighbors (WNN)
- Multi-modal autoencoders
- Joint dimensionality reduction

#### Multi-sample Integration

**Tools:**

##### 1. **Seurat v5 Integration**

**Multiple methods:**
- CCAIntegration
- RPCAIntegration
- HarmonyIntegration
- scVIIntegration

**Workflow:**
```R
# Join layers
obj <- JoinLayers(obj)

# Integrate
obj <- IntegrateLayers(
  object = obj,
  method = HarmonyIntegration,
  orig.reduction = "pca",
  new.reduction = "harmony"
)
```

##### 2. **scvi-tools**

**Suite of deep learning methods:**
- scVI: Basic integration
- scANVI: Semi-supervised
- totalVI: RNA + protein
- MultiVI: Multi-sample multi-modal

##### 3. **Symphony**

**Reference mapping:**
- Fast
- Memory efficient
- Good for large references
- Query-to-reference projection

#### Atlas-scale Integration

**Challenges with millions of cells:**
- Memory limitations
- Computational time
- Heterogeneity
- Hierarchy of cell types

**Solutions:**
- Online learning (scArches)
- Hierarchical integration
- Sketch-based methods
- Distributed computing

---

## Hands-on Tutorials

### 4.1 Seurat Tutorial (R)

#### Standard Workflow

**Setup:**
```R
library(Seurat)
library(dplyr)
library(ggplot2)
```

**1. Data Loading & QC:**
```R
# Read 10X data
data <- Read10X("filtered_feature_bc_matrix/")
seurat <- CreateSeuratObject(counts = data, min.cells = 3, min.features = 200)

# Calculate mitochondrial percentage
seurat[["percent.mt"]] <- PercentageFeatureSet(seurat, pattern = "^MT-")

# Visualize QC
VlnPlot(seurat, features = c("nFeature_RNA", "nCount_RNA", "percent.mt"))

# Filter cells
seurat <- subset(seurat, 
                 subset = nFeature_RNA > 200 & 
                          nFeature_RNA < 6000 & 
                          percent.mt < 10)
```

**2. Normalization & Scaling:**
```R
# Normalize
seurat <- NormalizeData(seurat, normalization.method = "LogNormalize")

# Find variable features
seurat <- FindVariableFeatures(seurat, selection.method = "vst", nfeatures = 2000)

# Scale data
all.genes <- rownames(seurat)
seurat <- ScaleData(seurat, features = all.genes)
```

**3. Dimensionality Reduction:**
```R
# PCA
seurat <- RunPCA(seurat, features = VariableFeatures(object = seurat))

# Determine dimensionality
ElbowPlot(seurat, ndims = 50)

# UMAP
seurat <- RunUMAP(seurat, dims = 1:30)
```

**4. Clustering:**
```R
# Find neighbors
seurat <- FindNeighbors(seurat, dims = 1:30)

# Find clusters
seurat <- FindClusters(seurat, resolution = 0.5)

# Visualize
DimPlot(seurat, reduction = "umap", label = TRUE)
```

**5. Find Markers:**
```R
# Find all markers
markers <- FindAllMarkers(seurat, only.pos = TRUE, min.pct = 0.25, logfc.threshold = 0.25)

# Top markers per cluster
top_markers <- markers %>%
  group_by(cluster) %>%
  slice_max(n = 10, order_by = avg_log2FC)

# Visualize
FeaturePlot(seurat, features = c("CD3D", "CD79A", "NKG7", "CD14"))
DotPlot(seurat, features = top_markers$gene) + RotatedAxis()
```

**6. Cell Type Annotation:**
```R
# Assign cell types
new.cluster.ids <- c("Naive CD4 T", "CD14+ Mono", "Memory CD4 T", 
                     "B", "CD8 T", "FCGR3A+ Mono", "NK", "DC", "Platelet")
names(new.cluster.ids) <- levels(seurat)
seurat <- RenameIdents(seurat, new.cluster.ids)

# Visualize
DimPlot(seurat, reduction = "umap", label = TRUE, pt.size = 0.5)
```

**7. Integration (Multiple Samples):**
```R
# Split by sample
seurat.list <- SplitObject(seurat, split.by = "sample")

# Normalize each
seurat.list <- lapply(seurat.list, function(x) {
  x <- NormalizeData(x)
  x <- FindVariableFeatures(x, nfeatures = 2000)
})

# Integration with Harmony
library(harmony)
seurat <- merge(seurat.list[[1]], seurat.list[-1])
seurat <- seurat %>%
  NormalizeData() %>%
  FindVariableFeatures() %>%
  ScaleData() %>%
  RunPCA() %>%
  RunHarmony("sample") %>%
  RunUMAP(reduction = "harmony", dims = 1:30)
```

### 4.2 Scanpy Tutorial (Python)

#### Standard Workflow

**Setup:**
```python
import scanpy as sc
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

sc.settings.verbosity = 3
sc.settings.set_figure_params(dpi=80, facecolor='white')
```

**1. Data Loading & QC:**
```python
# Read 10X data
adata = sc.read_10x_h5('filtered_feature_bc_matrix.h5')

# Calculate QC metrics
sc.pp.calculate_qc_metrics(adata, qc_vars=['mt'], percent_top=None, log1p=False, inplace=True)

# Visualize QC
sc.pl.violin(adata, ['n_genes_by_counts', 'total_counts', 'pct_counts_mt'],
             jitter=0.4, multi_panel=True)

# Filter cells
sc.pp.filter_cells(adata, min_genes=200)
sc.pp.filter_cells(adata, max_genes=6000)
adata = adata[adata.obs.pct_counts_mt < 10, :]

# Filter genes
sc.pp.filter_genes(adata, min_cells=3)
```

**2. Normalization & HVG Selection:**
```python
# Normalize to 10,000 counts per cell
sc.pp.normalize_total(adata, target_sum=1e4)

# Log transform
sc.pp.log1p(adata)

# Find highly variable genes
sc.pp.highly_variable_genes(adata, min_mean=0.0125, max_mean=3, min_disp=0.5)

# Subset to HVGs
adata.raw = adata  # Save full data
adata = adata[:, adata.var.highly_variable]
```

**3. Scaling & PCA:**
```python
# Regress out unwanted variation
sc.pp.regress_out(adata, ['total_counts', 'pct_counts_mt'])

# Scale
sc.pp.scale(adata, max_value=10)

# PCA
sc.tl.pca(adata, svd_solver='arpack')

# Visualize variance ratio
sc.pl.pca_variance_ratio(adata, log=True, n_pcs=50)
```

**4. Neighbors & UMAP:**
```python
# Compute neighborhood graph
sc.pp.neighbors(adata, n_neighbors=10, n_pcs=40)

# UMAP
sc.tl.umap(adata)

# Visualize
sc.pl.umap(adata, color=['n_genes_by_counts', 'total_counts'])
```

**5. Clustering:**
```python
# Leiden clustering
sc.tl.leiden(adata, resolution=0.5)

# Visualize
sc.pl.umap(adata, color=['leiden'])
```

**6. Find Markers:**
```python
# Rank genes for characterizing groups
sc.tl.rank_genes_groups(adata, 'leiden', method='wilcoxon')

# Visualize
sc.pl.rank_genes_groups(adata, n_genes=25, sharey=False)

# Get marker DataFrame
result = adata.uns['rank_genes_groups']
groups = result['names'].dtype.names
markers_df = pd.DataFrame({
    group + '_' + key: result[key][group]
    for group in groups for key in ['names', 'pvals', 'logfoldchanges']
})
```

**7. Cell Type Annotation:**
```python
# Define marker genes
marker_genes = {
    'T cells': ['CD3D', 'CD3E'],
    'B cells': ['CD79A', 'MS4A1'],
    'NK cells': ['NKG7', 'GNLY'],
    'Monocytes': ['CD14', 'FCGR3A']
}

# Plot markers
sc.pl.dotplot(adata, marker_genes, groupby='leiden')

# Manual annotation
cluster_annotation = {
    '0': 'T cells',
    '1': 'Monocytes',
    '2': 'B cells',
    '3': 'NK cells'
}

adata.obs['cell_type'] = adata.obs['leiden'].map(cluster_annotation)

# Visualize
sc.pl.umap(adata, color='cell_type')
```

**8. Advanced Analysis - Trajectory:**
```python
# PAGA
sc.tl.paga(adata, groups='leiden')
sc.pl.paga(adata, plot=False)

# Re-compute UMAP with PAGA initialization
sc.tl.umap(adata, init_pos='paga')

# Diffusion pseudotime
sc.tl.diffmap(adata)
adata.uns['iroot'] = np.flatnonzero(adata.obs['leiden'] == '0')[0]
sc.tl.dpt(adata)

# Visualize
sc.pl.umap(adata, color=['leiden', 'dpt_pseudotime'])
```

**9. Integration with Harmony:**
```python
import scanpy.external as sce

# Run Harmony
sce.pp.harmony_integrate(adata, 'batch', basis='X_pca', adjusted_basis='X_pca_harmony')

# Recompute neighbors and UMAP
sc.pp.neighbors(adata, use_rep='X_pca_harmony')
sc.tl.umap(adata)

# Visualize
sc.pl.umap(adata, color=['batch', 'cell_type'])
```

**10. RNA Velocity:**
```python
import scvelo as scv

# Load loom file with spliced/unspliced counts
adata_velocity = scv.read('velocyto_output.loom', cache=True)

# Merge with processed adata
adata = scv.utils.merge(adata, adata_velocity)

# Preprocessing
scv.pp.filter_and_normalize(adata, min_shared_counts=20, n_top_genes=2000)
scv.pp.moments(adata, n_pcs=30, n_neighbors=30)

# Compute velocity
scv.tl.velocity(adata, mode='dynamical')
scv.tl.velocity_graph(adata)

# Visualize
scv.pl.velocity_embedding_stream(adata, basis='umap')
scv.pl.velocity_embedding(adata, basis='umap', arrow_length=3, arrow_size=2)
```

---

## Key Applications

### Disease Studies
- **Tumor heterogeneity:** Identify cancer cell subpopulations
- **Immune profiling:** Characterize immune infiltration
- **Disease progression:** Track cellular changes over time
- **Treatment response:** Single-cell drug screening

### Developmental Biology
- **Cell fate trajectories:** Map differentiation paths
- **Lineage tracing:** Track cell origins
- **Embryonic development:** Atlas of developmental stages
- **Organogenesis:** Tissue formation mechanisms

### Drug Discovery
- **Target identification:** Cell-type specific targets
- **Mechanism of action:** Understand drug effects at single-cell level
- **Toxicity profiling:** Cell-type specific toxicity
- **Biomarker discovery:** Response predictors

### Clinical Applications
- **Diagnostic tools:** Disease classification from biopsies
- **Personalized medicine:** Patient-specific treatments
- **Therapeutic monitoring:** Track treatment efficacy
- **Predictive markers:** Outcome prediction

---

## Resources & Further Reading

### Key Papers

**Foundational:**
- Tang et al. (2009) - First scRNA-seq
- Picelli et al. (2013) - Smart-seq
- Macosko et al. (2015) - Drop-seq
- Zheng et al. (2017) - 10X platform

**Methods:**
- Stuart & Butler et al. (2019) - Comprehensive integration (Seurat)
- Wolf et al. (2018) - SCANPY
- La Manno et al. (2018) - RNA velocity
- Bergen et al. (2020) - scVelo

**Spatial:**
- Ståhl et al. (2016) - Spatial transcriptomics
- Rodriques et al. (2019) - Slide-seq
- Chen et al. (2015) - MERFISH
- Eng et al. (2019) - seqFISH+

### Software Tools

**R Packages:**
- Seurat - Comprehensive scRNA-seq
- Monocle - Trajectory analysis
- SingleR - Automated annotation
- harmony - Batch correction

**Python Packages:**
- scanpy - Single-cell analysis
- scvi-tools - Deep learning methods
- scvelo - RNA velocity
- squidpy - Spatial analysis
- cellphonedb - Cell communication

**Web Resources:**
- Single Cell Portal (Broad Institute)
- Human Cell Atlas
- Azimuth (cell type reference)
- CellxGene (data browser)

### Databases

**Cell Atlases:**
- Human Cell Atlas
- Tabula Sapiens
- Mouse Cell Atlas
- EMBL Cell Atlas

**Pathway Databases:**
- Gene Ontology (GO)
- KEGG
- Reactome
- MSigDB

**Cell Type References:**
- PanglaoDB
- CellMarker
- Human Primary Cell Atlas

---

## Conclusion

Single-cell transcriptomics has revolutionized our understanding of cellular heterogeneity, enabling:
- **Unprecedented resolution** of cell types and states
- **Dynamic processes** through trajectory and velocity analysis
- **Spatial context** with emerging spatial technologies
- **Multi-modal integration** combining multiple data types
- **Clinical translation** for diagnostics and therapeutics

The field continues to evolve rapidly with new technologies, computational methods, and biological insights emerging constantly.

---

**Course:** Introduction to Biomedical Data Science  
**Lecture 5:** Transcriptomics and Single-Cell Analysis

*Thank you for learning with us!*