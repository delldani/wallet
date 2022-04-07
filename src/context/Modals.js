import React from "react";

import { ErrorModal } from "./ErrorModal";
import { TransactionsModal } from "./TransactionsModal";

export const ModalContext = React.createContext(null);

export const Modals = ({ contextObject }) => {
  const { modalType, setModalType } = contextObject;

  const handleClose = () => {
    setModalType(null);
  };

  return (
    <div>
      <ErrorModal
        modalType={modalType}
        handleClose={handleClose}
        contextObject={contextObject}
      />
      <TransactionsModal
        open={modalType === "transactions"}
        handleClose={handleClose}
        contextObject={contextObject}
      />
    </div>
  );
};
