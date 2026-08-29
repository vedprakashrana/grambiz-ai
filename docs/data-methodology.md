# GramBiz AI — Analytical Calculation & Estimation Methodology

This document transparently explains the mathematical formulations and assumptions behind GramBiz AI's market analysis, customer reach estimation, competitor density, pricing range, and risk metrics.

---

## 1. 👥 Consumer Reach Estimation Methodology

### Principle:
GramBiz AI **never** generates a fabricated exact consumer count (e.g. *"5,800 customers"*). Instead, it computes an auditable target customer range using a transparent multi-factor derivation:

$$\text{Estimated Households}_{2026} = \text{Households}_{2011} \times (1 + r)^{\Delta t}$$

Where:
- $\text{Households}_{2011}$: Official Primary Census Abstract (PCA) baseline count.
- $r$: Regional annual demographic compound growth rate ($1.20\%$ p.a.).
- $\Delta t$: Time elapsed since Census ($15 \text{ years}$).

### Target Adoption Range:
$$\text{Customer Range} = \left[ \text{Estimated Households}_{2026} \times \alpha_{\min},\, \text{Estimated Households}_{2026} \times \alpha_{\max} \right]$$
- For **Dairy**: $\alpha \in [30\%, 45\%]$ (estimated proportion of households buying daily milk surplus commercially).
- **Classification**: Explicitly tagged as `Estimated Data`.

---

## 2. 📍 Competitor Density & Spatial Scanning (PostGIS / GIS)

### Formulation:
For any geographic point coordinate $(\text{Lat}, \text{Lon})$ and scan radius $R \in \{5\text{ km}, 10\text{ km}\}$:

$$\text{Area} = \pi \times R^2 \quad (\approx 78.54\text{ km}^2 \text{ for } 5\text{ km})$$

$$\text{Density} = \frac{\text{Count of Mapped Businesses in Radius}}{\text{Area}}$$

### Attribution Clause:
Output reports explicitly state:
> *"Based on mapped businesses in available OpenStreetMap & District Enterprise survey records. Unmapped informal village enterprises are not counted."*

---

## 3. 🌾 Market Pricing Range & Benchmark

- **Source Data**: AGMARKNET daily APMC Mandi arrivals.
- **Metrics Stored**: $\text{Min Price}$, $\text{Max Price}$, and $\text{Modal Price}$.
- **Unit Normalization**: Automatically converted into standard consumer units ($\text{₹/Litre}$, $\text{₹/Kg}$, $\text{₹/Quintal}$).
- **Classification**: Labeled as `Wholesale / Mandi Observed` (not assumed equal to village retail price).

---

## 4. 🛡️ Feasibility & Risk Scoring (0 – 100 Scale)

The composite feasibility index aggregates 5 weighted components:

$$\text{Score} = w_1 S_{\text{Demand}} + w_2 S_{\text{Capital}} + w_3 S_{\text{Infra}} + w_4 S_{\text{Experience}} - w_5 R_{\text{Risk}}$$

- **Capital Adequacy** ($w_2 = 0.25$): Validates $10\%$ entrepreneur margin against MoSJE scheme thresholds.
- **Infrastructure Factor** ($w_3 = 0.20$): Verifies water source, commercial electricity hours, and all-weather road access.
- **Risk Score** ($w_5 = 0.15$): Evaluates seasonal dry spells, disease outbreak probability, and transit buffer days.

---

## 5. 🔍 Data Confidence Taxonomy

| Level | Definition | Example |
| :--- | :--- | :--- |
| **Verified** | Official government census records, statutory policy gazettes, or live APMC feeds. | Census 2011 Population, MoSJE 8% Interest Rate |
| **Derived** | Calculated using exact mathematical formulas from verified baseline data. | Total Project Cost = Margin / 0.10, EMI Schedule |
| **Estimated** | Projected using stated demographic assumptions and transparent growth factors. | Potential Customer Reach Range (30-45% penetration) |
| **Demo** | Seeded sample profiles for platform preview. | Guest Demo Assessment |
| **Unavailable** | Data point not present in authoritative public records. | *"Reliable village-level data unavailable"* |
