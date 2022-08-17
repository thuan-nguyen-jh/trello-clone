import { FORM_ERROR } from 'final-form'
import { withRouter } from 'react-router-dom';
import React from "react";
import AuthForm from '../AuthForm/AuthForm';

import { login } from '../../../utils/firebase';
import fields from '../../../data/fields';

class LoginForm extends React.Component {
  async handleSubmit(values) {
    const { email, password } = values;
    try {
      await login(email, password);
    } catch (error) {
      return { [FORM_ERROR]: error.message };
    }
  }

  render() {
    const { email, password } = fields;
    const loginFields = [email, password];
    return (
      <AuthForm
        onSubmit={this.handleSubmit.bind(this)}
        fields={loginFields}
        submitButtonText="Login"
      />
    );
  }
}

export default withRouter(LoginForm);