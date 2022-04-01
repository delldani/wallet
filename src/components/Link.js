import React from "react";
import { Link as RouterLink } from "react-router-dom";
import MaterialLink from "@mui/material/Link";

export const Link = ({ label, to, variant = "body1", underline = "hover" }) => {
  return (
    <MaterialLink
      component={RouterLink}
      to={to}
      underline={underline}
      variant={variant}
    >
      {label}
    </MaterialLink>
  );
};
