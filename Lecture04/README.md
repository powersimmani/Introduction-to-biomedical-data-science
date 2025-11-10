# Lecture 4: Next-Generation Sequencing and Genomics

**Introduction to Biomedical Data Science**

강의자: Ho-min Park  
이메일: homin.park@ghent.ac.kr | powersimmani@gmail.com

---

## 📚 강의 구성

총 30개 슬라이드로 구성된 NGS(Next-Generation Sequencing) 강의 자료입니다.

### Part 1: Sequencing Technologies (슬라이드 3-10)
- Sanger Sequencing 복습
- NGS 혁명 개요
- Illumina Sequencing 기술
- Library Preparation
- Paired-end vs Single-end
- Long-read Sequencing (PacBio)
- Nanopore Sequencing

### Part 2: Data Processing (슬라이드 11-18)
- FASTQ 포맷
- Quality Control (FastQC)
- Read Alignment
- SAM/BAM 포맷
- Variant Calling
- VCF 포맷
- Annotation Tools

### Part 3: Applications (슬라이드 19-29)
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

## 🚀 사용 방법

### 1. Index 페이지에서 시작
`index.html` 파일을 브라우저에서 열면 모든 슬라이드 목록을 볼 수 있습니다.

### 2. 개별 슬라이드 보기
각 슬라이드는 독립적인 HTML 파일로 제공됩니다:
- `Lecture04_01_Title.html` - 타이틀 슬라이드
- `Lecture04_02_Contents.html` - 목차
- `Lecture04_03_Part1_Divider.html` - Part 1 구분
- ... (30개 슬라이드)
- `Lecture04_30_Thank_You.html` - 감사 인사

### 3. 발표 모드
- 각 슬라이드는 960×540 해상도로 최적화되어 있습니다
- 전체화면(F11)으로 발표하시면 깔끔합니다
- 브라우저의 뒤로가기/앞으로가기 버튼으로 네비게이션 가능

---

## 🎨 디자인 특징

기존 Lecture 1의 디자인을 그대로 적용했습니다:

- **색상 스킴**: 
  - Primary Blue: #1E64C8
  - Gradient: #1E64C8 → #2874d8 / #5088d4
  - White backgrounds for content slides
  
- **타이포그래피**:
  - Font: Aptos, 'Segoe UI', sans-serif
  - 타이틀: 36-48px, Bold
  - 본문: 16-20px
  
- **레이아웃**:
  - 슬라이드 크기: 960px × 540px
  - Info boxes, grids, bullet lists로 구조화
  - Hover effects로 인터랙티브한 경험

---

## 📋 파일 목록

```
index.html                              # 메인 네비게이션 페이지
Lecture04_01_Title.html                # 01. 타이틀
Lecture04_02_Contents.html             # 02. 목차
Lecture04_03_Part1_Divider.html        # 03. Part 1 구분
Lecture04_04_Sanger_Sequencing.html    # 04. Sanger Sequencing
Lecture04_05_NGS_Revolution.html       # 05. NGS 혁명
Lecture04_06_Illumina_Sequencing.html  # 06. Illumina
Lecture04_07_Library_Preparation.html  # 07. Library Prep
Lecture04_08_Paired_End_vs_Single_End.html  # 08. Paired vs Single
Lecture04_09_PacBio_Long_Read.html     # 09. PacBio
Lecture04_10_Nanopore_Sequencing.html  # 10. Nanopore
Lecture04_11_Part2_Divider.html        # 11. Part 2 구분
Lecture04_12_FASTQ_Format.html         # 12. FASTQ
Lecture04_13_Quality_Control.html      # 13. QC
Lecture04_14_Read_Alignment.html       # 14. Alignment
Lecture04_15_SAM_BAM_Formats.html      # 15. SAM/BAM
Lecture04_16_Variant_Calling.html      # 16. Variant Calling
Lecture04_17_VCF_Format.html           # 17. VCF
Lecture04_18_Annotation_Tools.html     # 18. Annotation
Lecture04_19_Part3_Divider.html        # 19. Part 3 구분
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

## 💡 주요 내용

### Sequencing Technologies
- Sanger와 NGS의 비교 (~50만배 비용 절감)
- Illumina SBS (Sequencing by Synthesis) 원리
- Long-read 기술 (PacBio HiFi, Nanopore)의 장단점

### Data Processing
- FASTQ quality scores (Phred score Q30 = 99.9%)
- BWA/Bowtie2/STAR alignment tools
- GATK variant calling pipeline
- VCF 포맷과 variant annotation

### Applications
- WGS vs WES 비교 (비용, coverage, 진단율)
- RNA-seq 워크플로우
- Epigenetic 분석 (ChIP-seq, ATAC-seq)
- 임상 시퀀싱의 고려사항

---

## 🔧 기술 스택

- Pure HTML5 + CSS3 (외부 라이브러리 없음)
- Responsive design (960×540 최적화)
- Modern browser 호환 (Chrome, Firefox, Safari, Edge)

---

## 📝 수정 및 커스터마이징

각 HTML 파일은 독립적이므로 개별적으로 수정 가능합니다:

1. **내용 수정**: 각 파일의 body 내용을 편집
2. **스타일 변경**: `<style>` 태그 내의 CSS 수정
3. **색상 변경**: #1E64C8를 원하는 색상으로 일괄 치환

---

## 📧 문의

질문이나 개선 사항이 있으시면 연락 주세요:
- Email: homin.park@ghent.ac.kr
- Email: powersimmani@gmail.com

---

**제작일**: 2025년 11월 9일  
**버전**: 1.0
