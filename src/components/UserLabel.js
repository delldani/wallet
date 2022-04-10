import * as React from "react";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context";
import Typography from '@mui/material/Typography';

import { showButton } from "../utils/utils";

export const UserLabel = () => {
  const contextObject = React.useContext(UserContext);
  const { translations, job,loginData } = contextObject;
  const { pathname } = useLocation();

  return (
    <Box sx={style}>
      {showButton("username", pathname) && (
         <div>
         <Typography className="title-wrapper" variant="h6" component="div" sx={{ flexGrow: 1 }}>
         <span className="title">{translations.title}</span>
         <span className="username">{loginData?.user?.name}</span>
         </Typography>
         </div>
      )}
    </Box>
  );
};

const style = {
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
    
};
