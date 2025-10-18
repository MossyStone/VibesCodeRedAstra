from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app=Flask(__name__)
CORS(app) #for frontend to talk with backend

#API keys (get keys from website later)
GEMINI_API_KEY="your key here"
ELEVENLABS_API_KEY="your key here"

@app.route('/')
def home():
  return "SkillQuest Backend Is Running!"

@app.route('/api/generate-quest', methods=['POST'])
def generate_quest():
  #get what user wants to learn
  data=request.json
  topic=data.get('topic', 'Python')

  #returning fake data for now. replace with real API later
  fake_quest={
    "question":f"What is a variable in {topic}?",
    "options": ["A storage box", "A function", "A loop", "A button"],
    "correct":0,
    "hint": "Think of it like a container"
  }
  return jsonify(fake_quest)

@app.route('/api/check-answer', methods=['POST'])
def check_answer():
  data=request.json
  user_answer=data.get('answer')
  correct_answer=data.get('correct')

  if user_answer==correct_answer:
    return jsonify({"result": "Correct!", "points":10})
  else:
    return jsonify({"result": "Incorrect! Try Again", "points":0})


if __name__=='__main__':
  app.run(debug=True, port=5000)








