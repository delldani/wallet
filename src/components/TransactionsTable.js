import React from "react";
import { UserContext } from "../context";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";

import { dbDeleteTransaction } from "../utils/db";
export const TransactionsTable = () => {
  const contextObject = React.useContext(UserContext);
  const {
    token,
    translations,
    openModal,
    transactions,
    setTransactions,
  } = contextObject;

  const { amount, created, transaction, action, deleteLabel, upDate,summary } =
    translations;
  const [showProgress, setShowProgress] = React.useState(null);

  const onTransactionDelete = (id) => {
    setShowProgress(id);
    dbDeleteTransaction(id, token)
      .then((res) => {
        setTransactions(transactions.filter((item) => item.id !== id));
        console.log(res);
        setShowProgress(null);
      })
      .catch((err) => {
        console.log(err);
        setShowProgress(null);
        openModal("deleteError");
      });
  };

  const initialValue = 0;
  const sum = transactions.reduce(
  (previousValue, currentValue) => previousValue + currentValue.amount,
  initialValue
);

return (
    <Box sx={style}>
      <Table className="table" size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>{transaction}</TableCell>
            <TableCell align="right">{created}</TableCell>
            <TableCell align="right">{amount}</TableCell>
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
              <TableCell align="right">{item.created_by.name}</TableCell>
              <TableCell align="right">{item.amount}</TableCell>

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
                {showProgress === item.id && <CircularProgress />}
              </TableCell>
            </TableRow>
          ))}
           <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" colSpan={2} >
              {summary}
              </TableCell>
              <TableCell component="th" scope="row" align='right'>
              {sum}
              </TableCell>
              </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

const style = {
  width:'100%',
  "& .table": {
  },
};
