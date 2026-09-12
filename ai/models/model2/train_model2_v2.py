"""
UDYAM-SETU - Model 2: Price & Demand Forecasting (v2)
Trained on model2_synthetic_v2.csv (450 rows, 9 months/series),
now with lag and rolling-window features per the original spec.
"""
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, r2_score, accuracy_score, f1_score

DATA_PATH = "model2_synthetic_v2.csv"
SERIES_KEYS = ["state", "district", "block", "village",
               "business_category", "commodity_or_service", "unit"]

ID_COLS = ["state", "district", "block", "village", "date"]
CATEGORICAL_COLS = ["business_category", "commodity_or_service", "unit", "season"]
REGRESSION_TARGETS = [
    "price_next_1m", "price_next_3m", "price_next_6m",
    "demand_next_1m", "demand_next_3m", "price_volatility_3m",
]
CLASSIFICATION_TARGETS = ["price_trend", "pricing_recommendation"]
ALL_TARGETS = REGRESSION_TARGETS + CLASSIFICATION_TARGETS

df = pd.read_csv(DATA_PATH)
df = df.sort_values(SERIES_KEYS + ["date"]).reset_index(drop=True)

# --- Lag / rolling features per series (this is the actual time-series part) ---
grp = df.groupby(SERIES_KEYS)
df["price_lag_1"] = grp["historical_price_inr"].shift(1)
df["price_roll_mean_3"] = grp["historical_price_inr"].transform(
    lambda s: s.rolling(3, min_periods=1).mean()
)
df["demand_lag_1"] = grp["historical_demand_volume"].shift(1)
df["demand_roll_mean_3"] = grp["historical_demand_volume"].transform(
    lambda s: s.rolling(3, min_periods=1).mean()
)
# first month of each series has no lag_1 -> fill with current value
df["price_lag_1"] = df["price_lag_1"].fillna(df["historical_price_inr"])
df["demand_lag_1"] = df["demand_lag_1"].fillna(df["historical_demand_volume"])

X = df.drop(columns=ID_COLS + ALL_TARGETS + ["year"])

encoders = {}
for col in CATEGORICAL_COLS:
    le = LabelEncoder()
    X[col] = le.fit_transform(X[col])
    encoders[col] = le

feature_columns = X.columns.tolist()

regression_models = {}
classification_models = {}
target_encoders = {}

print("=== Regression targets ===")
for target in REGRESSION_TARGETS:
    y = df[target]
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    model = RandomForestRegressor(
        n_estimators=300, max_depth=7, min_samples_leaf=3, random_state=42
    )
    model.fit(X_train, y_train)
    pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, pred)
    r2 = r2_score(y_test, pred)
    print(f"{target}: MAE={mae:.3f}  R2={r2:.3f}")
    regression_models[target] = model

print("\n=== Classification targets ===")
for target in CLASSIFICATION_TARGETS:
    le_y = LabelEncoder()
    y = le_y.fit_transform(df[target])
    target_encoders[target] = le_y

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    model = RandomForestClassifier(
        n_estimators=300, max_depth=7, min_samples_leaf=3,
        random_state=42, class_weight="balanced",
    )
    model.fit(X_train, y_train)
    pred = model.predict(X_test)
    acc = accuracy_score(y_test, pred)
    f1 = f1_score(y_test, pred, average="macro")
    print(f"{target}: Accuracy={acc:.3f}  Macro-F1={f1:.3f}")
    classification_models[target] = model

joblib.dump({
    "regression_models": regression_models,
    "classification_models": classification_models,
    "encoders": encoders,
    "target_encoders": target_encoders,
    "feature_columns": feature_columns,
}, "model2_price_demand.joblib")

print("\nSaved model2_price_demand.joblib")
