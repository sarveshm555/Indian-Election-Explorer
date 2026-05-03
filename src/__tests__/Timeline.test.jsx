import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Timeline from '../components/Timeline';

describe('Timeline Component', () => {
  it('renders all timeline steps', () => {
    render(<Timeline />);
    expect(screen.getByText(/The Electoral Journey/i)).toBeInTheDocument();
    expect(screen.getByText(/Preparation and Notification/i)).toBeInTheDocument();
  });

  it('expands details on click', () => {
    render(<Timeline />);
    const step = screen.getByText(/Preparation and Notification/i);
    
    // Details should not be visible initially
    expect(screen.queryByText(/Key Activities:/i)).not.toBeInTheDocument();
    
    fireEvent.click(step);
    
    // Details should be visible after click
    expect(screen.getByText(/Key Activities:/i)).toBeInTheDocument();
    expect(screen.getByText(/Model Code of Conduct comes into effect/i)).toBeInTheDocument();
  });
});
