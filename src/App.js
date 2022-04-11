import React from "react";
import {ErrorBoundary} from 'react-error-boundary';

import { ErrorFallback } from './components/ErrorFallback';
import { WalletMain } from './components/WalletMain';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
     <WalletMain/>
    </ErrorBoundary>
  );
}

export default App;