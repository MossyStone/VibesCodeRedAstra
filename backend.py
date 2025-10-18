from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app=Flask(__name__)
CORS(app) #for frontend to talk with backend

#API keys (get keys from website later)
GEMINI_API_KEY="your key here"
ELEVENLABS_API_KEY="your key here"

user_progress={
  "score":0,
  "level":1,
  "completed_quests":[]
}

@app.route('/')
def home():
  return "SkillQuest Backend Is Running!"

@app.route('/api/generate-quest', methods=['POST'])
def generate_quest():
  #get what user wants to learn
  data=request.json
  topic=data.get('topic', 'Python')

  #returning fake data for now. replace with real API later
  try:
    prompt=f"Create a beginner programming quiz question about {topic}. Return as JSON with 'question', 'options' (array of 4 choices), 'correct' (index 0-3), and 'hint'"
    # You'll need to add Gemini API call here later
    # For now, still use fake data
    fake_quest={
      "question":f"What is a variable in {topic}?",
      "options": ["A storage box", "A function", "A loop", "A button"],
      "correct":0,
      "hint": "Think of it like a container"
    }
    return jsonify(fake_quest)
  except:
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

@app.route('/api/get-all-quests/<topic>')
def get_all_quests(topic):
  quests=[
    {
      "id": 1,
      "question": f"What is {topic}?",
      "type": "multiple-choice"
    },
    {
      "id":2,
      "question": f"Write a simple {topic} program",
      "type": "coding"
    },
    {
      "id":3,
      "question":f"Debug this {topic} code",
      "type": "debugging"
    }
  ]
  return jsonify(quests)


@app.route('/api/progress')
def get_progress():
  return jsonify(user_progress)

@app.route('/api/update-progress', methods=['POST'])
def update_progress():
  data=request.json
  user_progress["score"]+=data.get("points",0)
  
  user_progress["level"]= (user_progress["score"]//50)+1
  return jsonify(user_progress)


if __name__=='__main__':
  app.run(debug=True, port=5000)








