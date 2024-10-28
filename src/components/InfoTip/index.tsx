import React, { ReactElement } from "react";

import customTheme from "@/customTheme";
import IconLoader from "../IconLoader/IconLoader";
import { styled } from "@mui/material/styles";

interface Iprops {
  type: "Warning" | "Info" | "Error";
  msg: string | ReactElement;
  className?: string;
}

const InfoTip = (props: Iprops) => {
  const { type, msg, className = "" } = props;

  let color: string = "#FFFFFF";
  if (type === "Warning") {
    color = "#FCB400";
  } else if (type === "Error") {
    color = customTheme.color.red[300];
  }

  return (
    <CustomBadgeAlert className={className}>
      <IconLoader iconName={type} iconType={"infoTip"} />
      <Text style={{ color: color }}>{msg}</Text>
    </CustomBadgeAlert>
  );
};

export default InfoTip;

const CustomBadgeAlert = styled("div")({
  background: "rgba(255, 255, 255, 0.08)",
  boxSizing: "border-box",
  borderRadius: "4px",
  padding: "8px",
  display: "flex",
  alignItems: "flex-start",
  width: "100%",
});

const Text = styled("p")({
  fontFamily: "var(--font-inter)",
  fontStyle: "normal",
  fontWeight: 300,
  fontSize: "12px",
  lineHeight: "130%",
  color: "#FCB400",
  flex: 1,
  paddingLeft: "10px",
  marginBottom: "0",
});
