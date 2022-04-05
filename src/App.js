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
    //beregisztráltak listálya
    dbList().then((res) => setUserList(res.data.list));
    if (contextObject.loginData) {
      //KInek hozott létre wallet-et az adott user
      const ownerList = contextObject.loginData.user.wallets.map((item) => {
        return item.name;
      });
      setWalletOwnerList(ownerList);
      setCreatedWallets(contextObject.loginData.user.wallets);
    }
  }, [loginData]);

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
