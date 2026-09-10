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
    dimension: str
    category: str
    risk_score: int
    probability: float
    severity_level: str
    description: str
    potential_features: List[str] = []
    mitigation_strategy: Optional[str] = None

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
        experience_years: int,
        competitor_count_5km: int = 2
    ) -> List[RiskItem]:
        cat_lower = category.lower()
        is_perishable = cat_lower in ["dairy", "poultry", "fisheries", "food processing"]
        mkt_score = 42 if cat_lower in ["dairy", "retail"] else (58 if is_perishable else 35)
        
        return [
            RiskItem(
                dimension="Market-price",
                category="Market-Price Volatility Risk",
                risk_score=mkt_score,
                probability=round(mkt_score / 100.0, 2),
                severity_level="Moderate" if mkt_score < 50 else "High",
                description="Probability of spot price fluctuations in mandi.",
                potential_features=["Price volatility", "Perishability"],
                mitigation_strategy="Fixed-price buyer agreement"
            ),
            RiskItem(
                dimension="Demand",
                category="Market Saturation Risk",
                risk_score=30 if competitor_count_5km <= 3 else 65,
                probability=0.30 if competitor_count_5km <= 3 else 0.65,
                severity_level="Low" if competitor_count_5km <= 3 else "High",
                description="Local market saturation and competition.",
                potential_features=["Competitor count", "Local population"],
                mitigation_strategy="Explore weekly village haats"
            ),
            RiskItem(
                dimension="Supply-chain",
                category="Logistics & Feed Risk",
                risk_score=28 if infra_flags.get("transport_available") else 72,
                probability=0.28 if infra_flags.get("transport_available") else 0.72,
                severity_level="Low" if infra_flags.get("transport_available") else "High",
                description="Raw material transport reliability.",
                potential_features=["Road connectivity", "Distance"],
                mitigation_strategy="Bulk procurement collective"
            ),
            RiskItem(
                dimension="Infrastructure",
                category="Utilities Continuity Risk",
                risk_score=25 if (infra_flags.get("water_available") and infra_flags.get("electricity_available")) else 70,
                probability=0.25 if (infra_flags.get("water_available") and infra_flags.get("electricity_available")) else 0.70,
                severity_level="Low" if (infra_flags.get("water_available") and infra_flags.get("electricity_available")) else "High",
                description="Electricity and water supply reliability.",
                potential_features=["Power availability", "Water access"],
                mitigation_strategy="Solar backup setup"
            ),
            RiskItem(
                dimension="Financial",
                category="Liquidity & Debt Service Risk",
                risk_score=24 if margin_capital >= Decimal("100000") else 65,
                probability=0.24 if margin_capital >= Decimal("100000") else 0.65,
                severity_level="Low" if margin_capital >= Decimal("100000") else "High",
                description="Working capital reserve buffer.",
                potential_features=["Margin adequacy", "EMI burden"],
                mitigation_strategy="Utilize 6-month moratorium"
            ),
            RiskItem(
                dimension="Operational",
                category="Execution Complexity Risk",
                risk_score=20 if experience_years >= 2 else 60,
                probability=0.20 if experience_years >= 2 else 0.60,
                severity_level="Low" if experience_years >= 2 else "Moderate",
                description="Technical domain expertise.",
                potential_features=["Experience years", "Complexity"],
                mitigation_strategy="KVK vocational training"
            )
        ]

