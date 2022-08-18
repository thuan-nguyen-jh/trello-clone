import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Authentication from './pages/Authentication/Authentication';
import UserInfo from "./pages/UserInfo/UserInfo";

import endpoint from "./data/endpoint";
import { onUserStateChanged } from "./utils/firebase";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    onUserStateChanged(user => {
      this.setState({ user });
    })
  }

  render() {
    const { user } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={endpoint.home}>
            <UserInfo
              currentUser={user}
            />
          </Route>
          <Route path={[endpoint.login, endpoint.signUp]}>
            <Authentication
              currentUser={user}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}