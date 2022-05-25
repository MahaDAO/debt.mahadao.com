import React from "react";

import Modal from "../../../../Modal";
import WalletInfo from "./index";

interface MobileWalletInfoProps {
  modalOpen: boolean;
  onClose: () => void;
}

const MobileWalletInfo = (props: MobileWalletInfoProps) => {
  const {
    modalOpen,
    onClose,
  } = props;

  return (
    <Modal
      closeButton
      handleClose={() => onClose()}
      open={modalOpen}
    >
      <div>
        <WalletInfo />
      </div>
    </Modal>
  );
}

export default MobileWalletInfo;
