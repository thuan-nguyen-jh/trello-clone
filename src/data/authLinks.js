import endpoint from "./endpoint";

const authLinks = {
  login: {
    header: 'Login',
    subHeader: 'Login to your account',
    endpoint: endpoint.login,
  },
  signUp: {
    header: 'Sign Up',
    subHeader: 'Create a new account',
    endpoint: endpoint.signUp,
  }
};

export default authLinks;