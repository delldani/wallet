import React from "react";
import { Formik, Form, useField, useFormikContext, Field } from "formik";
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
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context";
import { RadioButtons } from "../components/RadioButtons";
import { handleRegistration } from "../utils/db";
import { yupObject } from "../utils/default";

const MyTextInput = ({ label, tooltipInfo, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="username-input">
      <TextField
        className="input-field"
        label={label}
        variant="outlined"
        inputProps={{ ...field, ...props }}
        helperText={meta.touched && meta.error}
        error={!!(meta.touched && meta.error)}
      />
      <Tooltip title={tooltipInfo} className="info">
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

const PasswordInput = ({ label, tooltipInfo, hasTooltip = true, ...props }) => {
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
    <div className="password-input">
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
      {hasTooltip && (
        <Tooltip title={tooltipInfo} className="info">
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export const RegistrationPage = () => {
  const contextObject = React.useContext(UserContext);
  const {
    usernameValidationRules,
    passwordValidationRules,
    teacher,
    parent,
    registration,
    submit,
    reset,
  } = contextObject.translations;
  const { setLoginData, setModalType } = contextObject;
  const navigate = useNavigate();

  return (
    <Box sx={mainStyle}>
      <h1>{registration}</h1>
      <Formik
        initialValues={{
          username: "",
          password1: "",
          password2: "",
          radioGroup: "teacher",
        }}
        validationSchema={yupObject}
        onSubmit={(values) => {
          handleRegistration(values, setLoginData, navigate, setModalType);
        }}
      >
        <Form className="form">
          <MyTextInput
            label="Username"
            name="username"
            type="text"
            tooltipInfo={usernameValidationRules}
          />

          <PasswordInput
            label="Password"
            name="password1"
            type="text"
            tooltipInfo={passwordValidationRules}
          />
          <PasswordInput
            label="Confirm Password"
            name="password2"
            hasTooltip={false}
          />
          <Field
            name="radioGroup"
            options={["teacher", "parent"]}
            labels={[teacher, parent]}
            component={RadioButtons}
          />
          <div className="buttons">
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {submit}
            </Button>
            <Button type="reset" variant="contained" color="primary" fullWidth>
              {reset}
            </Button>
          </div>
        </Form>
      </Formik>
    </Box>
  );
};

const mainStyle = {
  marginTop: "150px",
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
  "& .username-input, .password-input": {
    display: "flex",
    alignItems: "center",
  },
  "& .password-input": {
    marginRight: "auto",
  },
  "& .info": {
    height: "min-content",
  },
};
