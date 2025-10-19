// API configuration
const API_URL = 'https://automatic-computing-machine-5gvgqj79j4x627q44-5000.app.github.dev/';

// Generate a quest
export async function generateQuest(topic, difficulty = 'beginner') {
  try {
    const response = await fetch(`${API_URL}/api/generate-quest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ topic, difficulty })
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate quest');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating quest:', error);
    throw error;
  }
}

// Check answer
export async function checkAnswer(userAnswer, correctAnswer) {
  try {
    const response = await fetch(`${API_URL}/api/check-answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ answer: userAnswer, correct: correctAnswer })
    });
    
    if (!response.ok) {
      throw new Error('Failed to check answer');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking answer:', error);
    throw error;
  }
}

// Get user progress
export async function getProgress() {
  try {
    const response = await fetch(`${API_URL}/api/progress`, {
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Failed to get progress');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting progress:', error);
    throw error;
  }
}

// Update progress
export async function updateProgress(points) {
  try {
    const response = await fetch(`${API_URL}/api/update-progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ points })
    });
    
    if (!response.ok) {
      throw new Error('Failed to update progress');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating progress:', error);
    throw error;
  }
}
