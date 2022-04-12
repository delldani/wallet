import React from "react";
import { useUserContext } from "../context";
import Box from "@mui/material/Box";

import { TransactionsTable } from "../components/TransactionsTable";
import { style } from './TransactionsTableWrapper.style';

export const TransactionsTableWrapper = () => {
  const {
    actualWallet,
    translations,
    transactions,
  } =  useUserContext();

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
