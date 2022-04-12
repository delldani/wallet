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

