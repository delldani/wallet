import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

export const RegistrationErrorModal = ({ open,handleClose }) => {
  return (
    <Dialog
    open={open}
    onClose={handleClose}
  >
    <DialogContent>
      <DialogContentText >
       Nemsikerült a regisztráció
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Bezár</Button>
    </DialogActions>
  </Dialog>
  );
};
