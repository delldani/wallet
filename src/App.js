import React from "react";
import { ContextWrapper } from "./context/ContextWrapper";
import { Pages } from "./pages/Pages";
import { translations } from "./utils/default";
import { NavBar } from "./components/NavBar";
import Box from "@mui/material/Box";

import {
  dbList,
  dbAccessList,
  dbAddTransaction,
  dbDeleteTransaction,
  dbGetAllTransaction,
  dbUpdateTransaction,
} from "./utils/db";
import { getMyWallet} from './utils/utils'

function App() {
  const [loginData, setLoginData] = React.useState(undefined);
  const [modalType, setModalType] = React.useState({type:'',data:{}});
  const [userList, setUserList] = React.useState([]);
  //igazgató esetén, azok a walletek amiket létrehozott a tanároknak
  //tanár esetén csak egy elem vane benne, a saját wallet-je (csak egy lehet)
  const [myWallets, setMyWallets] = React.useState([]);
  //Csak tanár esetén, kiknek adott hozzáférést a wallet-hoz(csak egy lejhet neki)
  const [accessToWallet, setAccessToWallet] = React.useState([]);
  const [actualWallet, setActualWallet] = React.useState(null);
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    if (contextObject.loginData) {
      const { job, wallets, name, id } = contextObject.loginData.user;
      const { token } = contextObject.loginData;
      if(job === 'parent'){
        setMyWallets(contextObject.loginData.user.wallets);
      }
      if (job !== "parent") {
        //beregisztráltak listálya
        dbList().then((res) => {
          const teachers = res.data.list.filter(
            (item) => item.job === "teacher"
          );
          const teachersAndParents = res.data.list.filter(
            (item) => item.job !== "director" && item.id !== id
          );
          //Az igazgató csak a tanároknak hozhat létre tárcát, a tanárok adhatnak engedélyt tanárnak és szülőnek is
          setUserList(job === "director" ? teachers : teachersAndParents);
        });
        //igazgató esetén, kinek hozott létre wallet-eket
        //tanár esetén melyik wallet-hez van hozzáférése, melyikbe írhat bele stb
        setMyWallets(contextObject.loginData.user.wallets);

        if (job === "teacher" && wallets.length) {
          // kikeresi, hogy a natárnak van e saját wallet-ja, ha nincs return null
          const myWallet = getMyWallet(wallets,name);
          if(myWallet){
            //lekéri csak tanár esetén, hogy kinek adott hozzáférést eddig
             dbAccessList(myWallet.id, token).then((res) => {
            //kiszúri a tanárt a listából
            const array = res.data.access.filter((item) => item.name !== name);
            setAccessToWallet(array);
          });
          }
        }
      }
    }
  }, [loginData]);

  const handleAddWallet = (name, id) => {
    const newWallets = [...myWallets, { id, name }];
    setMyWallets(newWallets);
  };

  const handleDeleteWallet = (id) => {
    const newWallets = myWallets.filter((wallet)=>wallet.id !== id)
    setMyWallets(newWallets);
  };

  const handleAddAccessTodWallet = (name, id) => {
    const newWallets = [...accessToWallet, { id, name }];
    setAccessToWallet(newWallets);
  };

  
  const handleRemoveAccessTodWallet = ( id) => {
    const newWallets = accessToWallet.filter((item)=>item.id !== id)
    setAccessToWallet(newWallets);
  };

  const getTransactionList = () => {
    dbGetAllTransaction(actualWallet, loginData.token).then((res) => {
      console.log(res);
      setTransactions(res.data.transactions);
    });
  };

  const openModal = (type, data) => {
    setModalType({ type, data });
  };

  const contextObject = {
    translations: translations,
    loginData,
    token: loginData && loginData.token,
    job: loginData && loginData.user.job,
    modalType,
    userList,
    myWallets,
    accessToWallet,
    actualWallet,
    transactions,
    setTransactions,
    getTransactionList,
    setActualWallet,
    openModal,
    setLoginData,
    handleAddWallet,
    handleAddAccessTodWallet,
    handleRemoveAccessTodWallet,
    handleDeleteWallet
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
