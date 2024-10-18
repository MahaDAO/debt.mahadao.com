import React from "react";
import { styled } from "@mui/material/styles";
import WalletInfo from ".";

interface DesktopWalletInfoProps {
  modalOpen: boolean;
  onClose: () => void;
}

const DesktopWalletInfo = (props: DesktopWalletInfoProps) => {
  const { modalOpen, onClose } = props;

  if (!modalOpen) {
    return null;
  }

  return (
    <MainDiv>
      <PositionDiv>
        <WalletDiv>
          <WalletInfo onClose={onClose} />
        </WalletDiv>
      </PositionDiv>
    </MainDiv>
  );
};

const MainDiv = styled("div")(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  background: "transparent",
  width: "100vw",
  height: "100vh",
}));

const PositionDiv = styled("div")(() => ({
  boxSizing: "border-box",
  margin: "0 auto",
  padding: "0 60px",
  width: "100%",
  position: "relative",
}));

const WalletDiv = styled("div")(() => ({
  position: "absolute",
  background: "linear-gradient(180deg, #48423e 0%, #373030 100%)",
  borderRadius: "6px",
  right: "60px",
  top: "72px",
  width: "380px",
  zIndex: 111,
  transition: "1s ease-in-out",
  padding: "24px",
}));

export default DesktopWalletInfo;
