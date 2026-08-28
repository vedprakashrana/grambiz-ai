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
    @staticmethod
    def evaluate_risks(
        category: str,
        margin_capital: Decimal,
        infra_flags: Dict[str, bool],
        experience_years: int
    ) -> List[RiskItem]:
        # 0-100 scale (lower is lower risk, higher is higher risk)
        risks = []
        
        # Supply chain risk
        sc_score = 35 if infra_flags.get("transport_available", False) else 75
        risks.append(RiskItem(
            category="Supply Chain Risk",
            score=sc_score,
            description="Availability and transit cost of essential inputs, feed, or raw inventory from regional mandis."
        ))

        # Market & Price Volatility Risk
        mkt_score = 45 if category.lower() in ["dairy", "retail"] else 60
        risks.append(RiskItem(
            category="Market Risk",
            score=mkt_score,
            description="Risk associated with wholesale milk procurement prices, perishable unsold stock, or buyer default."
        ))

        # Infrastructure & Utility Risk
        infra_score = 25 if (infra_flags.get("water_available") and infra_flags.get("electricity_available")) else 70
        risks.append(RiskItem(
            category="Infrastructure Risk",
            score=infra_score,
            description="Impact of power continuity and clean water supply on daily processing and livestock/machinery health."
        ))

        # Financial & Working Capital Risk
        fin_score = 30 if margin_capital >= Decimal("50000") else 65
        risks.append(RiskItem(
            category="Financial Risk",
            score=fin_score,
            description="Liquidity buffer to sustain 2-3 months of unexpected operating expenditures or delayed trade receivables."
        ))

        # Operational & Experience Risk
        op_score = 25 if experience_years >= 2 else 60
        risks.append(RiskItem(
            category="Operational Risk",
            score=op_score,
            description="Technical expertise in disease control, hygiene maintenance, equipment servicing, and statutory standards."
        ))

        # Seasonal Risk
        season_score = 55 if category.lower() in ["dairy", "agriculture", "poultry"] else 30
        risks.append(RiskItem(
            category="Seasonal Risk",
            score=season_score,
            description="Variations in output volume during summer dry spells or monsoon transportation bottlenecks."
        ))

        return risks
