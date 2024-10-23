"use client";

import React, { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import IconLoader from "../IconLoader/IconLoader";
import ConnectWalletButton from "./components/ConnectWalletButton/ConnectWalletButton";
import MobileNav from "./components/MobileNav";
import useGaTracker from "@/analytics/useGATracker.js";

const Topbar = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [showTxModal, setShowTxModal] = useState<boolean>(false);
  const [showMobileMenu, toggleMobileMenu] = useState(false);
  const [showWarning, setShowWarning] = React.useState<boolean>(false);

  useGaTracker();

  return (
    <TopBarContainer>
      <div id="showWarning" style={{ display: "none" }}></div>
      {/* {isMobile ? (
        <MobileTransactionInfo
          openModal={showTxModal}
          onDismiss={() => setShowTxModal(false)}
        />
      ) : (
        <DesktopTransactionInfo
          openModal={showTxModal}
          onDismiss={() => setShowTxModal(false)}
        />
      )}
      {isMobile ? (
        <MobileProjectRoutes
          openModal={showProjectModal}
          onDismiss={() => setShowProjectModal(false)}
        />
      ) : (
        <DesktopProjectRoutes
          openModal={showProjectModal}
          onDismiss={() => setShowProjectModal(false)}
        />
      )} */}

      {/* <AlertSnackbar
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
      </WarningMsg>} */}
      <StyledTopBar>
        <StyledTopBarInner>
          <HideonPhone>
            <div className="single-line-center-between">
              <div className="dialog-class">
                <PageHeading style={{ fontSize: "24px" }}>
                  PAYBACK POOL
                </PageHeading>
              </div>
              <div className="single-line-center-start">
                {/* <ConnectButton /> */}
                <ConnectWalletButton />
                {/* {
                  !!account &&
                  <IconLoader
                    iconName={'Transaction'}
                    className={'pointer m-r-12'}
                    onClick={() => setShowTxModal(true)}
                  />
                } */}
                {/* <AccountButton showWarning={showWarning} /> */}
              </div>
            </div>
          </HideonPhone>
          <HideOnBigScreen>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <IconLoader
                  iconName={!showMobileMenu ? "Menu" : "Cross"}
                  onClick={() => toggleMobileMenu(!showMobileMenu)}
                  className="pointer"
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
              onWalletClick={() => {}}
            />
          </HideOnBigScreen>
        </StyledTopBarInner>
      </StyledTopBar>
    </TopBarContainer>
  );
};

const TopBarContainer = styled("div")({
  position: "fixed",
  zIndex: 100,
  display: "flex",
  flexDirection: "column",
  width: "100%",
  top: 0,
});

const HideonPhone = styled("div")({
  width: "100%",
  display: "block",
  "@media (max-width: 600px)": {
    display: "none",
  },
});

const HideOnBigScreen = styled("div")({
  width: "100%",
  display: "none",
  "@media (max-width: 600px)": {
    display: "block",
  },
});

const StyledTopBar = styled("div")({
  boxSizing: "border-box",
  margin: "0 auto",
  width: "100%",
  background: "rgb(0,0,0)",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  backdropFilter: "blur(20px)",
});

const StyledTopBarInner = styled("div")({
  alignContent: "center",
  display: "flex",
  height: "72px",
  justifyContent: "space-between",
  width: "100%",
  padding: "0 60px",
  flexWrap: "wrap",

  "@media (max-width: 600px)": {
    padding: "0 16px",
  },
});

const WarningMsg = styled("div")({
  display: "block",
  backgroundColor: "#2a2827",
  padding: "12px 16px",
});

const PageHeading = styled("p")({
  fontFamily: "var(--font-syne)",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "20px",
  lineHeight: "29px",
  letterSpacing: "0.08rem",
  textTransform: "uppercase",
  textAlign: "center",
  color: "#ffffff",
  marginBottom: "8px",
});

export default Topbar;
