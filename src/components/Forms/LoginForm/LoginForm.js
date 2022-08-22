import { FORM_ERROR } from 'final-form'
import { withRouter } from 'react-router-dom';
import React from "react";
import AuthForm from '../AuthForm/AuthForm';

import { getParsedFirebaseError } from '../../../utils/firebase';
import { login } from '../../../utils/auth';
import fields from '../../../data/fields';

class LoginForm extends React.Component {
  async handleSubmit(values) {
    const { email, password } = values;
    try {
      await login(email, password);
    } catch (error) {
      const parsedError = getParsedFirebaseError(error);
      return { [FORM_ERROR]: parsedError.message };
    }
  }

  render() {
    const { submitButtonText } = this.props;
    const { email, password } = fields;
    const loginFields = [email, password];
    return (
      <AuthForm
        onSubmit={this.handleSubmit.bind(this)}
        fields={loginFields}
        submitButtonText={submitButtonText}
      />
    );
  }
}

export default withRouter(LoginForm);