import React from "react";
import { UserContext } from "../context";

import { dbList } from "../utils/db";

import { DoLogin } from "../components/DoLogin";

export const ListPage = () => {
  const [list, setList] = React.useState([]);
  const contextObject = React.useContext(UserContext);

  React.useEffect(() => {
    if (contextObject.loginData) {
      dbList().then((res) => setList(res.data.list));
    }
  }, []);

  if (contextObject.loginData) {
    return (
      <div>
        <h1>ListPage</h1>
        {list.map((item) => (
          <li>{item.name}</li>
        ))}
        {/* <button
          onClick={() => {
           ;
          }}
        >
          list
        </button> */}
      </div>
    );
  } else {
    return <DoLogin />;
  }
};
