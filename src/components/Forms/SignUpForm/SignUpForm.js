import { FORM_ERROR } from 'final-form'
import { withRouter } from 'react-router-dom';
import React from "react";
import AuthForm from '../AuthForm/AuthForm';

import { getParsedFirebaseError } from '../../../utils/firebase';
import { createNewAccount } from '../../../utils/auth';
import fields from '../../../data/fields';

class SignUpForm extends React.Component {
  async handleSubmit(values) {
    const { onValidated } = this.props;
    const { email, password, name, position } = values;
    try {
      await createNewAccount(email, password, name, position);
      onValidated();
    } catch (error) {
      const parsedError = getParsedFirebaseError(error);
      return { [FORM_ERROR]: parsedError.message };
    }
  }

  render() {
    const { submitButtonText } = this.props;
    const signUpFields = Object.values(fields);
    return (
      <AuthForm
        onSubmit={this.handleSubmit.bind(this)}
        fields={signUpFields}
        submitButtonText={submitButtonText}
      />
    );
  }
}

export default withRouter(SignUpForm);