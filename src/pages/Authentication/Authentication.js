import { Redirect, withRouter } from 'react-router-dom';
import React from 'react';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import SignUpForm from '../../components/Forms/SignUpForm/SignUpForm';
import AuthenticationFormHeader from '../../components/Headers/AuthenticationFormHeader/AuthenticationFormHeader';
import authLinks from '../../data/authLinks';
import endpoint from '../../data/endpoint';
import logo from '../../assets/images/logo.png';

import './Authentication.css';

class Authentication extends React.Component {
  render() {
    const { location, history, currentUser } = this.props;
    const isLoginPage = location.pathname === endpoint.login;
    const navigationMessage = history.location.state?.message;
    const redirectLink = history.location.state?.from;

    if (currentUser !== null) {
      return <Redirect to={ redirectLink || endpoint.home } />;
    }

    return (
      <div className="authentication-container">
        <div className="authentication-panel">
          <img
            className="logo"
            src={logo}
            alt="logo"
          />
          {navigationMessage && <div className="navigate-message">{navigationMessage}</div>}
          <AuthenticationFormHeader
            currentPath={location.pathname}
            links={Object.values(authLinks)}
          />
          {isLoginPage
            ? <LoginForm submitButtonText={authLinks.login.header} />
            : <SignUpForm submitButtonText={authLinks.signUp.header} />
          }
        </div>
      </div>
    );
  }
}

export default withRouter(Authentication);