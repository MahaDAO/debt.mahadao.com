import Button from "@/components/Button";
import IconLoader from "@/components/IconLoader/IconLoader";
import { truncateAddress } from "@/utils";
import { Menu } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState } from "react";
import { Address } from "viem";
import { useAccount, useDisconnect } from "wagmi";
import DesktopWalletInfo from "../modal/WalletInfo/DesktopWalletInfo";

const ConnectWalletButton = () => {
  const { disconnect } = useDisconnect();
  const account = useAccount();
  const [showWalletInfo, setShowWalletInfo] = useState(false);

  return (
    <div>
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
      {showWalletInfo && (
        <DesktopWalletInfo
          modalOpen={showWalletInfo}
          onClose={() => {
            setShowWalletInfo(false);
          }}
        />
      )}
    </div>
  );
};

export default ConnectWalletButton;
