import { Box, Typography } from "@mui/material";
import React from "react";

export interface TextWrapperProps {
  fontFamily?: "var(--font-inter)" | "var(--font-syne)";
  fontStyle?: string;
  fontWeight?: "bold" | 300 | 600;
  fontSize?: 32 | 24 | 18 | 16 | 14 | 12;
  FletterSpacing?: string;
  Fcolor?: string;
  text: string | JSX.Element;
  align?: "left" | "center" | "right";
  className?: string;
  lineHeight?: string;
}

const TextWrapper = (props: TextWrapperProps) => {
  const {
    fontFamily = "var(--font-inter)",
    fontStyle = "normal",
    fontWeight = 300,
    fontSize = 14,
    FletterSpacing = "normal",
    Fcolor = "#FFFFFF",
    text = "",
    className = "",
    align = "left",
  } = props;

  if (typeof text === "string") {
    return (
      <Typography
        fontFamily={fontFamily}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontStyle={fontStyle}
        letterSpacing={FletterSpacing}
        color={Fcolor}
        style={{ color: Fcolor }}
        className={className}
        align={align}
      >
        {text}
      </Typography>
    );
  } else {
    return (
      // @ts-ignore
      <Box
        component={"div"}
        fontFamily={fontFamily}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontStyle={fontStyle}
        letterSpacing={FletterSpacing}
        style={{ color: Fcolor }}
        className={className}
        align={align}
      >
        {text}
      </Box>
    );
  }
};

export default TextWrapper;
