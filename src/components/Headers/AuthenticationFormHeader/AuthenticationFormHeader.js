import React from "react";
import { Link } from "react-router-dom";

import './AuthenticationFormHeader.css';

export default class AuthenticationFormHeader extends React.Component {
  render() {
    const { currentPath, links } = this.props;
    return (
      <div className="authentication-form-header">
        <h1 className="header">
          {
            links.map(link => {
              const { header, endpoint } = link;
              return (
                <Link
                  className={endpoint === currentPath ? "active" : ""}
                  to={endpoint}
                  key={endpoint}
                >
                  {header}
                </Link>
              );
            })
          }
        </h1>

        <p className="sub-header">
          {links.find(link => link.endpoint === currentPath).subHeader}
        </p>
      </div>
    );
  }
}