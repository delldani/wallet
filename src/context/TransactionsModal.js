import React from "react";
import { Formik, Form, useField } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import CircularProgress from "@mui/material/CircularProgress";

import { validationForTransactionModal } from "../utils/default";
import {
  dbUpdateTransaction,
  dbGetAllTransaction,
  dbAddTransaction,
} from "../utils/db";

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

export const TransactionsModal = ({
  modalType,
  handleClose,
  contextObject,
}) => {
  const {
    translations,
    loginData,
    actualWallet,
    setTransactions,
    openModal,
    transactions,
  } = contextObject;
  const [showProgress, setShowProgress] = React.useState(false);

  const onSubmit = (values) => {
    setShowProgress(true);
    if (modalType?.data) {
      //csak update-nél van, egyébként data
      dbUpdateTransaction(
        modalType.data.id,
        values.transaction,
        values.amount,
        loginData.token
      ).then((res) => {
        console.log(res);
        dbGetAllTransaction(actualWallet.id, loginData.token)
          .then((res) => {
            console.log(res);
            setTransactions(res.data.transactions);
            setShowProgress(false);
            handleClose();
          })
          .catch((err) => {
            console.log(err);
            openModal("updateError");
          });
      });
    } else {
      dbAddTransaction(
        actualWallet.id,
        values.transaction,
        values.amount,
        loginData.token
      )
        .then((res) => {
          const newTransactions = [...transactions, res.data];
          console.log(res);
          setTransactions(newTransactions);
          setShowProgress(false);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
          openModal("addError");
        });
    }
  };

  const open = modalType && modalType.type === "transactions";

  const transaction = modalType?.data?.title ? modalType.data.title : "";
  const amount = modalType?.data?.amount ? modalType.data.amount : "";

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
            enableReinitialize
            initialValues={{
              transaction,
              amount,
            }}
            validationSchema={validationForTransactionModal}
            onSubmit={onSubmit}
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
              {showProgress && <CircularProgress />}
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
