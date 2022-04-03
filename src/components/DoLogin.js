import React from "react";
import Box from "@mui/material/Box";

import { Link } from "./Link";
import { UserContext } from "../context";

export const DoLogin = () => {
  const contextObject = React.useContext(UserContext);
  return (
    <Box sx={style}>
      <h1>{contextObject.translations.doLogin}</h1>
      <Link
        to="/"
        label={contextObject.translations.login}
        variant="h5"
        underline="none"
      />
    </Box>
  );
};

const style = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  "& h1": {
    fontSize: "45px",
  },
};
