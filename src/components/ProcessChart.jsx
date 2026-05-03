import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const data = [
  {
    name: 'Notification',
    duration: 5,
    description: 'ECI announces the schedule & President issues notification',
    color: '#FF9933', // Saffron
  },
  {
    name: 'Nomination',
    duration: 10,
    description: 'Filing, scrutiny, and withdrawal of candidatures',
    color: '#F59E0B',
  },
  {
    name: 'Campaigning',
    duration: 15,
    description: 'Rallies, manifestos, and public outreach (Ends 48h before poll)',
    color: '#3B82F6', // Blue
  },
  {
    name: 'Polling',
    duration: 3,
    description: 'Voting day(s) using EVM and VVPAT',
    color: '#6366F1',
  },
  {
    name: 'Counting',
    duration: 2,
    description: 'Counting of votes and declaration of results',
    color: '#10B981', // Green
  },
];

/**
 * Custom Tooltip for the Recharts BarChart.
 * Provides detailed information about each election phase.
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div 
        className="custom-tooltip" 
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--glass-border)',
          padding: '1rem',
          borderRadius: '12px',
          boxShadow: 'var(--glass-shadow)'
        }}
        role="tooltip"
        aria-live="polite"
      >
        <h4 style={{ color: 'var(--navy)', marginBottom: '0.5rem' }}>{label}</h4>
        <p style={{ color: 'var(--text-dark)', fontWeight: 'bold' }}>
          Typical Duration: {dataPoint.duration} Days
        </p>
        <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '0.5rem', maxWidth: '200px' }}>
          {dataPoint.description}
        </p>
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string,
};

/**
 * ProcessChart Component
 * 
 * A visual data representation component using Recharts.
 * It displays the typical duration of different phases of the Indian election process.
 * Features:
 * - Responsive SVG bar chart.
 * - Interactive tooltips with detailed phase descriptions.
 * - Visual highlighting of the active bar on hover.
 * - Accessible SVG elements with ARIA labels and roles.
 * 
 * @component
 * @returns {React.ReactElement} The rendered ProcessChart section.
 */
const ProcessChart = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div 
      className="glass-panel" 
      style={{ padding: '2rem', height: '500px' }}
      role="region"
      aria-label="Election Phases and Duration Chart"
    >
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Election Phases & Typical Duration</h2>
      <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: '2rem' }}>
        Hover over the bars to see details about each phase of the electoral process. 
        Note: Actual durations vary significantly based on state and phase counts.
      </p>
      
      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          onMouseMove={(state) => {
            if (state.isTooltipActive) {
              setActiveIndex(state.activeTooltipIndex);
            } else {
              setActiveIndex(null);
            }
          }}
          onMouseLeave={() => setActiveIndex(null)}
          aria-label="Bar chart showing typical duration of election phases in days."
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: 'var(--navy)', fontWeight: 600 }}
            aria-label="Election Phase Names"
          />
          <YAxis 
            label={{ value: 'Typical Days', angle: -90, position: 'insideLeft', fill: 'var(--text-light)' }} 
            tick={{ fill: 'var(--text-light)' }}
            aria-label="Duration in Days"
          />
          <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(0,0,0,0.05)'}} />
          <Bar 
            dataKey="duration" 
            radius={[8, 8, 0, 0]} 
            animationDuration={1500}
            role="presentation"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color} 
                opacity={activeIndex === index ? 1 : (activeIndex === null ? 0.8 : 0.5)}
                style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                aria-label={`${entry.name}: ${entry.duration} days. ${entry.description}`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

ProcessChart.propTypes = {};

export default memo(ProcessChart);
