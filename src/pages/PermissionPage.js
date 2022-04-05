import React from "react";
import { UserContext } from "../context";
import Button from "@mui/material/Button";

import { DoLogin } from "../components/DoLogin";
import { dbCreateWallet } from "../utils/db";

export const PermissionPage = () => {
  const contextObject = React.useContext(UserContext);
  const { userList, handleAddWallet, walletOwnerList } = contextObject;

  const handleClick = (name, userId) => {
    dbCreateWallet(name, userId, contextObject.loginData.token).then((item) => {
      console.log(item);
      handleAddWallet(name, item.data.id);
    });
  };

  const teacherList = userList.map((item) => {
    return (
      <li key={item.id}>
        {item.name}
        {" : " + item.job}
        <Button
          color="primary"
          variant="contained"
          disabled={walletOwnerList.includes(item.name)}
          onClick={() => {
            handleClick(item.name, item.id);
          }}
        >
          {contextObject.translations.permission}
        </Button>
      </li>
    );
  });

  if (contextObject.loginData) {
    return (
      <div>
        <h1>PermissionPage</h1>
        <ul>{teacherList}</ul>
      </div>
    );
  } else {
    return <DoLogin />;
  }
};
