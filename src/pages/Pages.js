import React from "react";
import { Routes, Route } from "react-router-dom";

import { LoginPage } from "./LoginPage";
import { RegistrationPage } from "./RegistrationPage";
import { ListPage } from "./ListPage";
import { PermissionPage } from "./PermissionPage";
import { WalletPage } from "./WalletPage";
import { UserContext } from "../context";
import { NotFound } from "./NotFound";

export const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/permission" element={<PermissionPage />} />
      <Route path="/list" element={<ListPage />} />
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
