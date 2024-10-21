import Modal from "@/components/Modal/Modal";
import React from "react";
import WalletInfo from ".";

interface MobileWalletInfoProps {
  modalOpen: boolean;
  onClose: () => void;
}

const MobileWalletInfo = (props: MobileWalletInfoProps) => {
  const { modalOpen, onClose } = props;

  return (
    <Modal closeButton handleClose={() => onClose()} open={modalOpen}>
      <div>
        <WalletInfo onClose={onClose} />
      </div>
    </Modal>
  );
};

export default MobileWalletInfo;
