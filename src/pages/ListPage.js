import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context";
import { DoLogin } from "../components/DoLogin";

export const ListPage = () => {
  const contextObject = React.useContext(UserContext);
  const navigate = useNavigate();

  const { myWallets, translations, setActualWallet } = contextObject;

  const handleclick = (wallet_id) => {
    setActualWallet(wallet_id);
    navigate("/wallet");
  };

  const wallets = contextObject.loginData
    ? myWallets.map((wallet) => {
        return (
          <div key={wallet.id}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                ID: {wallet.id} Name: {wallet.name}
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleclick(wallet.id);
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

    return (
      <Box sx={style}>
        {wallets.length ? <h1>Tárcák</h1> : <h1>Nincs megjeleníthető tárca</h1>}
        <div className="wallets">{wallets}</div>
      </Box>
    );
};

const style = {
  padding: '50px',
  "& .wallets": {
    display: "flex",
    flexWrap: "wrap",
    gap: '30px'
  },
};
