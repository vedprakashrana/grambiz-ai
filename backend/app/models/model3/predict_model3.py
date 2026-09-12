"""
UDYAM-SETU - Model 3 inference wrapper.
Import predict_risk() into your backend (Flask/FastAPI) route.

Decision threshold set to 0.4 (not 0.5) so borderline cases are flagged
as risky rather than missed -- appropriate for a risk-screening tool,
where a false "safe" is worse than a false alarm.
"""
import joblib
import pandas as pd

_artifact = joblib.load("model3_risk.joblib")
_model = _artifact["model"]
_encoders = _artifact["encoders"]
_feature_columns = _artifact["feature_columns"]

RISK_THRESHOLD = 0.4


def predict_risk(input_dict: dict) -> dict:
    """
    input_dict must contain all raw feature keys, e.g.:
    {
      "business_category": "Dairy & Livestock",
      "prior_experience": 0,
      "own_capital_inr": 85000,
      "competitors_5km": 19,
      "road_available": 1,
      "electricity_available": 1,
      "basic_infrastructure_available": 0,
      "demand_trend": 0.46,
      "price_volatility": 0.315,
      "buyer_dependency": 0.292,
      "supply_chain_reliability": 0.974,
      "monthly_fixed_cost_inr": 2600,
      "monthly_revenue_estimate_inr": 59000
    }
    Returns risk label (0/1), risk score, risk level, and top contributing factors.
    """
    row = {col: input_dict[col] for col in _feature_columns}
    df = pd.DataFrame([row])

    for col, le in _encoders.items():
        df[col] = le.transform(df[col])

    proba = _model.predict_proba(df)[0][1]
    label = int(proba >= RISK_THRESHOLD)

    if proba >= 0.7:
        level = "High"
    elif proba >= RISK_THRESHOLD:
        level = "Medium"
    else:
        level = "Low"

    importances = sorted(
        zip(_feature_columns, _model.feature_importances_),
        key=lambda x: -x[1],
    )[:5]

    vol = float(input_dict.get("price_volatility", 0.20))
    trend = float(input_dict.get("demand_trend", 0.50))
    c5 = int(input_dict.get("competitors_5km", 3))
    has_road = bool(input_dict.get("road_available", 1))
    has_power = bool(input_dict.get("electricity_available", 1))
    has_infra = bool(input_dict.get("basic_infrastructure_available", 1))
    exp = bool(input_dict.get("prior_experience", 1))
    rev = float(input_dict.get("monthly_revenue_estimate_inr", 50000.0))
    opex = float(input_dict.get("monthly_fixed_cost_inr", 20000.0))

    mkt_score = int(min(95, max(15, vol * 120)))
    demand_score = int(min(95, max(15, (1.0 - trend) * 60 + c5 * 4.5)))
    sc_score = int(25 if has_road else 70)
    infra_score = int(20 if (has_power and has_infra) else 68)
    profit_margin = (rev - opex) / max(1.0, rev)
    fin_score = int(min(90, max(15, (1.0 - profit_margin) * 60)))
    op_score = int(22 if exp else 65)

    dimensional_risks = {
        "market_risk": {"dimension": "Market-Price Risk", "score": mkt_score, "level": "High" if mkt_score >= 60 else ("Moderate" if mkt_score >= 35 else "Low")},
        "demand_seasonal_risk": {"dimension": "Demand & Seasonal Risk", "score": demand_score, "level": "High" if demand_score >= 60 else ("Moderate" if demand_score >= 35 else "Low")},
        "supply_chain_risk": {"dimension": "Supply-Chain Risk", "score": sc_score, "level": "High" if sc_score >= 60 else ("Moderate" if sc_score >= 35 else "Low")},
        "infrastructure_risk": {"dimension": "Infrastructure Risk", "score": infra_score, "level": "High" if infra_score >= 60 else ("Moderate" if infra_score >= 35 else "Low")},
        "financial_risk": {"dimension": "Financial Risk", "score": fin_score, "level": "High" if fin_score >= 60 else ("Moderate" if fin_score >= 35 else "Low")},
        "operational_risk": {"dimension": "Operational Risk", "score": op_score, "level": "High" if op_score >= 60 else ("Moderate" if op_score >= 35 else "Low")},
    }

    major_threats = []
    if mkt_score >= 40:
        major_threats.append("Spot-price volatility & procurement price swings")
    if demand_score >= 40:
        major_threats.append(f"Local competitive saturation ({c5} units within 5km)")
    if sc_score >= 50:
        major_threats.append("Transport connectivity and raw-material logistics bottleneck")
    if not major_threats:
        major_threats.append("Seasonal feed and raw material price inflation")

    return {
        "risk_label": label,
        "risk_score": round(proba * 100, 1),
        "risk_probability": round(proba, 2),
        "risk_level": level,
        "dimensional_risks": dimensional_risks,
        "major_threats": major_threats[:3],
        "top_factors": [f[0] for f in importances],
    }


if __name__ == "__main__":
    sample = {
        "business_category": "Dairy & Livestock",
        "prior_experience": 0,
        "own_capital_inr": 85000,
        "competitors_5km": 19,
        "road_available": 1,
        "electricity_available": 1,
        "basic_infrastructure_available": 0,
        "demand_trend": 0.46,
        "price_volatility": 0.315,
        "buyer_dependency": 0.292,
        "supply_chain_reliability": 0.974,
        "monthly_fixed_cost_inr": 2600,
        "monthly_revenue_estimate_inr": 59000,
    }
    print(predict_risk(sample))
