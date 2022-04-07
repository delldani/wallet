import React from "react";
import { Formik, Form, useField, useFormikContext } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";

import { validationForTransactionModal } from "../utils/default";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      className="input-field"
      label={label}
      variant="outlined"
      inputProps={{ ...field, ...props }}
      helperText={meta.touched && meta.error}
      error={!!(meta.touched && meta.error)}
    />
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const TransactionsModal = ({ open, handleClose, contextObject }) => {
  const { translations, addTransaction } = contextObject;
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Box sx={mainStyle}>
          <Formik
            initialValues={{
              transaction: "",
              amount: "",
            }}
            validationSchema={validationForTransactionModal}
            onSubmit={(values, { setSubmitting }) => {
              addTransaction(values.transaction, values.amount);
            }}
          >
            <Form className="form">
              <MyTextInput
                name="transaction"
                label={translations.transactionType}
                type="text"
              />
              <MyTextInput
                name="amount"
                label={translations.amount}
                type="text"
              />

              <div className="buttons">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {translations.save}
                </Button>
                <Button
                  type="reset"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleClose}
                >
                  {translations.cancel}
                </Button>
              </div>
            </Form>
          </Formik>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const mainStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& .form": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  "& .input-field": {
    width: "300px",
    marginTop: "20px",
    marginBottom: "20px",
  },
  "& .buttons": {
    display: "flex",
    marginTop: "20px",
    gap: "10px",
    justifyContent: "space-between",
    width: "100%",
  },
  "& .info": {
    height: "min-content",
  },
};