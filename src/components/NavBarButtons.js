import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { UserContext } from "../components/ContextWrapper";

import { showButton } from "../utils/utils";
export const NavBarButtons = () => {
  const contextObject = React.useContext(UserContext);
  const { pathname } = useLocation();

  return (
    <Box sx={style}>
      {showButton("login-button", pathname) && (
        <Button color="inherit"> {contextObject.translations.login}</Button>
      )}
    </Box>
  );
};

const style = {
  display: "flex",
};
