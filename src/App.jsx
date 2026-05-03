import React, { useState, lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy loading components for efficiency
const Timeline = lazy(() => import('./components/Timeline'));
const Flashcards = lazy(() => import('./components/Flashcards'));
const Quiz = lazy(() => import('./components/Quiz'));
const ProcessChart = lazy(() => import('./components/ProcessChart'));
const Chatbot = lazy(() => import('./components/Chatbot'));

/**
 * Main Application Component
 * 
 * This is the root component of the Indian Election Explorer. It manages:
 * - Tab-based navigation state.
 * - Global error handling via ErrorBoundary.
 * - Lazy loading and code splitting for heavy components.
 * - Accessibility features like Skip Links and ARIA tab roles.
 * 
 * @component
 * @returns {React.ReactElement} The rendered application shell.
 */
function App() {
  const [activeTab, setActiveTab] = useState('timeline');

  return (
    <ErrorBoundary>
      <div className="container">
        {/* Accessibility: Skip to main content link */}
        <a href="#main-content" className="skip-link">Skip to Content</a>

        <header role="banner">
          <h1>Indian Election Explorer</h1>
          <p>Discover the world's largest democratic exercise through an interactive journey. Learn about the process, test your knowledge, and understand your rights.</p>
        </header>

        <nav className="nav-tabs" role="tablist" aria-label="Election explorer sections">
          <button 
            role="tab"
            aria-selected={activeTab === 'timeline'}
            aria-controls="timeline-panel"
            id="tab-timeline"
            className={`nav-btn ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeline')}
            aria-label="Election Process Timeline"
          >
            Timeline
          </button>
          <button 
            role="tab"
            aria-selected={activeTab === 'flashcards'}
            aria-controls="flashcards-panel"
            id="tab-flashcards"
            className={`nav-btn ${activeTab === 'flashcards' ? 'active' : ''}`}
            onClick={() => setActiveTab('flashcards')}
            aria-label="Key Terms Flashcards"
          >
            Flashcards
          </button>
          <button 
            role="tab"
            aria-selected={activeTab === 'chart'}
            aria-controls="chart-panel"
            id="tab-chart"
            className={`nav-btn ${activeTab === 'chart' ? 'active' : ''}`}
            onClick={() => setActiveTab('chart')}
            aria-label="Election Process Data Charts"
          >
            Process Data
          </button>
          <button 
            role="tab"
            aria-selected={activeTab === 'quiz'}
            aria-controls="quiz-panel"
            id="tab-quiz"
            className={`nav-btn ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => setActiveTab('quiz')}
            aria-label="Election Knowledge Quiz"
          >
            Quiz
          </button>
        </nav>

        <main id="main-content" role="main">
          <Suspense fallback={<div className="loading-spinner" aria-busy="true">Loading section...</div>}>
            {activeTab === 'timeline' && (
              <div role="tabpanel" id="timeline-panel" aria-labelledby="tab-timeline">
                <Timeline />
              </div>
            )}
            {activeTab === 'flashcards' && (
              <div role="tabpanel" id="flashcards-panel" aria-labelledby="tab-flashcards">
                <Flashcards />
              </div>
            )}
            {activeTab === 'chart' && (
              <div role="tabpanel" id="chart-panel" aria-labelledby="tab-chart">
                <ProcessChart />
              </div>
            )}
            {activeTab === 'quiz' && (
              <div role="tabpanel" id="quiz-panel" aria-labelledby="tab-quiz">
                <Quiz />
              </div>
            )}
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
