import React from "react";
import { UserContext } from "../components/ContextWrapper";

import { DoLogin } from "../components/DoLogin";

export const PermissionPage = () => {
  const contextObject = React.useContext(UserContext);

  if (contextObject.token === "") {
    return <DoLogin />;
  } else {
    return <h1>PermissionPage</h1>;
  }
};
