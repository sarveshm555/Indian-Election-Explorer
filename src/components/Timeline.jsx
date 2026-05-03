import { useState } from 'react';
import { timelineData } from '../data/ElectionData';

function Timeline() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="glass-panel timeline-container">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>The Electoral Journey</h2>
      
      <div className="timeline">
        {timelineData.map((item) => (
          <div key={item.id} className="timeline-item">
            <div className="timeline-marker"></div>
            <div 
              className="timeline-content"
              onClick={() => toggleExpand(item.id)}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              
              {expandedId === item.id && (
                <div className="timeline-details">
                  <h4>Key Activities:</h4>
                  <ul>
                    {item.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
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
}

export default Timeline;
