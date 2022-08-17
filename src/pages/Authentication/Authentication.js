import React from 'react';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import SignUpForm from '../../components/Forms/SignUpForm/SignUpForm';
import AuthenticationFormHeader from '../../components/Headers/AuthenticationFormHeader/AuthenticationFormHeader';

import './Authentication.css';
import Endpoint from '../../data/Endpoint';
import logo from '../../assets/images/logo.png';
import { Redirect, withRouter } from 'react-router-dom';

class Authentication extends React.Component {
  render() {
    const { currentUser } = this.props;
    const isLoginPage = this.props.location.pathname === Endpoint.login;
    const navigationMessage = this.props.history.location.state?.message;
    const headerLinks = [
      {
        header: 'Login',
        subHeader: 'Login to your account',
        endpoint: Endpoint.login,
      },
      {
        header: 'Sign Up',
        subHeader: 'Create a new account',
        endpoint: Endpoint.signUp,
      }
    ];

    if (currentUser !== null) {
      return <Redirect to={Endpoint.home} />;
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
            currentPath={this.props.location.pathname}
            links={headerLinks}
          />
          {isLoginPage ? <LoginForm /> : <SignUpForm />}
        </div>
      </div>
    );
  }
}

export default withRouter(Authentication);