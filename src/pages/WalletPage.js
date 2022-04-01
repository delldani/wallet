import React from "react";
import { UserContext } from "../components/ContextWrapper";

import { DoLogin } from "../components/DoLogin";
import { DialogTransistion } from "../components/DialogTransaction";

export const WalletPage = () => {
  const contextObject = React.useContext(UserContext);
  const [open, setOpen] = React.useState(false);

  if (contextObject.token === "") {
    return (
      <div>
        <button onClick={() => setOpen(true)}>dialog</button>
        <DoLogin />;
        <DialogTransistion open={open} setOpen={setOpen} />
      </div>
    );
  } else {
    return <h1>WalletPage</h1>;
  }
};
