import React from "react";
import { Routes, Route } from "react-router-dom";

import { LoginPage } from "./LoginPage";
import { RegistrationPage } from "./RegistrationPage";
import { ListPage } from "./ListPage";
import { PermissionPage } from "./PermissionPage";
import { WalletPage } from "./WalletPage";
import { NotFound } from "./NotFound";
import { Protected } from '../components/Protected';

export const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/permission" element={<Protected  page={PermissionPage}/>} />
      <Route path="/list" element={<Protected  page={ListPage}/>} />
      <Route path="/wallet" element={<Protected  page={WalletPage}/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
