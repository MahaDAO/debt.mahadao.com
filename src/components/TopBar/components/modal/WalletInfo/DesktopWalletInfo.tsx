import styled from "styled-components";

import WalletInfo from "./index";

interface DesktopWalletInfoProps {
  modalOpen: boolean;
  onClose: () => void;
}

const DesktopWalletInfo = (props: DesktopWalletInfoProps) => {
  const {
    modalOpen,
  } = props;

  if (!modalOpen) {
    return null
  }

  return (
    <MainDiv>
      <PositionDiv>
        <WalletDiv>
          <WalletInfo />
        </WalletDiv>
      </PositionDiv>
    </MainDiv>
  );
}

const MainDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  width: 100vw;
  height: 100vh;
`;

const PositionDiv = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 60px;
  width: 100%;
  position: relative;
`;

const WalletDiv = styled.div`
  position: absolute;
  background: linear-gradient(180deg, #48423e 0%, #373030 100%);
  border-radius: 6px;
  right: 60px;
  top: 72px;
  width: 380px;
  z-index: 111;
  transition: 1s ease-in-out;
  padding: 24px;
`;

export default DesktopWalletInfo;
