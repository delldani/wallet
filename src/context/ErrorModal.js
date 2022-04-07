import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

export const ErrorModal = ({ modalType, handleClose, contextObject }) => {
  let label;
  switch (modalType) {
    case "registrationError":
      label = contextObject.translations.registrationError;
      break;
    case "loginError":
      label = contextObject.translations.loginError;
      break;
    case "deleteError":
      label = contextObject.translations.deleteError;
      break;
    default:
      label = "Error";
  }

  return (
    <Dialog
      open={
        modalType === "registrationError" ||
        modalType === "loginError" ||
        modalType === "deleteError"
      }
      onClose={handleClose}
    >
      <DialogContent>
        <Alert severity="error">{label}</Alert>
      </DialogContent>
      <DialogActions sx={style}>
        <Button onClick={handleClose} color="error" variant="contained">
          {contextObject.translations.close}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const style = {
  justifyContent: "center",
};
