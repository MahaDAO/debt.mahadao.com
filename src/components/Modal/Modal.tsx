import { Dialog, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { makeStyles } from "tss-react/mui";
import DialogTitle from "./DialogTitle";
import DialogContent from "./DialogContent";

interface props {
  children: React.ReactNode;
  title?: string;
  handleClose?: Function;
  open?: boolean;
  titleLogo?: React.ReactNode;
  modalContainerStyle?: any;
  modalTitleStyle?: any;
  modalBodyStyle?: any;
  closeButton?: boolean;
  mobile?: boolean;
  subTitle?: string;
}

const useStyles = makeStyles()((_) => ({
  root: {
    background: "linear-gradient(180deg, #48423e 0%, #373030 100%)",
    boxShadow: "0 8px 16px -2px rgba(0, 0, 0, 0.12)",
    borderRadius: "6px !important",
    maxWidth: "496px",
  },
  halfScreen: {},
  customPaper: {},

  "@media (max-width: 600px)": {
    root: {
      marginTop: "250px !important",
      borderRadius: "6px 6px 0 0 !important",
    },
    halfScreen: {
      height: "auto",
      maxHeight: "calc(100vh - 72px)",
      width: "100%",
      borderRadius: "6px 6px 0px 0px !important",
    },
    customPaper: {
      alignItems: "flex-end",
    },
  },
}));

const Modal: React.FC<props> = ({
  children,
  title,
  handleClose,
  open,
  titleLogo,
  modalContainerStyle,
  modalTitleStyle,
  modalBodyStyle,
  closeButton,
  mobile = false,
  subTitle,
}) => {
  const [openModal, setOpen] = useState(open);

  const theme = useTheme();
  const { classes: modalStyles } = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCloseModal = () => {
    if (handleClose) {
      handleClose();
    }
  };

  if (open !== openModal) {
    setOpen(open);
  }

  let modalJsx = <div />;
  if (openModal) {
    modalJsx = (
      <Dialog
        style={modalContainerStyle}
        fullScreen={fullScreen}
        fullWidth={mobile}
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={openModal}
        onBackdropClick={handleCloseModal}
        classes={{
          paper: modalStyles.root,
          paperFullScreen: modalStyles.halfScreen,
          scrollPaper: modalStyles.customPaper,
        }}
      >
        {title && (
          <DialogTitle
            closeButton={closeButton}
            modalTitleStyle={{
              display: "flex",
              flexDirection: "column",
              color: "rgba(255, 255, 255, 0.88)",
              alignItems: "center",
              justifyContent: "center",
              padding: "28px ",
              borderBottom: "1px solid #ffffff08",
              ...modalTitleStyle,
            }}
            id="customized-dialog-title"
            onClose={handleCloseModal}
            titleLogo={titleLogo}
            title={title}
            subTitle={subTitle}
          >
            {title}
          </DialogTitle>
        )}

        <DialogContent
          style={{
            ...modalBodyStyle,
          }}
          dividers
        >
          <div style={{}}>{children}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return modalJsx;
};

export default Modal;
