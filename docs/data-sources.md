# GramBiz AI — Authoritative Master Data Sources Registry

This document records the complete, unified data architecture of **GramBiz AI**, documenting official sources, URLs, geographic levels, baseline data years, licenses, and confidence ratings.

---

## 📊 Data Source Registry Table

| Data Domain | Master Source Name | Organization / Authority | Source URL / API | Geographic Level | Data Year | Update Frequency | License / Terms | Confidence Rating |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Demographics & Population** | Primary Census Abstract (PCA) & Village Directory | Office of the Registrar General & Census Commissioner, MHA | [censusindia.gov.in](https://censusindia.gov.in/) | Village / Sub-District / District | 2011 | Decennial | GODL (Government Open Data License - India) | **Verified** (Baseline) |
| **Government Schemes** | Concessional Lending Norms (NBCFDC / NSFDC) | Ministry of Social Justice and Empowerment (MoSJE) | [socialjustice.gov.in](https://socialjustice.gov.in/) | National / State | 2024 | Gazette Notifications | Statutory Policy Guideline | **Verified** |
| **Agricultural Mandi Prices** | AGMARKNET Daily Wholesale Commodity Feed | Directorate of Marketing & Inspection (DMI), MoA&FW | [agmarknet.gov.in](https://agmarknet.gov.in/) | APMC Mandi | 2026 | Daily (Real-Time) | GODL | **Verified** (Observed) |
| **Livestock & Bovine Population** | 20th All India Livestock Census | Department of Animal Husbandry & Dairying (DAHD) | [dahd.gov.in](https://dahd.gov.in/) | District / State | 2023 | 5-Yearly Census | Official Publication | **Verified** |
| **Fisheries Production** | Handbook on Fisheries Statistics | Department of Fisheries, MoFAH&D | [dof.gov.in](https://dof.gov.in/) | State | 2023 | Annual Report | Official Publication | **Verified** |
| **Commercial Points of Interest** | OpenStreetMap (OSM) Nodes & Ways | OpenStreetMap Foundation | [openstreetmap.org](https://www.openstreetmap.org/) | Point Coordinate | 2026 | Continuous / Weekly | ODbL / © OSM Contributors | **Verified** (Mapped Only) |
| **Banking & Financial Inclusion** | Database on Indian Economy (DBIE) | Reserve Bank of India (RBI) | [data.rbi.org.in](https://data.rbi.org.in/) | District / State | 2024 | Quarterly / Annual | Regulatory Statistics | **Derived** |
| **Agro-Meteorology & Climate** | IMD District Agro-Advisory Service | India Meteorological Department (IMD), MoES | [mausam.imd.gov.in](https://mausam.imd.gov.in/) | District | 2024 | Weekly Bulletins | Official Scientific Feed | **Verified** |
| **Rural Statistics & Datasets** | Open Government Data (OGD) Platform India | National Informatics Centre (NIC), MeitY | [data.gov.in](https://www.data.gov.in/) | District / National | 2024 | Continuous | GODL | **Verified** |
| **Techno-Economic Business Profiles** | Model Bankable Project Profiles | NABARD & KVIC | [nabard.org](https://www.nabard.org/) | Enterprise Category | 2024 | Periodic Guidelines | Banking Industry Standard | **Derived** |

---

## 🔒 Provenance & Attribution Enforcement

1. **Census 2011 Baseline Principle**:
   - Census 2011 data is strictly attributed with `data_year = 2011` and labeled as `"Source: Census 2011"`. It is never presented as current 2026 population.
2. **OpenStreetMap Partiality Warning**:
   - Mapped commercial counts explicitly carry the statement: *"Based on mapped entities in available OpenStreetMap data; coverage may be partial."*
3. **Mandi Wholesale vs Village Retail**:
   - Mandi wholesale arrival modal prices are explicitly demarcated from local retail village pricing.
