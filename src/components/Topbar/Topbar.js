import React from "react";
import { logout } from "../../utils/auth";

import './Topbar.css';

export default class Topbar extends React.Component {
  render() {
    return (
      <div className="top-bar">
        <button className="top-bar__logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }
}