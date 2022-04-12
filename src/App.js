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


//   hogy a Modals contactben a UserContext-et használja, ha jól gondolom csak copypaste maradvány.
//    UserProvider elég komplex lett, azt lehet még széttörném a kezelhetőség miatt kisebb részekre, 
//    de talán még nem zavaró.
//     Axios esetén is lehetne talán egyszerűsíteni, string literal + valamilyen refactor ott lehet sokat segítene.