import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';

import { useUserContext } from "../context";
import { style } from './ListPage.style';

export const ListPage = () => {
  const contextObject = useUserContext();
  const navigate = useNavigate();

  const { myWallets, translations, setActualWallet,token} = contextObject;

  const handleclick = (wallet) => {
    setActualWallet(wallet);
    navigate("/wallet");
  };

  const wallets = token
    ? myWallets.map((wallet) => {
        return (
          <div key={wallet.id}>
            <Card >
              <CardContent>
              <Typography variant="h5" component="div">
                {translations.owner}: {wallet.name}
              </Typography>
              <Typography variant="h7" component="div">
                ID: {wallet.id} 
                </Typography>
              </CardContent>
              <CardActions className="card-action">
                <Button
                  variant="contained"
                  onClick={() => {
                    handleclick(wallet);
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
        {!wallets.length ? <h1>{translations.noWallets}</h1> : <h1>{translations.listPage}</h1>}
        <div className="wallets">{wallets}</div>
      </Box>
    );
};
