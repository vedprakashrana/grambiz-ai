"""
UDYAM-SETU - End-to-End Advisor
Single entry point matching the actual website flow:

  User enters: location, business category, prior experience, own capital
       |
       v
  1. Estimate typical project cost for that business (from observed
     capital-scale data)
  2. Loan amount needed = project cost - own capital
  3. Government Scheme Engine -> best-fit scheme + its REAL interest
     rate, tenure, moratorium, subsidy
  4. Financial Calculator -> runs the repayment simulation using that
     scheme's actual terms (not a guessed rate)
       |
       v
  Output: budget needed, expected profit, repayment plan, and which
  scheme(s) to apply for -- one JSON-serializable result.

This is the only function your website backend needs to call for the
main advisory flow. Import: from advisor import get_business_advisory
"""
from scheme_engine import get_scheme_recommendation
from financial_calculator import simulate_loan_repayment, estimate_operating_cost

# Typical total project/setup cost per business category, derived from
# observed own-capital scale in Model 1's training data (see
# grambiz_model1_with_feasibility_label_clean.csv). This is a
# PROTOTYPE ASSUMPTION, not an official cost schedule -- disclose this
# to users/judges. Replace with real setup-cost survey data if available.
PROJECT_COST_TABLE = {
    "Agri-input & Farm Supply": 161250,
    "Dairy & Livestock": 110625,
    "Digital / CSC / Online Services": 55312,
    "Fisheries / Aquaculture": 141562,
    "Food Processing": 137188,
    "Handicrafts / Artisan Products": 54688,
    "Poultry & Egg Production": 89375,
    "Repair & Maintenance": 91562,
    "Retail / Kirana": 97812,
    "Tailoring & Garment Services": 66250,
}

# Average monthly revenue per business category, derived from Model 3's
# training data (monthly_revenue_estimate_inr). Same caveat: prototype
# assumption based on observed averages, not a personalized forecast.
# Once Model 2 is wired to specific commodity/price inputs from the
# user, replace this with a real per-user forecast.
REVENUE_TABLE = {
    "Agri-input & Farm Supply": 50688,
    "Dairy & Livestock": 68625,
    "Digital / CSC / Online Services": 26750,
    "Fisheries / Aquaculture": 33250,
    "Food Processing": 46625,
    "Handicrafts / Artisan Products": 19000,
    "Poultry & Egg Production": 62188,
    "Repair & Maintenance": 32625,
    "Retail / Kirana": 86375,
    "Tailoring & Garment Services": 30688,
}


def get_business_advisory(
    state: str,
    business_category: str,
    own_capital: float,
    prior_experience: bool = False,
    repayment_strategy_pct: float = 50.0,
    cash_reserve: float = 0.0,
    override_revenue: float = None,
) -> dict:
    """
    Single call: takes minimal user input, returns full advisory --
    budget needed, expected profit, repayment plan, eligible schemes.
    Chains Model 2 forecast when override_revenue is provided.
    """
    if business_category not in PROJECT_COST_TABLE:
        return {"error": f"Unknown business category: {business_category}"}

    project_cost = PROJECT_COST_TABLE[business_category]
    expected_monthly_revenue = float(override_revenue) if (override_revenue and override_revenue > 0) else REVENUE_TABLE[business_category]

    # --- Step 1: Scheme Engine (uses project cost + own capital) ---
    scheme_result = get_scheme_recommendation(
        business_category=business_category,
        state=state,
        project_cost=project_cost,
        own_capital=own_capital,
        prior_experience=prior_experience,
    )

    advisory = {
        "business_category": business_category,
        "state": state,
        "estimated_project_cost": project_cost,
        "own_capital": own_capital,
        "loan_amount_needed": scheme_result["loan_amount_needed"],
        "expected_monthly_revenue": expected_monthly_revenue,
        "expected_operating_cost": estimate_operating_cost(business_category),
    }

    if not scheme_result["eligible_for_loan_scheme"]:
        advisory["loan_required"] = False
        advisory["message"] = scheme_result["reason"]
        advisory["potential_monthly_profit"] = round(
            expected_monthly_revenue - estimate_operating_cost(business_category), 2
        )
        return advisory

    # --- Step 2: Financial Calculator, using the SCHEME's real terms ---
    scheme = scheme_result["recommended_scheme"]
    repayment = simulate_loan_repayment(
        monthly_revenue=expected_monthly_revenue,
        business_category=business_category,
        loan_amount=scheme_result["loan_amount_needed"],
        annual_interest_rate=scheme["interest_rate"],
        tenure_months=scheme["tenure_months"],
        moratorium_months=scheme["moratorium_months"],
        repayment_strategy_pct=repayment_strategy_pct,
        cash_reserve=cash_reserve,
    )

    advisory["loan_required"] = True
    advisory["recommended_scheme"] = {
        "name": scheme["scheme_name"],
        "interest_rate": scheme["interest_rate"],
        "interest_rate_type": scheme["interest_rate_type"],
        "tenure_months": scheme["tenure_months"],
        "moratorium_months": scheme["moratorium_months"],
        "subsidy_type": scheme["subsidy_type"],
        "subsidy_pct": scheme.get("subsidy_pct"),
        "eligibility_notes": scheme["eligibility_notes"],
        "required_documents": scheme["required_documents"],
        "official_source": scheme["official_source"],
    }
    advisory["alternative_schemes"] = [
        {"name": a["scheme_name"], "interest_rate": a["interest_rate"], "subsidy_pct": a.get("subsidy_pct")}
        for a in scheme_result["alternatives"]
    ]
    advisory["repayment_advice"] = {
        "potential_monthly_profit": repayment["potential_monthly_profit"],
        "emi": repayment["emi"],
        "can_afford_emi": repayment["can_afford_emi"],
        "surplus_after_emi": repayment["surplus_after_emi"],
        "estimated_payoff_months": repayment["estimated_payoff_months"],
        "total_interest_paid": repayment["total_interest_paid"],
        "repayment_schedule": repayment["repayment_schedule"],
    }
    advisory["disclosure"] = scheme_result["disclosure"]

    if not repayment["can_afford_emi"]:
        advisory["warning"] = (
            "This business's expected profit does not fully cover the EMI "
            "for this loan amount. Consider a smaller project scope, more "
            "own capital, or a longer tenure."
        )

    return advisory


if __name__ == "__main__":
    import json
    result = get_business_advisory(
        state="Jharkhand",
        business_category="Dairy & Livestock",
        own_capital=40000,
        prior_experience=True,
        repayment_strategy_pct=50,
        cash_reserve=2000,
    )
    print(json.dumps(result, indent=2, default=str))
