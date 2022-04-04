import React from "react";
import { BrowserRouter } from "react-router-dom";

import { Modals } from "./Modals";

export const UserContext = React.createContext(null);

export const ContextWrapper = ({ children, contextObject }) => {
  return (
    <BrowserRouter>
      <UserContext.Provider value={contextObject}>
        {children}
        <Modals contextObject={contextObject} />
      </UserContext.Provider>
    </BrowserRouter>
  );
};
