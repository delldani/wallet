import React from "react";
import { UserContext } from "../context";
import Box from "@mui/material/Box";

import { TransactionsTable } from "../components/TransactionsTable";

export const TransactionsTableWrapper = () => {
  const contextObject = React.useContext(UserContext);
  const {
    actualWallet,
    translations,
    transactions,
  } = contextObject;

  return (
      <Box sx={style}>
        { transactions.length ? (
         <div className="table-wrapper">
         {actualWallet ? <TransactionsTable /> : <h1>{translations.noActualWallet}</h1>}
         </div>
         ) : (
           <h1>{translations.noTransactions}</h1>
           )}
      </Box>
    );
};

const style = {
  width:'80%',
   ['@media (max-width:1200px)']: {
      width: '100%',
    },
  display: "flex",
  flexDirection: "column",
  alignItems: 'center',
  "& .transaction-button": {
    width: "200px",
  },
  '& .table-wrapper':{
    marginBottom: '100px',
    width: '100%',
    display: 'flex',
    alignItems:'center',
    justifyContent: 'center',
   
  },
};
