import React from 'react';

import './Button.css';

export default class Button extends React.Component {
  render() {
    const { children, isLoading, ...buttonProps } = this.props;
    const classNames = ['button'];
    if (isLoading) {
      classNames.push('loading');
    }

    return (
      <button
        className={classNames.join(' ')}
        disabled={isLoading}
        {...buttonProps}
      >   
        {children}
      </button>
    );
  }
}