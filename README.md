# UDYAM-SETU — AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant

**UDYAM-SETU** is a complete, production-ready full-stack enterprise application designed for rural entrepreneurs and the **Ministry of Social Justice and Empowerment (MoSJE)** under **Problem Statement 26091** (Agriculture, FoodTech & Rural Development).

---

## 🌟 4-Model Core Intelligence Architecture

| Model | Component Name | Architecture & Methods | Key Output |
| :--- | :--- | :--- | :--- |
| **Model 1** | **Business Feasibility & Success Prediction** | XGBoost/LightGBM Classifier + SHAP Feature Attribution Pipeline | Calibrated Success Probability (0-100%), Viability Class (`Viable`, `Uncertain`, `High-Risk`), and Explainable Feature Attribution. |
| **Model 2** | **Price & Demand Forecasting** | Autoregressive Lag Momentum (AR/ETS) + Calendar Seasonality + $\sqrt{h}$ Volatility Bands | 1, 3, 6-Month Horizons with 90% Confidence Intervals, Volume Projections, and Walk-Forward Rolling Backtesting (MAE/RMSE/MAPE). |
| **Model 3** | **Business Risk Prediction** | 6-Dimensions Calibrated Multi-Risk Engine (Decoupled from Opportunity) | Market-Price, Demand, Supply-Chain, Infrastructure, Financial Liquidity, and Operational Risk Probabilities (0.00-1.00) with Mitigations. |
| **Model 4** | **Government Scheme & Subsidy Engine** | Version-Controlled Policy Database + Dynamic Rule-Matching Engine | 10% Margin Structuring, 90% Concessional Loans (NBCFDC Micro Finance & Term Loan), and 35% PMEGP Rural Subsidy Matching. |

---

## 🛠️ Complete Technology Stack

- **Frontend**: Next.js 14+ (App Router), React 18, TypeScript, TailwindCSS, Lucide Icons, Recharts, Leaflet / OpenStreetMap.
- **Backend**: Python 3.11+, FastAPI, Pydantic v2, SQLAlchemy, Motor (Async MongoDB), ReportLab.
- **Databases**: PostgreSQL 16 (Relational & PostGIS) + MongoDB (Motor Async).
- **Multilingual**: Bhashini / IndicTrans2 API + Web Speech API (8+ Indian Languages).
- **Live Deployments**:
  - 🌐 **Web App**: [https://grambiz-web.onrender.com](https://grambiz-web.onrender.com)
  - ⚙️ **Backend API & Swagger Docs**: [https://grambiz-api.onrender.com/docs](https://grambiz-api.onrender.com/docs)

---

## 📂 Clean Directory Structure

```
📁 grambiz-ai/
├── 📂 frontend/          <--- Next.js 14 App Router, TailwindCSS, Multilingual Chat, Leaflet Maps
├── 📂 backend/           <--- FastAPI Python REST APIs, ReportLab PDF, DB Lifespan & Config
├── 📂 data/              <--- Census 2011/SECC, OSM Overpass & Nominatim, AGMARKNET Mandi Store
├── 📂 ai/                <--- 4-Model Suite: Predictor, Rules, Feasibility, Bhashini Translation
├── 📄 render.yaml        <--- Cloud Deployment Blueprint for Render Web & API Services
├── 📄 vercel.json        <--- Vercel Frontend Configuration
├── 📄 STRUCTURE.md       <--- Comprehensive Developer & Architecture Guide
└── 📄 README.md          <--- Project Overview & Quickstart
```

---

## 🚀 Quickstart Commands

### 1. Run Backend API (FastAPI)
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
- API Docs: `http://localhost:8000/docs`
- Health Endpoint: `http://localhost:8000/health`

### 2. Run Frontend Web App (Next.js)
```bash
cd frontend
npm install
npm run dev
```
- Frontend Web Portal: `http://localhost:3000`
- AI Assistant: `http://localhost:3000/assistant`

---

## 📊 End-to-End User Flow
1. Open `http://localhost:3000` or [Live Render Web](https://grambiz-web.onrender.com)
2. Click **Start Business Assessment**
3. Select village `Ganeshpur, Meerut (UP)`
4. Enter `₹1,00,000` margin capital & select `Dairy`
5. Review calculated `₹10,00,000` Project Outlay, `₹9,00,000` MoSJE 8% Term Loan, 5km GIS competitor density, Model 1-4 AI predictions, and click **Download Bank-Ready Feasibility PDF**!

