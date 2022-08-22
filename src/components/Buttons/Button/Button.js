import React from 'react';

import './Button.css';

export default class Button extends React.Component {
  render() {
    const { children, isLoading, ...buttonProps } = this.props;
    const classesName = ['button'];
    if (isLoading) {
      classesName.push('loading');
    }

    return (
      <button
        className={classesName.join(' ')}
        disabled={isLoading}
        {...buttonProps}
      >   
        {children}
      </button>
    );
  }
}