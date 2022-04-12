import React from "react";
import { useUserContext } from "../context";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { dbGetAllTransaction } from '../utils/db';
import {TransactionsTableWrapper } from '../components/TransactionsTableWrapper';
import { style } from './WalletPage.style';

export const WalletPage = () => {
  const {
    actualWallet,
    translations,
    openModal,
    token,
    setTransactions
  } = useUserContext();

  const [showProgress,setShowProgress] = React.useState(true);

  React.useEffect(() => {
    if (actualWallet) {
      dbGetAllTransaction(actualWallet.id, token).then((res) => {
        console.log(res);
        setTransactions(res.data.transactions);
        setShowProgress(false);
      }).catch(res=>{
        console.log(res);
        setShowProgress(false);
      });
    }else{
      setShowProgress(false);
    }
  }, []);

  const onTransactions = () => {
    openModal("transactions");
  };

  return (
      <Box sx={style}>

        {showProgress ? 
        <CircularProgress />:
        <TransactionsTableWrapper/>
        }
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
