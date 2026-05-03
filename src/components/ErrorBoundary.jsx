import React from 'react';
import PropTypes from 'prop-types';

/**
 * ErrorBoundary component to catch JavaScript errors in their child component tree.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-message glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Something went wrong.</h2>
          <p>Please try refreshing the page.</p>
          <button 
            className="cta-button" 
            onClick={() => window.location.reload()}
            aria-label="Reload page"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;
