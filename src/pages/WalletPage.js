import React from "react";
import { UserContext } from "../context";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { DoLogin } from "../components/DoLogin";
import { dbGetAllTransaction } from "../utils/db";

export const WalletPage = () => {
  const contextObject = React.useContext(UserContext);
  const { actualWallet, token, translations, setModalType } = contextObject;
  const [transactions, setTransactions] = React.useState(null);

  React.useEffect(() => {
    if ((actualWallet, token)) {
      dbGetAllTransaction(actualWallet, token).then((res) => {
        console.log(res);
        setTransactions(res.data.transactions);
      });
    }
  }, []);

  const onTransactions = () => {
    setModalType("transactions");
  };

  if (contextObject.loginData) {
    return (
      <Box sx={style}>
        <h1>WalletPage</h1>
        <Button variant="contained" onClick={onTransactions}>
          {translations.newTransaction}{" "}
        </Button>
      </Box>
    );
  } else {
    return (
      <div>
        <DoLogin />;
      </div>
    );
  }
};

const style = {
  display: "flex",
  flexDirection: "column",
};
