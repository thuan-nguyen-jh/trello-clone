import React from 'react';

import '../Button.css';
import './LoadingButton.css';

export default class LoadingButton extends React.Component {
  render() {
    const { children, isLoading, ...buttonProps } = this.props;
    const loadingClassName = isLoading ? 'loading' : '';

    return (
      <button
        className={`loading-button ${loadingClassName}`}
        disabled={isLoading}
        {...buttonProps}
      >
        {children}
      </button>
    );
  }
}