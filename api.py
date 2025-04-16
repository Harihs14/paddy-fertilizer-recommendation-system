from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)

CORS(app, origins="*")  

model = joblib.load(r"C:\Customer Projects\plant_fertilizer_detection\model\fertilizer_decision_tree_model.pkl")
label_encoders = joblib.load(r"C:\Customer Projects\plant_fertilizer_detection\model\label_encoders.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        user_input = request.get_json()

        required_keys = [
            'Plant Name', 'Soil Type', 'pH Level',
            'Climate', 'Irrigation Type', 'Organic Matter %'
        ]

        for key in required_keys:
            if key not in user_input:
                return jsonify({'error': f'Missing key: {key}'}), 400

        input_df = pd.DataFrame([user_input])

        for col in input_df.columns:
            if col in label_encoders:
                try:
                    input_df[col] = label_encoders[col].transform(input_df[col])
                except ValueError:
                    return jsonify({'error': f'Invalid value for {col}: {user_input[col]}'}), 400

        prediction = model.predict(input_df)[0]
        fertilizer = label_encoders['Fertilizer Type'].inverse_transform([prediction])[0]

        return jsonify({'recommended_fertilizer': fertilizer})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
