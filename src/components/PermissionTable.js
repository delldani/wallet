import React from "react";
import { UserContext } from "../context";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const PermissionTable = ({
  userList,
  onCreateWallet,
  myWallets,
  translations,
  accessToWallet,
  onDeleteWallet,
  job,
}) => {
  const { name, role, action, permission, parent, teacher, create, deleteLabel,removeLabel } = translations;

  return (
    <Box sx={style}>
      <Table className="table" size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell align="right">{role}</TableCell>
            <TableCell align="right">{action}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((item) => {
            const hasAccess =
              job === "director"
                ? myWallets.map((wallet) => wallet.name).includes(item.name)
                : accessToWallet
                    .map((wallet) => wallet.name)
                    .includes(item.name);

            return (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">
                  {item.job === "teacher" ? teacher : parent}
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <Button
                    variant="contained"
                    disabled={hasAccess}
                    onClick={() => onCreateWallet(item.name, item.id)}
                  >
                    {job === 'teacher' ? permission : create}{" "}
                  </Button>
                  <Button
                    variant="contained"
                    disabled={!hasAccess}
                    onClick={() => onDeleteWallet(item)}
                  >
                    {job === 'teacher' ? removeLabel : deleteLabel}{" "}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

const style = {
  "& .table": {
    maxWidth: "80%",
  },
};
