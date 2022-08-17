import { FORM_ERROR } from 'final-form'
import { withRouter } from 'react-router-dom';
import React from "react";
import AuthForm from '../AuthForm/AuthForm';

import { createNewAccount } from '../../../utils/firebase';
import fields from '../../../data/fields';

class SignUpForm extends React.Component {
  async handleSubmit(values) {
    const { email, password, name, position } = values;
    try {
      await createNewAccount(email, password, name, position);
    } catch (error) {
      return { [FORM_ERROR]: error.message };
    }
  }

  render() {
    const signUpFields = Object.values(fields);
    return (
      <AuthForm
        onSubmit={this.handleSubmit.bind(this)}
        fields={signUpFields}
        submitButtonText="Sign Up"
      />
    );
  }
}

export default withRouter(SignUpForm);