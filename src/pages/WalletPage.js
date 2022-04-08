import React from "react";
import { UserContext } from "../context";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { DoLogin } from "../components/DoLogin";
import { dbGetAllTransaction } from "../utils/db";
import { TransactionsTable } from "../components/TransactionsTable";

export const WalletPage = () => {
  const contextObject = React.useContext(UserContext);
  const {
    actualWallet,
    token,
    translations,
    setModalType,
    deleteTransaction,
    getTransactionList,
    transactions,
  } = contextObject;

  React.useEffect(() => {
    if ((actualWallet, token)) {
      getTransactionList();
    }
  }, []);

  const onTransactions = () => {
    setModalType("transactions");
  };

  const onTransactionDelete = (id) => {
    deleteTransaction(id);
  };
  const transactionsTable = transactions.map((item) => {
    return (
      <div>
        {item.title}---{item.amount}---{item.created_by.name}
        <Button
          variant="contained"
          onClick={() => onTransactionDelete(item.id)}
        >
          {translations.delete}{" "}
        </Button>
      </div>
    );
  });

  if (contextObject.loginData) {
    return (
      <Box sx={style}>
        <h1>WalletPage</h1>
        {transactions ? (
          <div>
            <TransactionsTable />
          </div>
        ) : (
          <h2>NIncs megjeleníthető tranzakció</h2>
        )}
        <Button
          variant="contained"
          onClick={onTransactions}
          className="transaction-button"
        >
          {translations.newTransaction}{" "}
        </Button>
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
