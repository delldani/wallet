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
import CircularProgress from "@mui/material/CircularProgress";

import { dbDeleteTransaction } from "../utils/db";
export const TransactionsTable = () => {
  const contextObject = React.useContext(UserContext);
  const {
    actualWallet,
    token,
    translations,
    openModal,
    deleteTransaction,
    getTransactionList,
    transactions,
    setTransactions,
  } = contextObject;

  const { amount, created, transaction, action, deleteLabel, upDate } =
    translations;
  const [showProgress, setShowProgress] = React.useState(false);

  const onTransactionDelete = (id) => {
    setShowProgress(true);
    dbDeleteTransaction(id, token)
      .then((res) => {
        setTransactions(transactions.filter((item) => item.id !== id));
        console.log(res);
        setShowProgress(false);
      })
      .catch((err) => {
        console.log(err);
        setShowProgress(false);
        openModal("deleteError");
      });
  };

  return (
    <Box sx={style}>
      <Table className="table" size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>{transaction}</TableCell>
            <TableCell align="right">{amount}</TableCell>
            <TableCell align="right">{created}</TableCell>
            <TableCell align="right">{action}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.title}
              </TableCell>
              <TableCell align="right">{item.amount}</TableCell>
              <TableCell align="right">{item.created_by.name}</TableCell>

              <TableCell align="right">
                {" "}
                <Button
                  variant="contained"
                  onClick={() => {
                    openModal("transactions", {
                      id: item.id,
                      title: item.title,
                      amount: item.amount,
                    });
                  }}
                >
                  {upDate}{" "}
                </Button>
                <Button
                  variant="contained"
                  onClick={() => onTransactionDelete(item.id)}
                >
                  {deleteLabel}{" "}
                </Button>
                {showProgress && <CircularProgress />}
              </TableCell>
            </TableRow>
          ))}
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
