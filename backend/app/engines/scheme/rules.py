from decimal import Decimal
from typing import Optional, List, Dict, Any
from app.schemas.all_schemas import SchemeRecommendationResponse

# Default seeded scheme configurations as specified by MoSJE guidelines
SEEDED_SCHEMES = [
    {
        "scheme_code": "MOSJE_MICRO_FINANCE",
        "scheme_name": "MoSJE Micro Finance Scheme",
        "min_project_cost": Decimal("0.00"),
        "max_project_cost": Decimal("140000.00"),  # Up to ₹1.40 lakh
        "funding_percentage": Decimal("90.0"),    # Up to 90%
        "max_loan": Decimal("125000.00"),          # Max ₹1.25 lakh
        "interest_rate": Decimal("6.50"),          # 6.5% p.a.
        "tenure_months": 36,                       # 3 years
        "moratorium_months": 3,                    # 3 months
        "moratorium_interest_policy": "accrued",
        "source_document": "MoSJE NBCFDC Micro Finance Guidelines 2024",
        "effective_from": "2024-04-01",
        "last_verified_at": "2024-10-15"
    },
    {
        "scheme_code": "MOSJE_TERM_LOAN",
        "scheme_name": "MoSJE Term Loan Scheme",
        "min_project_cost": Decimal("140000.01"),  # Above ₹1.40 lakh
        "max_project_cost": Decimal("5000000.00"), # Up to ₹50 lakh
        "funding_percentage": Decimal("90.0"),    # Up to 90%
        "max_loan": Decimal("4500000.00"),         # Max ₹45 lakh (90% of 50L)
        "interest_rate": Decimal("8.00"),          # 8.0% p.a.
        "tenure_months": 84,                       # 7 years
        "moratorium_months": 6,                    # 6 months
        "moratorium_interest_policy": "accrued",
        "source_document": "MoSJE Term Loan Assistance Policy Vol-II",
        "effective_from": "2024-04-01",
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
        """
        Evaluates project cost against configured government schemes.
        Differentiates between:
        1. Calculated 90% financing
        2. Scheme cap limit
        3. Actual eligible financing (min of calculated financing and scheme max loan)
        """
        schemes = configured_schemes or SEEDED_SCHEMES
        calculated_financing = (project_cost * Decimal("0.90")).quantize(Decimal("0.01"))

        # Boundary Check: Above 50 Lakhs
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
                notes=[
                    f"Project cost of ₹{project_cost:,.2f} is outside the project-cost limit of the configured schemes (Maximum supported limit: ₹{max_allowed_cost:,.2f}).",
                    "Recommended action: Contact the State Channelising Agency (SCA) for large-scale institutional financing or SIDBI direct schemes."
                ]
            )

        # Match appropriate scheme version
        matched = None
        for s in schemes:
            if s["min_project_cost"] <= project_cost <= s["max_project_cost"]:
                matched = s
                break

        if not matched:
            return SchemeRecommendationResponse(
                eligible=False,
                scheme_code="NO_MATCHING_SCHEME",
                scheme_name="No Configured Scheme Found",
                project_cost=project_cost,
                calculated_financing=calculated_financing,
                actual_eligible_financing=Decimal("0.00"),
                interest_rate=Decimal("0.00"),
                tenure_months=0,
                moratorium_months=0,
                moratorium_interest_policy="unknown",
                source_document="MoSJE Scheme Registry",
                notes=["No matching scheme rule found for the given project cost range."]
            )

        # Calculate actual eligible loan (capped by scheme maximum funding limit)
        actual_eligible = min(calculated_financing, matched["max_loan"])
        notes = []
        if calculated_financing > matched["max_loan"]:
            notes.append(
                f"Calculated 90% financing (₹{calculated_financing:,.2f}) exceeds the scheme's statutory ceiling. Loan amount capped at maximum eligible limit of ₹{matched['max_loan']:,.2f}."
            )
        else:
            notes.append(
                f"Project qualifies for full 90% financing under {matched['scheme_name']}."
            )

        return SchemeRecommendationResponse(
            eligible=True,
            scheme_code=matched["scheme_code"],
            scheme_name=matched["scheme_name"],
            scheme_version_id=matched.get("id"),
            project_cost=project_cost,
            calculated_financing=calculated_financing,
            actual_eligible_financing=actual_eligible,
            interest_rate=matched["interest_rate"],
            tenure_months=matched["tenure_months"],
            moratorium_months=matched["moratorium_months"],
            moratorium_interest_policy=matched["moratorium_interest_policy"],
            source_document=matched["source_document"],
            effective_from=matched.get("effective_from"),
            last_verified_at=matched.get("last_verified_at"),
            notes=notes
        )
