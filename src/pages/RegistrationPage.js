import React from "react";
import { Formik, Form, Field } from "formik";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../context";
import { RadioButtons } from "../components/RadioButtons";
import { validationForRegistration } from "../utils/default";
import { dbLogin, dbRegistration } from "../utils/db";
import {TextInput} from '../components/TextInput';
import { PasswordInput} from '../components/PasswordInput'
import { style } from './RegistrationPage.style';

export const RegistrationPage = () => {
  const contextObject = useUserContext();
  const {
    usernameValidationRules,
    passwordValidationRules,
    teacher,
    parent,
    registration,
    submit,
    reset,
  } = contextObject.translations;
  const { setLoginData, openModal } = contextObject;
  const navigate = useNavigate();

  return (
    <Box sx={style}>
      <h1>{registration}</h1>
      <Formik
        initialValues={{
          username: "",
          password1: "",
          password2: "",
          radioGroup: "teacher",
        }}
        validationSchema={validationForRegistration}
        onSubmit={(values) => {
          handleRegistration(values, setLoginData, navigate, openModal);
        }}
      >
        <Form className="form">
          <TextInput
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

const handleRegistration = (values, setLoginData, navigate, openModal) => {
  const { radioGroup, username, password1 } = values;
  dbRegistration(username, password1, radioGroup)
    .then((response) => {
      //ha sikerült a regisztráció akkor beloginol
      dbLogin(username, password1)
        .then((response) => {
          setLoginData(response.data);
          radioGroup === "teacher" ? navigate("/list") : navigate("/wallet");
        })
        .catch((error) => {
          openModal("loginError");
          console.log(error);});
    })
    .catch(function (error) {
      console.log(error);
      openModal("registrationError");
    });
};
