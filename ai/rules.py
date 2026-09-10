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
        "scheme_code": "MOSJE_MICRO_FINANCE",
        "scheme_name": "MoSJE Micro Finance Scheme",
        "min_project_cost": Decimal("0.00"),
        "max_project_cost": Decimal("140000.00"),
        "funding_percentage": Decimal("90.0"),
        "max_loan": Decimal("125000.00"),
        "interest_rate": Decimal("6.50"),
        "tenure_months": 36,
        "moratorium_months": 3,
        "moratorium_interest_policy": "accrued",
        "source_document": "MoSJE NBCFDC Micro Finance Guidelines 2024"
    },
    {
        "scheme_code": "MOSJE_TERM_LOAN",
        "scheme_name": "MoSJE Term Loan Scheme",
        "min_project_cost": Decimal("140000.01"),
        "max_project_cost": Decimal("5000000.00"),
        "funding_percentage": Decimal("90.0"),
        "max_loan": Decimal("4500000.00"),
        "interest_rate": Decimal("8.00"),
        "tenure_months": 84,
        "moratorium_months": 6,
        "moratorium_interest_policy": "accrued",
        "source_document": "MoSJE Term Loan Assistance Policy Vol-II"
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
