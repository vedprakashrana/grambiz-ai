"""
UDYAM-SETU - Model 3: Business Risk Prediction
Trains a Random Forest classifier on the risk_label target.
"""
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report, roc_auc_score

DATA_PATH = "grambiz_model3_with_risk_label_balanced.csv"

DROP_COLS = ["state", "district", "block", "village", "risk_label"]
CATEGORICAL_COLS = ["business_category"]

df = pd.read_csv(DATA_PATH)

X = df.drop(columns=DROP_COLS)
y = df["risk_label"]

encoders = {}
for col in CATEGORICAL_COLS:
    le = LabelEncoder()
    X[col] = le.fit_transform(X[col])
    encoders[col] = le

feature_columns = X.columns.tolist()

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model = RandomForestClassifier(
    n_estimators=200,
    max_depth=6,
    min_samples_leaf=3,
    random_state=42,
    class_weight="balanced",
)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
y_proba = model.predict_proba(X_test)[:, 1]

print("Accuracy:", accuracy_score(y_test, y_pred))
print("ROC-AUC:", roc_auc_score(y_test, y_proba))
print(classification_report(y_test, y_pred))

print("\nFeature importances:")
importances = sorted(zip(feature_columns, model.feature_importances_),
                      key=lambda x: -x[1])
for name, score in importances:
    print(f"  {name}: {score:.3f}")

joblib.dump({
    "model": model,
    "encoders": encoders,
    "feature_columns": feature_columns,
}, "model3_risk.joblib")

print("\nSaved model3_risk.joblib")
