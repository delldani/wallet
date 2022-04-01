import React from "react";
import Box from "@mui/material/Box";

import { Link } from "./Link";
import { UserContext } from "../components/ContextWrapper";

export const DoLogin = () => {
  const contextObject = React.useContext(UserContext);
  return (
    <Box sx={style}>
      <h1>Kérem lépjen be</h1>
      <Link to="/" label={contextObject.translations.login} />
    </Box>
  );
};

const style = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "cnter",
};
