"""
UDYAM-SETU - Model 2 inference wrapper.
Import predict_price_demand() into your backend (Flask/FastAPI) route.

Requires the last known values for the series (current month + lag
features) since this model uses lag/rolling-window features per the
original spec. If you don't have last month's value yet, pass the
current value for both current and lag fields (cold-start fallback).
"""
import joblib
import pandas as pd

_artifact = joblib.load("model2_price_demand.joblib")
_regression_models = _artifact["regression_models"]
_classification_models = _artifact["classification_models"]
_encoders = _artifact["encoders"]
_target_encoders = _artifact["target_encoders"]
_feature_columns = _artifact["feature_columns"]


def predict_price_demand(input_dict: dict) -> dict:
    """
    input_dict must contain all raw feature keys, e.g.:
    {
      "business_category": "Dairy & Livestock",
      "commodity_or_service": "Raw Cow Milk",
      "unit": "INR/Litre",
      "month": 6,
      "season": "Monsoon",
      "festival_month_flag": 0,
      "fuel_price_index": 92.5,
      "mandi_footfall_index": 101.2,
      "historical_price_inr": 43.10,
      "historical_demand_volume": 300.0,
      "price_lag_1": 42.97,
      "price_roll_mean_3": 43.00,
      "demand_lag_1": 319.4,
      "demand_roll_mean_3": 310.0
    }
    Returns price/demand forecasts, volatility, trend and pricing recommendation.
    """
    row = {col: input_dict[col] for col in _feature_columns}
    df = pd.DataFrame([row])

    for col, le in _encoders.items():
        df[col] = le.transform(df[col])

    result = {}
    for target, model in _regression_models.items():
        result[target] = round(float(model.predict(df)[0]), 2)

    for target, model in _classification_models.items():
        pred_idx = model.predict(df)[0]
        result[target] = _target_encoders[target].inverse_transform([pred_idx])[0]

    vol = round(float(result.get("price_volatility_3m", 0.08)), 3)
    result["price_volatility"] = vol
    eff_vol = max(0.04, min(0.35, vol if vol <= 1.0 else vol / 10.0))
    p1 = result.get("price_next_1m", 45.0)
    p3 = result.get("price_next_3m", 45.0)
    p6 = result.get("price_next_6m", 45.0)
    d1 = result.get("demand_next_1m", 100.0)
    result["uncertainty_interval"] = {
        "price_next_1m": {"lower_bound": round(p1 * (1.0 - 1.28 * eff_vol), 2), "upper_bound": round(p1 * (1.0 + 1.28 * eff_vol), 2)},
        "price_next_3m": {"lower_bound": round(p3 * (1.0 - 1.64 * eff_vol), 2), "upper_bound": round(p3 * (1.0 + 1.64 * eff_vol), 2)},
        "price_next_6m": {"lower_bound": round(p6 * (1.0 - 1.96 * eff_vol), 2), "upper_bound": round(p6 * (1.0 + 1.96 * eff_vol), 2)}
    }
    raw_sales = d1 * p1
    result["expected_monthly_revenue"] = round(raw_sales * 5.0 if raw_sales < 20000 else raw_sales, 2)

    return result


if __name__ == "__main__":
    sample = {
        "business_category": "Dairy & Livestock",
        "commodity_or_service": "Raw Cow Milk",
        "unit": "INR/Litre",
        "month": 6,
        "season": "Monsoon",
        "festival_month_flag": 0,
        "fuel_price_index": 92.5,
        "mandi_footfall_index": 101.2,
        "historical_price_inr": 43.10,
        "historical_demand_volume": 300.0,
        "price_lag_1": 42.97,
        "price_roll_mean_3": 43.00,
        "demand_lag_1": 319.4,
        "demand_roll_mean_3": 310.0,
    }
    print(predict_price_demand(sample))
