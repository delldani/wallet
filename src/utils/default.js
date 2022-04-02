import * as Yup from "yup";


export const translations = {
  title: "Iskolai osztálypénznyilvántartó rendszer",
  login: "Belépés",
  reset: "Törlés",
  Submit: "Mehet",
  cancel: "Mégse",
  registration: "Regisztráció",
  toRegister: "Még nem regisztrált ?",
  usernameValidationRules: "5 és 15 karakter közötti, betü vagy szám lehet",
  passwordValidationRules:
    "Legalább 5 karakter hosszú, kisbetüt, nagy betüt, számot tartalmaznia kell",
  teacher: "osztályfőnök",
  parent: "szmk tag",
  doLogin: "Ön nincs bejelentkezve !",
};

export const yupObject = Yup.object({
  username: Yup.string()
    .max(20, "Must be 15 characters or less")
    .min(5, "Must be 5 characters or more")
    .matches(/^[a-zA-Z0-9]+$/, {
      message: "Must be only letters or numbers",
      excludeEmptyString: true,
    })
    .required("Required"),
  password1: Yup.string()
    .min(5, "Must be 5 characters or more")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message:
        "Must contain at least one lowercase letter, one uppercase letter, and one digit",
      excludeEmptyString: true,
    })
    .required("Required"),
  password2: Yup.string()
    .min(5, "Must be 5 characters or more")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message:
        "Must contain at least one lowercase letter, one uppercase letter, and one digit",
      excludeEmptyString: true,
    })
    .required("Required")
    .oneOf([Yup.ref("password1"), null], "password must match"),
})