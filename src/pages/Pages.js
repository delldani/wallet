import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import { LoginPage} from './LoginPage';
import { RegistrationPage} from './RegistrationPage';
import { ListPage} from './ListPage';
import { PermissionPage} from './PermissionPage';
import { WalletPage} from './WalletPage';

export const Pages = ()=>{

    return(
       <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/permission" element={<PermissionPage />} />
      </Routes>
    );
};