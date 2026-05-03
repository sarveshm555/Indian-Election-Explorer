import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { useElectionData } from '../hooks/useElectionData';

/**
 * Timeline Component
 * 
 * Displays an interactive vertical timeline of the Indian election process.
 * Features:
 * - Interactive expansion of steps to show detailed activities.
 * - Keyboard accessibility (Space/Enter to toggle).
 * - ARIA live regions for dynamic content updates.
 * - Memoized performance to prevent re-renders when other tabs change.
 * 
 * @component
 * @returns {React.ReactElement} The rendered Timeline section.
 */
const Timeline = () => {
  const { timeline } = useElectionData();
  const [expandedId, setExpandedId] = useState(null);

  /**
   * Toggles the expansion state of a timeline item.
   * @param {number} id - The ID of the item to toggle.
   */
  const toggleExpand = useCallback((id) => {
    setExpandedId(prevId => (prevId === id ? null : id));
  }, []);

  /**
   * Handles keyboard interaction for accessibility.
   * @param {Event} e - The keyboard event.
   * @param {number} id - The ID of the item.
   */
  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpand(id);
    }
  };

  return (
    <div 
      className="glass-panel timeline-container"
      role="region" 
      aria-label="Election Process Timeline"
    >
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>The Electoral Journey</h2>
      
      <div className="timeline" role="list">
        {timeline.map((item) => (
          <div key={item.id} className="timeline-item" role="listitem">
            <div className="timeline-marker" aria-hidden="true"></div>
            <div 
              className={`timeline-content ${expandedId === item.id ? 'expanded' : ''}`}
              onClick={() => toggleExpand(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              role="button"
              tabIndex="0"
              aria-expanded={expandedId === item.id}
              aria-label={`Step ${item.id}: ${item.title}. Click to ${expandedId === item.id ? 'collapse' : 'expand'} details.`}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              
              {expandedId === item.id && (
                <div 
                  className="timeline-details" 
                  id={`details-${item.id}`}
                  aria-live="polite"
                >
                  <h4>Key Activities:</h4>
                  <ul role="list">
                    {item.details.map((detail, index) => (
                      <li key={index} role="listitem">{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// PropTypes validation
Timeline.propTypes = {
  // Currently no props, but structure is ready
};

// Efficiency: Memoize component to prevent unnecessary re-renders
export default memo(Timeline);
