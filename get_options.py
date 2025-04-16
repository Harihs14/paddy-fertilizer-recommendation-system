import pandas as pd
import json

df = pd.read_csv(r'C:\Customer Projects\plant_fertilizer_detection\modified_paddy_dataset.csv')

columns_to_extract = ['Plant Name', 'Soil Type', 'Climate', 'Irrigation Type']

# Create a dictionary of unique values
unique_values = {col: sorted(df[col].dropna().unique().tolist()) for col in columns_to_extract}

# Save as JSON
with open('frontend_options.json', 'w') as f:
    json.dump(unique_values, f, indent=4)

print("Saved unique column values to frontend_options.json")
