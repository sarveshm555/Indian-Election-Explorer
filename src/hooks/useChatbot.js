import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Custom hook to manage chatbot messages and Gemini API interactions.
 * 
 * This hook handles:
 * - Message state management (history).
 * - Input sanitization and validation.
 * - Rate limiting (anti-spam protection).
 * - Direct integration with Google Generative AI (Gemini 2.5 Flash).
 * - Safety settings and granular error handling.
 * 
 * @param {string} apiKey - The Gemini API Key.
 * @returns {Object} chatbotState - The state and handlers for the chatbot.
 * @returns {Array} chatbotState.messages - The conversation history.
 * @returns {boolean} chatbotState.isLoading - Whether the AI is currently generating a response.
 * @returns {Function} chatbotState.sendMessage - Function to send a user message to the AI.
 */
export const useChatbot = (apiKey) => {
  const [messages, setMessages] = useState([
    { role: 'model', content: 'Namaste! I am your Election Assistant. Ask me anything about the Indian election process.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);

  /**
   * Sanitizes user input by stripping HTML and limiting length.
   * @param {string} text - The raw input text.
   * @returns {string} Sanitized text.
   */
  const sanitizeInput = (text) => {
    const stripped = text.replace(/<[^>]*>?/gm, '');
    return stripped.slice(0, 500);
  };

  const sendMessage = useCallback(async (userInput) => {
    if (!userInput.trim()) return;

    // Rate limiting: Max 10 messages per minute (approx 1 message every 6 seconds)
    const now = Date.now();
    if (now - lastMessageTime < 6000) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: 'You are sending messages too fast. Please wait a few seconds.' 
      }]);
      return;
    }
    setLastMessageTime(now);

    const sanitizedMessage = sanitizeInput(userInput);
    setMessages(prev => [...prev, { role: 'user', content: sanitizedMessage }]);
    setIsLoading(true);

    try {
      if (!apiKey || apiKey === 'your_api_key_here') {
        throw new Error('API_KEY_MISSING');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      
      /**
       * JSDoc for Gemini Integration:
       * Using gemini-2.5-flash for optimized performance and cost.
       * Conversation history is passed to maintain context.
       * Safety settings are configured to block harmful content.
       */
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.5-flash',
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ]
      });

      // Prepare history (limit to last 10 messages for efficiency)
      const chatHistory = messages.slice(-10).map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const chat = model.startChat({
        history: chatHistory,
        generationConfig: {
          maxOutputTokens: 1000,
        },
      });

      const systemPrompt = `You are a helpful assistant specialized in the Indian election system. 
Only answer questions related to Indian elections, politics, ECI, EVMs, and the voting process. 
If the user asks about anything else, politely decline and steer them back to elections.`;

      const result = await chat.sendMessage(`${systemPrompt}\n\nUser Question: ${sanitizedMessage}`);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'model', content: text }]);
    } catch (error) {
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (error.message === 'API_KEY_MISSING') {
        errorMessage = 'I am having trouble connecting to my brain right now. Please ensure the Gemini API key is properly configured in the environment settings.';
      } else if (error.message?.includes('429')) {
        errorMessage = 'Rate limit exceeded. Please wait a moment.';
      } else if (error.message?.includes('safety')) {
        errorMessage = 'I cannot answer that as it violates safety guidelines.';
      }
      
      setMessages(prev => [...prev, { role: 'model', content: `Error: ${errorMessage}` }]);
      console.error('Gemini API Error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [messages, lastMessageTime]);

  return { messages, isLoading, sendMessage };
};
