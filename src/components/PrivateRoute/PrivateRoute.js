import React from "react";
import { Redirect, Route } from "react-router-dom";
import endpoint from "../../data/endpoint";

class PrivateRoute extends React.Component {
  render() {
    const { location, isLoaded, currentUser, children, ...rest } = this.props;
    return (
      <Route {...rest}>
        {!isLoaded
          ? <div>Loading...</div>
          : !currentUser
            ? <Redirect to={{
                pathname: endpoint.login,
                state: {
                  from: location.pathname,
                  message: "Please login to access"
                }
              }}/>
            : children
        }
      </Route>
    );
  }
}

export default PrivateRoute;