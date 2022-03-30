import React from "react";
import { BrowserRouter } from "react-router-dom";

export const UserContext = React.createContext(null);

export const ContextWrapper = ({children,theme})=>{

    return(
        <BrowserRouter>
        <UserContext.Provider value={{theme:theme}}>
        {children}
        </UserContext.Provider>
        </BrowserRouter>

    );
}