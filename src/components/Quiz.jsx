import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import confetti from 'canvas-confetti';
import { useElectionData } from '../hooks/useElectionData';

/**
 * Quiz Component
 * 
 * An interactive, gamified assessment to test users' knowledge of Indian elections.
 * Features:
 * - Dynamic question rendering from centralized data.
 * - Score tracking and "correct answer" streaks.
 * - Confetti celebrations (standard for streaks, massive for perfect scores).
 * - Immediate feedback with detailed explanations.
 * - Accessibility: ARIA roles for forms, alerts, and live regions.
 * 
 * @component
 * @returns {React.ReactElement} The rendered Quiz section.
 */
const Quiz = () => {
  const { quiz: quizData } = useElectionData();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showResults, setShowResults] = useState(false);

  /**
   * Triggers confetti celebrations.
   * @param {boolean} isMassive - Whether to show a massive celebration.
   */
  const triggerConfetti = useCallback((isMassive = false) => {
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
  }, []);

  /**
   * Handles user selection of an option.
   * @param {string} option - The selected option text.
   */
  const handleOptionClick = (option) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);
    
    if (option === quizData[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak === 3 || newStreak === 5) {
          triggerConfetti(false);
        }
        return newStreak;
      });
    } else {
      setStreak(0);
    }
  };

  /**
   * Moves to the next question or shows results.
   */
  const handleNext = () => {
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
      if (score + (selectedOption === quizData[currentQuestion].correctAnswer ? 1 : 0) === quizData.length) {
         triggerConfetti(true);
      }
    }
  };

  /**
   * Restarts the quiz state.
   */
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
      <div 
        className="glass-panel results-screen" 
        role="alert" 
        aria-label="Quiz Results"
      >
        <h2>Quiz Completed!</h2>
        <p>You have finished the Indian Election knowledge test.</p>
        <div className="score-display" aria-label={`Final score: ${score} out of ${quizData.length}`}>
          {score} / {quizData.length}
        </div>
        <p style={{ marginBottom: '2rem' }}>
          {score === quizData.length 
            ? "Perfect Score! You are an Election Expert! 🏆"
            : "Good effort! Review the flashcards and timeline to learn more."}
        </p>
        <button 
          className="nav-btn active" 
          onClick={restartQuiz}
          aria-label="Restart Quiz"
        >
          Take Quiz Again
        </button>
      </div>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <div className="glass-panel quiz-container" role="form" aria-label={`Question ${currentQuestion + 1}`}>
      <div className="quiz-header">
        <h2>Knowledge Check</h2>
        <div className="quiz-stats">
          <span className="quiz-progress" aria-label={`Progress: Question ${currentQuestion + 1} of ${quizData.length}`}>
            Question {currentQuestion + 1} of {quizData.length}
          </span>
          {streak > 1 && (
            <span 
              className="streak-counter" 
              style={{marginLeft: '1rem', color: '#EF4444', fontWeight: 'bold'}}
              aria-label={`Current streak: ${streak} correct answers`}
            >
              🔥 {streak} Streak!
            </span>
          )}
        </div>
      </div>

      <div className="quiz-question" id="current-question">
        {question.question}
      </div>

      <div 
        className="options-grid" 
        role="radiogroup" 
        aria-labelledby="current-question"
      >
        {question.options.map((option, index) => {
          let className = 'option-btn';
          const isCorrect = option === question.correctAnswer;
          const isSelected = option === selectedOption;

          if (isAnswered) {
            if (isCorrect) className += ' correct';
            else if (isSelected) className += ' incorrect';
          }

          return (
            <button
              key={index}
              className={className}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${option}${isAnswered && isCorrect ? ' (Correct Answer)' : ''}${isAnswered && isSelected && !isCorrect ? ' (Incorrect Answer)' : ''}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="explanation-box" role="alert" aria-live="assertive">
          <strong aria-label={selectedOption === question.correctAnswer ? 'Correct' : 'Incorrect'}>
            {selectedOption === question.correctAnswer ? '✅ Correct!' : '❌ Incorrect.'}
          </strong>
          <p style={{ marginTop: '0.5rem' }}>{question.explanation}</p>
          <button 
            className="next-btn" 
            onClick={handleNext}
            aria-label={currentQuestion + 1 === quizData.length ? 'Finish Quiz' : 'Go to Next Question'}
          >
            {currentQuestion + 1 === quizData.length ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  );
};

Quiz.propTypes = {
  // No props currently
};

export default Quiz;
