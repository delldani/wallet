import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { UserContext } from "../context";

import { NavBarButtons } from "./NavBarButtons";

export const NavBar = () => {
  const contextObject = React.useContext(UserContext);
const { loginData, translations} = contextObject;
  return (
    <Box sx={style}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {translations.title}
           <span className="user-name"> {loginData?.user?.name}</span>
          </Typography>
          <NavBarButtons />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const style = {
  flexGrow: 1,
  '& .user-name':{
    marginLeft:'30px',
  }
}