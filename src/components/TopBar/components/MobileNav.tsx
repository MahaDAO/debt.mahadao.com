import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import MobileWalletInfo from "./modal/WalletInfo/MobileWalletInfo";
import MobileTransactionInfo from "./modal/Transaction/MobileTransactionInfo";
import ConnectWalletButton from "./ConnectWalletButton/ConnectWalletButton";

interface props {
  openMenu: boolean;
  isMainnet: boolean;
  showWarning: boolean;
  onClick: () => void;
  onWalletClick: () => void;
}

const MobileNav = (props: props) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [showWalletInfo, setShowWalletInfo] = useState<boolean>(false);
  const [showWalletOption, setShowWalletOption] = useState<boolean>(false);
  const [showTxModal, setShowTxModal] = useState<boolean>(false);

  return (
    <div>
      <MobileWalletInfo
        modalOpen={showWalletInfo && isMobile}
        onClose={() => setShowWalletInfo(false)}
      />
      <MobileTransactionInfo
        openModal={showTxModal}
        onDismiss={() => setShowTxModal(false)}
      />
      {props.openMenu && <BackgroundAbsolute onClick={() => props.onClick()} />}
      <StyledNav
        style={{
          width: props.openMenu ? "100%" : "0%",
          opacity: props.openMenu ? 1 : 0,
        }}
      >
        <ConnectWalletButton />
      </StyledNav>
    </div>
  );
};

const StyledNav = styled("nav")({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  top: "70px",
  width: "100%",
  left: "0",
  background: "#1e1d1d",
  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
  height: "calc(100vh - 72px)",
  overflowY: "scroll",
  transition: "0.2s ease-out",
  zIndex: 111,
});

const BackgroundAbsolute = styled("div")({
  position: "fixed",
  top: "0",
  left: "0",
  background: "transparent",
  width: "100vw",
  height: "100vh",
  zIndex: 101,
});

export default MobileNav;
