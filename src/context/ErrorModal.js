import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { errorMessage, errors } from "../utils/default";

export const ErrorModal = ({ modalType, handleClose, contextObject }) => {
  const { close } = contextObject.translations;

  const type = modalType && modalType.type;
  const open = errors.includes(type);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Alert severity="error">{errorMessage[type]}</Alert>
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
