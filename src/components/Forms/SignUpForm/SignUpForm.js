import { Form } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { withRouter } from 'react-router-dom';
import React from "react";
import TextField from '../../Fields/TextField/TextField';
import SelectField from '../../Fields/SelectField/SelectField';
import UserPosition from '../../../data/UserPosition';
import LoadingButton from '../../Button/LoadingButton/LoadingButton';
import composeValidators, { required, matchPattern, lengthInRange } from '../../../utils/validator';
import { createNewAccount } from '../../../utils/firebase';
import Endpoint from '../../../data/Endpoint';

import '../Form.css';

class SignUpForm extends React.Component {
  async handleSubmit(values) {
    const { email, password, name, position } = values;
    try {
      await createNewAccount(email, password, name, position);
      this.navigateToLogin();
    } catch (error) {
      return { [FORM_ERROR]: error.message };
    }
  }

  navigateToLogin() {
    this.props.history.push(Endpoint.login, { message: "Your account created successfully" });
  }

  render() {
    const nameRequiredErrorText = 'Name is required';
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailRequiredErrorText = 'Email is required';
    const emailPatternErrorText = 'Email is not valid';
    const passwordMinLength = 8;
    const passwordMaxLength = 10;
    const passwordRequiredErrorText = 'Password is required';
    const passwordLengthErrorText = `Password must have ${passwordMinLength}-${passwordMaxLength} characters`;
    const userPositionPlaceholder = '--Select user position--';
    const positionRequiredErrorText = 'Position is required';

    return (
      <Form
        onSubmit={this.handleSubmit.bind(this)}
        render={({ handleSubmit, submitError, submitting }) => (
          <form className='form' onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Name"
              validator={required(nameRequiredErrorText)}
            />

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

            <SelectField
              name="position"
              label="Position"
              options={UserPosition}
              placeholder={userPositionPlaceholder}
              validator={required(positionRequiredErrorText)}
            />

            <LoadingButton type="submit" isLoading={submitting}>Sign Up</LoadingButton>
            {submitError && <div className='error-text'>{submitError}</div>}
          </form>
        )}
      />
    );
  }
}

export default withRouter(SignUpForm);