import React from "react";
import { Formik, Form } from "formik";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import CircularProgress from "@mui/material/CircularProgress";

import { validationForTransactionModal } from "../utils/default";
import { style } from './TransactionsModal.style';
import {TextInput } from '../components/TextInput'
import {
  apiCall
} from "../utils/db";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const TransactionsModal = ({
  handleClose,
  contextObject,
}) => {
  const {
    translations,
    token,
    actualWallet,
    setTransactions,
    openModal,
    transactions,
    modalType,
  } = contextObject;
  const [showProgress, setShowProgress] = React.useState(false);

  const onSubmit = (values) => {
    setShowProgress(true);
    if (modalType?.data) {
      apiCall('patch',"transaction/" + modalType.data.id, {title:values.transaction,amount:values.amount},token)
      .then((res) => {
        console.log(res);
        apiCall('post',"transactions", {wallet_id:actualWallet.id},token)
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
      apiCall('put','transactions', {wallet_id:actualWallet.id,title:values.transaction,amount:values.amount},token)
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
        <Box sx={style}>
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
              <TextInput
                name="transaction"
                label={translations.transactionType}
                type="text"
              />
              <TextInput
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
