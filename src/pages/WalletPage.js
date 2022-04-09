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

  if (contextObject.loginData) {
    return (
      <Box sx={style}>
        <h1>WalletPage</h1>
        {transactions ? (
          <div>
           {actualWallet ? <TransactionsTable /> : <h2>{translations.noActualWallet}</h2>}
          </div>
        ) : (
          <h2>{translations.noTransactions}</h2>
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
  } else {
    return (
      <div>
        <DoLogin />
      </div>
    );
  }
};

const style = {
  display: "flex",
  flexDirection: "column",
  "& .transaction-button": {
    width: "200px",
  },
};
