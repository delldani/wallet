import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { UserContext } from "../components/ContextWrapper";

export const NavBar = () => {
  const contextObject = React.useContext(UserContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {contextObject.translations.title}
          </Typography>
          <Button color="inherit"> {contextObject.translations.login}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
