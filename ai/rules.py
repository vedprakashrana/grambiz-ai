# AI Layer - MoSJE Statutory Concessional Credit Rule Engine
from decimal import Decimal
from typing import Optional, List, Dict, Any
from pydantic import BaseModel

class SchemeRecommendationResponse(BaseModel):
    eligible: bool
    scheme_code: str
    scheme_name: str
    scheme_version_id: Optional[str] = None
    project_cost: Decimal
    calculated_financing: Decimal
    actual_eligible_financing: Decimal
    interest_rate: Decimal
    tenure_months: int
    moratorium_months: int
    moratorium_interest_policy: str
    source_document: str
    effective_from: Optional[str] = None
    last_verified_at: Optional[str] = None
    notes: List[str] = []

SEEDED_SCHEMES = [
    {
        "scheme_id": "MOSJE_MICRO_FINANCE",
        "scheme_code": "MOSJE_MICRO_FINANCE",
        "scheme_name": "MoSJE / NBCFDC Micro Finance Scheme",
        "min_age": 18,
        "max_age": 60,
        "business_types": ["Dairy", "Poultry", "Tailoring", "Kirana Store", "Handicrafts", "Small Agri-processing"],
        "project_cost_min": Decimal("10000.00"),
        "project_cost_max": Decimal("140000.00"),
        "min_project_cost": Decimal("0.00"),
        "max_project_cost": Decimal("140000.00"),
        "funding_percentage": Decimal("90.0"),
        "loan_limit": Decimal("125000.00"),
        "max_loan": Decimal("125000.00"),
        "subsidy_rate": Decimal("0.00"),
        "subsidy_amount": Decimal("0.00"),
        "interest_rate": Decimal("6.50"),
        "tenure_months": 36,
        "moratorium_months": 3,
        "moratorium_interest_policy": "accrued",
        "beneficiary_categories": ["Target Group / Backward Classes / Rural Artisans"],
        "rural_urban": "Rural / Semi-Urban",
        "state": "ALL_INDIA",
        "district": "ALL_DISTRICTS",
        "new_existing_business": "Both",
        "education_experience": "No formal minimum qualification required",
        "documents_required": ["Aadhaar Card", "Bank Passbook", "Income Certificate / Self-declaration", "Caste Certificate"],
        "official_source": "https://nbcfdc.gov.in/schemes/micro-finance",
        "source_document": "MoSJE NBCFDC Micro Finance Guidelines 2024",
        "effective_from": "2024-04-01",
        "effective_to": "2027-03-31",
        "last_verified": "2024-10-15",
        "last_verified_at": "2024-10-15"
    },
    {
        "scheme_id": "MOSJE_TERM_LOAN",
        "scheme_code": "MOSJE_TERM_LOAN",
        "scheme_name": "MoSJE / NBCFDC Term Loan Scheme",
        "min_age": 18,
        "max_age": 65,
        "business_types": ["Dairy Chilling Unit", "Poultry Farm", "Agri-Logistics", "Food Processing", "Apparel & Garment Manufacturing"],
        "project_cost_min": Decimal("140000.01"),
        "project_cost_max": Decimal("5000000.00"),
        "min_project_cost": Decimal("140000.01"),
        "max_project_cost": Decimal("5000000.00"),
        "funding_percentage": Decimal("90.0"),
        "loan_limit": Decimal("4500000.00"),
        "max_loan": Decimal("4500000.00"),
        "subsidy_rate": Decimal("0.00"),
        "subsidy_amount": Decimal("0.00"),
        "interest_rate": Decimal("8.00"),
        "tenure_months": 84,
        "moratorium_months": 6,
        "moratorium_interest_policy": "accrued",
        "beneficiary_categories": ["Target Group / Backward Classes / SC / Rural Entrepreneurs"],
        "rural_urban": "Rural / Semi-Urban",
        "state": "ALL_INDIA",
        "district": "ALL_DISTRICTS",
        "new_existing_business": "Both",
        "education_experience": "Prior vocational training preferred",
        "documents_required": ["Aadhaar Card", "PAN Card", "Detailed Project Report (DPR)", "Land/Shed Proof"],
        "official_source": "https://nbcfdc.gov.in/schemes/term-loan",
        "source_document": "MoSJE Term Loan Assistance Policy Vol-II",
        "effective_from": "2024-04-01",
        "effective_to": "2027-03-31",
        "last_verified": "2024-10-15",
        "last_verified_at": "2024-10-15"
    }
]

class SchemeRuleEngine:
    @staticmethod
    def evaluate_scheme(
        project_cost: Decimal,
        margin_capital: Decimal,
        configured_schemes: Optional[List[Dict[str, Any]]] = None
    ) -> SchemeRecommendationResponse:
        schemes = configured_schemes or SEEDED_SCHEMES
        calculated_financing = (project_cost * Decimal("0.90")).quantize(Decimal("0.01"))

        max_allowed_cost = max(s["max_project_cost"] for s in schemes)
        if project_cost > max_allowed_cost:
            return SchemeRecommendationResponse(
                eligible=False,
                scheme_code="EXCEEDS_SCHEME_LIMIT",
                scheme_name="Outside Configured Scheme Limits",
                project_cost=project_cost,
                calculated_financing=calculated_financing,
                actual_eligible_financing=Decimal("0.00"),
                interest_rate=Decimal("0.00"),
                tenure_months=0,
                moratorium_months=0,
                moratorium_interest_policy="unknown",
                source_document="MoSJE Guidelines 2024",
                notes=[f"Project cost exceeds statutory ceiling of ₹{max_allowed_cost:,.2f}."]
            )

        matched = None
        for s in schemes:
            if s["min_project_cost"] <= project_cost <= s["max_project_cost"]:
                matched = s
                break

        if not matched:
            matched = schemes[0]

        actual_eligible = min(calculated_financing, matched["max_loan"])
        return SchemeRecommendationResponse(
            eligible=True,
            scheme_code=matched["scheme_code"],
            scheme_name=matched["scheme_name"],
            project_cost=project_cost,
            calculated_financing=calculated_financing,
            actual_eligible_financing=actual_eligible,
            interest_rate=matched["interest_rate"],
            tenure_months=matched["tenure_months"],
            moratorium_months=matched["moratorium_months"],
            moratorium_interest_policy=matched["moratorium_interest_policy"],
            source_document=matched["source_document"]
        )
