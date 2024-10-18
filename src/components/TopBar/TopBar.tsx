"use client";

import React from "react";
import styles from "./styles.module.scss";
import { Typography, useMediaQuery } from "@mui/material";
import IconLoader from "../IconLoader/IconLoader";
import { syne } from "@/app/fonts";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ConnectWalletButton from "./components/ConnectWalletButton/ConnectWalletButton";

const Topbar = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <div className={styles.topbar_container}>
      <div id="showWarning" style={{ display: "none" }}></div>
      {/* {
        isMobile
          ? <MobileTransactionInfo openModal={showTxModal} onDismiss={() => setShowTxModal(false)} />
          : <DesktopTransactionInfo openModal={showTxModal} onDismiss={() => setShowTxModal(false)} />
      } */}
      {/* {isMobile
        ? <MobileProjectRoutes openModal={showProjectModal} onDismiss={() => setShowProjectModal(false)} />
        : <DesktopProjectRoutes openModal={showProjectModal} onDismiss={() => setShowProjectModal(false)} />
      } */}

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
      <div className={styles.styled_topbar}>
        <div className={styles.styled_topbar_inner}>
          <div className={styles.hideon_phone}>
            <div className="single-line-center-between">
              <div className="dialog-class">
                <Typography
                  className={styles.page_heading}
                  style={{ fontSize: "24px" }}
                >
                  PAYBACK POOL
                </Typography>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
