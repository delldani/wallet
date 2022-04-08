import React from "react";
import { UserContext } from "../context";
import Button from "@mui/material/Button";

import { DoLogin } from "../components/DoLogin";
import { PermissionTable } from "../components/PermissionTable";
import { dbCreateWallet, addAccessToWallet } from "../utils/db";

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
  } = contextObject;

  const handleClick = (name, userId) => {
    if (job === "director") {
      dbCreateWallet(name, userId, contextObject.loginData.token).then(
        (item) => {
          handleAddWallet(name, item.data.id);
        }
      );
    } else if (job === "teacher") {
      //Ha van wallett-je a teacher nek(igazgató létrehozott neki)
      if (contextObject.loginData.user.wallets) {
        addAccessToWallet(
          contextObject.loginData.user.wallets[0].id,
          userId,
          token
        ).then((res) => console.log(res));
      }
    } else {
      //do nothing
    }
  };

  if (contextObject.loginData) {
    return (
      <div>
        <h1>PermissionPage</h1>
        <PermissionTable
          userList={userList}
          handleClick={handleClick}
          myWallets={myWallets}
          translations={translations}
          accessToWallet={accessToWallet}
          job={job}
        />
      </div>
    );
  } else {
    return <DoLogin />;
  }
};
