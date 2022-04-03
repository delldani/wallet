import React from "react";

import { RegistrationErrorModal} from './RegistrationErrorModal'

 export const ModalContext = React.createContext(null);

export const ModalContextComponent = ({ children }) => {
  const [modalType,setModalType] = React.useState(null);

  const handleClose = () => {
    setModalType(null);
  };

  return (
      <ModalContext.Provider value={setModalType}>
        {children}
        {<RegistrationErrorModal open={modalType === 'registrationError'} handleClose={handleClose}/>}
      </ModalContext.Provider>
  );
};
