import React from "react";
import { UserContext } from "../components/ContextWrapper";

import { DoLogin } from "../components/DoLogin";

export const PermissionPage = () => {
  const contextObject = React.useContext(UserContext);

  if (contextObject.logindata) {
    return <h1>PermissionPage</h1>;
  } else {
    return <DoLogin />;
  }
};
