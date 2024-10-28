import { DialogContent as MuiDialogContent } from "@mui/material";
import { withStyles } from "tss-react/mui";

const DialogContent = withStyles(MuiDialogContent, () => ({
  root: {
    minWidth: 500,
    background: "linear-gradient(180deg, #48423E 0%, #373030 100%)",
    borderTop: "1px solid rgba(255, 255, 255, 0.15)",
    padding: "24px 32px",
  },
  dividers: {
    borderTop: `1px solid rgba(255, 255, 255, 0.08)`,
  },
  "@media (max-width: 600px)": {
    root: {
      width: "100%",
      minWidth: "350px",
      maxHeight: "60%",
      padding: "24px 16px",
    },
  },
}));

export default DialogContent;
