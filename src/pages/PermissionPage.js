import React from "react";
import { useUserContext } from "../context";
import Box from "@mui/material/Box";

import { PermissionTable } from "../components/PermissionTable";
import { apiCall } from "../utils/db";
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
      apiCall('put','wallet', { name:name,id:userId},token)
      .then(
        (item) => {
          const newWallets = [...myWallets, { id:item.data.id, name }];
          setMyWallets(newWallets);
        }
      );
    } else if (job === "teacher") {
      //Ha van wallett-je a teacher nek(igazgató létrehozott-e neki)
      const myWallet = getMyWallet(myWallets,user.name);
      if (myWallet) {
        apiCall('post',"wallet/" + myWallet.id + "/grant_access",{ wallet_id:myWallet.id,user_id:userId},token)
        .then((item) => {
          const newWallets = [...accessToWallet, { id : userId, name }];
          setAccessToWallet(newWallets);
          console.log(item)});
      }
    } 
  };

  const deleteWallet =(userToDelete)=>{
    if (job === "director"){
     const userWallet = myWallets.filter((wallet)=>wallet.name === userToDelete.name);
     const id = userWallet[0].id;
      apiCall('delete','wallet/' + id,null,token )
      .then(res=>{
        console.log(res);
        const newWallets = myWallets.filter((wallet)=>wallet.id !== id)
        setMyWallets(newWallets);
      }).catch(err=>console.log(err));
      
    }else if (job === "teacher") {
      const myWallet = getMyWallet(myWallets,user.name);
      apiCall('post', "wallet/" + myWallet.id + "/remove_access",{wallet_id:myWallet.id,user_id:userToDelete.id},token)
      .then(res=>{
        console.log(res)
        const newWallets = accessToWallet.filter((item)=>item.id !== userToDelete.id);
        setAccessToWallet(newWallets);
      }).catch(err=>console.log(err));
    }
  };

  const canGivePermission = job === 'teacher' ? !!getMyWallet(myWallets,user.name) : true;

  let text = '';
  if(job === 'director' ){
    text = translations.permissionDirector;
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
