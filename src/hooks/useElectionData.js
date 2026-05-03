import { useMemo } from 'react';
import { timelineData, flashcardData, quizData } from '../data/ElectionData';

/**
 * Custom hook to provide access to election data with memoization.
 * 
 * @returns {Object} An object containing timeline, flashcard, and quiz data.
 */
export const useElectionData = () => {
  const data = useMemo(() => ({
    timeline: timelineData,
    flashcards: flashcardData,
    quiz: quizData
  }), []);

  return data;
};
