import Button from "@/components/Button";
import IconLoader from "@/components/IconLoader/IconLoader";
import { truncateAddress } from "@/utils";
import { useMediaQuery } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";
import DesktopWalletInfo from "../modal/WalletInfo/DesktopWalletInfo";
import { styled } from "@mui/material/styles";

const ConnectWalletButton = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const account = useAccount();
  const [showWalletInfo, setShowWalletInfo] = useState(false);

  return (
    <div
      style={{
        marginTop: isMobile ? "20px" : "0px",
        width: isMobile ? "90%" : "auto",
      }}
    >
      {showWalletInfo && (
        <BackgroundAbsolute onClick={() => setShowWalletInfo(false)} />
      )}

      <ConnectButton.Custom>
        {({ chain, openChainModal, openConnectModal }) => {
          if (!account?.isConnected)
            return (
              <Button onClick={() => openConnectModal()} size={"sm"}>
                Connect Wallet
              </Button>
            );

          if (chain?.unsupported)
            return (
              <Button onClick={() => openChainModal()} size="sm">
                Switch Network
              </Button>
            );

          return (
            <Button
              onClick={() => setShowWalletInfo(!showWalletInfo)}
              variant="transparent"
              text={truncateAddress(account.address as Address)}
            >
              <IconLoader
                iconName={"Wallet"}
                width={24}
                height={24}
                className="m-r-8"
              />
            </Button>
          );
        }}
      </ConnectButton.Custom>
      <DesktopWalletInfo
        modalOpen={showWalletInfo}
        onClose={() => {
          setShowWalletInfo(false);
        }}
      />
    </div>
  );
};

const BackgroundAbsolute = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  background: "transparent",
  width: "100vw",
  height: "100vh",
  zIndex: 101,
});

export default ConnectWalletButton;
