# GramBiz AI — AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant

**GramBiz AI** is a complete, production-ready full-stack application built for the **Ministry of Social Justice and Empowerment (MoSJE)** under **Problem Statement 2609** (Agriculture, FoodTech & Rural Development).

---

## 🌟 Key Features

1. **5-Step Interactive Business Assessment Wizard**
   - Micro-geographic selection (State, District, Block, Village, GPS Coordinates).
   - Available margin capital structuring with standard 10% entrepreneur equity.
   - 15+ livelihood categories (Dairy, Poultry, Food Processing, Fisheries, Retail, Tailoring, Digital CSC).

2. **Deterministic Backend Financial Engine (Exact Decimal Math)**
   - Formula: $\text{Project Cost} = \text{Margin Capital} / 0.10$
   - 90% Subsidized Financing matching.
   - EMI amortization with customizable moratorium handling (accrued, capitalized, serviced, waived).
   - Break-even units & revenue analysis.
   - Dynamic 3-year cash flow projections.

3. **Dynamic MoSJE Scheme Rules Engine**
   - **Micro Finance Scheme**: Up to ₹1.40 Lakh project cost, 90% funding (max ₹1.25 Lakh), 6.5% interest p.a., 3-year tenure, 3-month moratorium.
   - **Term Loan Scheme**: ₹1.40 Lakh to ₹50 Lakh project cost, 90% funding (max ₹45 Lakh), 8.0% interest p.a., 7-year tenure, 6-month moratorium.
   - Exact boundary and over-limit detection.

4. **GIS & PostGIS Spatial Scanning**
   - 5 KM and 10 KM radius competitor density and distance calculation.
   - Mandi and Haat observed pricing benchmarks with explicit data confidence tags (`Verified`, `Estimated`, `Unavailable`).

5. **Multilingual AI Business Advisor (RAG Grounded)**
   - Conversational assistant supporting Hindi and English.
   - Direct grounding with MoSJE policy documentation and citation attribution.
   - Structured SWOT analysis, risk scoring matrices (0-100), and tactical recommendations.

6. **Automated Downloadable PDF Dossier**
   - Bank-ready business feasibility report generated via ReportLab with executive summary, financial tables, SWOT, and statutory disclaimers.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+ (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons, Recharts, Leaflet / OpenStreetMap.
- **Backend**: Python 3.11+, FastAPI, Pydantic v2, SQLAlchemy, Alembic, ReportLab.
- **Database**: PostgreSQL 16 with PostGIS and pgvector extensions.
- **Cache**: Redis.
- **DevOps**: Docker, Docker Compose.

---

## 🚀 Quickstart Commands

### 1. Run Backend API
```bash
cd apps/api
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
- API Docs: `http://localhost:8000/docs`
- Health Endpoint: `http://localhost:8000/health`

### 2. Run Financial Test Suite
```bash
cd apps/api
python tests/run_tests.py
```

### 3. Run Frontend Web App
```bash
cd apps/web
npm install
npm run dev
```
- Frontend Web Portal: `http://localhost:3000`

### 4. Docker Deployment
```bash
docker-compose up --build -d
```

---

## 📊 End-to-End User Verification Flow
1. Open `http://localhost:3000`
2. Click **Start Business Assessment**
3. Select village `Ganeshpur, Meerut (UP)`
4. Enter `₹1,00,000` margin capital & select `Dairy`
5. Click **Generate Business Assessment**
6. Review calculated `₹10,00,000` Project Outlay, `₹9,00,000` MoSJE 8% Term Loan, 5km GIS competitor density, SWOT matrix, and click **Download Feasibility PDF**!
