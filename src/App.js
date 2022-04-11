import React from "react";
import Box from "@mui/material/Box";

import { Providers } from "./context/Providers";
import { Pages } from "./pages/Pages";
import { NavBar } from "./components/NavBar";

const App = ()=>{
  return (
      <Providers >
        <Box sx={style}>
          <div>
          <NavBar />
          </div>
          <div className="pages">
          <Pages />
          </div>
        </Box>
      </Providers>
  );
}

export default App;

const style = {
  height: "100vh",
  display: 'flex',
  flexDirection: 'column',
  '& .pages':{
    flexBasis: '100%',
  }
}