import React from "react";

import { RegistrationErrorModal } from "./RegistrationErrorModal";

export const ModalContext = React.createContext(null);

export const Modals = ({ contextObject }) => {
  const { modalType, setModalType } = contextObject;

  const handleClose = () => {
    setModalType(null);
  };

  return (
    <div>
      <RegistrationErrorModal
        open={modalType === "registrationError"}
        handleClose={handleClose}
        contextObject={contextObject}
      />
    </div>
  );
};
