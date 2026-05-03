import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { quizData } from '../data/ElectionData';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const triggerConfetti = (isMassive = false) => {
    if (isMassive) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FF9933', '#FFFFFF', '#138808']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FF9933', '#FFFFFF', '#138808']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } else {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF9933', '#FFFFFF', '#138808']
      });
    }
  };

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);
    
    if (option === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      
      // Trigger confetti on streaks of 3 or 5
      if (newStreak === 3 || newStreak === 5) {
        triggerConfetti(false);
      }
    } else {
      setStreak(0); // Reset streak on wrong answer
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
      // Trigger massive confetti if perfect score
      if (score === quizData.length || score + (isAnswered && selectedOption === quizData[currentQuestion].correctAnswer ? 1 : 0) === quizData.length) {
         triggerConfetti(true);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="glass-panel results-screen">
        <h2>Quiz Completed!</h2>
        <p>You have finished the Indian Election knowledge test.</p>
        <div className="score-display">
          {score} / {quizData.length}
        </div>
        <p style={{ marginBottom: '2rem' }}>
          {score === quizData.length 
            ? "Perfect Score! You are an Election Expert! 🏆"
            : "Good effort! Review the flashcards and timeline to learn more."}
        </p>
        <button className="nav-btn active" onClick={restartQuiz}>
          Take Quiz Again
        </button>
      </div>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <div className="glass-panel quiz-container">
      <div className="quiz-header">
        <h2>Knowledge Check</h2>
        <div className="quiz-stats">
          <span className="quiz-progress">
            Question {currentQuestion + 1} of {quizData.length}
          </span>
          {streak > 1 && (
            <span className="streak-counter" style={{marginLeft: '1rem', color: '#EF4444', fontWeight: 'bold', animation: 'fadeIn 0.5s'}}>
              🔥 {streak} Streak!
            </span>
          )}
        </div>
      </div>

      <div className="quiz-question">
        {question.question}
      </div>

      <div className="options-grid">
        {question.options.map((option, index) => {
          let className = 'option-btn';
          if (isAnswered) {
            if (option === question.correctAnswer) {
              className += ' correct';
            } else if (option === selectedOption) {
              className += ' incorrect';
            }
          }

          return (
            <button
              key={index}
              className={className}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered}
            >
              {option}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="explanation-box">
          <strong>{selectedOption === question.correctAnswer ? '✅ Correct!' : '❌ Incorrect.'}</strong>
          <p style={{ marginTop: '0.5rem' }}>{question.explanation}</p>
          <button className="next-btn" onClick={handleNext}>
            {currentQuestion + 1 === quizData.length ? 'Finish Quiz' : 'Next Question'}
          </button>
          <div style={{ clear: 'both' }}></div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
