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
import { UserContext } from "../components/ContextWrapper";

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

const PasswordInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const [showPassword, setShowPassword] = React.useState(false);

  const { touched } = useFormikContext();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl className="input-field">
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        error={!!(meta.touched && meta.error)}
        disabled={field.name === "password2" && !touched.password1}
        label={label}
        variant="outlined"
        inputProps={{
          ...field,
          ...props,
          type: showPassword ? "text" : "password",
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
      {!!(meta.touched && meta.error) && (
        <FormHelperText error id="accountId-error">
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const DialogTransistion = ({ open, setOpen }) => {
  const contextObject = React.useContext(UserContext);

  const handleClose = () => {
    setOpen(false);
  };

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
              username: "",
              password: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form className="form">
              <MyTextInput label="Username" name="username" type="text" />

              <PasswordInput label="Password" name="password" type="text" />

              <div className="buttons">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {contextObject.translations.submit}
                </Button>
                <Button
                  type="reset"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleClose}
                >
                  {contextObject.translations.cancel}
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