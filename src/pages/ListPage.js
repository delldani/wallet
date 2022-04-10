import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';

import { UserContext } from "../context";

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
        {!wallets.length && <h1>{translations.noWallets}</h1>}
        <div className="wallets">{wallets}</div>
      </Box>
    );
};

const style = {
  display: "flex",
  justifyContent:'center',
  alignItems:'center',
  height:'100%',
  "& .wallets": {
    display: "flex",
    flexWrap: "wrap",
    gap: '30px'
  },
  '& .card-action':{
    display: "flex",
    justifyContent:'center',
  }
};
