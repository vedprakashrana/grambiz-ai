# ==============================================================================
# ⚙️ BACKEND SERVICE - FastAPI (Python)
# ==============================================================================
# Location: apps/api/backend.py
# Tech Stack: FastAPI, Pydantic, PostgreSQL (asyncpg), HTTPX
# Provides: Financial Calculations, MoSJE Schemes, Assessment APIs, Multilingual Proxy
# ==============================================================================

import os
import math
import uuid
import logging
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone

from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import httpx

logger = logging.getLogger("GramBizBackend")
app = FastAPI(title="UDYAM-SETU Backend API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- Data Models -----------------
class ProjectCostRequest(BaseModel):
    margin_capital: float = Field(..., gt=0)
    margin_percentage: float = 10.0

class EMIRequest(BaseModel):
    principal: float = Field(..., gt=0)
    annual_interest_rate: float = 6.5
    tenure_months: int = 36
    moratorium_months: int = 3

class TranslationRequest(BaseModel):
    text: str
    source_lang: str = "en"
    target_lang: str = "hi"

# ----------------- Financial Calculations -----------------
def calculate_inr_cost(margin: float, margin_pct: float = 10.0) -> Dict[str, Any]:
    project_cost = margin / (margin_pct / 100.0)
    loan_amount = project_cost * ((100.0 - margin_pct) / 100.0)
    return {
        "margin_capital": margin,
        "project_cost": project_cost,
        "eligible_loan": loan_amount,
        "margin_percentage": margin_pct,
        "loan_percentage": 100.0 - margin_pct
    }

def calculate_emi(principal: float, rate_pa: float, tenure_m: int, moratorium_m: int = 0) -> Dict[str, Any]:
    monthly_rate = (rate_pa / 100.0) / 12.0
    repay_months = tenure_m - moratorium_m
    if monthly_rate == 0:
        emi = principal / repay_months
    else:
        emi = principal * monthly_rate * math.pow(1 + monthly_rate, repay_months) / (math.pow(1 + monthly_rate, repay_months) - 1)
    
    total_repayment = emi * repay_months
    total_interest = total_repayment - principal
    return {
        "monthly_emi": round(emi, 2),
        "total_principal": principal,
        "total_interest": round(total_interest, 2),
        "total_payment": round(total_repayment, 2),
        "moratorium_months": moratorium_m,
        "repayment_tenure_months": repay_months
    }

# ----------------- REST Endpoints -----------------
@app.get("/")
def root():
    return {
        "status": "healthy",
        "service": "UDYAM-SETU FastAPI Backend",
        "database": "PostgreSQL"
    }

@app.post("/api/v1/finance/project-cost")
def get_project_cost(payload: ProjectCostRequest):
    return calculate_inr_cost(payload.margin_capital, payload.margin_percentage)

@app.post("/api/v1/finance/emi")
def get_emi(payload: EMIRequest):
    return calculate_emi(payload.principal, payload.annual_interest_rate, payload.tenure_months, payload.moratorium_months)

@app.get("/api/v1/schemes/evaluate")
def evaluate_scheme(project_cost: float):
    if project_cost <= 140000.0:
        return {
            "scheme_name": "MoSJE Micro Finance Scheme",
            "interest_rate": 6.5,
            "max_loan": 125000.0,
            "tenure_months": 36,
            "moratorium_months": 3,
            "source": "MoSJE NBCFDC Guidelines 2024"
        }
    elif project_cost <= 5000000.0:
        return {
            "scheme_name": "MoSJE Term Loan Assistance Scheme",
            "interest_rate": 8.0,
            "max_loan": 4500000.0,
            "tenure_months": 84,
            "moratorium_months": 6,
            "source": "MoSJE Policy Gazette Vol-II"
        }
    else:
        return {
            "scheme_name": "Special Institutional Project Financing",
            "interest_rate": 8.5,
            "max_loan": project_cost * 0.90,
            "tenure_months": 120,
            "moratorium_months": 12,
            "source": "State Channelising Agency (SCA)"
        }

@app.post("/api/v1/translate")
async def translate_text(payload: TranslationRequest):
    bhashini_url = os.getenv("BHASHINI_API_URL", "")
    if bhashini_url and os.getenv("BHASHINI_API_KEY"):
        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                res = await client.post(bhashini_url, json={"text": payload.text, "target": payload.target_lang})
                if res.status_code == 200:
                    return {"translated_text": res.json().get("output", payload.text)}
        except Exception as e:
            logger.warning(f"Bhashini call failed: {e}")

    phrases = {
        "Dairy Micro-Enterprise": "डेयरी सूक्ष्म उद्यम",
        "Project Cost": "कुल प्रोजेक्ट लागत",
        "Eligible Loan": "पात्र सरकारी ऋण",
        "Monthly EMI": "मासिक किस्त (EMI)"
    }
    trans = payload.text
    if payload.target_lang == "hi":
        for k, v in phrases.items():
            trans = trans.replace(k, v)
    return {"translated_text": trans, "source_lang": payload.source_lang, "target_lang": payload.target_lang}
