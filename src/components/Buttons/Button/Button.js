import React from 'react';

import './Button.css';

export default class Button extends React.Component {
  render() {
    const { children, isLoading, ...buttonProps } = this.props;
    const className = ['button'];
    if (isLoading) {
      className.push('loading');
    }

    return (
      <button
        className={className.join(' ')}
        disabled={isLoading}
        {...buttonProps}
      >
        {children}
      </button>
    );
  }
}