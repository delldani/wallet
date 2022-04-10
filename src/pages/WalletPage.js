import React from "react";
import { UserContext } from "../context";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { TransactionsTable } from "../components/TransactionsTable";
import { dbGetAllTransaction } from '../utils/db'
import {TransactionsTableWrapper } from '../components/TransactionsTableWrapper'

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

  const [showProgress,setShowProgress] = React.useState(true);

  React.useEffect(() => {
    if (actualWallet) {
      dbGetAllTransaction(actualWallet, token).then((res) => {
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

const style = {
  height: '100%',
  display: "flex",
  flexDirection: "column",
  alignItems: 'center',
  justifyContent:'center',
  "& .transaction-button": {
    width: "200px",
  },
  '& .table-wrapper':{
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
