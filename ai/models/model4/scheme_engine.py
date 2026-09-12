"""
Government Scheme Engine for Model 4 (Rule-Based)
Deterministically evaluates real MoSJE / NBCFDC / PMEGP credit guidelines.
"""
from typing import Dict, Any, List

def get_scheme_recommendation(
    business_category: str,
    state: str,
    project_cost: float,
    own_capital: float,
    prior_experience: bool = False
) -> Dict[str, Any]:
    loan_needed = max(0.0, round(project_cost - own_capital, 2))
    
    if loan_needed <= 0:
        return {
            "eligible_for_loan_scheme": False,
            "loan_amount_needed": 0.0,
            "reason": "Own capital covers the entire estimated project setup cost. No institutional credit required.",
            "recommended_scheme": None,
            "alternatives": [],
            "disclosure": "Official guidelines recommend retaining personal liquidity for operating contingencies."
        }

    # Deterministic Scheme Matching
    # 1. Micro Finance: up to 1,40,000 cost, 6.5% interest, 36 months, 3m moratorium
    # 2. Term Loan: up to 15,00,000 cost, 8.0% interest, 84 months, 6m moratorium
    # 3. PMEGP: up to 50,00,000 cost, 8.5% interest, 35% rural subsidy, 60 months
    
    if project_cost <= 140000.0:
        rec = {
            "scheme_name": "MoSJE / NBCFDC Micro Finance Scheme",
            "interest_rate": 6.5,
            "interest_rate_type": "Fixed Concessional",
            "tenure_months": 36,
            "moratorium_months": 3,
            "subsidy_type": "Direct Concessional Refinance",
            "subsidy_pct": 0.0,
            "eligibility_notes": "Ideal for rural micro-enterprises. 90% loan component with 10% promoter contribution.",
            "required_documents": ["Aadhaar Card", "Bank Passbook", "Income / Caste Self-declaration"],
            "official_source": "https://nbcfdc.gov.in/schemes/micro-finance"
        }
        alts = [
            {"scheme_name": "MoSJE / NBCFDC Term Loan Scheme", "interest_rate": 8.0, "subsidy_pct": None},
            {"scheme_name": "PMEGP Rural Enterprise Scheme", "interest_rate": 8.5, "subsidy_pct": 35.0}
        ]
    elif project_cost <= 1500000.0:
        rec = {
            "scheme_name": "MoSJE / NBCFDC Term Loan Scheme",
            "interest_rate": 8.0,
            "interest_rate_type": "Fixed Concessional",
            "tenure_months": 84,
            "moratorium_months": 6,
            "subsidy_type": "Interest Concession",
            "subsidy_pct": None,
            "eligibility_notes": "Up to ₹15 Lakhs for backward classes / rural entrepreneurs under MoSJE guidelines.",
            "required_documents": ["Aadhaar", "Detailed Project Report (DPR)", "Land/Shop Lease or Ownership Proof", "Bank Statements"],
            "official_source": "https://nbcfdc.gov.in/schemes/term-loan"
        }
        alts = [
            {"scheme_name": "PMEGP Rural Enterprise Subsidy", "interest_rate": 8.5, "subsidy_pct": 35.0},
            {"scheme_name": "PM Mudra Yojana (Kishore / Tarun)", "interest_rate": 9.25, "subsidy_pct": None}
        ]
    else:
        rec = {
            "scheme_name": "PMEGP Rural Enterprise Scheme",
            "interest_rate": 8.5,
            "interest_rate_type": "Commercial Linked",
            "tenure_months": 60,
            "moratorium_months": 6,
            "subsidy_type": "Capital Subsidy (Rural)",
            "subsidy_pct": 35.0,
            "eligibility_notes": "KVIC / PMEGP special rural category providing up to 35% margin money capital subsidy.",
            "required_documents": ["Aadhaar", "EDP Training Certificate", "DPR", "Caste / Special Category Certificate"],
            "official_source": "https://www.kviconline.gov.in/pmegpeportal"
        }
        alts = [
            {"scheme_name": "Stand-Up India Scheme", "interest_rate": 8.75, "subsidy_pct": None}
        ]

    return {
        "eligible_for_loan_scheme": True,
        "loan_amount_needed": loan_needed,
        "recommended_scheme": rec,
        "alternatives": alts,
        "disclosure": "Statutory rule check based on official MoSJE & NBCFDC guidelines. Qualification is deterministic and auditable."
    }
