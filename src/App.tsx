import { Provider } from "react-redux";
import React, { useEffect } from 'react';
import { SnackbarProvider } from "notistack";
import { UseWalletProvider } from 'use-wallet';
import { HashRouter as Router } from 'react-router-dom';

// import './App.css';
import './index.css';
import "./customCss/Custom-InputLabel.css"
import Popups from "./components/Popups";

import Navigation from './Navigation';
import TopBar from './components/TopBar';
import ModalsProvider from './context/Modals';
import ProtocolProvider from './context/Provider';
import NoMetamaskNotice from './components/NoMetamaskNotice';

import store from "./state";
import config from './config';
import useCore from "./hooks/useCore";
import Updaters from "./state/Updaters";
// import { isProduction } from "./analytics/Mixpanel";
import { useMediaQuery } from "react-responsive";
// import { isProduction } from "./analytics/Mixpanel";

const Providers = ({ children }: any) => {
  return (
    <Provider store={store}>
      <UseWalletProvider
        connectors={{
          injected: {
            chainId: [config.chainId],
          },
          walletconnect: {
            chainId: config.chainId,
            bridge: 'https://bridge.walletconnect.org',
            pollingInterval: 12000,
            rpc: config.defaultProvider,
          }
        }}>
        <Updaters />
          <ProtocolProvider>
            <AppContent>{children}</AppContent>
          </ProtocolProvider>
      </UseWalletProvider>
    </Provider>
  );
};

export let isMobileGlobal = false;

// @ts-ignore
const AppContent: any = ({ children }) => {
  const core = useCore()
  const isMobile = useMediaQuery({ maxWidth: '600px' });
  isMobileGlobal = isMobile;

  console.log('App core', core)
  useEffect(() => {
    // @ts-ignore
    if (window.ethereum)
      // @ts-ignore
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });
  }, []);

  if (!window.ethereum) {
    console.log('no window ethereum')
    return <NoMetamaskNotice />
  };
  if (!core){
    console.log('no core');
    return <div />
  };

  return (
    <ModalsProvider>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        maxSnack={2}
        autoHideDuration={2500}
      >
        <>
          <Popups />
          {children}
        </>
      </SnackbarProvider>
    </ModalsProvider>
  );
};

const App: React.FC = () => {

  return (
    <Providers>
      <Router>
        <TopBar />
        <Navigation />cl
      </Router>
    </Providers>
  );
};

export default App;

// if (isProduction) console.log = function () { };
