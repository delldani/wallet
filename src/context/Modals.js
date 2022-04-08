import React from "react";

import { ErrorModal } from "./ErrorModal";
import { TransactionsModal } from "./TransactionsModal";

export const ModalContext = React.createContext(null);

export const Modals = ({ contextObject }) => {
  const { modalType, openModal } = contextObject;

  const handleClose = () => {
    openModal(null);
  };
  console.log(modalType);

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
