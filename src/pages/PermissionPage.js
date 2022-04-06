import React from "react";
import { UserContext } from "../context";
import Button from "@mui/material/Button";

import { DoLogin } from "../components/DoLogin";
import { dbCreateWallet, addAccessToWallet } from "../utils/db";

export const PermissionPage = () => {
  const contextObject = React.useContext(UserContext);
  const { userList, handleAddWallet, myWallets, job, token } = contextObject;

  const handleClick = (name, userId) => {
    if (job === "director") {
      dbCreateWallet(name, userId, contextObject.loginData.token).then(
        (item) => {
          handleAddWallet(name, item.data.id);
        }
      );
    } else if (job === "teacher") {
      // addAccessToWallet("OTExOTU4OTM5NTMzOTAyNQ", userId, token).then((res) =>
      //   console.log(res)
      // );
    } else {
      //do nothing
    }
  };

  const teacherList = userList.map((item) => {
    return (
      <li key={item.id}>
        {item.name}
        {" : " + item.job}
        <Button
          color="primary"
          variant="contained"
          disabled={myWallets.map((wallet) => wallet.name).includes(item.name)}
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
