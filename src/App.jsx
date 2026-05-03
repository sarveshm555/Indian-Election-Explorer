import { useState } from 'react';
import Timeline from './components/Timeline';
import Flashcards from './components/Flashcards';
import Quiz from './components/Quiz';
import ProcessChart from './components/ProcessChart';
import Chatbot from './components/Chatbot';

function App() {
  const [activeTab, setActiveTab] = useState('timeline');

  return (
    <div className="container">
      <header>
        <h1>Indian Election Explorer</h1>
        <p>Discover the world's largest democratic exercise through an interactive journey. Learn about the process, test your knowledge, and understand your rights.</p>
      </header>

      <div className="nav-tabs">
        <button 
          className={`nav-btn ${activeTab === 'timeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('timeline')}
        >
          Election Process Timeline
        </button>
        <button 
          className={`nav-btn ${activeTab === 'flashcards' ? 'active' : ''}`}
          onClick={() => setActiveTab('flashcards')}
        >
          Key Terms Flashcards
        </button>
        <button 
          className={`nav-btn ${activeTab === 'chart' ? 'active' : ''}`}
          onClick={() => setActiveTab('chart')}
        >
          Process Data
        </button>
        <button 
          className={`nav-btn ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          Knowledge Quiz
        </button>
      </div>

      <main>
        {activeTab === 'timeline' && <Timeline />}
        {activeTab === 'flashcards' && <Flashcards />}
        {activeTab === 'chart' && <ProcessChart />}
        {activeTab === 'quiz' && <Quiz />}
      </main>

      <Chatbot />
    </div>
  );
}

export default App;
