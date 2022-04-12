import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../context";
import { useNavigate } from "react-router-dom";

import { showButton } from "../utils/utils";

export const NavBarButtons = () => {
  const { translations, job ,token, logOut } = useUserContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box sx={style}>
      {showButton(pathname, !!token,job,'permission') && (
        <Button
          color="inherit"
          onClick={() => {
            navigate("/permission");
          }}
        >
          {" "}
          {translations.permission}
        </Button>
      )}
      {showButton( pathname, !!token) && (
        <Button
          color="inherit"
          onClick={() => {
            navigate("/list");
          }}
        >
          {" "}
          {translations.walletList}
        </Button>
      )}
      {showButton( pathname, !!token) && (
        <Button
          color="inherit"
          onClick={() => {
            navigate("/wallet");
          }}
        >
          {" "}
          {translations.wallet}
        </Button>
      )}
      {showButton( pathname, !!token) && (
        <Button color="inherit" onClick={() => {
          logOut();
          navigate("/");}}>
          {" "}
          {translations.logout}
        </Button>
      )}
    </Box>
  );
};

const style = {
  display: "flex",
  "& > button": {
    marginRight: "15px",
  },
};
