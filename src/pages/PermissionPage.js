import React from "react";
import { UserContext } from "../context";
import Button from "@mui/material/Button";

import { DoLogin } from "../components/DoLogin";
import { PermissionTable } from "../components/PermissionTable";
import { dbCreateWallet, ddAddAccessToWallet, dbRemoveAccessToWallet,dbDeleteWallet } from "../utils/db";

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
      //Ha van wallett-je a teacher nek(igazgató létrehozott neki)
      if (contextObject.loginData.user.wallets) {
        ddAddAccessToWallet(
          contextObject.loginData.user.wallets[0].id,
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
      dbRemoveAccessToWallet( contextObject.loginData.user.wallets[0].id,user.id,token).then(res=>{
        console.log(res)
        handleRemoveAccessTodWallet(user.id)
      })
    }
  };


  if (contextObject.loginData) {
    return (
      <div>
        <h1>PermissionPage</h1>
        <PermissionTable
          userList={userList}
          onCreateWallet={createWallet}
          myWallets={myWallets}
          translations={translations}
          accessToWallet={accessToWallet}
          job={job}
          onDeleteWallet={deleteWallet}
        />
      </div>
    );
  } else {
    return <DoLogin />;
  }
};
