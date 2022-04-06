import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { UserContext } from "../context";
import { dbGetAllTransaction } from "../utils/db";
import { DoLogin } from "../components/DoLogin";

export const ListPage = () => {
  const contextObject = React.useContext(UserContext);

  const { myWallets, translations, token } = contextObject;

  const handleclick = (wallet_id) => {
    dbGetAllTransaction(wallet_id, token).then((res) => {
      console.log(res);
    });
  };

  const wallets = contextObject.loginData
    ? myWallets.map((item) => {
        return (
          <div key={item.id}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                ID: {item.id} Name: {item.name}
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleclick(item.id);
                  }}
                >
                  {translations.open}
                </Button>
              </CardActions>
            </Card>
          </div>
        );
      })
    : null;

  if (contextObject.loginData) {
    return (
      <Box sx={style}>
        {wallets ? <h1>Tárcák</h1> : <h1>Nincs megjeleníthető tárca</h1>}
        <div className="wallets">{wallets}</div>
      </Box>
    );
  } else {
    return <DoLogin />;
  }
};

const style = {
  "& .wallets": {
    display: "flex",
    flexWrap: "wrap",
  },
};
