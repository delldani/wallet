import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context";

import { showButton } from "../utils/utils";
export const NavBarButtons = () => {
  const contextObject = React.useContext(UserContext);
  const { loginData,setLoginData} = contextObject;
  const { pathname } = useLocation();

  return (
    <Box sx={style}>
       {showButton("permission-button", pathname,!!loginData) && (
        <Button color="inherit" onClick={()=>{}}> {contextObject.translations.permission}</Button>
      )}
       {showButton("walletlist-button", pathname,!!loginData) && (
        <Button color="inherit" onClick={()=>{}}> {contextObject.translations.walletList}</Button>
      )}
      {showButton("logout-button", pathname,!!loginData) && (
        <Button color="inherit" onClick={()=>setLoginData(null)}> {contextObject.translations.logout}</Button>
      )}
    </Box>
  );
};

const style = {
  display: "flex",
  '& > button':{
    marginRight:'15px',
  }
};
