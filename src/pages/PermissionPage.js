import React from "react";
import { UserContext } from "../context";
import Button from "@mui/material/Button";

import { DoLogin } from "../components/DoLogin";
import { dbList, dbCreateWallet } from "../utils/db";

export const PermissionPage = () => {
  const contextObject = React.useContext(UserContext);
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    if (contextObject.loginData) {
      dbList().then((res) => setList(res.data.list));
    }
  }, []);
  const handleClick = (name, id) => {
    dbCreateWallet(name, id, contextObject.loginData.token).then((item) =>
      console.log(item)
    );
  };

  if (contextObject.loginData) {
    return (
      <div>
        <h1>PermissionPage</h1>
        <ul>
          {list.map((item) => (
            <li key={item.id}>
              {item.name}
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  handleClick(item.name, item.id);
                }}
              >
                {contextObject.translations.permission}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <DoLogin />;
  }
};
