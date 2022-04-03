import React from "react";
import { UserContext } from "../context";

import { DoLogin } from "../components/DoLogin";
import { DialogTransistion } from "../components/DialogTransaction";

export const WalletPage = () => {
  const contextObject = React.useContext(UserContext);
  const [open, setOpen] = React.useState(false);

  if (contextObject.loginData) {
    return <h1>WalletPage</h1>;
  } else {
    return (
      <div>
        <button onClick={() => setOpen(true)}>dialog</button>
        <DoLogin />;
        <DialogTransistion open={open} setOpen={setOpen} />
      </div>
        );
  }
};
