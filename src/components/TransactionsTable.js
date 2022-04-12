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
import { style } from './TransactionsTable.style';
export const TransactionsTable = () => {
  const contextObject = React.useContext(UserContext);
  const {
    token,
    translations,
    openModal,
    transactions,
    setTransactions,
    actualWallet,
  } = contextObject;

  const { amount, created, transaction, action, deleteLabel, upDate,summary,walletOwner } =
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

  const initialValue = 0;
  const sum = transactions.reduce(
  (previousValue, currentValue) => previousValue + currentValue.amount,
  initialValue
);

return (
    <Box sx={style}>
      <h1>{walletOwner} : {actualWallet.name}</h1>
      <Table className="table" size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><span className='bold' >{transaction}</span></TableCell>
            <TableCell align="right"><span className='bold' >{created}</span></TableCell>
            <TableCell align="right"><span className='bold' >{amount}</span></TableCell>
            <TableCell align="right"><span className='bold' >{action}</span></TableCell>
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
                  className="button"
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
           <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" colSpan={2} >
              <span className='bold' >{summary}</span>
              </TableCell>
              <TableCell component="th" scope="row" align='right'>
              <span className='bold' >{sum}</span>
              </TableCell>
              </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

