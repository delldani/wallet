import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ModalContextComponent} from './ModalContextComponent';

export const UserContext = React.createContext(null);

export const ContextWrapper = ({ children, contextObject }) => {
  return (
    <BrowserRouter>
      <UserContext.Provider value={contextObject}>
        <ModalContextComponent>
        {children}
        </ModalContextComponent>
      </UserContext.Provider>
    </BrowserRouter>
  );
};
