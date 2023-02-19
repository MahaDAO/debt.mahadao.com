import styled from 'styled-components';
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useWallet } from "use-wallet";
import React, { useEffect, useState, useCallback } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';


import theme from "../../theme";
// import '../../scripts/headerWarning.js'

import IconLoader from "../IconLoader";
import { Mixpanel } from "../../analytics/Mixpanel";

import Button from "../Button";
import TextWrapper from "../TextWrapper";
import MobileNav from './components/MobileNav';
import AccountButton from './components/AccountButton';

import config from "../../config";
import useGaTracker from "../../analytics/useGATracker.js";
import MobileTransactionInfo from "./components/modal/Transaction/MobileTransactionInfo";
import DesktopTransactionInfo from "./components/modal/Transaction/DesktopTransactionInfo";
import DesktopProjectRoutes from './components/modal/ProjectRoutes/DesktopProjectRoute';
import MobileProjectRoutes from './components/modal/ProjectRoutes/MobileProjectRoute';
import AlertSnackbar from '../AlertSnackbar';
import useCore from '../../hooks/useCore';

export let showWarningGlobal = false;


const TopBar: React.FC = () => {
  const location = useLocation();

  const [showTxModal, setShowTxModal] = useState<boolean>(false);
  const [showMobileMenu, toggleMobileMenu] = useState(false);
  const [showWarning, setShowWarning] = React.useState<boolean>(false);
  const [showProjectModal, setShowProjectModal] = useState<boolean>(false);
  const [isHomePage, setIsHomePage] = useState<boolean>(location.pathname === "/");

  useGaTracker();
  const { account, connect } = useWallet();
  const core = useCore();
  const isMobile = useMediaQuery({ maxWidth: '600px' });


  const processNetwork = useCallback(async () => {
    const provider: any = await detectEthereumProvider();

    if (provider) {
      const chainId = Number(await provider.request({ method: 'eth_chainId' }));
      setShowWarning(chainId !== core.config.chainId);
    }
  }, [core]);

  useEffect(() => {
    if (location.pathname === "/") setIsHomePage(true)
    else setIsHomePage(false)
    // Mixpanel.track(`ScreenView:${location.pathname}`);
  }, [location]);

  useEffect(() => {
    const shouldBeDisconnected = localStorage.getItem('disconnectWallet');
    if (!shouldBeDisconnected && !!!account) connect('injected');

    // if (account) {
    //   Mixpanel.identify(account);
    //   Mixpanel.people.set({ walletId: account });
    // }

    processNetwork();
  }, [account, processNetwork, core, connect]);

  // useEffect(() => {
  //   if (error instanceof ChainUnsupportedError || !account) {
  //     setShowWarning(true);
  //   } else {
  //     setShowWarning(false);
  //   }
  // }, [error, account]);

  useEffect(() => {
    showWarningGlobal = showWarning;
  }, [showWarning]);

  return (
    <TopBarContainer>
      {/*Imp Dont Remove*/}
      <div id={"showWarning"} style={{ display: "none" }}>
        {/*{showWarning? "true": "false"}*/}
        {/*{"true"}*/}
      </div>
      {
        isMobile
          ? <MobileTransactionInfo openModal={showTxModal} onDismiss={() => setShowTxModal(false)} />
          : <DesktopTransactionInfo openModal={showTxModal} onDismiss={() => setShowTxModal(false)} />
      }
      {isMobile
        ? <MobileProjectRoutes openModal={showProjectModal} onDismiss={() => setShowProjectModal(false)} />
        : <DesktopProjectRoutes openModal={showProjectModal} onDismiss={() => setShowProjectModal(false)} />
      }
      <AlertSnackbar
        open={showWarning}
        title={'Wrong Network!'}
        subTitle={`You are on the wrong network, switch/add ${config.networkName} Network to use the app.`}
      />
      {!account && <WarningMsg id={"WarningMsg"}>
        <div className={"single-line-center-center mo-single-line-column"}>
          <TextWrapper
            text={`Please make sure you are connected to a wallet on ${config.networkName}.`}
            align={"center"}
          />
          {

            config.networkSetupDocLink && <div
              onClick={() => window.open(config.networkSetupDocLink)}
            >
              <TextWrapper
                text={"Check RPC details here."}
                Fcolor={theme.color.primary[300]}
                className={"m-l-4 pointer"}
                align={"center"}
              />
            </div>
          }
        </div>
      </WarningMsg>}
      <StyledTopBar>
        <StyledTopBarInner>
          <HideonPhone>
            <div className="single-line-center-between">
              <div className="dialog-class">
                <PageHeading style={{ fontSize: '24px' }}>PAYBACK POOL</PageHeading>
              </div>
              <div className="single-line-center-start">
                {
                  !!account &&
                  <IconLoader
                    iconName={'Transaction'}
                    className={'pointer m-r-12'}
                    onClick={() => setShowTxModal(true)}
                  />
                }
                <AccountButton showWarning={showWarning} />
              </div>
            </div>
          </HideonPhone>
          <HideOnBigScreen>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <IconLoader
                  iconName={!showMobileMenu ? 'Menu' : 'Cross'}
                  onClick={() => toggleMobileMenu(!showMobileMenu)}
                  className={'pointer'}
                />
              </div>
              <PageHeading>PAYBACK POOL</PageHeading>
            </div>
          </HideOnBigScreen>
          <HideOnBigScreen>
            <MobileNav
              openMenu={showMobileMenu}
              showWarning={showWarning}
              isMainnet={true}
              onClick={() => toggleMobileMenu(!showMobileMenu)}
              onWalletClick={() => { }}
            />
          </HideOnBigScreen>
        </StyledTopBarInner>
      </StyledTopBar>
    </TopBarContainer>
  );
};

const TopBarContainer = styled.div`
  position: fixed;
  z-index: 100;
  display: flex;
  flex-direction: column;
  width: 100%;
  top: 0;
`;

const HideonPhone = styled.div`
  width: 100%;
  display: block;
  @media (max-width: 600px) {
    display: none;
  } ;
`;

const HideOnBigScreen = styled.div`
  width: 100%;
  display: none;
  @media (max-width: 600px) {
    display: block;
  } ;
`;

const StyledTopBar = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
  background: rgba(0, 0, 0);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
`;

const StyledTopBarInner = styled.div`
  align-content: center;
  display: flex;
  height: 72px;
  justify-content: space-between;
  width: 100%;
  padding: 0 60px;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    padding: 0 16px;
  }
`;

const WarningMsg = styled.div`
  display: block;
  background-color: #2A2827;
  padding: 12px 16px;
`;

const PageHeading = styled.p`
  font-family: Syne;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 29px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: center;
  color: #ffffff;
  margin-bottom: 8px;
`;

export default TopBar;
