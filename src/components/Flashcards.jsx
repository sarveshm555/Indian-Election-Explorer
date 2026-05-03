import { useState } from 'react';
import { flashcardData } from '../data/ElectionData';

function Flashcards() {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Key Terms & Concepts</h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-light)' }}>
        Click on a card to reveal its definition.
      </p>

      <div className="flashcards-grid">
        {flashcardData.map((card) => (
          <div 
            key={card.id} 
            className={`flashcard ${flippedCards[card.id] ? 'flipped' : ''}`}
            onClick={() => toggleFlip(card.id)}
          >
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <h3>{card.term}</h3>
              </div>
              <div className="flashcard-back">
                <p>{card.definition}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Flashcards;
