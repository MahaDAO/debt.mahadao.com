import React from "react";
import MuiDialogTitle, {
  DialogTitleProps as MuiDialogTitleProps,
} from "@mui/material/DialogTitle";
import TextWrapper from "../TextWrapper.tsx/TextWrapper";
import { IconButton } from "@mui/material";
import IconLoader from "../IconLoader/IconLoader";

export interface DialogTitleProps extends MuiDialogTitleProps {
  id: string;
  titleLogo?: React.ReactNode;
  children: React.ReactNode;
  classes?: any;
  onClose: () => void;
  modalTitleStyle?: any;
  closeButton?: boolean;
  title: string;
  subTitle?: string;
}

const DialogTitle = (props: DialogTitleProps) => {
  const {
    children,
    classes,
    onClose,
    titleLogo,
    modalTitleStyle,
    closeButton,
    title,
    subTitle,
    ...other
  } = props;
  return (
    <div>
      <MuiDialogTitle
        style={modalTitleStyle}
        className={classes?.root}
        {...other}
      >
        <div style={{ display: "flex" }}>
          <div className="dialog-class width-100">
            {titleLogo && titleLogo}
            <TextWrapper text={title} fontSize={18} fontWeight={600} />
          </div>
          {closeButton ? (
            <IconButton
              aria-label="close"
              className={classes?.closeButton}
              onClick={onClose}
            >
              <IconLoader iconName={"Cross"} iconType="misc" />
            </IconButton>
          ) : null}
        </div>
      </MuiDialogTitle>
    </div>
  );
};

export default DialogTitle;
