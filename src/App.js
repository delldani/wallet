import React from 'react';
import { ContextWrapper } from "./components/ContextWrapper";
import { Pages } from "./pages/Pages";
import { translations } from "./utils/default";
import { NavBar } from "./components/NavBar";
import Box from "@mui/material/Box";

function App() {
  const [loginData,setLoginData] = React.useState(undefined)

  const handleLogin = (data)=>{
    setLoginData(data)
  };

  const contextObject = {
    translations: translations,
    theme: "dark",
    loginData,
    handleLogin,
  };

  
  return (
    <ContextWrapper contextObject={contextObject}>
      <Box sx={{ height: "100vh" }}>
        <NavBar />
        <Pages />
      </Box>
    </ContextWrapper>
  );
}

export default App;
