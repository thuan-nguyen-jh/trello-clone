import React from "react";
import { Field } from 'react-final-form'

import '../Field.css';

export default class TextField extends React.Component {
  render() {
    const { name, label, validator, ...fieldProps } = this.props;
    return (
      <Field name={name} validate={validator} {...fieldProps}>
        {({ input, meta: { touched, error } }) => (
          <div className='field'>
            <div className='label'>{label}</div>
            <input {...input}/>
            {error && touched && <div className='error-text'>{error}</div>}
          </div>
        )}
      </Field>
    );
  }
}