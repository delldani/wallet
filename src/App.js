import React from 'react';
import { ContextWrapper } from "./context/ContextWrapper";
import { Pages } from "./pages/Pages";
import { translations } from "./utils/default";
import { NavBar } from "./components/NavBar";
import Box from "@mui/material/Box";

function App() {
  const [loginData,setLoginData] = React.useState(undefined)
  const [modalType,setModalType] = React.useState(null);

  const contextObject = {
    translations: translations,
    theme: "dark",
    loginData,
    modalType,
    setModalType,
    setLoginData,
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
