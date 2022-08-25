import React from "react";

const UserContext = React.createContext({
  isLoaded: false,
  currentUser: undefined,
});

export default UserContext;