import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Chatbot from '../components/Chatbot';

// Mock the hook
vi.mock('../hooks/useChatbot', () => ({
  useChatbot: () => ({
    messages: [{ role: 'model', content: 'Hello' }],
    isLoading: false,
    sendMessage: vi.fn()
  })
}));

describe('Chatbot Component', () => {
  it('is closed by default', () => {
    render(<Chatbot />);
    expect(screen.queryByText(/Election AI Assistant/i)).not.toBeInTheDocument();
  });

  it('opens when toggle button is clicked', () => {
    render(<Chatbot />);
    const toggle = screen.getByRole('button', { name: /Open Election AI Assistant/i });
    fireEvent.click(toggle);
    expect(screen.getByText(/Election AI Assistant/i)).toBeInTheDocument();
  });

  it('renders initial messages', () => {
    render(<Chatbot />);
    const toggle = screen.getByRole('button', { name: /Open Election AI Assistant/i });
    fireEvent.click(toggle);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
