import requests
import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

# List all available models
url = f"https://generativelanguage.googleapis.com/v1beta/models?key={GEMINI_API_KEY}"

response = requests.get(url)
print(f"Status Code: {response.status_code}\n")

if response.status_code == 200:
    models = response.json()
    print("Available models:")
    for model in models.get('models', []):
        name = model.get('name', '')
        supported_methods = model.get('supportedGenerationMethods', [])
        if 'generateContent' in supported_methods:
            print(f"  ✅ {name}")
else:
    print(f"Error: {response.text}")