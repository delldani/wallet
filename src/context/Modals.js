import React from "react";

import { ErrorModal } from "./ErrorModal";
import { TransactionsModal } from "./TransactionsModal";
import { UserContext } from "../context";

export const Modals = () => {
  const contextObject = React.useContext(UserContext);
  const { modalType, openModal } = contextObject;

  const handleClose = () => {
    openModal(null);
  };

  return (
    <div>
      <ErrorModal
        modalType={modalType}
        handleClose={handleClose}
        contextObject={contextObject}
      />
      <TransactionsModal
        modalType={modalType}
        handleClose={handleClose}
        contextObject={contextObject}
      />
    </div>
  );
};
