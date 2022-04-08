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
} from "./utils/db";

function App() {
  const [loginData, setLoginData] = React.useState(undefined);
  const [modalType, setModalType] = React.useState(null);
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
        //KInek hozott létre wallet-et az adott user, ez csak az igazgató lehet
        //vagy kinek adott hoozáférést,tanár esetében

        setMyWallets(contextObject.loginData.user.wallets);

        //lekéri csak tanár esetén, hogy kinek adott hozzáférést eddig
        if (job === "teacher" && wallets) {
          // mivel 1 tanárnak csak 1 wallet lehet
          dbAccessList(wallets[0].id, token).then((res) => {
            //kiszúri a tanárt a listából
            const array = res.data.access.filter((item) => item.name !== name);
            setAccessToWallet(array);
          });
        }
      }
    }
  }, [loginData]);

  const handleAddWallet = (name, id) => {
    const newWallets = [...myWallets, { id, name }];
    setMyWallets(newWallets);
  };

  const addTransaction = (title, amount) => {
    dbAddTransaction(actualWallet, title, amount, loginData.token).then(
      (res) => {
        const newTransactions = [...transactions, res.data];
        console.log(newTransactions);

        setTransactions(newTransactions);
      }
    );
  };
  const deleteTransaction = (id) => {
    dbDeleteTransaction(id, loginData.token).then((res) => {
      setTransactions(transactions.filter((item) => item.id !== id));
      console.log(res);
    });
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
    getTransactionList,
    deleteTransaction,
    addTransaction,
    setActualWallet,
    openModal,
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
//
// Wallet adatok
// {
//   "data": {
//       "id": "NzYyNzg1MTg1NTA5MDk3Mg",
//       "name": "nagynatalia",
//       "description": "új wallet",
//       "access": [
//           {
//               "id": "OTY4NDkwNzkwNzUyNzEzMg",
//               "name": "nagynatalia"
//           },
//           {
//               "id": "NTIxMDQ2NTEwOTUyODg3NQ",
//               "name": "TakacsAndor"
//           }
//       ],
//       "extra": {},
//       "balance": 0,
//       "created_by": {
//           "id": "MjI4OTY2MzEyNzY3NzA4NA",
//           "name": "igazgato"
//       },
//       "created_at": "2022-04-06T09:04:06.799Z"
//   },
//Transaction
//
// id: string;
// amount: number;
// title: string;
// extra: any;
// wallet_id: any;
// created_by: {
//     id: any;
//     name: any;
// };
// created_at: string;
