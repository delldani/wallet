import React from "react";
import { UserContext } from "../context";

import { DoLogin } from "../components/DoLogin";

export const PermissionPage = () => {
  const contextObject = React.useContext(UserContext);

  if (contextObject.loginData) {
    return <h1>PermissionPage</h1>;
  } else {
    return <DoLogin />;
  }
};
