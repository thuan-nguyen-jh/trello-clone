import React from "react";
import { Redirect } from "react-router-dom";
import endpoint from "../../data/endpoint";

export default class Home extends React.Component {
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