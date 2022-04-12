import React from "react";

import { translations } from "../utils/default";
import {
  dbList,
  dbAccessList,
} from "../utils/db";
import { getMyWallet } from '../utils/utils';

const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const [loginData, setLoginData] = React.useState(undefined);
  const [modalType, setModalType] = React.useState({type:'',data:{}});
  const [userList, setUserList] = React.useState([]);
  const [myWallets, setMyWallets] = React.useState([]);
  const [accessToWallet, setAccessToWallet] = React.useState([]);
  const [actualWallet, setActualWallet] = React.useState(null);
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    if (loginData) {
      const { job, wallets, name, id } = loginData.user;
      const { token } = loginData;
      setMyWallets(loginData.user.wallets);

      if (job !== "parent") {
        dbList().then((res) => {
          console.log(res);
          let listForPermission;
          if(job === 'director'){
            listForPermission = res.data.list.filter(
            (item) => item.job === "teacher"
          );
          }else{
            listForPermission = res.data.list.filter(
            (item) => item.job !== "director" && item.id !== id
          );
          }
          setUserList(listForPermission);
        });
       

        if (job === "teacher" && wallets.length) {
          const myWallet = getMyWallet(wallets,name);
          if(myWallet){
             dbAccessList(myWallet.id, token).then((res) => {
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

  const openModal = (type, data) => {
    setModalType({ type, data });
  };

  const logOut = ()=>{
    setLoginData(null);
    setActualWallet(null);
    setTransactions([]);
    setUserList([]);
  };

  const contextObject = {
    translations,
    token: loginData && loginData.token,
    job: loginData && loginData.user.job,
    user: loginData && loginData.user,
    modalType,
    userList,
    myWallets,
    accessToWallet,
    actualWallet,
    transactions,
    setTransactions,
    setActualWallet,
    openModal,
    setLoginData,
    handleAddWallet,
    handleAddAccessTodWallet,
    handleRemoveAccessTodWallet,
    handleDeleteWallet,
    logOut,
  };

  return (
      <UserContext.Provider value={contextObject}>
        {children}
      </UserContext.Provider>
  );
};

export function useUserContext(){
  return React.useContext(UserContext);
}