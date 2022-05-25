import React from "react";
import { Grid } from "@material-ui/core";

import theme from "../../theme";

import Modal from "../Modal";
import Button from "../Button";
import TextWrapper from "../TextWrapper";

interface ConfirmationModalProps {
  modalOpen: boolean;
  onClose: () => void;
  modalTitle: string;
  title: string;
  subtitle?: string;
  yesText: string;
  noText: string;
  yesAction: () => void;
  noAction: () => void;
};

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const {
    modalOpen,
    onClose,
    modalTitle,
    title = "",
    subtitle = "",
    yesText,
    yesAction,
    noText,
    noAction,
  } = props;

  return (
    <Modal
      closeButton
      handleClose={() => onClose()}
      open={modalOpen}
      title={modalTitle}
    >
      <>
        <TextWrapper
          text={title}
          fontWeight={600}
          className="text-center m-b-8"
          align={"center"}
        />
        <TextWrapper
          text={subtitle}
          fontWeight={300}
          Fcolor={theme.color.transparent[100]}
          className="text-center"
          align={"center"}
        />
        <Grid container spacing={2} style={{ marginTop: '32px' }}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Button
              variant={'transparent'}
              text={noText}
              size={'lg'}
              onClick={() => noAction()}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Button
              text={yesText}
              size={'lg'}
              onClick={() => yesAction()}
            />
          </Grid>
        </Grid>
      </>
    </Modal>
  )
};

export default ConfirmationModal;
