import React from "react";
import { Redirect } from "react-router-dom";
import endpoint from "../../data/endpoint";

export default class Home extends React.Component {
  render() {
    const { currentUser } = this.props;
    if (currentUser === undefined) {
      return <div>Loading...</div>;
    }

    if (currentUser === null) {
      return <Redirect to={endpoint.login} />;
    }

    return <Redirect to={endpoint.board} />;
  }
}