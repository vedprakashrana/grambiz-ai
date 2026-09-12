"""
UDYAM-SETU - Model 1: Hyper-Local Business Feasibility
Trains a Random Forest classifier on the feasibility_label target.
"""
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report, roc_auc_score

DATA_PATH = "grambiz_model1_with_feasibility_label_clean.csv"

# Columns not used as model features
DROP_COLS = ["id", "state", "district", "block", "village",
             "historical_business_outcome", "feasibility_label"]

CATEGORICAL_COLS = ["business_category"]

df = pd.read_csv(DATA_PATH)

X = df.drop(columns=DROP_COLS)
y = df["feasibility_label"]

# Encode business_category
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

# Save model + encoders + feature order together (single artifact)
joblib.dump({
    "model": model,
    "encoders": encoders,
    "feature_columns": feature_columns,
}, "model1_feasibility.joblib")

print("\nSaved model1_feasibility.joblib")
