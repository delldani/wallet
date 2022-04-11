import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import { NavBarButtons } from "./NavBarButtons";
import { UserLabel} from '../components/UserLabel'

export const NavBar = () => {

  return (
    <Box sx={style}>
      <AppBar position="static">
        <Toolbar className="toolbar" >
          <UserLabel/>
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
 
}