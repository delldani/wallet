import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

export const ErrorModal = ({ modalType, handleClose, contextObject }) => {
  const {
    close,
    registrationError,
    loginError,
    deleteError,
    addError,
    updateError,
  } = contextObject.translations;
  const errorMessage = {
    registrationError,
    loginError,
    deleteError,
    addError,
    updateError,
  };
  const errors = [
    "addError",
    "updateError",
    "registrationError",
    "loginError",
    "deleteError",
  ];
  const open = modalType && errors.includes(modalType.type);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Alert severity="error">{errorMessage[modalType.type]}</Alert>
      </DialogContent>
      <DialogActions sx={style}>
        <Button onClick={handleClose} color="error" variant="contained">
          {close}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const style = {
  justifyContent: "center",
};
