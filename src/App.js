import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Authentication from './pages/Authentication/Authentication';
import Home from "./pages/Home/Home";
import Board from "./pages/Board/Board";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import UserContext from "./contexts/UserContext/UserContext";

import { onUserStateChanged } from "./utils/auth"
import endpoint from "./data/endpoint";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    onUserStateChanged(user => {
      this.setState({
        isLoaded: true,
        currentUser: user,
      });
    })
  }

  render() {
    const { isLoaded, currentUser } = this.state;
    return (
      <UserContext.Provider value={{ isLoaded, currentUser }}>
        <BrowserRouter>
          <Switch>
            <Route exact path={endpoint.home}><Home/></Route>
            <Route path={[endpoint.login, endpoint.signUp]}><Authentication/></Route>
            <PrivateRoute path={endpoint.board}><Board/></PrivateRoute>
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    );
  }
}