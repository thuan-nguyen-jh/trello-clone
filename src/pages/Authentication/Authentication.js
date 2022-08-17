import { Redirect, withRouter } from 'react-router-dom';
import React from 'react';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import SignUpForm from '../../components/Forms/SignUpForm/SignUpForm';
import AuthenticationFormHeader from '../../components/Headers/AuthenticationFormHeader/AuthenticationFormHeader';
import endpoint from '../../data/endpoint';
import logo from '../../assets/images/logo.png';

import './Authentication.css';

class Authentication extends React.Component {
  render() {
    const { currentUser } = this.props;
    const isLoginPage = this.props.location.pathname === endpoint.login;
    const navigationMessage = this.props.history.location.state?.message;
    const headerLinks = [
      {
        header: 'Login',
        subHeader: 'Login to your account',
        endpoint: endpoint.login,
      },
      {
        header: 'Sign Up',
        subHeader: 'Create a new account',
        endpoint: endpoint.signUp,
      }
    ];

    if (currentUser !== null) {
      return <Redirect to={endpoint.home} />;
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