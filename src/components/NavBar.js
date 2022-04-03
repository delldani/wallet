import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { UserContext } from "../context";

import { NavBarButtons } from "./NavBarButtons";

export const NavBar = () => {
  const contextObject = React.useContext(UserContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {contextObject.translations.title}
          </Typography>
          <NavBarButtons />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
