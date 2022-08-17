import React from "react";
import { withRouter } from "react-router-dom";
import { logout } from "../../utils/firebase";

class UserInfo extends React.Component {
  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <h1>User Info</h1>
        <button onClick={logout}>Sign Out</button>
        <p>{JSON.stringify(currentUser)}</p>
      </div>
    );
  }
}

export default withRouter(UserInfo);