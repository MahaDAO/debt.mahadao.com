import React, { useEffect, useState } from "react";

import theme from "@/customTheme";
import "../../customCss/Custom-Snackbar.css";
import { Slide, SlideProps, Snackbar } from "@mui/material";
import IconLoader from "../IconLoader/IconLoader";
import TextWrapper from "../TextWrapper.tsx/TextWrapper";
import { styled } from "@mui/material/styles";

// const useStyles = makeStyles(() => ({
//   root: {
//     width: '100%',
//     '& > * + *': {
//     },
//   },
// }));

interface Iprops {
  open: boolean;
  handleCancel?: () => {};
  title?: string;
  subTitle?: string;
  type?: "alert" | "warning" | "default";
}

const AlertSnackbar = (props: Iprops) => {
  const { open, handleCancel, type = "default", title, subTitle } = props;

  const [openSnackbar, setOpen] = useState(open);

  useEffect(() => {
    setOpen(open);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    if (handleCancel) handleCancel();
  };

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
  }

  const backgroundColour = () => {
    let temp = { background: theme.color.yellow[500] };
    if (type === "alert") {
      temp = { background: theme.color.red[500] };
    }
    return temp;
  };

  return (
    <Root>
      {openSnackbar && (
        <Snackbar
          open={openSnackbar}
          TransitionComponent={SlideTransition}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <SnackBarParent style={backgroundColour()}>
            <div className="single-line-center-start">
              <IconLoader
                iconName={"Caution"}
                iconType={"status"}
                className="m-r-8"
              />
              <div>
                {title && (
                  <TextWrapper
                    text={title}
                    fontWeight={600}
                    fontSize={16}
                    className="m-b-4"
                  />
                )}
                {subTitle && (
                  <TextWrapper text={subTitle} fontWeight={300} fontSize={16} />
                )}
              </div>
            </div>
            <IconLoader
              iconName={"Cross"}
              className="pointer"
              onClick={handleClose}
            />
          </SnackBarParent>
        </Snackbar>
      )}
    </Root>
  );
};

const Root = styled("div")({
  width: "100%",
  "& > * + *": {},
});

const SnackBarParent = styled("div")({
  backdropFilter: "blur(70px)",
  border: "1px solid",
  width: "max-content",
  padding: "16px",
  borderRadius: "6px",
  minWidth: "728px",
  borderImageSource:
    "linear-gradient(\n    180deg,\n    rgba(255, 116, 38, 0.1) 0%,\n    rgba(255, 255, 255, 0) 100%\n  )",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "@media (max-width: 600px)": { width: "max-content", minWidth: "auto" },
});

export default AlertSnackbar;
