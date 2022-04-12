import React from "react";
import Box from "@mui/material/Box";

import { Providers } from "./context/Providers";
import { Pages } from "./pages/Pages";
import { NavBar } from "./components/NavBar";
import { style}from './App.style';

const App = ()=>{
  return (
      <Providers >
        <Box sx={style}>
          <NavBar />
          <div className="pages">
          <Pages />
          </div>
        </Box>
      </Providers>
  );
}

export default App;

//   vagy hogy a UserContext esetén nyugodtan használhatsz hookot hogy ne kelljen a context-et direktben kiajánlani, 
//   majd ott két lépésben szétszedni az adatait. Amin még megakadt a szemem, 
//   hogy a Modals contactben a UserContext-et használja, ha jól gondolom csak copypaste maradvány.
//    UserProvider elég komplex lett, azt lehet még széttörném a kezelhetőség miatt kisebb részekre, 
//    de talán még nem zavaró.
//     Axios esetén is lehetne talán egyszerűsíteni, string literal + valamilyen refactor ott lehet sokat segítene.