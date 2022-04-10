import React from "react";
import Box from "@mui/material/Box";
import { UserContext } from "../context";
import { useLocation } from "react-router-dom";

import { NotFound } from "../pages/NotFound";
import { DoLogin } from "../components/DoLogin";
import { isAllow } from '../utils/utils';

export const Protected = ({page :Page}) => {
    const contextObject = React.useContext(UserContext);
    const { job, token } = contextObject;
    const { pathname } = useLocation();

    if(token){
      return (isAllow(job,pathname) ? <Page/> : <NotFound/>)
    }else{
      return  <DoLogin/>
    }
  
};
