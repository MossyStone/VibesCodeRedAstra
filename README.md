# SkillQuest

**An AI-powered learning adventure that adapts to you — discover, play, and grow through personalized tech quests.**

SkillQuest combines the personalization of AI (Google Gemini) with the interactivity of gamified learning. Users choose what they want to learn, and the app creates a customized “quest” path — complete with voice narration powered by ElevenLabs.

---

## Features

* **Personalized Learning Paths**
  Gemini AI dynamically generates learning quests based on user-selected topics.

* **Voice Narration**
  ElevenLabs brings the learning assistant to life with natural voice feedback and narration.

* **Gamified Experience**
  Users earn points and complete AI-driven challenges to progress through their learning journey.

* **Responsive Frontend (React)**
  Clean and modern UI built for a smooth learning experience.

* **Python Backend (Flask or FastAPI)**
  Handles AI logic, API requests, and communication between frontend and backend.

---

## Tech Stack

| Layer      | Technology                                    |
| ---------- | --------------------------------------------- |
| Frontend   | React, JavaScript, HTML, CSS (or TailwindCSS) |
| Backend    | Python (Flask or FastAPI)                     |
| AI APIs    | Google Gemini API, ElevenLabs Voice API       |
| Deployment | Render / Replit / GitHub Pages                |

---

## Installation & Setup

### Prerequisites

* Node.js & npm
* Python 3.9+
* API Keys for:

  * [Google Gemini API](https://ai.google.dev/)
  * [ElevenLabs](https://elevenlabs.io/)

---

### Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/skillquest.git
cd skillquest
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Runs the React app locally on `http://localhost:3000`.

---

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate    # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python app.py
```

Runs the backend server locally on `http://localhost:5000`.

---

### Environment Variables

Create a `.env` file in the backend directory:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

---

## Project Structure

```
skillquest/
│
├── frontend/                 # React app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.js
│   └── package.json
│
├── backend/                  # Python backend
│   ├── app.py
│   ├── routes/
│   ├── services/
│   ├── requirements.txt
│   └── .env
│
└── README.md
```

---

## How It Works

1. The user selects a **topic** (for example, “Learn Python basics”).
2. The backend sends the request to **Gemini**, which generates a series of short, adaptive challenges.
3. Each challenge is shown in the frontend as a “quest.”
4. **ElevenLabs** provides a spoken narration of the challenge and AI feedback.
5. Users earn progress points as they complete quests.

---

## Screenshots / Demo

*(Add screenshots or demo GIFs here)*

```
![SkillQuest Homepage](assets/screenshot-home.png)
![Demo Quest](assets/screenshot-demo.png)
```

---

## Team

| Member        | Role                            | Skills                               |
| ------------- | ------------------------------- | ------------------------------------ |
| Madison       | Project Manager / Frontend Lead | JS, HTML/CSS, C#, Project Management |
| Team Member 1 | Game Logic / API Integration    | C++, Python, SQL, Game Dev           |
| Team Member 2 | AI & Backend Developer          | Python, C++, Gemini Integration      |
| Team Member 3 | Backend / Voice Integration     | Java, Python, ElevenLabs API         |

---

## Future Improvements

* Add voice input (speech-to-text interaction)
* Leaderboard and achievements
* Save progress and user profiles
* More learning tracks and difficulty levels

---

## License

This project is released under the MIT License.
See `LICENSE` for more information.
