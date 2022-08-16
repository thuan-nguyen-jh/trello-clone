import React from "react";
import { Field } from "react-final-form";

import '../Field.css';

export default class SelectField extends React.Component {
  render() {
    const { name, label, validator, options, placeholder, defaultValue, ...fieldProps } = this.props;
    return (
      <Field
        name={name}
        validate={validator}
        defaultValue={defaultValue ? defaultValue : ""}
        {...fieldProps}
      >
        {({ input, meta }) => (
          <div className="field">
            <div className="label">{label}</div>
            <select {...input}>
              <option disabled value="">{placeholder}</option>
              {options.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            {meta.error && meta.touched && <div className='error-text'>{meta.error}</div>}
          </div>
        )}
      </Field>
    );
  }
}