import React from "react";
import { BrowserRouter } from "react-router-dom";

export const UserContext = React.createContext(null);

export const ContextWrapper = ({ children, contextObject }) => {
  return (
    <BrowserRouter>
      <UserContext.Provider value={contextObject}>
        {children}
      </UserContext.Provider>
    </BrowserRouter>
  );
};
