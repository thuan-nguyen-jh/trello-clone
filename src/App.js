import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Authentication from './pages/Authentication/Authentication';
import Home from "./pages/Home/Home";
import Board from "./pages/Board/Board";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import { onUserStateChanged } from "./utils/firebase";
import endpoint from "./data/endpoint";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
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
          <Route exact path={endpoint.home} currentUser={user}>
            <Home
              currentUser={user}
            />
          </Route>
          <Route path={[endpoint.login, endpoint.signUp]}>
            <Authentication
              currentUser={user}
            />
          </Route>
          <PrivateRoute currentUser={user} path={endpoint.board}>
            <Board
              currentUser={user}
            />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    );
  }
}