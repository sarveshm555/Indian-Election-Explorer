import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { useElectionData } from '../hooks/useElectionData';

/**
 * Flashcards Component
 * 
 * Displays a grid of interactive flashcards for key election terms (ECI, EVM, etc.).
 * Features:
 * - 3D flip animation using CSS transitions.
 * - Screen-reader only text to announce flipped content.
 * - Keyboard navigation (Space/Enter to flip).
 * - Memoized to prevent re-renders on sibling tab changes.
 * 
 * @component
 * @returns {React.ReactElement} The rendered Flashcards section.
 */
const Flashcards = () => {
  const { flashcards } = useElectionData();
  const [flippedCards, setFlippedCards] = useState({});

  /**
   * Toggles the flipped state of a card.
   * @param {number} id - The ID of the card to flip.
   */
  const toggleFlip = useCallback((id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  /**
   * Handles keyboard interaction for accessibility.
   * @param {Event} e - The keyboard event.
   * @param {number} id - The ID of the card.
   */
  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip(id);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem' }} role="region" aria-label="Key Terms Flashcards">
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Key Terms & Concepts</h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-light)' }}>
        Click on a card to reveal its definition.
      </p>

      <div className="flashcard-grid" role="list">
        {flashcards.map((card) => (
          <div 
            key={card.id} 
            className={`flashcard ${flippedCards[card.id] ? 'flipped' : ''}`}
            onClick={() => toggleFlip(card.id)}
            onKeyDown={(e) => handleKeyDown(e, card.id)}
            role="button"
            tabIndex="0"
            aria-label={`${card.term} flashcard. ${flippedCards[card.id] ? 'Definition shown.' : 'Click to flip and see definition.'}`}
            aria-pressed={flippedCards[card.id]}
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
};

Flashcards.propTypes = {
  // No props currently
};

export default memo(Flashcards);
