import * as Yup from "yup";

export const translations = {
  title: "Felhasználó :",
  login: "Belépés",
  logout: "Kilépés",
  reset: "Törlés",
  submit: "Mehet",
  save: "Mentés",
  deleteLabel: "Töröl",
  removeLabel:'Visszavon',
  create:'Létrehozás',
  transactionType: "Tranzakció típusa",
  close: "Bezár",
  cancel: "Mégse",
  wallet: "Tárca",
  open: "Megnyit",
  amount: "Összeg",
  created: "Létrehozta",
  name: "Név",
  owner:'birtokos',
  walletOwner:'Tárca tulajdonos',
  role: "Szerep",
  upDate: "Módosít",
  transaction: "Tranzakció",
  action: "Művelet",
  walletList: "Tárca lista",
  summary:'Összesen',
  permission: "Engedélyezés",
  permissionDirector:'Új tárcák létrehozása tanároknak',
  permissionTeacher:'Hozzáférés engedélyezése saját tárcához', 
  registration: "Regisztráció",
  toRegister: "Még nem regisztrált ?",
  listPage:'Tárcák amikhez hozzáférése van',
  newTransaction: "Új tranzakció",
  usernameValidationRules: "5 és 15 karakter közötti, betü vagy szám lehet",
  passwordValidationRules:
    "Legalább 5 karakter hosszú, kisbetüt, nagy betüt, számot tartalmaznia kell",
  noTransactions:'Nincs megjeleníthető tranzakció !',
  noActualWallet:'Nincs kiválasztva tárca !',
  noWallets:'Nincs megjeleníthető tárca !',
  hasNoWallet:'Nem rendelkezik saját tárcával !',
  teacher: "osztályfőnök",
  parent: "szmk tag",
  doLogin: "Ön nincs bejelentkezve !",
  registrationError: "Nem sikerült a regisztráció !",
  loginError: "Nem sikerült a belépés !",
  deleteError: "A törlés sikertelen !",
  updateError: "A Frissítés sikertelen !",
  addError: "A hozzáadás sikertelen !",
  error:'Valami hiba történt !',
};

export const errorMessage = {
  registrationError: translations.registrationError,
  loginError: translations.loginError,
  deleteError: translations.deleteError,
  addError: translations.addError,
  updateError: translations.updateError,
};
export const errors = [
  "addError",
  "updateError",
  "registrationError",
  "loginError",
  "deleteError",
];
export const validationForTransactionModal = Yup.object({
  transaction: Yup.string().required("Szükséges megadni !"),
  amount: Yup.string()
    .required("Szükséges megadni !")
    .matches(/^[-0-9]?[0-9]+$/, {
      message: "Csak pozitív vagy negatív szám lehet, tizedes nélkül !",
      excludeEmptyString: true,
    }),
});

export const validationForRegistration = Yup.object({
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
});
