import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { UserContext } from "../context";
import Typography from '@mui/material/Typography';

import { NavBarButtons } from "./NavBarButtons";

export const NavBar = () => {
  const contextObject = React.useContext(UserContext);
const { loginData, translations} = contextObject;
  return (
    <Box sx={style}>
      <AppBar position="static">
        <Toolbar className="toolbar" >
          <div>
          <Typography className="title-wrapper" variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <span className="title">{translations.title}</span>
          <span className="username">{loginData?.user?.name}</span>
          </Typography>
          </div>
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
  },
  '& .toolbar':{
    display:'flex',
    justifyContent:'space-between',
  },
  '& .title-wrapper .title ':{
    ['@media (max-width:1200px)']: {
      display: 'none',
    },
  },
  '& .title-wrapper .username ':{
    ['@media (max-width:700px)']: {
      display: 'none',
    },
  },
  '& .title-wrapper > span':{
    marginRight:'40px',
  },

}