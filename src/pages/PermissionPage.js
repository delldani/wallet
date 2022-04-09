import React from "react";
import { UserContext } from "../context";
import Button from "@mui/material/Button";

import { DoLogin } from "../components/DoLogin";
import { PermissionTable } from "../components/PermissionTable";
import { dbCreateWallet, ddAddAccessToWallet, dbRemoveAccessToWallet,dbDeleteWallet } from "../utils/db";
import { getMyWallet}from '../utils/utils'

export const PermissionPage = () => {
  const contextObject = React.useContext(UserContext);
  const {
    userList,
    handleAddWallet,
    myWallets,
    job,
    token,
    accessToWallet,
    translations,
    handleAddAccessTodWallet,
    handleRemoveAccessTodWallet,
    handleDeleteWallet
  } = contextObject;

  const createWallet = (name, userId) => {
    if (job === "director") {
      dbCreateWallet(name, userId, contextObject.loginData.token).then(
        (item) => {
          handleAddWallet(name, item.data.id);
        }
      );
    } else if (job === "teacher") {
      //Ha van wallett-je a teacher nek(igazgató létrehozott-e neki)
      const myWallet = getMyWallet(contextObject.loginData.user.wallets,contextObject.loginData.user.name);
      console.log(myWallet);
      if (myWallet) {
        ddAddAccessToWallet(
          myWallet.id,
          userId,
          token
        ).then((item) => {
          handleAddAccessTodWallet(name, item.data.id);
          console.log(item)});
      }
    } else {
      //do nothing
    }
  };

  const deleteWallet =(user)=>{
    if (job === "director"){
     const userWallet = myWallets.filter((wallet)=>wallet.name === user.name);
      dbDeleteWallet(userWallet[0].id,token).then(res=>{
        console.log(res);
        handleDeleteWallet(userWallet[0].id);
      })
      
    }else if (job === "teacher") {
      const myWallet = getMyWallet(contextObject.loginData.user.wallets,contextObject.loginData.user.name);
      dbRemoveAccessToWallet( myWallet.id,user.id,token).then(res=>{
        console.log(res)
        handleRemoveAccessTodWallet(user.id)
      })
    }
  };

  const hasMyWallet = job === 'teacher' ? !!getMyWallet(contextObject.loginData.user.wallets,contextObject.loginData.user.name) : true;

  if (contextObject.loginData) {
    return (
      <div>
        <h1>PermissionPage</h1>
       {hasMyWallet &&
        <PermissionTable
          userList={userList}
          onCreateWallet={createWallet}
          myWallets={myWallets}
          translations={translations}
          accessToWallet={accessToWallet}
          job={job}
          onDeleteWallet={deleteWallet}
        />}
      </div>
    );
  } else {
    return <DoLogin />;
  }
};
