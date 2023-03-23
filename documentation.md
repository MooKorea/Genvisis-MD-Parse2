## Step-by-Step 


## Instructions


## 


## Table of Contents


[TOC]

> This is a block quote

> NOTE I am bread.

> SEEALSO This is a block of content to link to further reading

> WARNING This is a warning

&lt;IGNORE-END>


## Required Raw Data Files


### For Affymetrix Data (Affy6/Axiom)



* .CEL files (one per sample, may be gzipped as .CEL.gz)
* Affymetrix Annotation file (*.annot.csv) aka Manifest
* (optional) Affymetrix Probe Set file (*.probe_tab)


### For Illumina GWAS Array Data

**Option 1 (preferred)**

Start with raw intensity data and [recluster using GenomeStudio](https://docs.google.com/document/d/1BMu1zp8er9NY-QFRh-7ZOeX1HnGj_yAYYh3BarASwPY/edit#bookmark=kix.rnqrxmj63otl). This option requires



* .idat files (several files per sample)
* .bpm file (the binary manifest file for the array that was used)

**Option 2 (next best)**

Start with a GenomeStudio Project and [recluster using GenomeStudio](https://docs.google.com/document/d/1BMu1zp8er9NY-QFRh-7ZOeX1HnGj_yAYYh3BarASwPY/edit#bookmark=kix.rnqrxmj63otl). This option requires



* A BeadStudio/GenomeStudio (.bsc file)
* The contents of the GenomeStudio Data/ directory
* The corresponding manifest file for the array (.bpm or .csv format)

**Option 3 (last resort)**

Use existing Illumina Final Report files. This option requires



* Final Report files with one or multiple samples per file. At a minimum, they must contain the following columns:
    * SNP Name
    * Sample ID
    * GC Score
    * Allele1 - AB
    * Allele2 - AB
    * X
    * Y
    * (optional, but helpful) B Allele Freq
    * (optional, but helpful) Log R Ratio
* The corresponding manifest file for the array (.bpm or .csv format) \





## Quick Reference


### Genvisis Downloads

Download the latest version of Genvisis here: [genvisis.umn.edu/jar](genvisis.umn.edu/jar).


### Genvisis Workflow Checklist

The Genvisis workflow depends on the platform of your original data and on the type of data processing to be done. Answer the questions in this [interactive checklist](https://docs.google.com/spreadsheets/d/13UiuQTENXxItftdjhUf7JGbgb1xXyBPzDyqvFSM1_08/edit#gid=0) to obtain the specific workflow for your project. Additionally, you can save a copy of this checklist and use it to keep track of your progress.


### Files for a New Genvisis Project 



* **00src/** 
    * Directory containing GenomeStudio FinalReport files for Illumina data or CEL files for Affymetrix data
* **data/[pedigree.txt](#bookmark=id.3wqz7fyhw1k7)** 
    * Identical to a plink.fam file
    * For some projects everyone will be listed as unrelated
* **data/[linker.txt ](#bookmark=id.3wqz7fyhw1k7)**
    * Text file that maps the Sample ID in Illumina’s GenomeStudio or Affymetrix Power Tools to a family ID (FID) and individual ID (IID)
    * Also delineates who is a duplicate
* **data/batch.txt** 
    * Optional: If samples were genotyped in batches, this is the way to delineate the groups
    * This allows Genvisis to detect whether a batch has such significant batch effects that it should be reclustered by itself
* **Manifest (Illumina data)**
    * .csv version with probe sequences
    * Unlocks many important features, but a GenomeStudio **SNP_Map.csv** file can be used instead


## Getting Started


### Creating a New Project



1. Create a directory for your project (written as **[ProjectDir]** for the rest of this documentation).
2. Within **[ProjectDir]**, create a subdirectory for the raw data; internally we use the naming convention **00src** (i.e., **[ProjectDir]/00src**), but this is not mandatory.
3. Within **00src**, place either the FinalReport files from GenomeStudio (either **.csv** or **.csv.gz** format) or Affymetrix .CEL files. Only FinalReport or .CEL files should be in this directory. [Click here](https://docs.google.com/document/d/1BMu1zp8er9NY-QFRh-7ZOeX1HnGj_yAYYh3BarASwPY/edit#bookmark=id.2ab481w48low) for a tutorial on how to process a project using GenomeStudio. [Click here](https://docs.google.com/document/d/1BMu1zp8er9NY-QFRh-7ZOeX1HnGj_yAYYh3BarASwPY/edit#bookmark=kix.rnqrxmj63otl) for a tutorial on how to recluster data using only the high-quality samples as seeds. Best practices recommend reclustering the data, even if the project was already processed through GenomeStudio.
4. In **[ProjectDir]**, place
    * (Illumina only) The **.csv** version of the project’s **manifest file** (with probe sequences)
    * [**pedigree.txt** and **linker.txt**](#bookmark=id.3wqz7fyhw1k7) (within a data subdirectory (i.e., **[ProjectDir]/data**))
    * If your samples were processed in batches, **batch.text** [within a data subdirectory (i.e., **[ProjectDir]/data**)] listing sample IDs and batch names (no header) so Genvisis can control for batch effects. For example:

            ID001	California


            ID002 California


            ID003	NBS


            ID004	NBS


            ID005	COG


            ID006	COG

    * (Illumina only) If available, the **SNP_Map.csv** file that was produced by GenomeStudio at the same time as the reports. This is necessary only if your manifest does not contain probe sequences.
5. Once the directories are set up and the necessary files are in place, run **genvisis.jar**
    * Linux/Mac:
        * Open a terminal and run **java -Xmx#g -jar [path]/genvisis.jar**
        * #g is the number of gigabytes of memory
        * [path] is the location of the genvisis.jar file
        * e.g., **java -Xmx24g -jar ~/genvisis.jar** (if **genvisis.jar** is saved in your home directory)
        * Alternatively, locate **genvisis.jar **within a file manager and double-click on 
        * the Genvisis icon
    * Windows:
        * Open a text file and write inside: **java -Xmx#g -jar genvisis.jar**
        * #g is the number of gigabytes of memory
        * Save the text file as **vis.bat **in the same directory as **genvisis.jar**
        * Double-click **vis.bat**
6. In the Genvisis window that opens, click **File** → **New Project**
7. Enter a **Project Name**
8. Click **...** next to **Project Directory**
9. Choose the **[ProjectDir]** -> **Select**
10. Click **...** next to **Source File Directory**
11. Choose the **00src** directory created earlier → **Select**
12. Genvisis will automatically detect the number of source files and the extension (eg. .csv, .csv.gz, .CEL, etc.).
13. Choose the **Array Type** with which the data was collected:
    * ILLUMINA
    * AFFY_GW6
        * Only SNP probesets
    * AFFY_GW6_CN
        * SNP probesets plus copy number probesets
    * NGS_WES
    * NGS_WGS
    * AFFY_AXIOM
    * If you choose one of the Affymetrix arrays, there will an additional option, Start From. Select the appropriate option:
        * CEL files
        * APT results
            * Must have the same name as the **Project Name**
14. **Genome Build** allows you to specify which version of the human genome to run the project in (e.g., **[Genome Reference Consortium Human Build 38](https://www.ncbi.nlm.nih.gov/assembly/GCF_000001405.26/)** aka **GRCh38**). 
    * Unless there is a specific need to use an older version of the genome, set **Genome Build** to **hg38**, even if the manifest is in an older build. Genvisis can liftover marker positions to **hg38** in the [Create Marker Positions](#bookmark=id.n8xlweakplyx) step of the Workflow.
    * To determine which version of the genome your data is in, check the **GenomeBuild** column of your manifest.
15. Select locations for the following files:
    * **Pedigree file**
    * **Sample ID linker file**
    * **Batch file**
    * **Marker subset file [optional]**
        * Used only if you are not analyzing all markers in the manifest
16. If using Illumina reports, **Create** will launch the **Validation Review** window. Fields will be automatically populated from the source files.
    * **Allele 1/2 - Genotype:** These are important when combining data sets from multiple sources. In that case, a reference genome with a reference allele and an alternate allele are necessary. Illumina doesn't use that designation, so the categories used here for Illumina reports don't matter too much (can be forward allele or top allele designations).
    * **Allele 1/2 - AB:** This is more important than Allele 1/2 - Genotype. The genotype can either be AA, BB, AB, or missing.
    * **X/Y:** This is intensity data. If you want to do anything with Copy Number Variation calling or review cluster plots, this is necessary. What sets Genvisis apart is its ability to review raw data. X/Y are the most important variables followed by the Allele 1/2 AB genotype.
    * **B Allele Frequency and Log-R Ratio:** Genvisis can compute these from X and Y, so it's not critical to import these, but you can import them if they're available in the report.
    * **Confidence:** An optional category that is useful if you have only genotypes and no raw intensity data (X/Y). Defaults to GC score. The confidence score can be used to set a higher threshold than what the GenomeStudio report originally produced.
17. If the reports don’t have consistent headers, there will be a separate validation review window for each group of reports.
18. Click **OK. **A new window will appear: **[Genvisis Project Workflow](#bookmark=id.s30o3wuyykva)**
19. If using Affymetrix CEL files, there will be no Validation Review and Genvisis will go directly to the Project Workflow.
20. Inside **[ProjectDir]**, two new directories will appear: **data/ **and **logs/**. A file named **source_headers.ser** will also appear in **[ProjectDir]**.

    



### Pedigree and Linker Setup

Genvisis projects require a **pedigree.txt **file containing unique subject ids and a **linker.txt** file that identifies duplicate subjects.



1. Create **pedigree.txt** and save this file in **[ProjectDir]/data/**. This file must contain a header and the following columns: **FID	IID	FA	MO	SEX	AFF**
    * The structure is identical to the [plink.fam](https://www.cog-genomics.org/plink2/formats#fam) file format.
    * **FID** and **IID **are the family and individual IDs.
    * **FA** is the **IID **of the sample’s father (**0** if parent not in dataset).
    * **MO** is the **IID **of the sample’s mother (**0** if parent not in dataset).
    * **SEX** is either **1** for male or **2** for female (if GenomeStudio can’t determine sex and you don’t have phenotype data, use **0** then update the pedigree manually after running the **[Sex Checks](#bookmark=id.ffdnn8hxfe09)** step in Genvisis).
    * **AFF** or **PHENO **(Affected or Phenotype)** **is **2** (for a case), **1** (for a control), or either **0** or **-9** (for unknown); this column isn’t used much except for PLINK/VCF export and for filtering out markers that have a call rate that differs by this affected status.
    * **mzTwinID** (monozygotic twins) is an optional final column (any additional columns beyond this will be ignored). The ID number in this column should be the same for both/all samples in a given mzTwin set (e.g. the first set both coded as 1, the second set coded all as 2, etc). For non-mzTwins the column should contain a period.
    * If siblings are present in the dataset, but not their parents, dummy IDs can be created in the **IID **column that share **FID **with the siblings. The dummy IDs can then be listed under **FA **and **MO **for the siblings. The dummy IDs do not need to be included in the Linker file.
    * Note: the pedigree should be shorter than the total number of samples if duplicates are present. The pedigree should contain only unique IIDs with **Linker.txt** handling duplicate samples.
2. Create a **Linker.txt** file and save this file in **[ProjectDir]/data/**. This file must contain a header and the following columns: **DNA	FID	IID**
    * The **DNA **column must match the **Sample ID** used in GenomeStudio. The GenomeStudio **Sample ID** is used to name the **.sampRAF** files and Genvisis matches the **DNA** column in **Linker.txt** to the **.sampRAFs**.
    * **FID **and **IID **can have duplicates, but each **DNA **ID must be unique.
    * If making a **Linker.txt** file in Excel, set the format of the columns to **Text **before adding the IDs (the default is **General**, where Excel will guess the format of each value). IDs that are solely numbers will have leading zeros removed by Excel in this situation, which will lead to Genvisis not being able to match those rows in the **Linker.txt** file with the corresponding **.sampRAFs**. It is best to copy **Sample IDs** directly from the GenomeStudio project and not the **Sample_Map.csv** that is produced with reports, as opening **Sample_Map.csv** in Excel automatically removes leading zeros.
3. Genvisis projects created prior to August 2021 may have issues using linker and pedigree.
    * **relationshipChecks.xln **
        1. This may cause a checksums failure when loading linker or pedigree
        2. Resolve by re-running GWAS_QC step - it should add a checksum to the first line of the relationshipChecks.xln file
        3. You may need to remove/back-up your existing relationship checks


## 


### Genvisis Resources



* The first time you create a Genvisis project, **.genvisis/ **will be created in your home directory.
    * Linux/Mac: $HOME/.genvisis/
    * Windows: C:\Users\[username]\.genvisis\
* This directory contains files that are used across Genvisis projects.
* **.genvisis/**
    * **example/**
    * **projects/**
        * **.properties** files for each project created
    * **resources/**
        * **Arrays/**
            * **AffySnp6/**
                * Affymetrix arrays and support files
        * **CNV/**
            * Hidden Markov Model files (.hmm) used in [CNV calling](#bookmark=id.wns2tdqrvkjn).
        * **Genome/**
            * Resource files for Human Genome builds hg18, hg19, and hg38
        * **HapMap/**
            * Resource files for HapMap samples
    * **custom_path**
        * The full path of **.genvisis/**
    * **Launch.bat**
        * Running this file will launch Genvisis on a Windows machine
    * **Launch.command**
        * Running this file will launch Genvisis on a Unix/Linux/Mac machine
    * **launch.properties**
        * Contains properties used by all Genvisis projects
        * Eg. Path to PLINK software, location of **resources/**, location of **projects/**, record of the last project opened, etc.
    * **Launch.sh**
        * Running this file will launch Genvisis on a Unix/Linux/Mac machine


## Running the Genvisis Workflow

Genvisis data processing is run from a workflow of steps that automate best practices. The Genvisis Workflow can be opened from the toolbar (check the <span style="text-decoration:underline;">Workflow</span> button) or from **Data > Genvisis Project Workflow**.



<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image2.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image2.png "image_tooltip")


**Image of the Genvisis toolbar with Workflow icon highlighted**

The Workflow window lists all the steps that can be run. To run a step, check the box next to the numbered step. Text will turn green for portions of the step that can be run and red for portions that have missing requirements. Higher number steps may not be able to run without earlier steps being run first. Auto-populated file names will be green if they exist and red if they don't exist.



<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image3.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image3.png "image_tooltip")


**Image of the Genvisis Project Workflow dialog box. Green text indicates steps that are ready to be run, while red text indicates steps for which prerequisites have not been met.**

The first four steps of the Workflow vary based on the platform of your original data (Illumina or Affymetrix). The rest of the steps are the same for all datasets.


### Illumina Data Sets



1. Create Marker Positions
    * This step uses a manifest file to determine where probes lie in the genome
    * Choose the [.csv version of the manifest](https://docs.google.com/document/d/1BMu1zp8er9NY-QFRh-7ZOeX1HnGj_yAYYh3BarASwPY/edit?pli=1#bookmark=id.e14mve4bgxmr) used to create the original project in GenomeStudio. This file should already be in **[ProjectDir]**
    * If your manifest is in a different GenomeBuild than the Genvisis project (eg. manifest is **hg37 **and Genvisis was set to **hg38 **during project creation), choose the option **Perform LiftOver to lift manifest positions to project build**.
2. Parse Sample Files
    * Convert the .csv report files into a Genvisis native format
3. Run Marker BLAST Annotation
    * BLAST (Basic Local Alignment Search Tool) aligns probe sequence to the genome. This determines if markers are useful or not, not useful being if a marker aligns to multiple locations on a genome.
    * Must provide a manifest with probe sequences
    * BLAST will run on the marker positions in **markerPositions.txt**
    * Part 3 of this step **(optional) Marker positions file to override MarkerSet positions with** is for if you want to BLAST on a different genome build than your project is in
        * For example, if the project was created in **hg37** and the positions in **markerPositions.txt** are **hg37**, you can provide an alternative markerPositions file with positions in **hg38 **to this part.
4. Transpose Data into Marker-Dominant Files
    * The **sampRAF **files created in step 2 contain one sample per file. This step creates a copy of the data, but with one marker per file instead. This allows the same marker to be examined for each sample without iterating through every **sampRAF**.


### Affymetrix Data Sets



1. Create Marker Positions
    * Requires an Affymetrix Manifest file
        * **.genvisis/resources/Arrays/AffySnp6/GenomeWideSNP_6.na35.annot.csv** will automatically load from the pre-existing Genvisis resources.
        * This is an hg19 array
        * The array can be lifted over to the human genome version specified at project creation; otherwise, the HG version of a manifest can be found in the header data of the file. To perform the liftover,
            1. Check 2.1 
            2. Select **HG19 **in 2.2 if using **GenomeWideSNP_6.na35.annot.csv**
2. Process Affymetrix CEL Files
    * Directory with Affy Power Tools executables
        * Files beginning with **apt-**, such as **apt-probeset-genotype** 
        * Available at [http://www.affymetrix.com/](http://www.affymetrix.com/)
    * Directory with Affy Power Tools library files
        * Files beginning with **GenomeWideSNP_6**, such as **GenomeWideSNP_6.cdf**
        * Available at [http://www.affymetrix.com/](http://www.affymetrix.com/)
    * A target sketch file
        * Such as **hapmap.quant-norm.normalization-target.txt**
    * If you are examining mitochondrial DNA copy number, there is an option to use the full affymetrix cdf, which contains more mitochondrial probe sets
    * Number of threads
3. Transpose Marker Files to Sample Files
    * Process Affymetrix CEL Files must have been run
    * Transposes **.mdRAF** files in **transposed/** to **.sampRAF** files in **samples/**
4. Run Marker BLAST Annotation
    * Transpose Marker Files to Sample Files must have been run
    * An Affymetrix Probe Set file
        * Default value is **GenomeWideSNP_6.probe_tab**
        * File can be found at [https://www.affymetrix.com/support/technical/byproduct.affx?product=genomewidesnp_6](https://www.affymetrix.com/support/technical/byproduct.affx?product=genomewidesnp_6)
    * An Affymetrix Annotation file
        * Default is **.genvisis/resources/Arrays/AffySnp6/GenomeWideSNP_6.na35.annot.csv**
    * An optional override file for MarkerSet positions
    * Number of threads


### All Data Sets 

Illumina and Affymetrix are processed the same from here on in the workflow.



5. Compute GCMODEL File
    * Computes the guanine and cytosine ontent around a marker. A lot of G's and C's in a row means that a portion of the double helix is more tightly bound and takes more energy to separate due to G and C having 3 hydrogen bonds instead of 2 (as with A and T). Regions with a lot of G's and C's have properties that are detected downstream, such as how tightly something is hybridizing to it, the degree of intensity (X and Y), and is a problem when the sample is of low quality.
    * This option computes the average GC content at each location and corrects for it.
    * Requires a file that is relative to the genome build (eg. hg18_gc5base.txt) that should automatically download from the Genvisis website. The file downloads to **.genvisis/resources/Genome/**
6. Compute Sample QC Metrics
    * Opens RAF files one at a time and computes metrics on the samples.
7. Identify Excluded Samples
    * Loads **lrr_sd.xln** and filters out low quality samples.
    * User sets thresholds for filtering. Defaults are **0.32** for LRR SD, **0.95** for Callrate, and **3** for BAF SD.
        * **LRR SD:**
            * **Phase 2: **Set **LRR SD** to **0.5** for SNP analysis.
            * **Phase 3: **Keep **LRR SD **at the default of **0.32 **for CNV analysis
        * **Callrate:**
            * **0.98** is the standard **Callrate **for Illumina data
            * **0.95** is the standard **Callrate **for Affymetrix data
        * **BAF SD:** 
            * Can remain at the default of **3 **for most projects
8. Run Sex Checks
    * We want to avoid regions on chrX that have homologies on chrY (beyond the pseudoautosomal regions that are already known to be homologous).
    * This can be done by
        * 4.1 providing a file listing one hit wonders (markers that map to one location on a genome and nowhere else)
        * 4.2 taking information from the BLAST annotation in Step 3
        * 4.3 checking the box to “Use only X and Y chromosome R values to identify sex discriminating markers”
9. Generate AB Lookup File
    * This step parses the AB alleles from the original genotype. For each of the variants, it matches what nucleotide it predicts the A allele is and what nucleotide the B allele is to determine what is the reference allele and what is the alternate allele.
    * Requires **Parse Sample Files** to have been run.
    * Will use **Marker BLAST Annotations** if they are available.
    * Has the option to take the **SNP_Map.csv **file that GenomeStudio creates with the report files.
        * **SNP_Map.csv **is used only in the rare scenario where you have neither probe sequences nor a blast.vcf file. When Genvisis generates a lookup from existing ACGT genotypes and then reclusters a monomorphic marker, the only way to determine the other allele is with **SNP_Map.csv** or a similar file.
10. Create PLINK Genotype Files
    * Option 3.1 uses the **pedigree.txt** file identified during project creation
    * If a **pedigree.txt** doesn’t exist, one can be created uses the results of Sex Checks. In this case, check the box for option 3.2.2.
11. Run GWAS QC
    * This step runs the PLINK software on the files created in Step 12. It requires a path to a PLINK executable. This could be plink, plink 1.9, or plink2 depending on what version of PLINK you are running.
    * The threshold to reject Marker Callrate has a default value of **&lt;0.98** in Illumina projects and **&lt;0.95** in Affymetrix projects.
    * The threshold for filtering on Sample Callrate has a default value of **0.95**
        * Change to **0.98** for **Illumina** data
        * Leave at **0.95** for **Affymetrix**
12. Run Ancestry Checks
    * This step performs homogeneity tests to make sure that the analysis doesn’t pick up on allele frequency differences simply due to the array being used.
    * **Requires:**
        * 1: Run GWAS QC Step must have been run or must be selected.
        * 2.1: If you have self described ancestry, you can include a list of white samples to compare with HapMap samples that are used as anchors. HapMap contains 60 unrelated individuals of European descent, 60 unrelated individuals of Nigerian descent, and 90 unrelated individuals of east Asian descent (45 Japanese and 45 Chinese).
        * 2.2: If you don’t have self described ancestry, you can instead check the box for part 2.2. Genvisis will estimate which samples have European ancestry and then use the list it generates as putative whites.
        * 3: Download remotely available PLINK root of HapMap founders.
        * 4: should use the same PLINK version used in Run GWAS QC.
        * 5 (optional): is used when SNPs aren’t labeled with rsIDs, but you have a mapping file to identify what rsIDs they align to. HapMap uses only rsID, so if you have no samples with rsIDs, this part is required. Any samples without rsID will be ignored in this part of the analysis.
13. Annotate Sample Data File
    * This step adds additional columns to **data/SampleData.txt**
    * This step will throw an error if the duplicates identified by PLINK don’t agree with the **linker.txt** duplicates. It’s more likely that a sample list is wrong than PLINK’s algorithms, so **linker.txt** and **pedigree.txt** should be updated to agree with PLINK if an error occurs.
14. Compute Population BAF files
    * Requires samples to have been parsed.
    * Can provide an optional sample subset file.
    * An output file must be specified (default is **data/custom.pfb**).
15. Create Sex-Specific Centroids; Filter PFB file
    * Requires Compute Population BAF files step to have been run
    * Requires either Sex Checks to have been run or an estimate sex column in **sampleData.txt**.
16. Call CNVs
    * Part 1.1 takes an .hmm file, which contains the parameters for a Hidden Markov Model
        * The model parameters are stored in **.genvisis/resources/CNV/hhall.hmm**, which Genvisis automatically downloads.
        * **hhall.hmm** is Genvisis’s default model. There is also **hh550.hmm**, which is for the Illumina 550 array. The PennCNV algorithm was originally written for the 550 array.
        * Genvisis uses the same CNV calling algorithm as PennCNV.
        * The HM model looks for change states; a change in intensity may indicate a deletion or a duplication.
        * In the **hhall.hmm** file are mean and standard deviation values that indicate the number of copies of an allele.
        * B1 is for the log R ratio and B2 is for the B allele frequency.
        * Values were derived empirically from an array
            * -3.5	-0.66	0	100	0.4	0.68
            * The six values are for copy number 0 (homozygous deletion), 1, 2 heterozygous, 2 homozygous, 3 (duplication), and 4 (triplication)
            * Copy number 2 homozygous is turned off by being set to 100 because values that high will never be seen. hh550.hmm has homozygous set to 0.0.
        * The .hmm file created in **Step 21: Process CNVs and Create HMM File**, can also be used here to call CNVs a second time with an .hmm file customized to the dataset (the **Create HMM File** step also has an option to recall CNVs automatically).
    * Part 4: CNV Calling Scope (three options)
        * **BOTH (default)** 
            * Calls **AUTOSOMAL** and **SEX CHROMOSOMES** 
        * **AUTOSOMAL**
            * Chromosomes 1 to 22
        * **SEX CHROMOSOMES**
            * Chromosomes 23 (X) and 24 (Y)
17. Filter CNVs
    * Default parameters are recommended
        * Minimum number of probes for non-homozygous deletion: **15**
        * Minimum number of probes for homozygous deletion: **3**
        * Minimum score value: **10**
        * Only use **Non-Excluded Samples**
18. Process CNVs and Create HMM File
    * _Option 2.2 Input file with high-quality CNV calls must exist_
        * Default is **cnvs\filtered.cnv**
    * _Option 3 Filter input CNV file using default filters_ uses the default filter criteria from the **Filter CNVs** step. This option isn’t necessary if using **filtered.cnv**.
    * _Option 4 Number of high-quality samples to use_ defines the number of samples to use in the training algorithm that generates the new .hmm parameters.
        * The more samples used, the more fine tuned the parameters are to the dataset and the more accurate CNV calls with these parameters will be.
        * However, the more samples used, the more memory is required by the training algorithm
        * 900GB of memory is recommended for training on 100 samples in order to not receive an out of memory error.
19. Generate Genotype Mask
    * Requires either 1.1 initial CNV calling, 1.2 unfiltered HMM-optimized CNV calls, or 1.3 the intentional decision to not use CNV calls to mask Mendelian Errors.
    * Requires either a 2.1 mosaicism file or 2.2 the intentional decision to not use Mosaic Chromosomal Arms to mask Mendelian Errors.
    * Requires either CNV calls or Mosaic Chromosomal Arms identified to create the Genotype Mask. Cannot skip both options 1 and 2.
20. Run Marker QC Metrics
    * **data/pedigree.txt** must have correctly identified parent-offspring pairs before running this step.
        * Genvisis generated relationship data can be found in **[ProjectDir]/plink/quality_control_original/genome/plink.genome_relateds.xln**
    * Marker QC can be done on a subset of markers, but the default is to use all markers
    * Option 4 allows batch effects to be controlled for in the analysis
        * If you submitted a batch file at project creation or in the **Create SampleData.txt File** step, **BATCH **will appear as one of the options that can be selected.
21. Run Further Analysis QC
    * Requires PLINK files to have been created
    * Requires either GWAS QC to have been run, or a file of unrelated FID/IID pairs.
    * Requires either Ancestry Step to have been run, or a list of samples of European ancestry
        * European samples serve as anchors for Hardy-Weinberg equilibrium tests
    * Requires **sampleData.txt** to have already been annotated (this step adds additional columns to **sampleData.txt**)
    * Requires either Marker QC Metrics to have been run or a plain Mendelian Error column in Marker QC results.
    * Requires path to a PLINK executable
    * Part 7: Defaults to rejecting any marker that is marked as chr0 (&lt;1). Markers without a good match, such as ones that match to more than one location in the genome, get set to chr0.
    * Part 9: Default is 0.98. This works for Illumina data. Use 0.95 for Affymetrix data.
    * Parts 10-15: Defaults to &lt;1E-7. If you want to keep as many markers as possible, use a genome wide threshold of &lt;5E-8.



22. 
Identify Mosaic Chromosomal Arms


    * Drops markers within Runs of Homozygosity/homozygous-deletion CNV regions.
    * Mosaicism tends to happen in 1% to 2% of the population over 80 years old. There are unlikely to be many in a study with younger individuals unless there is an extreme phenotype such as cancer.
23. Identify Problematic Markers
    * Requires Marker QC Metrics to have been run
    * Requires Further Analysis QC to have been run
    * Part 3 allows the user to specify a list of markers to exclude in addition to the markers Genvisis classifies as problematic based on Marker QC Metrics and Further Analysis QC results.
24. Generate Principal Components
    * _Step 4: Output File Path_ allows the user to choose what suffix the files this step creates will have
        * The default value is **PCA_GENVISIS**
        *  For example, files:
            * PCA_GENVISIS_baselineMarkers.txt
            * PCA_GENVISIS_lrr_sd.txt
            * PCA_GENVISIS_markerQC_BATCH_ALLELIC_batchEffects.out
            * PCA_GENVISIS_markerQC_BATCH_MISSINGNESS_batchEffects.out
25. Create PC-Corrected Project
    * This step will create a new Genvisis project where X and Y are transformed based on the nearest genotype cluster using the principal components generated in the previous step. LRR and BAF are then recomputed based on the new X and Y values.
    * The button **Review PCs Plot** will show a scatterplot of Singular Value vs number of Principal Components
        * As the number of PCs increases, the amount of variation in the data they explain falls. This is described by the Singular Value, which decreases with each additional PC added.
    * For a more fine grained examination of the two measures, open the file **[ProjectDir]/PCA/PCA_GENVISIS/PCA_GENVISIS.PCs.SingularValues.txt** in Excel.
        * There are two columns: **PC** and **Singular Value**
        * We want to choose a number of PCs close to the point where adding more leads to diminishing returns. This can be measured by the rate at which the singular value decreases.
        * In a third column, calculate the difference between each singular value and the proceeding value
            * For example =B2-B3
            * The first singular value decrease will usually be in the thousands, followed by the hundreds. Find where the difference consistently falls below 50 and then into the single digits. Highlight a group of 20 to 30 cells, and then under the **Home** tab choose **Conditional Formatting > Color Scales**.
            * For example:

        

<p id="gdcalert4" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image4.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert5">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image4.png "image_tooltip")



        **Image of principal components count and singular values in a Microsoft Excel spreadsheet**

    * Part 1.2 takes the same suffix used in Step 25. Genvisis uses this to identify which files to use when making the new project
    * Part 2 is the number of PCs chosen from examining **SinglarValues.txt**
    * Part 4 Condition Type
        * Put cursor over ? for explanation of each option
        * Use default **XY** if you’re not sure which to use
    * Sex Chromosome Strategy
        * Same as above with ? explaining options
        * Use default **BIOLOGICAL** if not sure
    * This step creates **[ProjectDir]/pcCorrected_#PCs_[correction type]_[sex chr strategy]**
        * Eg. **pcCorrected_20PCs_XY_BIOLOGICAL**
    * This new subdir contains a new Genvisis project with a **/transposed** dir containing the PC corrected samples. This new project will appear in the upper right corner of the Genvisis GUI.
        * You can now run this [new project](#bookmark=id.f9nqogg40tlr) up to cnv calling and optimization a second time.
26. Create Mitochondrial Copy-Number Estimates File
    * Skip if you don’t have mitochondrial data
27. Create VCF Files for Imputation
    * Export project data in the form of .vcf files that can be imputed on the [TOPMed Imputation Server](https://docs.google.com/document/d/1BMu1zp8er9NY-QFRh-7ZOeX1HnGj_yAYYh3BarASwPY/edit?pli=1#bookmark=kix.ao1b7evi7f7z).
    * 1: Chose which samples to export
        * 1.1: All samples
        * 1.2: A file of FID/IIDs to keep
            * If you want to keep samples regardless of ancestry or quality control
        * 1.3: A file of FID/IIDs to drop
            * **plink/quality_control/further_analysis_QC/mind_drops.dat**
        * 1.4: Drop samples Genvisis identified in [Identify Excluded Samples](#bookmark=id.izzeb0pvdf4q)
    * 2: Choose which markers to export
        * 2.1 A file with markers to keep
        * 2.2 A file with markers to drop
            * **plink/quality_control/further_analysis_QC/miss_drops.dat**
    * 3: (optional) Export contig names with ‘chr’ prefix (**HG**) or without (**GRC**)
        * Use **HG** or data with **GRCh38/hg38** positions (which will encode chromosomes with the prefix 'chr'; e.g. chr20).
        * Use **GRC** or data with **GRCh37/hg19** positions (which will encode chromosomes without a prefix; e.g. 20). 
        * If the manifest was in **hg19**, but you lifted **markerPositions.txt** to **hg38**, use the **HG** ption.
    * 4: Chromosomes to export
        * Options are:
            * 0: Unknown
            * 1 to 22: autosomes
            * 23: X
            * 24: Y
            * 25: Pseudoautosomal region or XY
            * 26: Mitochondrial 
        * The TOPMed Imputation Server will only accept chromosomes 1 to 23.
    * 5: Split by chromosome?
        * If yes, will export one file per chromosome
        * Otherwise, will export all chromosomes in a single file
    * 6: (optional) Use ClusterFilters when exporting (if they exist)?
        * ClusterFilters are created through [ScatterPlot ](#bookmark=id.9sahd1n5px3d)as a way to re-assign genotypes for specific markers
    * 7: Output file path (relative to project directory) and filename prefix for VCF files

[Dependency table for Workflow steps](https://docs.google.com/spreadsheets/d/1CkjsouqwAd2LASsXHVUmAt3aV190Q3unYbHXp4qahB4/)




### PC-Corrected Project 



1. This is a copy of the original project, but where X and Y are transformed based on the nearest genotype cluster using the number of principal components specified by the user. LRR and BAF are recomputed based on the new X and Y values.
2. Creates
    * data/
        * batch.txt (if present in the parent project)
        * import.ser
        * linker.txt
        * markerdetails.ser
        * markers.ser
        * pedigree.txt
        * SampleData.txt
            * DNA
            * Batch (if a batch file was used)
            * CLASS=Batch (if a batch file was used)
            * CLASS=Sex
            * CLASS=Estimated Sex;0=Unknown;1=Male;2=Female;3=Klinefelter;4=UPD Klinefelter;5=Mosaic Klinefelter;6=Triple X;7=Mosaic Triple X;8=Turner;9=Mosaic Turner
            * Class=ImputedRace;1=White;2=African American;3=Hispanic;4=Asian
            * % African
            * % Asian
            * % European
            * mzTwinID
            * Aneuploidy
            * AnyTrisomy
            * AnyLargeMosaicEvent
            * numChrsWithEventGreaterThan4
            * NumberMosaicEventsDetected
            * ProportionGenomeMosaic
            * PCA/PCA_GENVISIS/PCA_GENVISISLRR_SD
            * PCA/PCA_GENVISIS/PCA_GENVISISGenotype_callrate
            * PCA/PCA_GENVISIS/PCA_GENVISISCLASS=Exclude
        * samples.ser
    * samples/
        * Empty. The first step of the PC-Corrected workflow **Transpose Marker Files to Samples Files** will populate this directory.
    * scripts/
        * .slrm file
        * .toml file
        * Appears if **Create script with steps to process corrected data and call CNVs?** option is checked in the **Create PC-Corrected Project** step.
    * transposed/
        * Marker dominant **mdRAF** files with recalculated X, Y, LRR, and BAF values.
    * #_markersThatFailedCorrection.txt
        * List of markers that could not be PC-corrected
    * AB_lookup_parsed.dat
    * .csv manifest (Illumina projects only)
    * markerPositions.txt


### PC-Corrected Project Workflow

Some steps will be flagged as already completed. These are noted below with **Output Already Exists!**

_<span style="text-decoration:underline;">Underlined steps are required for CNV calling.</span>_ Other steps are optional.



1. _<span style="text-decoration:underline;">Transpose Marker Files to Sample Files</span>_
    * Will create **sampRAF** iles in **/samples**
2. Run Marker BLAST Annotation
    * **Output Already Exists!**
3. _<span style="text-decoration:underline;">Compute Sample QC Metrics</span>_
4. _<span style="text-decoration:underline;">Identify Excluded Samples</span>_
5. Generate AB Lookup File
    * **Output Already Exists!**
6. Run Sex Checks
7. Create PLINK Genotype Files
    * **Output Already Exists!**
8. Run GWAS QC
    * **Output Already Exists!**
9. _<span style="text-decoration:underline;">Annotate Sample Data File</span>_
10. Identify Mosaic Chromosomal Arms
11. _<span style="text-decoration:underline;">Compute Population BAF files</span>_
12. _<span style="text-decoration:underline;">Create Sex-Specific Centroids; Filter PFB file</span>_
13. Compute GCMODEL File 
    * **Output Already Exists!**
14. _<span style="text-decoration:underline;">Call CNVs</span>_
    * Change **8. Output filename** to **cnvs/genvisisPC#.cnv**
15. _<span style="text-decoration:underline;">Filter CNVs</span>_
    * Change 1.1 to **cnvs/genvisisPC#.cnv**
    * Change 9 to **cnvs/filteredPC#.cnv**
16. _<span style="text-decoration:underline;">Process CNVs and Create HMM File</span>_
    * Part 2.2 defaults to **cnvs/genvisis.cnv**. Change to **cnvs/filteredPC#.cnv**.
    * Part 6: Output HMM filename change to **hmm/genvisisPC#.hmm**
17. Generate Genotype Mask
18. Run Marker QC Metrics
19. Run Ancestry Checks
20. Run Further Analysis QC
21. Identify Problematic Markers
22. Create Mitochondrial Copy-Number Estimates File
23. Create VCF Files for Imputation


## 


## Running Genvisis Via Script



1. Genvisis workflow steps can be run in a high performance computing environment via scripts.
2. In the lower right hand corner of the Workflow window is the button **Export to Text**.
    1. Clicking this will produce a **.toml** file that lists which Genvisis steps to run and a **.slrm** file for the SLURM (Simple Linux Utility for Resource Management) format in **[ProjectDir]/scripts/**.
    2. A pop up window will say “GenvisisWorkflow command file written to **[ProjectDir]/scripts/[toml file name]**.” The pop up window will also have a **Copy to Clipboard** button that will copy the path to the **.toml** and **.slrm** files.
3. Here is a sample **.toml** file created for the Run Marker BLAST Annotation step:

    ```
    ## Genvisis Workflow Command File
    ## Genvisis Version: 0.1.16 (interim build f4ee9bb)
    ## Created 2022.07.16 at 04:17:21PM

    [project]
    file = '/home/userName/projects/SampleProject.properties'

    [targets]

     [targets.illumina-blast]
    	manifest = '/home/SampleProject/Phase3/HumanOmniExpressExome-8-v1-1-C'
    	positionOverrides = ''
    	threads = 24
    ```


4. The associated **.slrm** file:

    ```
    #!/bin/bash
    #$ -cwd
    #$ -S /bin/bash
    #SBATCH --error=%x.%j.e
    #SBATCH --output=%x.%j.o
    #SBATCH --mail-type=END,FAIL
    #SBATCH -N 1
    #SBATCH -n 1
    #SBATCH --mem 100G
    #SBATCH --time=24:00:00
    echo "start GenvisisWorkflow.SampleProject.2022.07.16_04_17_21PM at: " `date`
    echo "host/node: " `/bin/hostname`
    cd /home/SampleProject/Phase3/
    java -Xmx90G -Djava.awt.headless=true -jar ~/genvisis.jar org.genvisis.cnv.workflow.GenvisisWorkflow "/home/SampleProject/Phase3/scripts/GenvisisWorkflow.SampleProject.2022.07.16_04_17_21PM.toml"
    echo "end GenvisisWorkflow.SampleProject.2022.07.16_04_17_21PM at: " `date`
    ```


5. SLURM settings:

    **error**: name of error file (appends timestamp and submission number to file name)


    **output**: name of log file


    **mail-type**: email the user when either the job successfully ends or fails


    **N**: number of nodes


    **n**: number of processors per node


    **mem**: memory requested


    **time**: walltime requested

6. In **java -Xmx90G -jar ~/genvisis.jar**, notice we request 90GB of RAM for Genvisis while above in **#SBATCH --mem=100gb**, we request 100GB from the node. Genvisis automatically lowers the amount of memory reserved for Java by 10% of the total memory request to provide overflow space for any meta-tasks that may need to occur beyond the specific Genvisis step. **-Xmx#** can be edited as the user sees fit relative to their environment and data needs.
7. Submit the **.slrm** file using:

    ```
    sbatch -p partionName fileName.slrm
    ```


8. If you receive the error message **script is written in DOS/Windows text format** when trying to submit the job (due to generating the .slrm file on a PC and then moving it to an HPC environment), you’ll need to convert the file with **dos2unix**:

    ```
    dos2unix [fileName].slrm
    ```


9. After submitting your job, you can check on its progress with **squeue -u [userName]** or **squeue -a --me**. Potential status (**ST**) codes are:

    CD - Completed; The job has completed successfully.


    CG - Completing; The job is finishing but some processes are still active.


    F - Failed; The job terminated with a non-zero exit code and failed to execute.


    PD - Pending; The job is waiting for resource allocation. It will eventually run.


    PR - Preempted; The job was terminated because of preemption by another job.


    R - Running; The job currently is allocated to a node and is running.


    S - Suspended; A running job has been stopped with its cores released to other jobs.


    ST - Stopped; A running job has been stopped with its cores retained.

10. To cancel a job, use **scancel [jobIdNumber]**


## 


## Running Genvisis From the Command Line

Help for specific Genvisis steps can be found by running:


```
    java -jar genvisis.jar org.genvisis.cnv.filesys.[stepName] -h 
    # or
    java -jar genvisis.jar org.genvisis.cnv.filesys.[stepName]
```


To view what commands Genvisis can use from the command line, run:


```
    java -jar genvisis.jar org.genvisis.cnv.workflow.GenvisisWorkflow
```


This command yields:


```
    1)  java -jar ~/genvisis.jar org.genvisis.cnv.workflow.GenvisisWorkflow [CONFIG FILE]
    2)  java -jar ~/genvisis.jar org.genvisis.cnv.workflow.GenvisisWorkflow check [CONFIG FILE]
    3)  java -jar ~/genvisis.jar org.genvisis.cnv.workflow.GenvisisWorkflow targets [PROJECT PROPERTIES FILE]
    4)  java -jar ~/genvisis.jar org.genvisis.cnv.workflow.GenvisisWorkflow create [PROJECT PROPERTIES FILE] [TARGET ID ... ]
    5)  java -jar ~`/genvisis.jar org.genvisis.cnv.workflow.GenvisisWorkflow [TARGET ID] [PROJECT PROPERTIES FILE]

    Option 1) Run Genvisis Workflow using the given config file
    Option 2) Check if a given workflow file can be run
    Option 3) List which targets are available for a given project
    Option 4) Create a config file for the given project and include default arguments for any specified targets
    Option 5) Print out the target key and default arguments, which can be customized and added to a config file
```


[CONFIG FILE] is a .toml file.


## 


## Import an Existing Project Into Genvisis



1. **File** → **Import Project**
2. The **Genvisis Project Import** pop-up window will appear. There will be a list of requirements with red x’s next to them
3. Click **…** next to **Project Directory**
4. Choose the directory of an existing project and click **Select**
5. **New Project Name** will now contain the name of the project. The red x’s will turn green if nothing is missing.
6. Click **OK** to load the project.


## 


## Toolbar



1. File
    * New Project
    * Import Project
    * Select Project
    * Delete Project
    * Project Properties Editor
    * Open Project Directory
    * Preferences
    * Check for updates
    * Exit
2. Data
    * Audit Linker and Pedigree files
    * Audit Samples and Markers (generate paragraph)
    * Map .csv files to IDs
    * Add data to SampleData
    * Genvisis Project Workflow
3. Quality
    * Scan for CNPs
    * Filter marker metrics
    * Tally marker annotations
    * Tally without determining dropped markers (much faster)
    * Tally all clustered markers
4. Plots
    * Scatter Plot
    * Trailer Plot
    * Comp Plot
    * Mosaic Plot
    * Ancestry Plot
    * Sex Plot
    * 2D Plot
    * QQ Plot
    * Forest Plot
    * Manhattan Plot
5. Tools
    * Export to PLINK format
        * Generates PLINK files using the FID/IID IDs in linker.txt
        * Exports only high quality samples and no duplicates
        * In contrast, the [Create PLINK Files](#bookmark=id.63l2u3cxpdhk) step generates files using a DNA/DNA scheme that the [Run GWAS QC](#bookmark=id.m7fdh7nl2xz0) step requires, and includes all samples.
        * Inputs
            * Pedigree File
            * Target Markers FIle
                * A list of markers to base the PLINK files on.
                * One marker per row.
                * Markers in the project, but not in the target file, will be ignored.
                * Leave this option blank to use all markers in PLINK file generation.
            * Cluster Filter File
                * The list of cluster filter files is generated from any file ending with “*clusterFilters.ser” in the project’s data/ directory. The clusters can be manually added from within the ScatterPlot module.
            * AB Lookup File
            * Export Filetype
                * Export files as text or binary
            * PLINK Output Fileroot
                * Files will be generated with this name.
                * Eg. **plink** will generate plink.bim, plink.bed, plink.fam.
                * Eg. **plink/subset/plink** will generate a sub directory named subset/ containing plink.bim, plink.bed, plink.fam.
                * There is an Overwrite option that will replace pre-existing files with the same name.
            * GC Cutoff
                * The minimum GC quality score for a sample to be exported.
                * Default is 0.15.
    * Export to VCF format [DEPRECATED]
    * Export for imputation [DEPRECATED]
    * Generate PennCNV files
    * Compute MedianLRR for Regions
    * Parse raw PennCNV results files
    * Parse BPM to CSV file
    * Compute custom centroids file
    * De Novo CNV
    * Export CNVs to Pedfile format
    * Parse workbench files
    * Principal Components
        * Generate Manhattan Plots
        * Generate PC crosstabs
        * Generate data column matrix
    * Generate a demo package
6. Help
    * Contents
    * Search
    * About


## 


## Toolbar Icons


### Project Properties Editor



1. All of the parameters for a project are stored in the project properties file.
2. This editor allows project properties to be changed.
3. **.genvisis/projects/** contains **.properties** files for all projects. Project properties can be edited in these files in addition to using the **Project Properties Editor**.


### Refresh


### Genvisis Project Workflow


### Scatter Plot

Samples are plotted in scatter plot format with one plot per marker.

You can zoom in and out with the scroll wheel of a mouse. Move a zoomed in plot around by holding down right click (Windows) or control-click (Mac).

Point colors change between autosomal and sex chromosomes for quick identification when scrolling through large numbers of markers. For autosomes, AA is dark blue, AB is red, and BB is purple. On sex chromosomes, AA is green, AB is light blue, and BB is indigo.

Marker lists can be created, loaded, edited, and deleted under File.

The first time scatterplot is opened, Genvisis will generate the file **data/exampleScatterPlotMarkers.txt** with 10 random markers in order to have something to display.

On the right hand side, under **View Controls**, the option **Display Mendelian Errors** will draw lines between samples that have Mendelian errors. Blue is used for mother-offspring and green for father-offspring errors.

In the upper right hand corner of the screen is a window with four tabs: **Control**, **Centroid**, **GC Adjust**, and **Annotation**.

In the **Annotation** tab, you can enter a description in the “enter new annotation here” box. It will then be entered into the list of existing annotations with the first letter of the annotation now available as a hotkey, e.g., Monomorphic and Extra heterozygote clusters are default annotations. When viewing a marker, if you hit ‘m’ or ‘e’, the marker will be flagged for that annotation and you’ll automatically move to the next marker. In this way, you can very quickly move through markers, hitting only the annotation shortcuts on the keyboard.

High quality markers have tight clusters with A/A on the X-axis, B/B on the Y-axis, and A/B in the middle of the plot.

Once [Marker BLAST Annotation](#bookmark=id.7bgym82y1ze5) has been run, the **BLAST Metrics** tab in the lower right hand corner of the window will include data about the marker. This Includes the metrics Has **Perfect Match?**, **# Off-Target Alignments**, and **# On-Target (mismatched) Alignments (>80.0% match)**.



1. Click the button **Show BLAST Results** to load the **BlastViewer**
    * The first row in the viewer is the probe sequence that Illumina reported and what nucleotides the A and B alleles are
    * The subsequent rows are the results of the BLAST and what locations the sequence is matching to
    * When examining off target matches, look at what allele is present. For example, if the off target match has the B allele, the values in the scatterplot will be above the x-axis, which represents the A allele.
    * If the off target matches are a mixture of both alleles (multiple off target matches), the data will be offset from both axes
    * Complementary nucleotides can appear as alleles in off target matches since they share the same fluorescent tag as the known allele. For example, C is the alternate allele and an off target match lists G as the allele.
2. In the Scatter Plot window, click **File -> New Marker List**. This produces a pop up window where you can paste marker IDs and limit the scatterplots shown to just those instead of thousands. The list of IDs must be saved to a dir with **File name (full path):** in order to use them.
    * To add markers to an existing list, use **File -> Edit Existing Marker List**


### Trailer Plot

This will load all of the markers for one individual and orient them based on genomic position separated by chromosome. The first plot that loads is the first chromosome of the first sample. In the center will be the sample ID, a blank text box with left and right arrows that is not relevant unless using a region list file, and a text box with right and left arrows identifying the chromosome and the base pairs visible (eg. chr1:1-249,218,902). If you zoom in, the base pairs listed will change to reflect what is present on screen.

Two plots are visible: Log R Ratio and B Allele Frequency. Both plots will have a gap where there is no data due to the chromosome’s centromere. The center of the Log R Ratio plot is a gray line that is equal to 0. A Log R Ratio of 0 implies a copy number of 2, or a normal copy number (a population normalized average of 0). Markers don’t fall perfectly on the line, but in a normal diploid genotype, we will see a tight standard deviation around 0. Conversely, markers significantly below 0 indicate a deletion and significantly above indicate a duplication. An individual marker can be noisy, so we look for numerous markers in a row before believing there is a deletion or duplication. A SD of 0.1 is good, 0.25 is borderline acceptable, 0.32 to 0.5 is sample failure, and above 0.5 is bad.

The B Allele Frequency plot shows if there are 0, 1, or 2 copies of the B allele. This is presented as a frequency, or 0, 0.5, or 1. Only those 3 bands are expected in a diploid genotype (AA, AB, or BB). An individual with a deletion will only have a marker at 0 or 1 (either only one B allele or only one A allele). A duplication will appear as 0, 0.33, 0.66, or 1 (AAA, AAB, ABB, or BBB). If more than 4 bands appear, this is probably due to contamination. Two samples mixed together would lead to 4 alleles at each locus, or 5 bands at 0, 0.25, 0.5, 0.75, and 1. More than 5 bands means contamination from more than 2 samples. A weird CNV can cause multiple banding, but if you see the same number of bands genome wide, then it’s contamination.

We’re not interested in markers near 0 or 1 on the BAF plot, but in between the two. Anything between 0.15 and 0.85 is considered a heterozygous call.

The BAF and LRR plots should be read in conjunction with each other. If the BAF plot has only two bands at 0 and 1 and the LRR plot shows markers below the median at that location, it’s a deletion. If the LRR plot is centered at the median instead, this is more likely a run of homozygosity and an indication that the subject’s parents were closely related, such as cousins. If the BAF plot shows a split pattern, but the two bands aren’t near 0.33 and 0.66, this can be a mosaic duplication, deletion, or uniparental disomy (UPD), where the subject inherited two chromosomes from the same parent. The alteration is UPD if the median LRR is centered on the line, and mosaic duplication or deletion if above or below. The more cells that have the alteration, the further the two BAF bands will be apart and the easier it will be to tell if the LRR markers are above, on, or below the median line.



1. **File** -> **New Region List File**
2. A pop up window appears named:
    * **Sample IDs with (optional) UCSC regions and comments (tab-separated, one set per line):**
    * For example:
        1.  202030300404	chr1:55-345	Signs of contamination
3. If a UCSC is not provided, Genvisis assumes you are looking at chr1. It is the largest chromosome and usually representative of the rest.
4. Under **File name (full path):** is a text field with a **…** button. You need to provide a location to save the region list file.
5. Click **Create**. The text field in the center of the screen that was blank (and is above the field identifying the chromosome and base pairs visible) will now be populated with index numbers for the region list, e.g. 1 of 24.
6. **Show QC** option on the trailer plot toolbar has 3 options:
    * Hide QC
    * Genome
    * Region
7. Choosing Genome or Region will display stats between the two text fields. If you select region, zooming will change the stats as they are for the region visible on the plot.
8. Colors option on the trailer plot toolbar has 3 options:
    * Default
    * GC content
    * custom
9. For GC content, blue is lower GC content and red is higher. Regions with a high GC content have a low intensity on average.
10. If a Log R Ratio plot is wavy, color code it by GC content. If the peaks and values correspond to GC content, you can clean this up with the **Adjustments** option on the toolbar:
    * Adjust by GC content
    * Adjust with gc parameter file
11. Adjust by GC content will smooth out a wavy plot if that was the issue.

	To add Marker Stats to the Trailer Plot, run:


```
    java -jar ~/genvisis.jar org.genvisis.cnv.analysis.MarkerStats proj=~/[path to .properties file for project] out=marker_lrr_sd.xln
```



### Comp Plot

Displays CNV calls per chromosome. The chromosome and position on it currently displayed are described in the text box in the top center of the window. The chromosome being viewed can be changed with the arrow buttons. Zoom in and out with a mouse scroll wheel. Click and drag the screen to move left or right on the chromosome.

The lengths of the bars correspond to the lengths of the calls in basepairs.

On the right is the option **Display Mode**. **Full** shows one sample per line. **Pack** removes the vertical space between calls, so multiple samples can be in the same row. A new row is only used when call share the same positions. **Collapsed** combines calls that are the same size and displays a number on the left end of the bar for how many calls are that length at that location.

Place the cursor over a call to get information about it. Calls can be opened in Trailer Plot either by clicking on an individual call and choosing **To Trailer: Selected** on the right, or **To Trailer: Visible** to load all calls on screen.

Multiple CNV call lists can be loaded and displayed at the same time. For example, you might have calls made by a different method on the same samples and want to compare them to what Genvisis produced. Genvisis stores cnv calls in **[ProjectDir]/cnvs/genvisis.cnv**. The calls that Comp Plot uses are listed in the **Project Properties Editor** on the main toolbar. In **Project Properties**, scroll down to the **CNV Files** header and there will be a field called **CNV_FILENAMES**. Click **+** next to it to add additional .cnv files. Then click **Save and Close**. If the new cnv calls do not show up in Comp Plot, it might be necessary to close and relaunch Genvisis.


### Mosaic Plot



1. When you place your cursor over a point, the point turns red and all the points that are chromosomes for the same individual turn yellow.
2. **File -> Hide Excluded** will remove samples previously marked as excluded from the plot
3. You can sort by chromosome in **Mosaicism.xln**, delete problematic chromosomes, and reload the Mosaic Plot to see it without them included (make a copy of **Mosaicism.xln** before deleting rows).
4. Clicking a point will bring up the sample id, chromosome, and chromosome arm. Clicking on this tag will open [Trailer Plot](#bookmark=id.97hpoj6puaps).
    * In the B allele frequency plot, if there are four bands instead of the normal three, the farther apart the center two bands are, the higher the percentage of cells that have the mosaicism event.
    * On the Trailer Plot toolbar, **CNV Calls -> Call Mosaicism** will place a red bar parallel to the Log R Ratio and the B Allele Frequency plots where Genvisis calculated mosaicism to be.
    * Putting the cursor over the red bar will show the start and stop position, length, and estimate score.
    * **CNV Calls -> Quantify Mosaicism** - force call region.
5. Whenever you click on a point, its id and chromosome arm are copied to the clipboard
        * These can be pasted into a text file and columns added for color coding points
        * For example	rs2452345	chr19p	1	likely duplication

        		rs4563456	chr19q 1	likely duplication


        		rs6765550	chr15q	2	deletion of whole chromosome

        * The integers 1 and 2 correspond to colors and are in a third column. The fourth column is for comments.
        * 1 = black; 2 = blue; 3 = purple; 4 = green; 5 = red; 6 = brown
        * Name the file **mosaic_colors.txt** and place it in **[ProjectDir]/data** and the mosaic plot will automatically color points.


### AncestryPlot

Click on raceImputations_step# on the left side of the plot to turn on PC1 and PC2. The HapMap samples are included and color coded (red = European, blue = Yoruban, purple = Chinese, green = Japanese). As the _step# increases, the axes become more level. The ImputedRace button under the x-axis will color the points based on what the predicted ancestry of the individuals is.


### Sex Plot

This plot shows the median log R ratio value of chrX on the x-axis and the median log R ratio value of chrY on the y-axis. Normal females will have high intensity on the x-axis due to having two X chromosomes and normal males will have high intensity on the y-axis due to having a Y chromosome. Individuals appearing elsewhere on the graph either have a condition such as Klinefelter’s or are noisy data.

Points in the Sex Plots can be clicked on to open trailer plots, which show every variant on chrX and chrY. The log R ratio plot will show the intensity of markers in relation to a median line. Most of a sex chromosome will have the intensity below the line, but in pseudoautosomal regions, such as the first 2.7 Mb of chrX will have a higher intensity than elsewhere in the chromosome. The B allele frequency plot shows the number of AA, AB, and BB markers. In pseudoautosomal regions, there will be a mixture of all three, as in an autosomal chromosome, because there are two alleles (one from chrX and one from chrY). Elsewhere in a sex chromosome, there are no AB markers.

Carats on the log R ratio plot (^ or v) represent intensities way above or way below the line. Females will have mostly down carats, or null genotypes, for chrY. Markers that do appear on chrY for female samples are global markers that cross hybridize and are therefore problematic.


### 2D Plot

Any text file with two columns can be loaded here and visualized as a scatter plot. If you include a third column named **Sample** with the sample IDs used in the project, you can use the color code options below the scatter plot.


### QQ Plot

QQ plot compares observed _p_-values from a GWAS to hypothesized _p_-values. A straight line distribution indicates a close 1:1 correlation. The more observed values deviate from hypothesized values, the more they will curve away from the hypothesized line. 

The lambda from the data is calculated and printed onto the QQ plot. Ideally, lambda should be ~1.0. Deviations, usually at the lower end of _p_-values, can indicate significant hits. Filtering for rare variants at MAF &lt;5% is best practice.

Takes as input a file with a header and at least two columns - SNP and _p_-value:


```
    SNP    P-value
    rs6012681    0.4427
    rs6012683    0.4384
    rs6012686    0.4229
```


The SNP column doesn't need to contain any specific information, such as chromosome or position.

Alternatively, QQ Plot can take a file with a header and at least three columns - chromosome, position, and _p_-value:


```
    Chr  	Pos  	P-value
    1   	12541586 0.4427
    1   	13576290 0.4384
    2   	11273187 0.4229
```


The chromosome column must contain integers (eg. **chr1** will cause an error).  This three column file can also be used in [Manhattan Plot](#bookmark=id.ed9dc5ie5xp1).

The column order in the input files doesn’t matter and there can be additional columns; Genvisis will detect the _p_-value column.

A QQ Plot of frequency instead of _p_-values can be made by not including a _p_-value column:


```
    SNP    Freq
    rs6012681    0.6873
    rs6012683    0.0011
    rs6012686    0.9955
```


A QQ Plot can also be generated from the command line with:


```
    java -jar genvisis.jar org.genvisis.cnv.plots.PlotUtilities results=[input file to parse] qq=TRUE qqMinMAF=0.05
```


The input file at the command line requires 3 columns - marker name/snp, _p_-values, and frequency:


```
    MarkerName    P-value    Freq
    chr11:12541586:A:G    0.4427    0.6873
    chr8:102803998:G:A    0.8713    0.0011
    chr13:55101557:T:C    0.9473    0.9955
```


The marker name/snp column either must contain chromosome and position information, or a map file has to be included separately (eg. `map=plink.bim`). Frequency can also be included in a separate file (eg. `freq=plink.frq`). The column order in the input files doesn’t matter and there can be additional columns.  The results files from SNPTest (`combined.results`) or METAL (`*_InvVar1.out`) can be used as input with no changes necessary.  The output is **[input_file]_ topmed_rebuild_QQ_data_qqPlot_MAF_Filtered.png**


### Forest Plot


### Manhattan Plot

Manhattan Plot shows the _p_-values for variants included in a GWAS. It is helpful as a visual check to see if there are any hits and where any significant regions are, as well as the general distribution of _p_-values for the data.  The plot displays a threshold of 10<sup>-5</sup> and a significant threshold of 10<sup>-8</sup>.  

Takes as input a file with a header and at least three columns - chromosome, position, and _p_-value:


```
    Chr  	Pos  	P-value
    1   	12541586 0.4427
    1   	13576290 0.4384
    2   	11273187 0.4229
```


The chromosome column must contain integers (eg. **chr1** will cause an error).  Additional columns in the file will be listed in the **Load File** pop up window with checkboxes next to them (default is off). There is also a **P-Value Filter** (default &lt;= 0.05) and **Select Chrs:** column (default is to load all chromosomes except for Chr0 or unknown chromosomes).

This three column input file can be used in [QQ Plot](#bookmark=id.2hvxgeocmoda) as well.

A Manhattan Plot can also be generated from the command line with:


```
    java -jar genvisis.jar org.genvisis.cnv.plots.PlotUtilities results=[input file to parse] manhattan=true hitwindows=true
```


The input file at the command line requires 3 columns - marker name/snp, _p_-values, and frequency:


```
    MarkerName    P-value    Freq
    chr11:12541586:A:G    0.4427    0.6873
    chr8:102803998:G:A    0.8713    0.0011
    chr13:55101557:T:C    0.9473    0.9955
```


The marker name/snp column either must contain chromosome and position information, or a map file has to be included separately (eg. `map=plink.bim`). Frequency can also be included in a separate file (eg. `freq=plink.frq`). The column order in the input files doesn’t matter and there can be additional columns.  The results files from SNPTest (`combined.results`) or METAL (`*_InvVar1.out`) can be used as input with no changes necessary.  The output is  **[input_file]_topmed_rebuild_Manhattan_data_manPlot.png**


## 


## Workflow Output and How to Interpret Results


### Illumina Data Sets



1. Create Marker Positions
    * **[ProjectDir]/markerPositions.txt**
        * This text file contains the name of the probe, the chromosome that the probe is on, and the position of the probe in the chromosome. Probes with chromosome and position set to 0 are considered no longer useful by the supplier of the probes.
    * Probe names are usually rsID, but can also have GSA-rsID from the GSA array, exmid from Exome Chip content, or #:#.
2. Parse Sample Files
    * **[ProjectDir]/samples**
        * Contains **.sampRAF**, which are sample dominant files.
    * **[ProjectDir]/ListOfMarkers.txt**
    * **[ProjectDir]/ListOfSamples.txt**
    * **data/markers.ser**
        * **markers.ser** contains the Marker Detail Set, or information about all markers in the project (eg. what chromosome the marker is on; what position the marker is at). No marker details are contained in the **.sampRAF** files; only marker data unique to each sample is present.
        * The markers in the **.sampRAF** files and **markers.ser** are in the same order, which allows marker details to be paired with the markers of a sample. If a **.sampRAF** file or the **markers.ser** file is modified, its checksum will change, and the files will have to be recreated as the order of markers in each file can no longer be assumed.
    * **data/samples.ser**
    * **samples/outliers.ser**
        * The **.sampRAF** and **.mdRAF** files are compressed using half-precision floats; values are limited to the range -32 to 32. This leads to a loss of precision at the fourth decimal place, but this doesn't have a meaningful effect on Genvisis analyses. In most Illumina data sets, the X and Y values tend to be in the range 0 to 3. Any values outside of the -32 to 32 range are stored in **outliers.ser** with only a dummy placeholder where that value would have resided in the **.sampRAF** and **.mdRAF** files.
        * A hashtable containing the same outlier values is also present at the end of each **.sampRAF** and **.mdRAF** file, which allows **outliers.ser** to be recreated if it ever gets deleted.
3. Run Marker BLAST Annotation
    * **[ProjectDir]/Blasts** 
        * Contains a zipped file for every thread used.
    * **[ProjectDir]/data/blast.vcf.gz**
    * **[ProjectDir]/data/blast.vcf.gz.tbi**
        * An index of **blast.vcf.gz**
    * Data in the **blast.vcf** file can be used to judge the quality of a particular marker.
    * **blast.vcf.gz** contains eight columns:
        * CHROM - chromosome number
        * POS - position
        * ID - marker ID
        * REF - reference allele
        * ALT - alternate allele
        * QUAL - quality information
        * FILTER - filter information
        * INFO
            * ALIGNMENT_HISTOGRAM=#
                * Number of alignments
            * BLAST_EVALUE_COUNTS=#
                * The confidence BLAST has that it got the right location
            * MARKER_GC_CONTENT=#
                * The percentage of the 50 base pairs that are a G or a C
                * 0.42 is the average across the genome
                * An A binds with a T using two hydrogen bonds, whereas a G binds with a C using three hydrogen bonds. So a region with a higher GC content will lead to tighter bonds and require more energy to break apart. This will affect the amount of DNA that binds to the probe and alter the intensity values that Genvisis uses to call copy number variation.
            * OFF_T_ALIGNMENTS=#
                * Number of off target alignments that are different from what the manifest reported.
            * ON_T_ALIGNMENTS_NON_PERFECT
                * Number of alignments that are are less than 50 perfect matches (e.g., 49 matches and one mismatch).
            * PERFECT_MATCH
                * Lists number of base pairs matched, chromosome matched on, and the position on the chromosome matched
    * A perfect match of 50 for a probe is ideal. If all 50 base pairs match, that indicates that the probe will hybridize to this region of the genome.
    * If the probe sequence matches to multiple locations in the genome or to no locations, then those markers will be set to chr0.
    * The reference and alternate alleles are usually a single nucleotide each. For the chr0 markers, **REF** may be set to N and **ALT** set to two nucleotides if BLAST can’t identify the appropriate reference allele.
    * To quickly identify the percentage of high quality matches, divide the number of high quality lines by the total number of lines.
        * Linux example

            ```
            # Number of lines where Off Target and Non-Perfect alignments are null and there is a # perfect match of 50:
            zcat blast.vcf.gz | grep "OFF_T_ALIGNMENTS=\." | grep "ON_T_ALIGNMENTS_NON_PERFECT=\." | grep "PERFECT_MATCH=50" | wc -l

            # Total number of lines in the file:
            zcat blast.vcf.gz | wc -l
            ```


    * Once Marker BLAST Annotation has been run, the **BLAST Metrics** tab in [Scatter Plot](#bookmark=id.9sahd1n5px3d) will include data about each marker. 
4. Transpose Data into Marker-Dominant Files
    * **[ProjectDir]/transposed**
        * Contains **.mdRAF** files, which are marker dominant files.
        * **.sampRAF** structure:
            * Sample1	Marker1
            * Sample1	Marker2
            * Sample2	Marker1
            * Sample2	Marker2
        * **.mdRAF** structure:
            * Marker1	Sample1
            * Marker1	Sample2
            * Marker2	Sample1
            * Marker2	Sample2
    * **transposed/outliers.ser**
    * Having data duplicated between sample dominant and marker dominant files allows Genvisis to search files and present data faster depending on whether one sample and all of its markers are being examined (as in [Trailer Plot](#bookmark=id.97hpoj6puaps)) or one marker across all samples is being examined (as in [Scatter Plot](#bookmark=id.9sahd1n5px3d)).


### Affymetrix Data Sets



1. Create Marker Positions
    * **markerPositions.txt**
    * **GenomeWideSNP_6.na35.annot.rsLookup.txt**
2. Process Affymetrix CEL Files
    * **[ProjectDir]/transposed**
        * Contains **.mdRAF** files, which are marker dominant files.
    * **transposed/outliers.ser**
        * The outlier file tends to be small for Illumina data sets, but Affymetrix projects have much larger values on average. This can increase the number of outliers in a dataset and make it such that **outliers.ser **becomes inefficient and no longer leads to the compression it was designed to achieve. In those cases, Genvisis uses a linear scaling factor (e.g., divide all values by 100) to force nearly all values to be less than 32. 
        * If Genvisis detects that the default scale factor of 1.0 is not sufficient (too many outliers are being found), then **Parse Samples** (Illumina projects) or **Process Affymetrix CEL Files** (Affymetrix projects) will automatically restart with a larger scaling factor.
    * See [Transpose Data into Marker-Dominant Files](#bookmark=kix.mud9h5lhzq9x) for a detailed explanation of the **.mdRAF** files.
3. Transpose Marker Files to Sample Files
    * **[ProjectDir]/samples**
    * **[ProjectDir]/ListOfMarkers.txt**
    * **[ProjectDir]/ListOfSamples.txt**
    * **data/markers.ser**
    * **data/samples.ser**
    * **samples/outliers.ser**
4. Run Marker BLAST Annotation
    * **[ProjectDir]/Blasts** 
        * Contains a zipped file for every thread used.
    * **[ProjectDir]/data/blast.vcf.gz**
    * **[ProjectDir]/data/blast.vcf.gz.tbi**
        * An index of **blast.vcf.gz**
    * See [Run Market BLAST Annotation](#bookmark=kix.da6xe975e607) for a detailed explanation of the BLAST files.


### All Data Sets 



5. Compute GCMODEL File
    * **[ProjectDir]/data/custom.gcmodel**
        * Lists the average GC content for every probe.
6. Compute Sample QC Metrics
    * **lrr_sd.xln**
    * Each row in the file is a sample. Each column is a QC metric.
        * LRR_AVG - Average log R ratio or average intensity
            * Tells us about the relative amount of DNA compared to other samples
            * Log R ratio is population normalized
        * LRR_SD
            * Standard deviation of the LRR average
            * If standard deviation is high, this is an indication that it’s a low quality sample
            * Start worrying when LRR_SD is above 0.32. Beyond 0.5 is a sample failure.
        * LRR_SD_-2.0_2.0
            * LRR_SD calculated only from markers within the range of -2.0 to 2.0
        * Genotype_heterozygosity 
            * Also known as genotype call rate
            * Worry if this drops below 0.95 (or below 0.98 in an Illumina dataset because Illumina uses longer probe sequences of 50bp, as opposed to 25bp in Affymetrix, which leads to higher quality intensity and less noise)
        * LRRMedians per chromosome
            * Adds chromosome median_chr# columns for chr0 to chr24
    * **audit/ExcludesUsing25lrrsd98callrate3bafsd.xln**
    * Additional **ExcludesUsing…** files
        * An **ExcludesUsing…** file can be imported into GenomeStudio [to exclude samples](https://docs.google.com/document/d/1BMu1zp8er9NY-QFRh-7ZOeX1HnGj_yAYYh3BarASwPY/edit#bookmark=kix.yottty4qdww0) for Phase 3 clustering and CNV calling.
    * **audit/ExploreThresholds.out**
        * Describes how many samples were excluded under different thresholds and rates the quality of the data set based on this (high quality, low quality, or very low quality).
    * **results/Mosaicism.naive.xln**
    * **results/Mosaicism.naive.agnostic.xln **
    * **results/Mosaicism.naive.agnostic.xln.filtered**
    * **results/Mosaicism.naive.forceCall.xlnc**
    * **results/Mosaicism.naive.genomeSummary.xln**
7. Identify Excluded Samples
    * Adds two columns to the file **[ProjectDir]/data/SampleData.txt**
        * **CLASS=EXCLUDE** (0 or 1)
        * **ExcludeNote** (a description of why the sample was excluded)
    * **[ProjectDir]/audit/ExcludedSamples.xln**
        * Contains columns **Sample ID**, **Exclude**, **ExcludeNote**, **LRR_SD**, **Genotype_callrate**, and **BAF1585_SD**.
8. Run Sex Checks
    * **[ProjectDir]/data/SampleData.txt**
    * **[ProjectDir]/results/sexCheck.xln**
    * **[ProjectDir]/results/sexCheck_regions.txt**
    * Adds the following columns to **SampleData.txt**
        * CLASS=Sex
        * CLASS=Estimated Sex
9. Generate AB Lookup File
    * **[ProjectDir]/AB_lookup_parsed.dat**
10. Create PLINK Genotype Files
    * **[ProjectDir]/plink**
        * **plink.fam**
            * FID (Family ID)
            * Within Family ID (IID)
            * Within Family ID of father (0 if father not in dataset)
            * Within Family ID of mother (0 if mother not in dataset)
            * Sex Code
                * 1 = male
                * 2 = female
                * 0 = unknown
            * Phenotype Value
                * 1 = control
                * 2 = case
                * -9/0/non-numeric = missing data if case/control
        * **plink.bed**
            * Primary representation of genotype calls at biallelic variants
        * **plink.bim**
            * All of the markers in the data set
    * Note: The FID and IID columns in the plink files use the id in the DNA column of linker.txt and _not _FID/IID. This is counterintuitive, but is done because Run GWAS QC requires the DNA id to work. The **Export to PLINK** format command under **Tools** will generate files with the expected FID/IID ids.
    * The files made in this step contain all samples and all markers. No filtering is performed.
11. Run GWAS QC
    * **[ProjectDir]/plink/quality_control/**
        * **[ProjectDir]/plink/quality_control/marker_qc/**
            * Data generated in this directory include files where individuals with more than 20% of the genome not having a valid call are removed, markers with similarly bad problems are removed, allele frequency check, check by missingness (**missingness.imiss** is based on the individual, **missingness.lmiss** is based on the locus or marker), and Hardy-Weinberg equilibrium is computed (hardy.hwe) under the assumption that all individuals are being used. This step determines the minimal set of useful markers and then LD prunes those for relationship and ancestry checks.
            * **marker_qc/miss_drops.dat**
                * A list of markers to drop
            * **marker_qc/miss.out**
                * A summary of why they were flagged to be dropped
        * **[ProjectDir]/plink/quality_control/sample_qc/**
        * **[ProjectDir]/plink/quality_control/genome/**
            * **plink.genome**
                * [File description](https://www.cog-genomics.org/plink2/formats#genome)
                * A pairwise comparison of all individuals
                * If two individuals are not related, Z0 column should be close to 1.0 (percentage of markers not in the same ancestor)
                * If a parent-offspring pair, Z1 expected to be close to 1.0 (meaning one of the two alleles is consistently shared between the individuals)
                * For sibling relationship, Z0 = 0.25, Z1 = 0.5, Z2 = 0.25
                * Identical twins or a blind duplicate will have Z2 = 1.0 and PI_HAT = 1.0 (the total percentage of the genome that is identical)
            * **plink.genome_relateds.xln**
                * A filtered version of plink.genome
                * The column **Type** lists relationships, such as duplicate, parent-offspring, or avuncular,grandparent,halfsibs
                * Samples that were redone by the original lab usually have _001 and _002 in their IDs, or _redo or _duplicate. Check for this when seeing duplicates.
                * The CALLRATE columns are used to determine which of the duplicates are used in the analysis. The smaller the CALLRATE value, the lower the missingness rate. Genvisis chooses the duplicate with the smaller CALLRATE value. The columns FID_KEEP, IID_KEEP, FID_DROP, and IID_DROP identify which samples were kept and which were dropped, respectively.
        * **[ProjectDir]/plink/quality_control/ld_pruning/**
        * **[ProjectDir]/plink/quality_control/ancestry/**
            * Contains the standard PLINK trio of .bed, .bim, and .fam
            * These contain a smaller set of markers that have been ld pruned.
            * We want markers that are independent, otherwise ld patterns can manifest themselves and principal components will pick up on that.
            * **unrelateds.txt** 
                * A list of unrelated samples. 
12. Run Ancestry Checks
    * **[ProjectDir]/plink/quality_control/ancestry/plink.bim_unambiguous.txt**
        * A list of unambiguous SNPs (throws out A-T and G-C matches). These are compared to the SNPs in **ancestry/unambiguousHapMap.bim**.
    * **ancestry/combo1.missnp**
        * Any SNPs that are missed in the merging of unambiguous SNPs and HapMaps. These are SNPs that are A-C in one and T-G in another. SNPs are automatically flipped in one of the data sets so that they match up.
    * **ancestry/combo2.misssnp**
        * Merging is repeated and any SNPs that are still missed go here. SNPs that are still missing at this point are probably a tri-allelic marker (eg. G>A,T or G to A in one dataset and G to T in another). The rsID can be searched on [dbSNP](http://ncbi.nlm.nih.gov/snp) to verify this.
13. Annotate Sample Data File
    * Adds additional columns to **data/SampleData.txt**
        * DuplicateId
        * Use
        * UseNote
        * Use_cnv
        * Use_cnvNote
        * mzTwinID
    * Also runs relationship checks and produces:
        * **[ProjectDir]/relationshipChecks.xln**
        * **discrepantRelationships.xln**
        * **trios.xln**
14. Compute Population BAF files
    * **data/custom.pfb**
15. Create Sex-Specific Centroids; Filter PFB file
    * **data/sexSpecific_Male.cent**
    * **data/sexSpecific_Male.cent.txt**
    * **data/sexSpecific_Female.cent**
    * **data/sexSpecific_Female.cent.txt**
16. Call CNVs
    * **AUTOSOMAL** Calling Scope:
        * **[ProjectDir]/cnvs/genvisis.cnv**
    * **SEX CHROMOSOMES** Calling Scope:
        * **cnvs/genvisis_23F.cnv**
            * ChrX female
        * **cnvs/genvisis_23M.cnv**
            * ChrX male
        * **cnvs/genvisis_24M.cnv**
            * ChrY
17. Filter CNVs
    * **[ProjectDir]/cnvs/filtered.cnv**
    * **filtered.cnv.ind.ser.gz**
        * An index used in [Trailer Plot](#bookmark=id.97hpoj6puaps).
    * **cnvs/cnvsByLrrSd/**
        * Contains **genvisisCnvsByLrrSd.xln**, **filteredCnvsByLrrdSd.xln**, **genvisisCnvsByLrrSd.png**, and **filteredCnvsByLrrdSd.png**
        * These files list the LRR_SD, LRR_SD_-2.0_2.0, and CNV count for each sample. The .xln files can be loaded into [2D Plot](#bookmark=id.jdj8wh4uno2i) to visualize the relationship between LRR_SD and number of CNVs called per sample.
        * The .png files are 2D Plots of the CNV counts by LRR_SD for quick reference. Use 2D Plot for higher resolution.
        * As the number of CNV calls increases, more are being identified, but there is a tipping point where too many CNV calls are most likely false positives (a rule of thumb is to treat CNV counts &lt; 100 as real).
        * The filtered CNV counts can be used to refine the LRR_SD threshold in **Step 8: Identify Excluded samples**, to further improve CNV calling.
18. Process CNVs and Create HMM File
    * **[ProjectDir]\hmm\genvisis.hmm** 
        * Contains average values for all markers with a copy number of 1, 2, etc., giving parameters customized to the data
    * **cnvs\genvisisHMM.cnv** and **cnvs\filteredHMM.cnv**
        * If **7: (optional) Call CNVs with new HMM file** was checked
19. Generate Genotype Mask
    * **[ProjectDir]/MendelZeroer/**
        * **cnv.clst**
        * **cnv.zero**
        * **mosaic.clst**
        * **mosaic.zero**
        * **zeroMap.txt**
20. Run Marker QC Metrics
    * Produces output in **[ProjectDir]/results**
        * **results/markerQualityChecks.xln** contains the quality metrics that were generated and can be used to filter markers as high quality or low quality
            * These metrics are based on intensity data. In contrast, PLINK uses Hardy-Weinberg equilibrium.
            * This file is useful to check for markers having batch effects
                * The column BatchEffect_BATCH_n=# contains _p_-values from a test of batch effects for each sample
                    1. Eg. If batches are found to have fundamentally different intensities, they can then be reclustered separately
                * The column DuplicateErrors will be populated if you previously flagged duplicates, and can be used to see how many times a duplicate creates an error and inconsistency between duplicates.
                * The column MendelianErrors is used if you have families flagged in the data set.
        * **results/markerQualityChecks_BATCH_ALLELIC_batchEffects.out** 
            * Only present if a [batch file](#bookmark=id.bq33flkl0d7f) was used.
            * Tests allelic batch effects.
            * Tests whether frequency is different from one group to another. This performs logistic regression by batch/source (e.g. CBP=1 if not =0). 
            * Column reports _p_-value for marker which indicates difference between the batch/source.
            * If you find significant _p_-values, you can view the markers in [Scatter Plot](#bookmark=id.9sahd1n5px3d).
                * **File** > **New Marker List** > **…** next to the field for **File Name**
                * Chose a location and name for the marker list and hit **Save**
                * Copy and paste marker names with significant _p_-values into the **Marker names** text box.
                * The levels set in the Class=Batch/Source column will be present in the **Color code by:** toggles below the scatter plot. Samples can be excluded by clicking source name.
            * When mixed colors in the middle X-Y plot > seeing a shift (not causing a problem).
        * **results/markerQualityChecks_BATCH_MISSINGNESS_batchEffects.out**
            * Only present if a [batch file](#bookmark=id.bq33flkl0d7f) was used.
            * Tests allelic batch effects.
            * Tests if call rate is different by batch/source.
        * markerQualityChecks.mendel
        * combined.criteria
        * exclusion.criteria
        * review.criteria 
        * markersToReview.out
        * markersToExclude.out
        * markersToReviewCombined.out
21. Run Further Analysis QC
    * **[ProjectDir]/plink/quality_control/further_analysis_QC/**
22. Identify Mosaic Chromosomal Arms
    * **[ProjectDir]/results/Mosaicism.xln**
        * Contains two rows per chromosome per sample, one for each arm (eg. chr6p, chr6q)
        * If there are no markers on the arm, such as the acrocentric chromosomes (chr13, 14, 15, 21, and 22 p-arms), it won’t produce a row for that arm.
        * **LRR N** - number of markers with a valid LRR value
        * **mean LRR**
        * **BAF N** - number of markers with a valid BAF value
        * **SD of BAF** - 
        * **IQR of BAF** - Interquartile range; difference between 25th and 75th percentiles
            * Both BAF columns are measures of dispersion/variance
        * **%Homo** - percentage of homozygosity. Usually high (above 60%), but very high can indicate uniparental disomy or inbreeding leading to runs of homozygosity
        * **ForcedCallArmPercentMosaicism** - the result of assuming an entire arm is mosaic and then calculating what percentage of cells have the mosaic event
            * -1 value if not enough data to make a determination
        * **NumberRegionsDetected** - Number of mosaic events identified
        * **ProportionArmCalledMosaic** - mosaicism calls are made using the BAF and the detailed results are in **results/Mosaicism.agnostic.xln**
            * **BpCalledMosaic** and **BpInArm** are the numerator and denominator for **ProportionArmCalledMosaic**
    * **results/Mosaicism.agnostic.xln**
        * Contains results from calling mosaicism on chromosomes based on the B allele frequency
    * **results/Mosaicism.agnostic.xln.filtered**
    * **results/Mosaicism.forceCall.xlnc**
    * **results/Mosaicism.genomeSummary.xln**
    * **results/aneuploidyEvaluation.xln**
    * This data is visualized with [Mosaic Plot](#bookmark=id.d33cookcydr0).
23. Identify Problematic Markers
    * **data/drops.dat**
24. Generate Principal Components
    * **[ProjectDir]/PCA/PCA_GENVISIS**
25. Create PC-Corrected Project
    * **[ProjectDir]/pcCorrected_#PCs_[correction type]_[sex chr strategy]**
        * Eg. **pcCorrected_20PCs_XY_BIOLOGICAL**
    * This subdirectory contains a new Genvisis project with a **/transposed** dir containing the PC corrected samples.
        * X and Y are transformed based on the nearest genotype cluster using the number of principal components specified by the user. LRR and BAF are recomputed based on the new X and Y values.
    * This new project will appear in the upper right corner of the Genvisis GUI.
        * [You can now run this new project up to cnv calling and optimization a second time](#bookmark=id.f9nqogg40tlr).
26. Create Mitochondrial Copy-Number Estimates File
    * **[ProjectDir]/**
        * PCA_MITO_wGC.MitoMarkers.RawValues.txt
        * PCA_MITO_wGC.MitoMarkers.MarkersUsed.txt
        * AllMitoMarkers.txt
    * **[ProjectDir]/PCA/PCA_MITO_wGC/**
        * PCA_MITO_wGC.PCs.extrapolated.txt
        * PCA_MITO_wGC.PCs.SingularValues.png
        * PCA_MITO_wGC.PCs.SingularValues.txt
        * PCA_MITO_wGC.PCs.MarkerLoadings.txt
        * PCA_MITO_wGC.PCs.txt
        * PCA_MITO_wGC.PCs.MarkerReport.txt
        * PCA_MITO_wGC.samples.USED_PC.txt
        * PCA_MITO_wGC.samples.QC_Summary.txt
        * PCA_MITO_wGC_lrr_sd.txt
        * PCA_MITO_wGC_markers_ABCallRate.txt
        * PCA_MITO_wGC_markerQC_BATCH_MISSINGNESS_batchEffects.out
        * PCA_MITO_wGC_markerQC_BATCH_ALLELIC_batchEffects.out
        * PCA_MITO_wGC_markerQC.txt
        * PCA_MITO_wGC_markerQCtmp#.bonferroni.txt
        * PCA_MITO_wGC_markers_to_QC.txt
        * PCA_MITO_wGC_baselineMarkers.txt
    * **[ProjectDir]/PCA/PCA_MITO_wGC/PCA_MITO_wGC_GC_ADJUSTMENT**
        * default_gc_parameters.GENVISIS_GC.gc_Centroids.ser
        * default_gc_parameters.GENVISIS_GC.gc_Centroids_TMP_BAK.ser
        * default_gc_parameters.GENVISIS_GC.ser
        * gc_Centroids.ser
        * custom.gcmodel.ser
27. Create VCF Files for Imputation
    * **export/genvisis/**
        * **.vcf.gz** and **.vcf.gz.tbi** files for each chromosome selected.
        * files that can be analyzed on the [TOPMed Imputation Server](https://docs.google.com/document/d/1BMu1zp8er9NY-QFRh-7ZOeX1HnGj_yAYYh3BarASwPY/edit#bookmark=kix.ao1b7evi7f7z).




## CNV Analysis Pipeline


### Running CNV Analysis


```
    java -jar ~/plab-internal.jar org.pankratzlab.internal.gwas.CNVAnalysisPipeline -h

    dir=<value>            (required) Root directory, where subdirectories and results will be created.

    mperm=<value>          (required) Number of permutations to run (mperm option in Plink)

    fams=<value>           (required) Plink FAM files, in the format    file1|label1;file2|label2;...;fileN|labelN - if a label is omitted, the label                           will be the filename root
    
cnvs=<value>           (required) CNV Files, in the format cnvFile1|cnvLabel1;cnvFile2|cnvLabel2, or               
    cnvFile1|cnvLabel1{size=<OPERATOR>@<filterSize>,cn=<OPERATOR>@<filterType>}, where OPERATOR is one of <=,<,>=,>,=,!, and <filterSize> and <filterType> are integer values (either may be omitted to only filter on one attribute); if a label is omitted, the label will be the filename root

    override=<value>          Copy FAM and CNV files even if they already exist
    hits=<value>              Run HitWindows
    indexThresh==<value>
    minWinSize==<value>
    maxWinSize==<value>
    winThresh==<value>
    man=<value>               Create a ManhattanPlot
    qq=<value>                Create a QQPlot
```


 \
The defaults are:


```
    float indexThreshold = (float) 0.1;
    int windowMinSizePerSide = 500000;
    int windowMaxSizePerSide = 100000;
    float windowExtensionThreshold = (float) 0.99;
```


If you want to be restrictive, leave the default. If you want to look at everything, use **<code>indexThresh=0.99</code>**.


    `java -Djava.awt.headless=true -jar ~/plab-internal.jar org.pankratzlab.internal.gwas.CNVAnalysisPipeline dir=./ fams=./plink.fam cnvs=./genvisis.cnv mperm=10000` \
 \
The pipeline can also do size and CN filtering and re-labeling on the CNV file:


```
    "cnvFile1|cnvLabel1{size=<OPERATOR>@<filterSize>,cn=<OPERATOR>@<filterType>}"
```


Example:


```
    java -Djava.awt.headless=true -jar ~/plab-internal.jar org.pankratzlab.internal.gwas.CNVAnalysisPipeline dir=./ fams=./plink.fam "cnvs=./genvisis.cnv{size=>@20,cn=!=@2}" mperm=10000
```


This will filter the cnvs to size > 20bp and CN != 2.

Multiple filters can be applied to the same .cnv file:


```
    cnvs=cnvFile1|cnvLabel1{size=<OPERATOR>@<filterSize>,cn=<OPERATOR>@<filterType>};cnvFile1|cnvLabel2{size=<OPERATOR>@<filterSize>,cn=<OPERATOR>@<filterType>}
```


Example:


```
    java -Djava.awt.headless=true -jar ~/plab-internal.jar org.pankratzlab.internal.gwas.CNVAnalysisPipeline dir=./cnvAnalysisPipeline/ fams=./mayoVTE.fam "cnvs=./genvisisHMM_SexChrsFiltered.cnv|allVariants{};./genvisisHMM_SexChrsFiltered.cnv|delOnly{cn=<@2};./genvisisHMM_SexChrsFiltered.cnv|homoDelOnly{cn==@0};./genvisisHMM_SexChrsFiltered.cnv|largeVariants{size=>=@100000};./genvisisHMM_SexChrsFiltered.cnv|giantVariants{size=>=@500000}" mperm=10000
```


This example will create, in a dir called **cnvAnalysisPipeline/**, five .cnvs and a subdir named after the .fam file. In the subdir will be five dirs, each containing the results of the analysis for the particular filter.

The **fams** parameter can take multiple **.fam** files (ex. females only, males only), but in this case the parameter and all arguments need to be encased in quotes:


```
    java -jar ~/plab-internal.jar org.pankratzlab.internal.gwas.CNVAnalysisPipeline dir=./cnvAnalysisPipeline/ "fams=./mayoVTE.fam; ./mayoVTE_F.fam;./mayoVTE_M.fam" "cnvs=./genvisisHMM_SexChrsFiltered.cnv|allVariants{};./genvisisHMM_SexChrsFiltered.cnv|delOnly{cn=<@2};./genvisisHMM_SexChrsFiltered.cnv|homoDelOnly{cn==@0};./genvisisHMM_SexChrsFiltered.cnv|largeVariants{size=>=@100000};./genvisisHMM_SexChrsFiltered.cnv|giantVariants{size=>=@500000}" mperm=10000
```


** \
**The **.fam** files should only contain case-controls. Remove parents and siblings from the analysis.




### Analyzing Results



* **conf.cnv.map** lists CNV breakpoints. It matches the structure of the first four columns of a .bim file (chromosome, variant identifier, position in morgans or centimorgans [0 is a dummy value], and base-pair coordinate). The coordinates in the fourth column are the break points, or start and end points of cnvs provided to the analysis.
* **confPosition.hits** and **confWindow.hits**
* **confPosition.cnv.summary.mperm** lists the chromosome and start position of each cnv call along with an uncorrected _p_-value (**EMP1**) and a Bonferonni corrected_ p_-value (**EMP2**). The _p_-values indicate if the CNV is seen by chance anywhere in the genome. Only the values of **EMP2** should be considered for analysis.
* Three separate files for ease of viewing in Complot:
    * Case only
    * Control only 
    * Family members
* Look at differences between case and control by size. Start with 100kb (1000 bp) and move up to 250 kb, 500 kb, 1Mb, 2Mb etc.


### Visualizing Results



* Create a list of significant regions using the first and last SNPs on a chr that are EMP2 &lt; 0.05. For example:

    ```
    chr7:31550705-31552108
    chr10:18550421-18572274
    chr11:54804507-54898271
    chr12:5928665-5930039
    ```


* Open CompPlot and load the regions with
    * **File** -> **Load Region File**
* Only display cnvs from the file used to make the calls.
* Compute the median log R ratio for the region and view the results in 2D Plot
    * **Actions** -> **Median LRR** -> **Compute** -> **2D Plot**
    * This will plot each sample’s median LRR and MAD (median absolute difference) LRR for the region.



<p id="gdcalert5" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image5.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert6">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image5.png "image_tooltip")



        **Image of a plot of median LRR vs median absolute difference with three distinct clusters and the copy number 2 cluster is off center from zero.**



    * We want to see a plot like this with clear clusters for copy number 2, heterozygous deletion, and homozygous deletion. Note that CN2 is not centered on 0.0 in this example. We can attempt to correct this in the steps below.



<p id="gdcalert6" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image6.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert7">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image6.png "image_tooltip")



        **Image of a plot of median LRR vs median absolute difference with one noisy cluster**



    * This example has an EMP2 of 0.0008, but there is no clear separation in the data. This is a false positive.
* **To Trailer** -> **Actions** -> **To ScatterPlot**
* On marker plots that are marked unknown, use heat map to identify clusters



<p id="gdcalert7" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image7.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert8">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image7.png "image_tooltip")



    **Image of Scatter Plot showing the heatmap view of a marker with user drawn boxes around genotype clusters**



* Manually set clusters to AA (x axis), AB, or BB (Y axis)



<p id="gdcalert8" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image8.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert9">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image8.png "image_tooltip")



    **Image of Scatter Plot showing the Genotype view of a marker with user drawn boxes around genotype clusters**



* Close **Scatterplot** > **New cluster filters have been created. Would you like to append them to the permanent file?** > **Yes, overwrite**
* Return to CompPlot and repeat **Median LRR**, but with **Recompute LRR** checked
* 2D Plot should now show the CN2 cluster centered around 0.0



<p id="gdcalert9" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image9.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert10">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image9.png "image_tooltip")



        **Image of a plot of median LRR vs median absolute difference with three distinct clusters and the copy number 2 cluster is centered at zero.**



* Recall CNVs
    * Add false positive regions to the problematic regions file for the relevant genome build
        * Eg. /panfs/roc/groups/5/pankrat2/public/resources/Genome/hg38/problematicRegions_hg38.dat
    * In the main Genvisis window, run **Tools** > **Compute custom centroids file**
        * This creates **data/custom.cent**
    * Call and filter CNVs a second time. The custom centroids file and updated problematic regions file should remove the false positive calls and correctly center the true positives.
