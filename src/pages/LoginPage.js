import React from "react";
import { Formik, Form} from "formik";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

import { Link } from "../components/Link";
import { useUserContext } from "../context";
import { dbLogin } from "../utils/db";
import { TextInput } from "../components/TextInput";
import { style } from './LoginPage.style';
import { PasswordInput } from '../components/PasswordInput'

export const LoginPage = () => {
  const { setLoginData, openModal,translations } = useUserContext();
  const { login, toRegister, submit, reset } = translations;
  const navigate = useNavigate();
  return (
    <Box sx={style}>
      <h1>{login}</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values) => {
          handleLogin(values, setLoginData, navigate, openModal);
        }}
      >
        <Form className="form">
          <TextInput label="Username" name="username" type="text" />

          <PasswordInput label="Password" name="password" type="text" hasTooltip={false} />

          <Link to="/registration" label={toRegister} />

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

const handleLogin = (values, setLoginData, navigate, openModal) => {
  const { username, password } = values;
  dbLogin(username, password)
  .then((response) => {
    console.log(response);
      setLoginData(response.data);
      response.data.user.job === "teacher" ||
      response.data.user.job !== "parent"
        ? navigate("/permission")
        : navigate("/list");
    })
    .catch((error) => {
      openModal("loginError");
      console.log(error);
    });
};
