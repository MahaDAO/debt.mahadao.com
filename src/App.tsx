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
    <UseWalletProvider
      // chainId={config.chainId}
      connectors={{
        injected: {
          chainId: [config.chainId],
        },
        walletconnect: {
          chainId: config.chainId,
          rpcUrl: config.defaultProvider
        }
      }}
    >
      <Provider store={store}>
        <Updaters />
        <ProtocolProvider>
          <ModalsProvider>
            <SnackbarProvider
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              maxSnack={2}
            >
              <>
                <Popups />
                {children}
              </>
            </SnackbarProvider>
          </ModalsProvider>
        </ProtocolProvider>
      </Provider>
    </UseWalletProvider>
  );
};

export let isMobileGlobal = false;

const App: React.FC = () => {
  const core = useCore()
  const isMobile = useMediaQuery({ maxWidth: '600px' });
  isMobileGlobal = isMobile;

  console.log('App core', core)
  // useEffect(() => {
  //   // @ts-ignore
  //   if (window.ethereum)
  //     // @ts-ignore
  //     window.ethereum.on('chainChanged', (chainId) => {
  //       window.location.reload();
  //     });
  // }, []);

  if (!window.ethereum) {
    console.log('no window ethereum')
    return <NoMetamaskNotice />
  };
  if (!core){
    console.log('no core');
    return <div />
  };

  return (
    <Providers>
      <Router>
        <TopBar />
        <Navigation />
      </Router>
    </Providers>
  );
};

export default App;

// if (isProduction) console.log = function () { };
