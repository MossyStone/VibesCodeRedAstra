from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_session import Session
import requests
import json
import random
import os
from dotenv import load_dotenv

load_dotenv()

app=Flask(__name__)
CORS(app, supports_credentials=True, origins=['https://*.app.github.dev',
    'http://localhost:5173',
    'https://automatic-computing-machine-5gvgqj79j4x627q44-5173.app.github.dev']) #for frontend to talk with backend

app.config['SECRET_KEY'] = 'snail'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = False
Session(app)

#API keys (get keys from website later)
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
ELEVENLABS_API_KEY = os.getenv('ELEVENLABS_API_KEY')

def get_user_progress():
  if 'progress' not in session:
    session['progress']={
      "score":0,
      "level":1,
      "completed_quests":[]
    }
  return session['progress']

def validate_quest_input(data):
    """Validate input for generate-quest endpoint"""
    if not data:
        return False, "No data provided"
    
    topic = data.get('topic', '')
    difficulty = data.get('difficulty', '')
    
    # Validate topic
    if not topic or not isinstance(topic, str):
        return False, "Invalid topic"
    
    if len(topic) > 50:
        return False, "Topic too long (max 50 characters)"
    
    # Validate difficulty
    valid_difficulties = ['beginner', 'intermediate', 'advanced']
    if difficulty and difficulty not in valid_difficulties:
        return False, f"Invalid difficulty. Must be one of: {', '.join(valid_difficulties)}"
    
    return True, None


def validate_answer_input(data):
    """Validate input for check-answer endpoint"""
    if not data:
        return False, "No data provided"
    
    try:
        user_answer = int(data.get('answer'))
        correct_answer = int(data.get('correct'))
    except (TypeError, ValueError):
        return False, "Answer and correct must be valid integers"
    
    # Answers should be 0-3 (indices for multiple choice)
    if not (0 <= user_answer <= 3):
        return False, "Answer must be between 0 and 3"
    
    if not (0 <= correct_answer <= 3):
        return False, "Correct answer must be between 0 and 3"
    
    return True, None


def validate_progress_input(data):
    """Validate input for update-progress endpoint"""
    if not data:
        return False, "No data provided"
    
    try:
        points = int(data.get('points', 0))
    except (TypeError, ValueError):
        return False, "Points must be a valid integer"
    
    if points < 0:
        return False, "Points cannot be negative"
    
    if points > 100:
        return False, "Points too high (max 100 per request)"
    
    return True, None

@app.route('/')
def home():
  return "SkillQuest Backend Is Running!"
  

def call_gemini(prompt):
  #Call Gemini API to generate a question
  url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"

  headers={
    "Content-Type": "application/json"
  }
  data={
    "contents":[{
      "parts":[{
        "text": prompt
      }]
    }]
  }

  try:
    print("Calling Gemini API...")
    response=requests.post(url, json=data, headers=headers)
    response.raise_for_status()

    result=response.json()
    print(f"Gemini response: {result}")
    generated_text=result['candidates'][0]['content']['parts'][0]['text']
    return generated_text
  except Exception as e:
    print(f"Gemini API error: {e}")
    return None


@app.route('/api/generate-quest', methods=['POST'])
def generate_quest():
  #get what user wants to learn
  data=request.json

  is_valid, error_message = validate_quest_input(data)
  if not is_valid:
    return jsonify({"error": error_message}), 400

  topic=data.get('topic', 'Python')
  difficulty=data.get('difficulty', 'beginner')

  prompt = f"""Create a {difficulty} multiple choice question about {topic} programming.
    
  Return ONLY valid JSON in this exact format with no other text:
  {{
    "question": "Your question here",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correct": 0,
    "hint": "A helpful hint",
    "explanation": "Why this answer is correct"
  }}
    
  Make sure:
  - The question is clear and educational
  - All 4 options are plausible
  - correct is the index (0-3) of the correct answer
  - The hint doesn't give away the answer directly
  """

  gemini_response = call_gemini(prompt)

  if gemini_response:
    try:
      # Try to parse the JSON from Gemini
      # Clean the response (remove markdown if any)
      cleaned = gemini_response.strip()
      if cleaned.startswith("```json"):
        cleaned = cleaned[7:]  # Remove ```json
      if cleaned.startswith("```"):
        cleaned = cleaned[3:]  # Remove ```
      if cleaned.endswith("```"):
        cleaned = cleaned[:-3]  # Remove closing ```
            
      quest_data = json.loads(cleaned)
      return jsonify(quest_data)
            
    except json.JSONDecodeError:
      print("Failed to parse Gemini response as JSON")
      #fall through to backup questions

  backup_questions = [
    {
      "question": f"What is a variable in {topic}?",
      "options": ["A storage container for data", "A type of loop", "A function", "An error message"],
      "correct": 0,
      "hint": "Think about storing information",
      "explanation": "A variable is like a container that holds data in your program"
    },
    {
      "question": f"Which of these is used to repeat code in {topic}?",
      "options": ["Loop", "Variable", "Comment", "Semicolon"],
      "correct": 0,
      "hint": "It goes round and round",
      "explanation": "Loops allow you to repeat code multiple times"
    },
    {
      "question": f"What does debugging mean in {topic}?",
      "options": ["Finding and fixing errors", "Writing new code", "Deleting files", "Installing software"],
      "correct": 0,
      "hint": "Like a detective finding problems",
      "explanation": "Debugging is the process of finding and fixing errors in code"
    }
  ]

  return jsonify(random.choice(backup_questions))



@app.route('/api/check-answer', methods=['POST'])
def check_answer():
  data=request.json

  is_valid, error_message = validate_answer_input(data)
  if not is_valid:
    return jsonify({"error": error_message}), 400

  user_answer=int(data.get('answer'))
  correct_answer=int(data.get('correct'))

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
  progress=get_user_progress()
  return jsonify(progress)

@app.route('/api/update-progress', methods=['POST'])
def update_progress():
  data=request.json

  is_valid, error_message = validate_progress_input(data)
  if not is_valid:
    return jsonify({"error": error_message}), 400

  progress=get_user_progress()

  progress["score"] += data.get("points", 0)
  progress["level"] = (progress["score"] // 50) + 1

  session['progress'] = progress  # Save back to session

  return jsonify(progress)


if __name__=='__main__':
  app.run(debug=True, port=5000)








