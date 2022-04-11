import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";

import { ErrorFallback } from '../components/ErrorFallback';
import { UserProvider } from '../context/UserProvider'
import { Modals } from "./Modals";

export const Providers = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <UserProvider>
          {children}
          <Modals  />
        </UserProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
