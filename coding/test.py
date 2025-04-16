import joblib
import pandas as pd

# Load model and encoders
model = joblib.load(r"C:\Customer Projects\plant_fertilizer_detection\model\fertilizer_decision_tree_model.pkl")
label_encoders = joblib.load(r"C:\Customer Projects\plant_fertilizer_detection\model\label_encoders.pkl")

# Sample user input
user_input = {
    'Plant Name': 'Tomato',
    'Soil Type': 'Loamy',
    'pH Level': 6.5,
    'Climate': 'Tropical',
    'Irrigation Type': 'Drip',
    'Organic Matter %': 2.5
}

# Convert to DataFrame
input_df = pd.DataFrame([user_input])

# Encode input
for col in input_df.columns:
    if col in label_encoders:
        input_df[col] = label_encoders[col].transform(input_df[col])

# Predict
prediction = model.predict(input_df)[0]

# Decode prediction
fertilizer_name = label_encoders['Fertilizer Type'].inverse_transform([prediction])[0]

print("Recommended Fertilizer:", fertilizer_name)