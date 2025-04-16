import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.metrics import accuracy_score, classification_report
import matplotlib.pyplot as plt

df = pd.read_csv(r'C:\Customer Projects\plant_fertilizer_detection\modified_paddy_dataset.csv')

fertilizer_counts = df['Fertilizer Type'].value_counts()
common_fertilizers = fertilizer_counts[fertilizer_counts > 1].index
df = df[df['Fertilizer Type'].isin(common_fertilizers)]

label_encoders = {}
for column in df.columns:
    if df[column].dtype == 'object':
        le = LabelEncoder()
        df[column] = le.fit_transform(df[column])
        label_encoders[column] = le

X = df.drop('Fertilizer Type', axis=1)
y = df['Fertilizer Type']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

import joblib
import os

# Create a folder to store the model and encoders
os.makedirs("model", exist_ok=True)

# Save model
joblib.dump(model, "model/fertilizer_decision_tree_model.pkl")

# Save encoders dictionary
joblib.dump(label_encoders, "model/label_encoders.pkl")

plt.figure(figsize=(20, 10))
plot_tree(model, feature_names=X.columns, class_names=label_encoders['Fertilizer Type'].classes_, filled=True)
plt.savefig("model/fertilizer_decision_tree_diagram.png")
plt.close()