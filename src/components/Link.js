import React from "react";
import { Link as RouterLink } from "react-router-dom";
import MaterialLink from "@mui/material/Link";

export const Link = ({ label, to }) => {
  return (
    <MaterialLink component={RouterLink} to={to} underline="hover">
      {label}
    </MaterialLink>
  );
};
