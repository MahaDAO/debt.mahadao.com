import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { IconButton } from "@mui/material";
import IconLoader from "@/components/IconLoader/IconLoader";
import SingleTransaction from "./SingleTransaction";

const mockTransactions = [
  {
    hash: "0x23712837128937128937",
    addedTime: new Date().getMilliseconds(),
    from: "0x2382938298",
  },
  {
    hash: "0x23712837128937128937",
    addedTime: new Date().getMilliseconds(),
    from: "0x2382938298",
  },
  {
    hash: "0x23712837128937128937",
    addedTime: new Date().getMilliseconds(),
    from: "0x2382938298",
  },
];

interface props {
  openModal: boolean;
  onDismiss: () => void;
}

const TxModal: React.FC<props> = ({ onDismiss, openModal }) => {
  const [openConfirmationModal, setOpenConfirmationModal] =
    useState<boolean>(false);

  const handleClose = () => {
    onDismiss();
  };

  if (!openModal) return null;

  return (
    <div>
      <ConfirmationModal
        modalOpen={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
        modalTitle="Clear all transaction"
        title="Are you sure you want to clear all transactions?"
        yesText="Yes"
        noText="No"
        yesAction={() => setOpenConfirmationModal(false)}
        noAction={() => setOpenConfirmationModal(false)}
      />
      <ModalHeader>
        <Title>Recent Transactions</Title>
        <RightSubHeader>
          <ClearAll onClick={() => setOpenConfirmationModal(true)}>
            Clear All
          </ClearAll>
          <CrossIcon>
            <IconButton aria-label="close" onClick={() => handleClose()}>
              <IconLoader iconName="Cross" width={24} />
            </IconButton>
          </CrossIcon>
        </RightSubHeader>
      </ModalHeader>
      <ModalBody>
        {false && (
          <div>
            <NoTransaction>You haven't done any transaction yet.</NoTransaction>
            <CallToAction href={"/farming"} onClick={() => handleClose()}>
              Farm and earn rewards
            </CallToAction>
          </div>
        )}
        <StyledTransactionList>
          {mockTransactions.map((tx) => (
            <SingleTransaction key={tx.hash} tx={tx} />
          ))}
        </StyledTransactionList>
      </ModalBody>
    </div>
  );
};

const ModalHeader = styled("div")({
  padding: "0 0 12px 0",
  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Title = styled("p")({
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "24px",
  color: "#ffffff",
  marginBottom: "0",
});

const RightSubHeader = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const ClearAll = styled("p")({
  fontStyle: "normal",
  fontWeight: 300,
  fontSize: "12px",
  lineHeight: "130%",
  color: "rgba(255, 255, 255, 0.32)",
  cursor: "pointer",
  marginBottom: "0",
});

const CrossIcon = styled("div")({
  marginRight: "-12px",
});

const ModalBody = styled("div")({
  padding: "24px 0 0 0",
  overflowY: "scroll",
  maxHeight: "calc(360px - 72px)",
  "@media (max-width: 600px)": { maxHeight: "calc(100vh - 114px)" },
});

const NoTransaction = styled("p")({
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "16px",
  lineHeight: "150%",
  color: "rgba(255, 255, 255, 0.88)",
  marginBottom: "8px",
  padding: "0 12px",
  textAlign: "center",
});

const CallToAction = styled(Link)({
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "16px",
  lineHeight: "150%",
  color: "#f7653b",
  textAlign: "center",
  width: "100%",
  display: "block",
  "&:hover": { color: "#f7653b" },
});

const StyledTransactionList = styled("div")({
  display: "flex",
  flexDirection: "column",
});

export default TxModal;
