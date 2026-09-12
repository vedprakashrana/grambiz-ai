# ==============================================================================
# 🚀 UDYAM-SETU - Project Architecture & Team Guide
# ==============================================================================

Welcome to **UDYAM-SETU** (Rural Micro-Enterprise & Financial Structuring Platform under MoSJE Concessional Credit guidelines).

This document serves as an exhaustive blueprint for all team members (Frontend Engineers, Backend Developers, Data Engineers, AI Engineers, and DevOps).

---

## 🛠️ 1. Complete Technology Stack & 4-Model AI Suite

| Layer | Technologies Used | Description |
| :--- | :--- | :--- |
| **Frontend** | React 18, Next.js 14 (App Router), TailwindCSS, Lucide Icons, Recharts, React Leaflet | Clean Markdown formatted rural chat interface, multi-language selector (8+ Indian languages), interactive EMI calculators, Leaflet GIS maps. |
| **Backend** | FastAPI (Python 3.11+), Pydantic v2, SQLAlchemy, Uvicorn, ReportLab | Async REST APIs for financial structuring, MoSJE rules, risk scoring, and PDF generation. |
| **Database** | PostgreSQL 16 (Relational/PostGIS) + MongoDB (Motor Async) | PostgreSQL for structured relational and geo-observations; MongoDB for flexible JSON assessment schemas. |
| **Data Layer** | Census 2011/SECC, DPIIT MSME, AGMARKNET, OSM Overpass & Nominatim | Master demographic baseline, village directory, APMC daily mandi arrivals, and 5km/10km business scan. |
| **Model 1 (Feasibility)** | XGBoost / LightGBM + SHAP Feature Attribution Pipeline | Calibrated business success probability (0-100%), viability classification (`Viable`, `Uncertain`, `High-Risk`), and transparent feature attribution. |
| **Model 2 (Forecasting)** | Autoregressive Lag Momentum (AR/ETS) + $\sqrt{h}$ Volatility Bands | 1, 3, 6-Month horizon forecasting with 90% confidence intervals and walk-forward rolling backtesting metrics (MAE/RMSE/MAPE). |
| **Model 3 (Risk)** | 6-Dimensions Calibrated Risk Probabilities | Decoupled multi-dimensional risk prediction: Market-Price, Demand, Supply-Chain, Infrastructure, Financial Liquidity, and Operational Risk. |
| **Model 4 (Schemes)** | Dynamic Rule Matching + Versioned Scheme DB | MoSJE / NBCFDC Micro Finance, NBCFDC Term Loan (90% financing, 6.5%-8.0% interest), and PMEGP 35% Rural Subsidy. |
| **Multilingual** | Bhashini / IndicTrans2 + Web Speech API | Full conversational voice-in and speech-out across Hindi, English, Bengali, Marathi, Tamil, Telugu, Gujarati, and Kannada. |
| **Live Deployments** | Render + Vercel + Docker | 🌐 Web: `https://grambiz-web.onrender.com` \| ⚙️ API: `https://grambiz-api.onrender.com` |


---

## 📂 2. Directory Structure & File Map

```
📁 PROJECT ROOT (/)
│
├── 📂 frontend/                      <--- 🌐 FRONTEND (React + Next.js + TailwindCSS)
│   ├── 📂 app/                       (Application routes & UI pages)
│   │   ├── 📄 layout.tsx             (Global wrapper with LanguageProvider & navbar)
│   │   ├── 📄 page.tsx               (Hero landing page with live interactive demo)
│   │   ├── 📄 globals.css            (Tailwind & custom UI styles)
│   │   ├── 📂 assessment/            (5-Step wizard for business viability & results)
│   │   ├── 📂 assistant/             (Conversational AI voice & text chat)
│   │   ├── 📂 calculators/           (Project Cost, EMI, Working Capital, Break-Even)
│   │   ├── 📂 compare/               (Multi-sector comparative matrix: Dairy vs Poultry vs Tailoring)
│   │   ├── 📂 forecast/              (ML seasonal demand and price trends chart)
│   │   ├── 📂 mandi/                 (Live APMC Mandi price discovery dashboard)
│   │   ├── 📂 ocr/                   (Rural document scanner: Aadhaar, Caste, Land records)
│   │   └── 📂 admin/                 (Government scheme rule update portal)
│   ├── 📂 components/
│   │   ├── 📂 layout/                (Header, Footer, Language Selector)
│   │   └── 📂 maps/                  (Interactive Leaflet Map & 5km radius circle)
│   ├── 📂 context/
│   │   └── 📄 LanguageContext.tsx    (Multilingual state: Hindi, English, Bengali, Marathi, etc.)
│   ├── 📂 services/
│   │   ├── 📄 apiClient.ts           (Frontend HTTP client calling FastAPI endpoints)
│   │   └── 📄 locationService.ts     (State -> District -> Block -> Village hierarchy)
│   ├── 📂 public/                    (Static image assets and icons)
│   ├── 📄 package.json               (Dependencies & npm scripts)
│   ├── 📄 tailwind.config.js
│   └── 📄 tsconfig.json
│
├── 📂 backend/                       <--- ⚙️ BACKEND (FastAPI + Python + PostgreSQL)
│   ├── 📂 app/
│   │   ├── 📄 main.py                (FastAPI App entry point, CORS, and DB lifespan hooks)
│   │   ├── 📂 api/v1/endpoints.py    (REST API routes: /finance, /assessments, /schemes, /translate)
│   │   ├── 📂 schemas/all_schemas.py (Pydantic models for validation and request/response)
│   │   ├── 📂 core/
│   │   │   ├── 📄 config.py          (Environment variables & settings)
│   │   │   ├── 📄 data_store.py      (Demographic and village knowledge base)
│   │   │   ├── 📄 data_models.py     (SQLAlchemy ORM models)
│   │   │   └── 📄 database_mongo.py  (Async Motor MongoDB connection)
│   │   ├── 📂 engines/
│   │   │   ├── 📂 financial/         (calculator.py: 10% Margin / 90% Loan EMI calculator)
│   │   │   ├── 📂 scheme/            (rules.py: MoSJE Micro Finance & Term Loan rules)
│   │   │   ├── 📂 scoring/           (feasibility.py: Deterministic scoring & risk matrix)
│   │   │   ├── 📂 ml/                (predictor.py: ARIMA time-series forecaster)
│   │   │   ├── 📂 ocr/               (extractor.py: Aadhaar/Caste OCR parsing)
│   │   │   └── 📂 translation/       (bhashini.py: Bhashini/IndicTrans2 translation engine)
│   │   ├── 📂 gis/
│   │   │   ├── 📄 geocoding.py       (OSM Nominatim GPS reverse geocoder)
│   │   │   ├── 📄 spatial.py         (OSM Overpass API 5km/10km business scan)
│   │   │   └── 📄 realtime_mandi.py  (AGMARKNET live prices)
│   │   └── 📂 reports/
│   │       └── 📄 pdf_generator.py   (ReportLab bank-ready feasibility PDF export)
│   ├── 📄 requirements.txt           (Python package requirements)
│   └── 📄 Dockerfile                 (Container build for backend)
│
├── 📂 data/                          <--- 📊 DATA LAYER (Standalone Modular Engines)
│   ├── 📄 data_store.py              (Census 2011, SECC & Village demographics)
│   ├── 📄 geocoding.py               (OSM Nominatim GPS reverse geocoder)
│   ├── 📄 spatial.py                 (OSM Overpass API 5km/10km business scan)
│   ├── 📄 realtime_mandi.py          (AGMARKNET live APMC mandi prices)
│   └── 📄 database_mongo.py          (Async MongoDB motor database client)
│
├── 📂 ai/                            <--- 🤖 AI & MULTILINGUAL (Standalone Modular Engines)
│   ├── 📄 orchestrator.py            (LLM Multi-Provider Structured JSON Reasoning)
│   ├── 📄 bhashini.py                (Bhashini & IndicTrans2 Multilingual Translation)
│   ├── 📄 predictor.py               (Machine Learning Seasonal Demand Forecaster)
│   ├── 📄 rules.py                   (MoSJE Concessional Credit Scheme Rules)
│   ├── 📄 feasibility.py             (Deterministic Feasibility Scoring & Risk Matrix)
│   ├── 📄 calculator.py              (10% Margin / 90% Loan EMI Amortization)
│   └── 📄 extractor.py               (Rural Document OCR Parser)
│
├── 📄 docker-compose.yml             (Postgres + PostGIS + Mongo + Redis + Backend + Frontend)
├── 📄 vercel.json                    (Vercel Frontend Deployment configuration)
├── 📄 render.yaml                    (Render Backend + Frontend Blueprint)
├── 📄 railway.toml                   (Railway Backend Deployment configuration)
├── 📄 .env.example                   (Environment variables template)
└── 📄 README.md                      (Project overview & documentation)
```

---

## 🚀 3. How to Run Locally

### Prerequisites
- Node.js 18+ & npm
- Python 3.11+ & pip
- PostgreSQL & MongoDB (Optional: use Docker)

### Step 1: Start Backend (FastAPI)
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
API Swagger Docs will be live at: `http://localhost:8000/api/v1/docs`

### Step 2: Start Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Web app will be running at: `http://localhost:3000`

### Step 3: Run Full Stack with Docker
```bash
docker-compose up --build
```

---

## 👥 4. Team Responsibilities & Ownership

- **Frontend Engineers**: Focus on `frontend/app/`, `frontend/components/`, and `frontend/context/`.
- **Backend Engineers**: Focus on `backend/app/api/`, `backend/app/engines/`, and `backend/app/reports/`.
- **Data Engineers**: Focus on `data/`, `backend/app/gis/`, and Census/Mandi pipelines.
- **AI/ML Engineers**: Focus on `ai/`, `backend/app/engines/ml/`, and `backend/app/engines/translation/`.
- **DevOps**: Maintain `docker-compose.yml`, `render.yaml`, `vercel.json`, and `railway.toml`.
