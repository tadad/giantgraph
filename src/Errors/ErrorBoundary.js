import React from 'react';
import { Fallback } from './Fallback';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) { //eslint-disable-line
      return <Fallback />;
    }
    return this.props.children; //eslint-disable-line
  }
}

export default ErrorBoundary;
