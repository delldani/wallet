import axios from "axios";

const URL = "https://wallet-cloudflare.gordongecco.workers.dev/";
// const URL = "http://127.0.0.1:8787/";

export const dbRegistration = (username, password, radioGroup) => {
  return axios.post(URL + "reg", {
    name: username,
    password: password,
    job: radioGroup,
  });
};

export const dbLogin = (username, password) => {
  return axios.post(URL + "login", {
    name: username,
    password: password,
  });
};

//az összes személy listálya akik beregisztráltak 
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


export const dbDeleteWallet = ( id, token) => {
  return axios.delete(
    URL + "wallet/" + id ,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const ddAddAccessToWallet = (wallet_id, user_id, token) => {
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

export const dbRemoveAccessToWallet = (wallet_id, user_id, token) => {
  return axios.post(
    URL + "wallet/" + wallet_id + "/remove_access",
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

export const dbAccessList = (wallet_id, token) => {
  return axios.get(URL + "wallet/" + wallet_id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const dbAddTransaction = (wallet_id, title, amount, token) => {
  return axios.put(
    URL + "transactions",
    {
      wallet_id,
      title,
      amount,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const dbDeleteTransaction = (id, token) => {
  return axios.delete(URL + "transaction/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const dbGetAllTransaction = (wallet_id, token) => {
  return axios.post(
    URL + "transactions",
    {
      wallet_id,
      limit: "1000",
      cursor: "",
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const dbUpdateTransaction = (id, title, amount, token) => {
  return axios.patch(
    URL + "transaction/" + id,
    {
      title,
      amount,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
