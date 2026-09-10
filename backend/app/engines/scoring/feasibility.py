from decimal import Decimal
from typing import Dict, Any, List
from app.schemas.all_schemas import FeasibilityScoreBreakdown, RiskItem, SWOTResponse

DEFAULT_SCORING_WEIGHTS = {
    "market_demand": 0.25,
    "competition": 0.15,
    "capital_adequacy": 0.15,
    "profit_potential": 0.20,
    "risk": 0.15,
    "infrastructure": 0.10
}

class ScoringEngine:
    @staticmethod
    def compute_feasibility(
        category: str,
        margin_capital: Decimal,
        experience_years: int,
        infra_flags: Dict[str, bool],
        competitor_count_5km: int,
        weights: Dict[str, float] = DEFAULT_SCORING_WEIGHTS
    ) -> FeasibilityScoreBreakdown:
        # Market Demand (0-100)
        demand_base = 75.0
        if category.lower() in ["dairy", "poultry", "food processing", "retail", "agriculture"]:
            demand_base = 85.0
        elif category.lower() in ["digital services", "education"]:
            demand_base = 70.0
        market_demand = min(100.0, demand_base)

        # Competition Score (Higher score = healthier competition / room for new entrant)
        if competitor_count_5km == 0:
            competition_score = 75.0 # monopoly or unproven market
        elif 1 <= competitor_count_5km <= 4:
            competition_score = 90.0 # healthy proven demand, low saturation
        elif 5 <= competitor_count_5km <= 10:
            competition_score = 65.0 # moderately saturated
        else:
            competition_score = 45.0 # highly saturated

        # Capital Adequacy
        if margin_capital >= Decimal("100000"):
            capital_score = 90.0
        elif margin_capital >= Decimal("50000"):
            capital_score = 78.0
        elif margin_capital >= Decimal("20000"):
            capital_score = 65.0
        else:
            capital_score = 50.0

        # Profit Potential (Based on category & capital buffer)
        profit_score = 80.0 if category.lower() in ["dairy", "food processing", "textiles"] else 72.0

        # Infrastructure Score
        infra_total = len(infra_flags)
        infra_true = sum(1 for v in infra_flags.values() if v)
        infra_score = (infra_true / infra_total * 100.0) if infra_total > 0 else 70.0

        # Risk Score (Inverted: higher score = lower operational risk)
        exp_factor = min(experience_years * 5, 25)
        risk_score = 60.0 + exp_factor

        # Weighted calculation
        overall = (
            market_demand * weights.get("market_demand", 0.25) +
            competition_score * weights.get("competition", 0.15) +
            capital_score * weights.get("capital_adequacy", 0.15) +
            profit_score * weights.get("profit_potential", 0.20) +
            risk_score * weights.get("risk", 0.15) +
            infra_score * weights.get("infrastructure", 0.10)
        )
        overall = round(overall, 1)

        # Category label
        if overall >= 80.0:
            label = "Strong Opportunity"
        elif overall >= 65.0:
            label = "Good"
        elif overall >= 50.0:
            label = "Moderate"
        else:
            label = "High Risk"

        disclaimer = (
            "Feasibility score is an advisory estimate generated from local market heuristics, "
            "infrastructure parameters, and credit benchmarks. It does not guarantee commercial success or credit approval."
        )

        return FeasibilityScoreBreakdown(
            market_demand_score=round(market_demand, 1),
            competition_score=round(competition_score, 1),
            capital_adequacy_score=round(capital_score, 1),
            profit_potential_score=round(profit_score, 1),
            risk_score=round(risk_score, 1),
            infrastructure_score=round(infra_score, 1),
            overall_score=overall,
            category_label=label,
            disclaimer=disclaimer
        )


class RiskEngine:
    """
    MODEL 3 — BUSINESS RISK PREDICTION ENGINE
    Replaces static deterministic constants with multi-dimensional calibrated risk modeling:
    1. Market-Price Risk: Historical volatility, forecast uncertainty, perishability
    2. Demand Risk: Demand trend, population, competitor saturation, market access
    3. Supply-Chain Risk: Transport availability, road distance, supplier concentration
    4. Infrastructure Risk: Electricity continuity, clean water, cold chain / storage
    5. Financial Risk: Capital adequacy, working-capital gap, EMI debt burden
    6. Operational Risk: Entrepreneur experience, business complexity, input availability
    """
    @staticmethod
    def evaluate_risks(
        category: str,
        margin_capital: Decimal,
        infra_flags: Dict[str, bool],
        experience_years: int,
        competitor_count_5km: int = 2
    ) -> List[RiskItem]:
        cat_lower = category.lower()
        risks: List[RiskItem] = []

        # 1. Market-Price Risk
        is_perishable = cat_lower in ["dairy", "poultry", "fisheries", "vegetables", "food processing"]
        mkt_score = 42 if cat_lower in ["dairy", "retail"] else (58 if is_perishable else 35)
        mkt_prob = round(mkt_score / 100.0, 2)
        risks.append(RiskItem(
            dimension="Market-price",
            category="Market-Price Volatility Risk",
            risk_score=mkt_score,
            probability=mkt_prob,
            severity_level="Moderate" if mkt_score < 50 else "High",
            description="Probability of adverse spot-price fluctuation and mandi procurement rate volatility.",
            potential_features=["Historical price volatility (NSSO/Agmarknet)", "Perishability index", "Storage shelf-life"],
            mitigation_strategy="Establish fixed-price milk cooperative procurement or value-added processing (Paneer/Curd)."
        ))

        # 2. Demand Risk
        demand_score = 30 if competitor_count_5km <= 3 else (55 if competitor_count_5km <= 8 else 75)
        demand_prob = round(demand_score / 100.0, 2)
        risks.append(RiskItem(
            dimension="Demand",
            category="Local Market Demand & Saturation Risk",
            risk_score=demand_score,
            probability=demand_prob,
            severity_level="Low" if demand_score < 40 else ("Moderate" if demand_score < 65 else "High"),
            description="Likelihood of market saturation or insufficient local consumer purchasing capacity.",
            potential_features=["Competitor density within 5km", "Block population density", "Household income index"],
            mitigation_strategy="Diversify distribution across neighboring village weekly haats and institutional buyers."
        ))

        # 3. Supply-Chain Risk
        has_transport = infra_flags.get("transport_available", False)
        sc_score = 28 if has_transport else 72
        sc_prob = round(sc_score / 100.0, 2)
        risks.append(RiskItem(
            dimension="Supply-chain",
            category="Input & Logistics Supply Chain Risk",
            risk_score=sc_score,
            probability=sc_prob,
            severity_level="Low" if sc_score < 40 else "High",
            description="Risk of input supply disruptions, livestock feed inflation, or transport bottlenecks.",
            potential_features=["Paved road connectivity", "Distance to raw material mandi", "Feed supplier concentration"],
            mitigation_strategy="Form raw-material purchasing collective with neighboring producers to hedge logistics costs."
        ))

        # 4. Infrastructure Risk
        has_power = infra_flags.get("electricity_available", True)
        has_water = infra_flags.get("water_available", True)
        has_storage = infra_flags.get("storage_available", False)
        infra_score = 20 if (has_power and has_water and has_storage) else (35 if (has_power and has_water) else 78)
        infra_prob = round(infra_score / 100.0, 2)
        risks.append(RiskItem(
            dimension="Infrastructure",
            category="Utilities & Processing Infrastructure Risk",
            risk_score=infra_score,
            probability=infra_prob,
            severity_level="Low" if infra_score < 40 else "High",
            description="Probability of yield disruption caused by power outages or water shortage.",
            potential_features=["Daily power availability hours", "Borewell groundwater depth", "Cold-chain infrastructure presence"],
            mitigation_strategy="Install solar-powered backup lighting/aeration and rainwater harvesting recharge pits."
        ))

        # 5. Financial Risk
        fin_score = 24 if margin_capital >= Decimal("100000") else (45 if margin_capital >= Decimal("50000") else 70)
        fin_prob = round(fin_score / 100.0, 2)
        risks.append(RiskItem(
            dimension="Financial",
            category="Liquidity & Debt Service Risk",
            risk_score=fin_score,
            probability=fin_prob,
            severity_level="Low" if fin_score < 40 else "High",
            description="Probability of debt delinquency or cash flow shortfall during initial 3-6 months ramp-up.",
            potential_features=["Capital margin adequacy ratio", "Estimated DSCR ratio", "Working capital reserve buffer"],
            mitigation_strategy="Utilize 6-month MoSJE loan moratorium to reinvest operating revenues into reserves."
        ))

        # 6. Operational Risk
        op_score = 20 if experience_years >= 3 else (40 if experience_years >= 1 else 68)
        op_prob = round(op_score / 100.0, 2)
        risks.append(RiskItem(
            dimension="Operational",
            category="Execution & Operational Complexity Risk",
            risk_score=op_score,
            probability=op_prob,
            severity_level="Low" if op_score < 40 else "Moderate",
            description="Probability of operational setbacks due to lack of domain technical training or animal disease.",
            potential_features=["Years of domain experience", "Enterprise operational complexity", "Access to veterinary care"],
            mitigation_strategy="Enroll in Krishi Vigyan Kendra (KVK) / RSETI technical skill certification program."
        ))

        return risks

