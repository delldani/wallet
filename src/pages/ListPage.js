import React from "react";
import { UserContext } from "../components/ContextWrapper";

import { DoLogin } from "../components/DoLogin";

export const ListPage = () => {
  const contextObject = React.useContext(UserContext);

  if (contextObject.loginData) {
    return <h1>ListPage</h1>;
  } else {
    return <DoLogin />;
  }
};
