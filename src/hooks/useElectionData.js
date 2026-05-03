import { useMemo } from 'react';
import { timelineData, flashcardData, quizData } from '../data/ElectionData';

/**
 * Custom hook to provide access to centralized election data.
 * 
 * This hook abstracts the data source and provides a memoized object
 * containing timeline, flashcard, and quiz datasets. 
 * Using this hook ensures that components only re-render when necessary.
 * 
 * @hook
 * @returns {Object} data - The electoral datasets.
 * @returns {Array} data.timeline - The sequential steps of the election.
 * @returns {Array} data.flashcards - Key terms and definitions.
 * @returns {Array} data.quiz - Questions, options, and explanations.
 */
export const useElectionData = () => {
  const data = useMemo(() => ({
    timeline: timelineData,
    flashcards: flashcardData,
    quiz: quizData
  }), []);

  return data;
};
