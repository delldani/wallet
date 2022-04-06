import axios from "axios";

// const URL = "https://wallet-cloudflare.gordongecco.workers.dev/";
const URL = "http://127.0.0.1:8787/";

const dbRegistration = (username, password, radioGroup) => {
  return axios.post(URL + "reg", {
    name: username,
    password: password,
    job: radioGroup,
  });
};

/**
 *
 * @param {string} username
 * @param {string} password
 * @returns
 */
const dbLogin = (username, password) => {
  return axios.post(URL + "login", {
    name: username,
    password: password,
  });
};

//**az összes személy listálya akik beregisztráltak */
export const dbList = () => {
  return axios.get(URL + "list", {});
};

export const dbCreateWallet = (name, id, token) => {
  return axios.put(
    URL + "wallet",
    {
      name,
      id,
      description: "új wallet",
      extra: {},
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

/**
 * Hozzáférést ad egy wallet-hoz egy user-nek
 * @param {string} wallet_id
 * @param {string} user_id
 * @param {string} token
 * @returns
 */
export const addAccessToWallet = (wallet_id, user_id, token) => {
  return axios.post(
    URL + "wallet/" + wallet_id + "/grant_access",
    {
      wallet_id,
      user_id,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

/**
 * Lekéri egy wallet adatait
 * @param {string} wallet_id
 * @param {string} token
 * @returns
 */
export const dbAccessList = (wallet_id, token) => {
  console.log(token);
  return axios.get(URL + "wallet/" + wallet_id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const handleRegistration = (
  values,
  setLoginData,
  navigate,
  setModalType
) => {
  const { radioGroup, username, password1 } = values;
  dbRegistration(username, password1, radioGroup)
    .then((response) => {
      //ha sikerült a regisztráció akkor beloginol
      dbLogin(username, password1)
        .then((response) => {
          setLoginData(response.data);
          radioGroup === "teacher" ? navigate("/list") : navigate("/wallet");
        })
        .catch((error) => console.log(error));
    })
    .catch(function (error) {
      console.log(error);
      setModalType("registrationError");
    });
};

export const handleLogin = (values, setLoginData, navigate, setModalType) => {
  const { username, password } = values;

  dbLogin(username, password)
    .then((response) => {
      setLoginData(response.data);
      response.data.user.job === "teacher" ||
      response.data.user.job === "director"
        ? navigate("/list")
        : navigate("/wallet");
    })
    .catch((error) => {
      setModalType("loginError");
      console.log(error);
    });
};

// axios
// .post(
//   "https://wallet-cloudflare.gordongecco.workers.dev/user/search",
//   {
//     name: "dani2",
//     // password: "dani2",
//   },
//   {
//     headers: {
//       Authorization:
//         "Bearer " +
//         "NzEwOTYwMjQ3MTc5MTA5_MTY4MDQ1NDgyNTA4OTAyMTc_1857815512510722617816717181253223200173197721671581620078146639175421261382435245",
//     },
//   }
// )
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });
