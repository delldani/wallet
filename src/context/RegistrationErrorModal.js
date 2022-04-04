import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

export const RegistrationErrorModal = ({
  open,
  handleClose,
  contextObject,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Alert severity="error">
          {contextObject.translations.registrationError}
        </Alert>
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
