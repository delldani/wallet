import React from "react";
import { ContextWrapper } from "./context/ContextWrapper";
import { Pages } from "./pages/Pages";
import { translations } from "./utils/default";
import { NavBar } from "./components/NavBar";
import Box from "@mui/material/Box";

import { dbList } from "./utils/db";

function App() {
  const [loginData, setLoginData] = React.useState(undefined);
  const [modalType, setModalType] = React.useState(null);
  const [userList, setUserList] = React.useState([]);
  const [walletOwnerList, setWalletOwnerList] = React.useState([]);
  const [createdWallets, setCreatedWallets] = React.useState([]);

  React.useEffect(() => {
    if (contextObject.loginData) {
      //beregisztráltak listálya
      dbList().then((res) => {
        const teachers = res.data.list.filter((item) => item.job === "teacher");
        const parents = res.data.list.filter((item) => item.job === "parent");
        setUserList(
          contextObject.loginData.user.job === "director" ? teachers : parents
        );
      });
      //KInek hozott létre wallet-et az adott user, ez csak az igazgató lehet
      const walletOwnerList = contextObject.loginData.user.wallets.map(
        (item) => {
          return item.name;
        }
      );
      setWalletOwnerList(walletOwnerList);
      setCreatedWallets(contextObject.loginData.user.wallets);
    }
  }, [loginData]);

  //TODO kell ez akettő ???????

  const handleAddWallet = (name, id) => {
    const array = [...walletOwnerList, name];
    setWalletOwnerList(array);

    const newWallets = [...createdWallets, { id, name }];
    setCreatedWallets(newWallets);
  };

  const contextObject = {
    translations: translations,
    theme: "dark",
    loginData,
    token: loginData && loginData.token,
    job: loginData && loginData.user.job,
    modalType,
    userList,
    walletOwnerList,
    createdWallets,
    setModalType,
    setLoginData,
    handleAddWallet,
  };

  return (
    <ContextWrapper contextObject={contextObject}>
      <Box sx={{ height: "100vh" }}>
        <NavBar />
        <Pages />
      </Box>
    </ContextWrapper>
  );
}

export default App;

//  **************LOGINDATA
//
// {
//   "token": "MTAyODQ1MzI3NDAxNDkwODg_MDE2NjI3NTQ5NjczOTQ2MzA3_15618321916111452471131031221315129115105162981458723023013244157816314824083241111",
//   "user": {
//       "id": "MTAyODQ1MzI3NDAxNDkwODg",
//       "name": "igazgato",
//       "job": "director",
//       "wallets": [
//           {
//               "id": "NDEwMDk4NTMwMjMwMjI1MzY",
//               "name": "nagynatalia"
//           }
//       ]
//   }
// }
//
//USERLIST
//
//[
//   {
//     "id": "MzcxNTY5MzE4OTc5MTE0Nw",
//     "name": "nagynatalia",
//     "job": "teacher"
// },
// {
//     "id": "MTQ3MDMyOTY1MDgxMjA0NTY",
//     "name": "KisBela",
//     "job": "teacher"
// }
// ]
//
//  ****************   WALLETOWNERLIST
//
// [
//   "nagynatalia"
// ]
//
//
//  ***************************  createdWallets
//
// [
//   {
//       "id": "NDEwMDk4NTMwMjMwMjI1MzY",
//       "name": "nagynatalia"
//   }
// ]
