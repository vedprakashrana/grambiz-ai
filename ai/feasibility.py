# AI Layer - Feasibility & Risk Scoring Engine
from decimal import Decimal
from typing import Dict, Any, List
from pydantic import BaseModel

class FeasibilityScoreBreakdown(BaseModel):
    market_demand_score: float
    competition_score: float
    capital_adequacy_score: float
    profit_potential_score: float
    risk_score: float
    infrastructure_score: float
    overall_score: float
    category_label: str
    disclaimer: str

class RiskItem(BaseModel):
    category: str
    score: int
    description: str

class ScoringEngine:
    @staticmethod
    def compute_feasibility(
        category: str,
        margin_capital: Decimal,
        experience_years: int,
        infra_flags: Dict[str, bool],
        competitor_count_5km: int
    ) -> FeasibilityScoreBreakdown:
        demand_base = 85.0 if category.lower() in ["dairy", "poultry", "food processing", "retail"] else 75.0
        competition_score = 90.0 if competitor_count_5km <= 3 else 65.0
        capital_score = 90.0 if margin_capital >= Decimal("100000") else 75.0
        profit_score = 80.0
        infra_score = 85.0 if infra_flags.get("water_available") and infra_flags.get("electricity_available") else 60.0
        risk_score = 70.0 + min(experience_years * 5, 20)

        overall = round(
            demand_base * 0.25 +
            competition_score * 0.15 +
            capital_score * 0.15 +
            profit_score * 0.20 +
            risk_score * 0.15 +
            infra_score * 0.10,
            1
        )

        label = "Strong Opportunity" if overall >= 80.0 else ("Good" if overall >= 65.0 else "Moderate")
        return FeasibilityScoreBreakdown(
            market_demand_score=round(demand_base, 1),
            competition_score=round(competition_score, 1),
            capital_adequacy_score=round(capital_score, 1),
            profit_potential_score=round(profit_score, 1),
            risk_score=round(risk_score, 1),
            infrastructure_score=round(infra_score, 1),
            overall_score=overall,
            category_label=label,
            disclaimer="Advisory score based on MoSJE rural benchmark rules."
        )

class RiskEngine:
    @staticmethod
    def evaluate_risks(
        category: str,
        margin_capital: Decimal,
        infra_flags: Dict[str, bool],
        experience_years: int
    ) -> List[RiskItem]:
        return [
            RiskItem(
                category="Supply Chain Risk",
                score=35 if infra_flags.get("transport_available") else 70,
                description="Local feed & raw material transportation reliability."
            ),
            RiskItem(
                category="Market Price Risk",
                score=40 if category.lower() == "dairy" else 60,
                description="Mandi spot price fluctuations and perishability."
            ),
            RiskItem(
                category="Financial Liquidity Risk",
                score=30 if margin_capital >= Decimal("50000") else 65,
                description="Adequacy of working capital reserves during initial setup."
            )
        ]
