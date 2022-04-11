import React from "react";
import { UserContext } from "../context";
import Box from "@mui/material/Box";

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
    user,
    accessToWallet,
    translations,
    handleAddAccessTodWallet,
    handleRemoveAccessTodWallet,
    handleDeleteWallet
  } = contextObject;

  const createWallet = (name, userId) => {
    if (job === "director") {
      dbCreateWallet(name, userId, token).then(
        (item) => {
          handleAddWallet(name, item.data.id);
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
          handleAddAccessTodWallet(name, item.data.id);
          console.log(item)});
      }
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
      const myWallet = getMyWallet(myWallets,user.name);
      dbRemoveAccessToWallet( myWallet.id,user.id,token).then(res=>{
        console.log(res)
        handleRemoveAccessTodWallet(user.id)
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

const style = {
  height:'100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems:'center',
  flexDirection:'column',
  '& h1':{
    marginBottom:'100px',
  }
}