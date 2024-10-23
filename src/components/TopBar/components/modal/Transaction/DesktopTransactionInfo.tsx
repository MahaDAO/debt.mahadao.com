import { styled } from "@mui/material/styles";
import TxModal from "./TxModal";

interface Iprops {
  openModal: boolean;
  onDismiss: () => void;
}

const DesktopTransactionInfo = (props: Iprops) => {
  const { onDismiss, openModal } = props;

  if (!openModal) return null;

  return (
    <MainDiv>
      <BackgroundAbsolute onClick={() => onDismiss()} />
      <PositionDiv>
        <WalletDiv id={"desktop_tx_modal"}>
          <TxModal openModal={openModal} onDismiss={() => onDismiss()} />
        </WalletDiv>
      </PositionDiv>
    </MainDiv>
  );
};

const BackgroundAbsolute = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  background: "transparent",
  width: "100vw",
  height: "100vh",
  zIndex: 1,
});

const MainDiv = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  background: "transparent",
  width: "100vw",
  height: "100vh",
});

const PositionDiv = styled("div")({
  boxSizing: "border-box",
  margin: "0 auto",
  padding: "0 24px",
  width: "100%",
  position: "relative",
});

const WalletDiv = styled("div")({
  position: "absolute",
  background: "linear-gradient(180deg, #48423e 0%, #373030 100%)",
  borderRadius: "6px",
  right: "60px",
  top: "72px",
  width: "380px",
  zIndex: 10,
  padding: "16px 24px 24px 24px",
  "@media (max-width: 600px)": {
    width: "100vw",
    left: 0,
    right: 0,
  },
});

export default DesktopTransactionInfo;
