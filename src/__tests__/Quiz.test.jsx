import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Quiz from '../components/Quiz';

// Mock confetti to avoid errors in JSDOM
vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

describe('Quiz Component', () => {
  it('renders the first question', () => {
    render(<Quiz />);
    expect(screen.getByText(/Knowledge Check/i)).toBeInTheDocument();
    expect(screen.getByText(/Question 1 of/i)).toBeInTheDocument();
  });

  it('updates score and shows explanation on correct answer', () => {
    render(<Quiz />);
    
    // Find the correct answer for the first question (The President of India)
    const correctBtn = screen.getByText('The President of India');
    fireEvent.click(correctBtn);
    
    expect(screen.getByText(/✅ Correct!/i)).toBeInTheDocument();
    expect(screen.getByText(/Next Question/i)).toBeInTheDocument();
  });

  it('resets streak on incorrect answer', () => {
    render(<Quiz />);
    
    const incorrectBtn = screen.getByText('The Prime Minister');
    fireEvent.click(incorrectBtn);
    
    expect(screen.getByText(/❌ Incorrect/i)).toBeInTheDocument();
  });
});
