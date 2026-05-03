import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useChatbot } from '../hooks/useChatbot';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || window.GEMINI_API_KEY;

/**
 * Chatbot Component
 * 
 * A floating AI assistant interface that interacts with the Gemini API.
 * Features:
 * - Floating action button (FAB) to toggle the chat window.
 * - Auto-scrolling to the latest message.
 * - Integration with `useChatbot` hook for core AI logic.
 * - Accessibility: ARIA roles for dialogs, messages, and input.
 * - Responsive layout for mobile devices.
 * 
 * @component
 * @returns {React.ReactElement} The rendered floating Chatbot widget.
 */
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage } = useChatbot(API_KEY);
  const messagesEndRef = useRef(null);

  /**
   * Automatically scrolls to the bottom of the chat window when new messages arrive.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  /**
   * Handles sending a message.
   */
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const currentInput = input;
    setInput('');
    await sendMessage(currentInput);
  };

  /**
   * Handles keyboard interaction (Enter to send).
   * @param {Event} e - The keyboard event.
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbot-wrapper" role="region" aria-label="Election AI Chatbot">
      {isOpen && (
        <div className="chatbot-window glass-panel" role="dialog" aria-modal="true" aria-labelledby="chatbot-title">
          <div className="chatbot-header">
            <h3 id="chatbot-title">Election AI Assistant</h3>
            <button 
              className="close-btn" 
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              ×
            </button>
          </div>
          
          <div className="chatbot-messages" role="log" aria-live="polite">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`message ${msg.role}`}
                role="article"
                aria-label={`${msg.role === 'model' ? 'Assistant' : 'You'}: ${msg.content}`}
              >
                <div className="message-content">
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message model" aria-busy="true" aria-label="Assistant is typing">
                <div className="message-content typing">...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask a question about Indian elections..."
              rows="1"
              aria-label="Chat input"
              disabled={isLoading}
            />
            <button 
              onClick={handleSend} 
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      )}
      
      {!isOpen && (
        <button 
          className="chatbot-toggle" 
          onClick={() => setIsOpen(true)}
          aria-label="Open Election AI Assistant"
          aria-haspopup="dialog"
        >
          <span className="chatbot-icon" aria-hidden="true">💬</span>
        </button>
      )}
    </div>
  );
};

Chatbot.propTypes = {
  // No props currently
};

export default Chatbot;
