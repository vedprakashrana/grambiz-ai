from decimal import Decimal
from typing import Optional, List, Dict, Any
from app.schemas.all_schemas import SchemeRecommendationResponse

# Comprehensive Scheme Database matching Model 4 (Government Scheme, Loan & Subsidy Engine)
# Stored in versioned structured format, decoupled from ML predictive models
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
        "documents_required": ["Aadhaar Card", "Bank Passbook", "Income Certificate / Self-declaration", "Caste/Target Category Certificate"],
        "eligibility_rules": {
            "max_annual_income": 300000,
            "min_margin_percent": 10.0
        },
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
        "business_types": ["Dairy Chilling Unit", "Poultry Farm", "Agri-Logistics", "Food Processing", "Apparel & Garment Manufacturing", "Rural Workshop"],
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
        "education_experience": "Prior business activity or vocational training preferred",
        "documents_required": ["Aadhaar Card", "PAN Card", "Detailed Project Report (DPR)", "Land/Shed Proof", "Bank Statements (6 months)"],
        "eligibility_rules": {
            "max_annual_income": 300000,
            "min_margin_percent": 10.0
        },
        "official_source": "https://nbcfdc.gov.in/schemes/term-loan",
        "source_document": "MoSJE Term Loan Assistance Policy Vol-II 2024",
        "effective_from": "2024-04-01",
        "effective_to": "2027-03-31",
        "last_verified": "2024-10-15",
        "last_verified_at": "2024-10-15"
    },
    {
        "scheme_id": "PMEGP_RURAL",
        "scheme_code": "PMEGP_RURAL",
        "scheme_name": "Prime Minister's Employment Generation Programme (PMEGP)",
        "min_age": 18,
        "max_age": 65,
        "business_types": ["Manufacturing", "Food Processing", "Services", "Agri-allied"],
        "project_cost_min": Decimal("100000.00"),
        "project_cost_max": Decimal("5000000.00"),
        "min_project_cost": Decimal("100000.00"),
        "max_project_cost": Decimal("5000000.00"),
        "funding_percentage": Decimal("90.0"),
        "loan_limit": Decimal("4500000.00"),
        "max_loan": Decimal("4500000.00"),
        "subsidy_rate": Decimal("35.00"),
        "subsidy_amount": Decimal("1750000.00"),
        "interest_rate": Decimal("9.50"),
        "tenure_months": 84,
        "moratorium_months": 6,
        "moratorium_interest_policy": "serviced",
        "beneficiary_categories": ["General", "OBC", "SC", "ST", "Women", "Ex-Servicemen"],
        "rural_urban": "Rural (Special 35% Subsidy)",
        "state": "ALL_INDIA",
        "district": "ALL_DISTRICTS",
        "new_existing_business": "New Only",
        "education_experience": "8th Pass for projects > ₹10 Lakhs in manufacturing",
        "documents_required": ["EDP Training Certificate", "DPR", "Aadhaar Card", "Rural Area Certificate", "Educational Proof"],
        "eligibility_rules": {
            "min_margin_percent": 5.0,
            "rural_subsidy_special_category": 35.0
        },
        "official_source": "https://www.kviconline.gov.in/pmegpeportal",
        "source_document": "Ministry of MSME PMEGP Operational Guidelines 2024",
        "effective_from": "2024-04-01",
        "effective_to": "2026-03-31",
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
