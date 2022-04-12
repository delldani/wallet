import React from "react";
import { useUserContext } from "../context";
import Box from "@mui/material/Box";

import { PermissionTable } from "../components/PermissionTable";
import { dbCreateWallet, ddAddAccessToWallet, dbRemoveAccessToWallet,dbDeleteWallet } from "../utils/db";
import { getMyWallet}from '../utils/utils'
import { style } from './PermissionPage.style';

export const PermissionPage = () => {
  const {
    userList,
    myWallets,
    job,
    token,
    user,
    accessToWallet,
    translations,
    setMyWallets,
    setAccessToWallet,
  } = useUserContext();

  const createWallet = (name, userId) => {
    if (job === "director") {
      dbCreateWallet(name, userId, token).then(
        (item) => {
          const newWallets = [...myWallets, { id:item.data.id, name }];
          setMyWallets(newWallets);
        }
      );
    } else if (job === "teacher") {
      //Ha van wallett-je a teacher nek(igazgató létrehozott-e neki)
      const myWallet = getMyWallet(myWallets,user.name);
      console.log(myWallet);
      if (myWallet) {
        ddAddAccessToWallet(
          myWallet.id,
          userId,
          token
        ).then((item) => {
          const newWallets = [...accessToWallet, { id : item.data.id, name }];
          setAccessToWallet(newWallets);
          console.log(item)});
      }
    } 
  };

  const deleteWallet =(userToDelete)=>{
    if (job === "director"){
     const userWallet = myWallets.filter((wallet)=>wallet.name === userToDelete.name);
     const id = userWallet[0].id;
      dbDeleteWallet(id,token).then(res=>{
        console.log(res);
        const newWallets = myWallets.filter((wallet)=>wallet.id !== id)
        setMyWallets(newWallets);
      })
      
    }else if (job === "teacher") {
      const myWallet = getMyWallet(myWallets,user.name);
      dbRemoveAccessToWallet( myWallet.id,userToDelete.id,token).then(res=>{
        console.log(res)
        const newWallets = accessToWallet.filter((item)=>item.id !== userToDelete.id)
        setAccessToWallet(newWallets);
      })
    }
  };

  const canGivePermission = job === 'teacher' ? !!getMyWallet(myWallets,user.name) : true;

  let text = '';
  if(job === 'director' ){
    text = translations.permissionDirector
  }else{
    text = canGivePermission ? translations.permissionTeacher : translations.hasNoWallet;
  }
    return (
      <Box sx={style}>
        <h1>{text}</h1>
       {canGivePermission &&
        <PermissionTable
          userList={userList}
          onCreateWallet={createWallet}
          myWallets={myWallets}
          translations={translations}
          accessToWallet={accessToWallet}
          job={job}
          onDeleteWallet={deleteWallet}
        />}
      </Box>
    );
};
