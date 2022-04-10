import React from "react";
import { UserContext } from "../context";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { DoLogin } from "../components/DoLogin";
import { TransactionsTable } from "../components/TransactionsTable";
import { dbGetAllTransaction } from '../utils/db'

export const WalletPage = () => {
  const contextObject = React.useContext(UserContext);
  const {
    actualWallet,
    translations,
    openModal,
    token,
    transactions,
    setTransactions
  } = contextObject;

  React.useEffect(() => {
    if (actualWallet) {
      dbGetAllTransaction(actualWallet, token).then((res) => {
        console.log(res);
        setTransactions(res.data.transactions);
      });
    }
  }, []);

  const onTransactions = () => {
    openModal("transactions");
  };
console.log(transactions);
    return (
      <Box sx={style}>
        {transactions.length ? (
          <div className="table-wrapper">
           {actualWallet ? <TransactionsTable /> : <h1>{translations.noActualWallet}</h1>}
          </div>
        ) : (
          <h1>{translations.noTransactions}</h1>
        )}
        {actualWallet && 
        <Button
          variant="contained"
          onClick={onTransactions}
          className="transaction-button"
        >
          {translations.newTransaction}{" "}
        </Button>}
      </Box>
    );
};

const style = {
  height: '100%',
  display: "flex",
  flexDirection: "column",
  alignItems: 'center',
  "& .transaction-button": {
    width: "200px",
  },
  '& .table-wrapper':{
    marginTop: '200px',
    marginBottom: '100px',
    width: '80%',
    display: 'flex',
    alignItems:'center',
    justifyContent: 'center',
    ['@media (max-width:1200px)']: {
      width: '100%',
    }
  },
};
