import Modal from "@/components/Modal/Modal";
import React from "react";
import TxModal from "./TxModal";

interface Iprops {
  openModal: boolean;
  onDismiss: () => void;
}

const MobileTransactionInfo = (props: Iprops) => {
  const { onDismiss, openModal } = props;

  if (!openModal) return null;

  return (
    <Modal open={openModal} handleClose={() => onDismiss()}>
      <TxModal openModal={openModal} onDismiss={() => onDismiss()} />
    </Modal>
  );
};

export default MobileTransactionInfo;
