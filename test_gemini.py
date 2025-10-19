import requests
import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
print(f"Testing with key: {GEMINI_API_KEY[:20]}...")

url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"

data = {
    "contents": [{
        "parts": [{
            "text": "Say hello in one word"
        }]
    }]
}

response = requests.post(url, json=data)
print(f"\nStatus Code: {response.status_code}")
print(f"\nFull Response:\n{response.text}")