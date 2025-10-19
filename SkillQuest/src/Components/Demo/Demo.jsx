import React, { useState, useEffect } from 'react'
import './Demo.css'
import { generateQuest, checkAnswer, updateProgress, getProgress } from '../../api'

export const Demo = () => {
  const [messages, setMessages] = useState([
    { sender: 'Bot', text: 'Hi there! What programming topic do you want to learn today?' }
  ]);
  const [input, setInput] = useState('');
  const [currentQuest, setCurrentQuest] = useState(null);
  const [userProgress, setUserProgress] = useState({ score: 0, level: 1 });
  const [waitingForAnswer, setWaitingForAnswer] = useState(false);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const progress = await getProgress();
      setUserProgress(progress);
    } catch (error) {
      console.error('Failed to load progress');
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'You', text: userMessage }]);
    setInput('');

    if (waitingForAnswer && currentQuest) {
      handleAnswerSubmission(userMessage);
      return;
    }

    try {
      setMessages(prev => [...prev, { sender: 'Bot', text: '🤔 Generating a question for you...' }]);
      
      const quest = await generateQuest(userMessage, 'beginner');
      setCurrentQuest(quest);
      setWaitingForAnswer(true);

      setMessages(prev => {
        const filtered = prev.filter(msg => msg.text !== '🤔 Generating a question for you...');
        return [
          ...filtered,
          { sender: 'Bot', text: quest.question },
          { sender: 'Bot', text: `Options:\n${quest.options.map((opt, idx) => `${idx + 1}. ${opt}`).join('\n')}` },
          { sender: 'Bot', text: `💡 Hint: ${quest.hint}` },
          { sender: 'Bot', text: 'Reply with the number of your answer (1-4)' }
        ];
      });
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'Bot', text: '❌ Sorry, I had trouble generating a question. Please try again!' }]);
    }
  };

  const handleAnswerSubmission = async (answer) => {
    const answerNum = parseInt(answer);
    
    if (isNaN(answerNum) || answerNum < 1 || answerNum > 4) {
      setMessages(prev => [...prev, { sender: 'Bot', text: 'Please enter a number between 1 and 4!' }]);
      return;
    }

    try {
      const userAnswer = answerNum - 1;
      const result = await checkAnswer(userAnswer, currentQuest.correct);

      if (result.result === 'Correct!') {
        setMessages(prev => [...prev, 
          { sender: 'Bot', text: `✅ ${result.result} You earned ${result.points} points!` },
          { sender: 'Bot', text: `📚 ${currentQuest.explanation}` }
        ]);
        
        const newProgress = await updateProgress(result.points);
        setUserProgress(newProgress);
        
        if (newProgress.level > userProgress.level) {
          setMessages(prev => [...prev, { sender: 'Bot', text: `🎉 Level Up! You're now level ${newProgress.level}!` }]);
        }
      } else {
        setMessages(prev => [...prev, 
          { sender: 'Bot', text: `❌ ${result.result}` },
          { sender: 'Bot', text: `The correct answer was: ${currentQuest.options[currentQuest.correct]}` },
          { sender: 'Bot', text: `📚 ${currentQuest.explanation}` }
        ]);
      }

      setWaitingForAnswer(false);
      setCurrentQuest(null);
      setMessages(prev => [...prev, { sender: 'Bot', text: 'What topic would you like to learn next?' }]);

    } catch (error) {
      setMessages(prev => [...prev, { sender: 'Bot', text: '❌ Error checking answer. Please try again!' }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="DemoLayer" id='demo'>
      <div className="DemoLayer-header">
        SkillQuest Demo - Score: {userProgress.score} | Level: {userProgress.level}
      </div>
      <div className="DemoLayer-messages">
        {messages.map((msg, idx) => (
          <p key={idx} style={{ whiteSpace: 'pre-line' }}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <div className="DemoLayer-input">
        <input 
          type="text" 
          placeholder={waitingForAnswer ? "Enter answer (1-4)..." : "Type a programming topic..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}
