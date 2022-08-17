import { Form } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { withRouter } from 'react-router-dom';
import React from "react";
import TextField from '../../Fields/TextField/TextField';
import LoadingButton from '../../Button/LoadingButton/LoadingButton';
import composeValidators, { required, matchPattern, lengthInRange } from '../../../utils/validator';
import { login } from '../../../utils/firebase';
import Endpoint from '../../../data/Endpoint';

import '../Form.css';

class LoginForm extends React.Component {
  async handleSubmit(values) {
    const { email, password } = values;
    try {
      await login(email, password);
      this.navigateToHome();
    } catch (error) {
      return { [FORM_ERROR]: error.message };
    }
  }

  navigateToHome() {
    this.props.history.push(Endpoint.home);
  }

  render() {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailRequiredErrorText = 'Email is required';
    const emailPatternErrorText = 'Email is not valid';
    const passwordMinLength = 8;
    const passwordMaxLength = 10;
    const passwordRequiredErrorText = 'Password is required';
    const passwordLengthErrorText = `Password must have ${passwordMinLength}-${passwordMaxLength} characters`;

    return (
      <Form
        onSubmit={this.handleSubmit.bind(this)}
        render={({ handleSubmit, submitError, submitting }) => (
          <form className='form' onSubmit={handleSubmit}>
            <TextField
              name="email"
              label="Email"
              type="email"
              validator={
                composeValidators(
                  required(emailRequiredErrorText),
                  matchPattern(emailPattern, emailPatternErrorText)
                )
              }
            />

            <TextField
              name="password"
              label="Password"
              type="password"
              validator={
                composeValidators(
                  required(passwordRequiredErrorText),
                  lengthInRange(passwordMinLength, passwordMaxLength, passwordLengthErrorText),
                )
              }
            />

            <LoadingButton type="submit" isLoading={submitting}>Login</LoadingButton>
            {submitError && <div className='error-text'>{submitError}</div>}
          </form>
        )}
      />
    );
  }
}

export default withRouter(LoginForm);