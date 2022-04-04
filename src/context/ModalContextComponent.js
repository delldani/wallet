import React from "react";

import { RegistrationErrorModal } from "./RegistrationErrorModal";

export const ModalContext = React.createContext(null);

export const ModalContextComponent = ({ children, contextObject }) => {
  const { modalType, setModalType } = contextObject;

  const handleClose = () => {
    setModalType(null);
  };
  return (
    <ModalContext.Provider value={setModalType}>
      {children}
      {
        <RegistrationErrorModal
          open={modalType === "registrationError"}
          handleClose={handleClose}
          contextObject={contextObject}
        />
      }
    </ModalContext.Provider>
  );
};
