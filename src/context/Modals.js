import React from "react";

import { ErrorModal } from "./ErrorModal";
import { TransactionsModal } from "./TransactionsModal";
import { useUserContext } from "../context";

export const Modals = () => {
  const contextObject = useUserContext();
  const {openModal}  = contextObject;

  const handleClose = () => {
    openModal(null);
  };

  return (
    <div>
      <ErrorModal
        handleClose={handleClose}
        contextObject={contextObject}
      />
      <TransactionsModal
        handleClose={handleClose}
        contextObject={contextObject}
      />
    </div>
  );
};
