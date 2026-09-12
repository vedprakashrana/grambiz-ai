"""
UDYAM-SETU - Model 1 inference wrapper.
Import predict_feasibility() into your backend (Flask/FastAPI) route.
"""
import joblib
import pandas as pd

_artifact = joblib.load("model1_feasibility.joblib")
_model = _artifact["model"]
_encoders = _artifact["encoders"]
_feature_columns = _artifact["feature_columns"]


def predict_feasibility(input_dict: dict) -> dict:
    """
    input_dict must contain all raw feature keys, e.g.:
    {
      "business_category": "Dairy & Livestock",
      "prior_experience": 1,
      "own_capital_inr": 85000,
      "village_population": 4467,
      "households": 1035,
      "target_population": 2159,
      "nearby_population": 6819,
      "competitors_1km": 9,
      "competitors_5km": 19,
      "competitors_10km": 29,
      "market_within_5km": 1,
      "weekly_market_present": 1,
      "market_distance_km": 2.6,
      "road_available": 1,
      "electricity_available": 1,
      "basic_infrastructure_available": 0,
      "local_competition_index": 68.3,
      "local_demand_index": 73.0
    }
    Returns feasibility label (0/1), probability, and top contributing factors.
    """
    row = {col: input_dict[col] for col in _feature_columns}
    df = pd.DataFrame([row])

    for col, le in _encoders.items():
        df[col] = le.transform(df[col])

    proba = _model.predict_proba(df)[0][1]
    label = int(proba >= 0.5)

    importances = sorted(
        zip(_feature_columns, _model.feature_importances_),
        key=lambda x: -x[1],
    )[:5]

    pop = input_dict.get("village_population", 5000)
    has_road = bool(input_dict.get("road_available", 1))
    market_reach_km = round(min(10.0, max(5.0, 5.0 + (pop / 5000.0) * (2.0 if has_road else 1.0))), 1)
    c1 = input_dict.get("competitors_1km", 0)
    c5 = input_dict.get("competitors_5km", 3)
    c10 = input_dict.get("competitors_10km", 8)
    comp_idx = input_dict.get("local_competition_index", c5 * 8.5)
    dem_idx = input_dict.get("local_demand_index", 70.0)
    underserved = bool(dem_idx > (comp_idx + 10.0))

    pos_factors = []
    neg_factors = []
    if pop >= 4000:
        pos_factors.append(f"Substantial consumer base ({pop:,} residents) driving high local demand")
    else:
        neg_factors.append(f"Small local population ({pop:,} residents) requires serving neighboring haats")
    if input_dict.get("own_capital_inr", 0) >= 40000:
        pos_factors.append("Strong promoter equity margin covers setup contribution")
    if c5 <= 3:
        pos_factors.append(f"Low competitor saturation ({c5} units within 5km) leaves market share open")
    else:
        neg_factors.append(f"Active competitor density ({c5} units within 5km) necessitates competitive pricing")

    return {
        "feasibility_label": label,
        "feasibility_score": round(proba * 100, 1),
        "success_probability": round(proba, 2),
        "opportunity_class": "Good" if proba >= 0.6 else ("Moderate" if proba >= 0.4 else "Weak"),
        "market_reach_km": market_reach_km,
        "competitor_density": {
            "competitors_1km": c1,
            "competitors_5km": c5,
            "competitors_10km": c10,
            "local_competition_index": round(comp_idx, 1),
            "density_level": "Low" if c5 <= 3 else ("Moderate" if c5 <= 7 else "High")
        },
        "underserved_opportunity": {
            "is_underserved": underserved,
            "summary": "Local population demand index significantly exceeds existing mapped saturation." if underserved else "Commercial saturation is evenly balanced with estimated village demand."
        },
        "positive_factors": pos_factors,
        "negative_factors": neg_factors,
        "top_factors": [f[0] for f in importances],
    }


if __name__ == "__main__":
    sample = {
        "business_category": "Dairy & Livestock",
        "prior_experience": 1,
        "own_capital_inr": 85000,
        "village_population": 4467,
        "households": 1035,
        "target_population": 2159,
        "nearby_population": 6819,
        "competitors_1km": 9,
        "competitors_5km": 19,
        "competitors_10km": 29,
        "market_within_5km": 1,
        "weekly_market_present": 1,
        "market_distance_km": 2.6,
        "road_available": 1,
        "electricity_available": 1,
        "basic_infrastructure_available": 0,
        "local_competition_index": 68.3,
        "local_demand_index": 73.0,
    }
    print(predict_feasibility(sample))
