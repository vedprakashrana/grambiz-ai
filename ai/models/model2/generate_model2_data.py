"""
UDYAM-SETU - Model 2 synthetic data generator (v2)

Extends each of the 50 village x commodity series to 9 months (2024-01
to 2024-09) with genuine, learnable relationships:
  - price follows a seasonal sine pattern + slow trend + noise
  - festival months boost demand and nudge price upward
  - demand responds inversely to price changes (higher price -> lower demand)
  - price_next_1m/3m/6m and demand_next_1m/3m are the ACTUAL future
    values from the simulated series (shifted forward), not independent
    random labels
  - price_volatility_3m = rolling 3-month std of price
  - price_trend and pricing_recommendation are derived deterministically
    from the actual trailing price trend, matching the real dynamics

This keeps the same columns/schema as the original dataset but gives
the model real signal to learn, and enough history (9 months) to
compute lag/rolling features properly.
"""
import numpy as np
import pandas as pd

np.random.seed(42)

BASE = pd.read_csv("SIH26091_Model2_Price_Demand_Forecasting_Villages_150_Complete.csv")
SERIES_KEYS = ["state", "district", "block", "village",
               "business_category", "commodity_or_service", "unit"]
base_series = BASE.drop_duplicates(subset=SERIES_KEYS)[
    SERIES_KEYS + ["historical_price_inr", "historical_demand_volume"]
].reset_index(drop=True)

N_MONTHS = 9
START_YEAR, START_MONTH = 2024, 1
FESTIVAL_MONTHS = {3, 8}  # e.g. Holi-adjacent, festival season

SEASON_MAP = {12: "Winter", 1: "Winter", 2: "Winter",
              3: "Summer", 4: "Summer", 5: "Summer",
              6: "Monsoon", 7: "Monsoon", 8: "Monsoon", 9: "Monsoon",
              10: "Autumn", 11: "Autumn"}

rows = []
for _, s in base_series.iterrows():
    base_price = s["historical_price_inr"]
    base_demand = s["historical_demand_volume"]
    amplitude = base_price * 0.04
    demand_amplitude = base_demand * 0.15
    trend_per_month = np.random.uniform(-0.002, 0.004) * base_price

    prices, demands = [], []
    for m in range(N_MONTHS + 6):  # extra months so next_6m always exists
        month_num = (START_MONTH - 1 + m) % 12 + 1
        seasonal = amplitude * np.sin(2 * np.pi * month_num / 12)
        festival = 1 if month_num in FESTIVAL_MONTHS else 0
        noise = np.random.normal(0, base_price * 0.01)
        price = base_price + seasonal + trend_per_month * m + festival * amplitude * 0.5 + noise
        prices.append(max(price, 0.1))

        price_pressure = -(price - base_price) / base_price
        d_noise = np.random.normal(0, base_demand * 0.05)
        demand = base_demand * (1 + 0.4 * price_pressure) + festival * demand_amplitude + d_noise
        demands.append(max(demand, 1))

    fuel_idx = 90 + np.cumsum(np.random.normal(0, 1.2, N_MONTHS + 6))
    mandi_idx = 100 + np.cumsum(np.random.normal(0, 1.5, N_MONTHS + 6))

    for m in range(N_MONTHS):
        month_num = (START_MONTH - 1 + m) % 12 + 1
        year = START_YEAR + (START_MONTH - 1 + m) // 12
        date = f"{year}-{month_num:02d}-01"

        hist_price = prices[m]
        hist_demand = demands[m]
        p1, p3, p6 = prices[m + 1], prices[m + 3], prices[m + 6]
        d1, d3 = demands[m + 1], demands[m + 3]

        window = prices[max(0, m - 2): m + 1]
        volatility = float(np.std(window)) if len(window) > 1 else 0.0

        pct_change_3m = (p3 - hist_price) / hist_price
        if pct_change_3m > 0.02:
            trend = "Upward"
        elif pct_change_3m < -0.02:
            trend = "Downward"
        else:
            trend = "Stable"

        if trend == "Upward" and d1 < hist_demand:
            reco = "Gradual Price Hike"
        elif trend == "Downward" or d1 < hist_demand * 0.85:
            reco = "Promotional Discounting"
        else:
            reco = "Competitive Market Rate"

        rows.append({
            **{k: s[k] for k in SERIES_KEYS},
            "date": date, "year": year, "month": month_num,
            "season": SEASON_MAP[month_num],
            "festival_month_flag": 1 if month_num in FESTIVAL_MONTHS else 0,
            "fuel_price_index": round(fuel_idx[m], 2),
            "mandi_footfall_index": round(mandi_idx[m], 2),
            "historical_price_inr": round(hist_price, 2),
            "historical_demand_volume": round(hist_demand, 1),
            "price_next_1m": round(p1, 2),
            "price_next_3m": round(p3, 2),
            "price_next_6m": round(p6, 2),
            "demand_next_1m": round(d1, 1),
            "demand_next_3m": round(d3, 1),
            "price_volatility_3m": round(volatility, 2),
            "price_trend": trend,
            "pricing_recommendation": reco,
        })

out = pd.DataFrame(rows)
out.to_csv("model2_synthetic_v2.csv", index=False)
print("Generated", len(out), "rows")
print(out["price_trend"].value_counts())
print(out["pricing_recommendation"].value_counts())
