import React from "react";
import { Redirect } from "react-router-dom";
import { withUser } from "../../contexts/UserContext/withUser";
import endpoint from "../../data/endpoint";

class Home extends React.Component {
  render() {
    const { isLoaded, currentUser } = this.props;
    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    if (!currentUser) {
      return <Redirect to={endpoint.login} />;
    }

    return <Redirect to={endpoint.board} />;
  }
}

export default withUser(Home);