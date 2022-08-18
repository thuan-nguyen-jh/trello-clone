import { Form } from 'react-final-form'
import React from "react";
import TextField from '../../Fields/TextField/TextField';
import SelectField from '../../Fields/SelectField/SelectField';
import Button from '../../Buttons/Button/Button';

import './AuthForm.css';

class AuthForm extends React.Component {
  render() {
    const { onSubmit, fields, submitButtonText } = this.props;
    return (
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitError, submitting }) => (
          <form className='form' onSubmit={handleSubmit}>
            {fields.map(field => {
              if (field.type === 'select') {
                return <SelectField key={field.name} {...field} />
              }
              return <TextField key={field.name} {...field} />
            })}

            <Button type="submit" isLoading={submitting}>{submitButtonText}</Button>
            {submitError && <div className='error-text'>{submitError}</div>}
          </form>
        )}
      />
    );
  }
}

export default AuthForm;