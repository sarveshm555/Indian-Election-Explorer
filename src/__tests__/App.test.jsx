import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

// Mock lazy-loaded components to speed up tests and avoid complexity
vi.mock('../components/Timeline', () => ({ default: () => <div data-testid="timeline">Timeline</div> }));
vi.mock('../components/Flashcards', () => ({ default: () => <div data-testid="flashcards">Flashcards</div> }));
vi.mock('../components/Quiz', () => ({ default: () => <div data-testid="quiz">Quiz</div> }));
vi.mock('../components/ProcessChart', () => ({ default: () => <div data-testid="chart">Chart</div> }));
vi.mock('../components/Chatbot', () => ({ default: () => <div data-testid="chatbot">Chatbot</div> }));

describe('App Component', () => {
  it('renders title and navigation tabs', () => {
    render(<App />);
    expect(screen.getByText(/Indian Election Explorer/i)).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Timeline/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Flashcards/i })).toBeInTheDocument();
  });

  it('switches tabs on click', async () => {
    render(<App />);
    
    const flashcardsTab = screen.getByRole('tab', { name: /Flashcards/i });
    fireEvent.click(flashcardsTab);
    
    // Since it's lazy loaded and mocked, we look for our testid
    const content = await screen.findByTestId('flashcards');
    expect(content).toBeInTheDocument();
  });

  it('renders the skip link for accessibility', () => {
    render(<App />);
    const skipLink = screen.getByText(/Skip to Content/i);
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });
});
