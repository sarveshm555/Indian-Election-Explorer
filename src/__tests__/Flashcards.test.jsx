import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Flashcards from '../components/Flashcards';

describe('Flashcards Component', () => {
  it('renders all flashcards', () => {
    render(<Flashcards />);
    expect(screen.getByText(/Key Terms & Concepts/i)).toBeInTheDocument();
    expect(screen.getByText('ECI')).toBeInTheDocument();
    expect(screen.getByText('EVM')).toBeInTheDocument();
  });

  it('flips card on click', () => {
    render(<Flashcards />);
    const card = screen.getByLabelText(/ECI flashcard/i);
    
    // Check initial state (SR only)
    expect(screen.getByText(/Term: ECI/i)).toBeInTheDocument();
    
    fireEvent.click(card);
    
    // Check flipped state (SR only)
    expect(screen.getByText(/Definition: Election Commission of India/i)).toBeInTheDocument();
  });
});
