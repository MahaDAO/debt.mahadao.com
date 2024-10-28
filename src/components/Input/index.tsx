import { styled } from "@mui/material/styles";
import { escapeRegExp } from "@/utils";
import customTheme from "@/customTheme";
import React from "react";

export interface InputProps {
  value: string;
  setValue: (text: string) => void;
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  disabled?: boolean;
  placeholder?: string;
  maxTag?: boolean;
  onMaxClick?: () => void;
  border?: string;
  className?: string;
  alignInput?: any;
  isNum?: boolean;
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);

const Input = (props: InputProps) => {
  const {
    value = "",
    setValue,
    inputMode = "decimal",
    disabled = false,
    placeholder = "00.00",
    maxTag = false,
    onMaxClick,
    border = "6px 0 0 6px",
    className = "",
    alignInput = "left",
    isNum = true,
  } = props;

  const onValueChange = (value: string) => {
    setValue(value);
  };

  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === "" || inputRegex.test(escapeRegExp(nextUserInput))) {
      onValueChange(nextUserInput);
    }
  };

  return (
    <InputContainer style={{ borderRadius: border }} className={className}>
      <CustomInput
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        type="string"
        onChange={(event) => {
          isNum
            ? enforcer(event.target.value)
            : onValueChange(event.target.value);
        }}
        style={{ textAlign: alignInput || "left" }}
      />
      {maxTag && (
        <MaxTagContainer
          onClick={() => {
            if (onMaxClick) onMaxClick();
          }}
        >
          MAX
        </MaxTagContainer>
      )}
    </InputContainer>
  );
};

const InputContainer = styled("div")({
  background: `${customTheme.color.dark[500]}`,
  display: "flex",
  justifyContent: "space-between",
  flex: 1,
});

const CustomInput = styled("input")({
  padding: "12px",
  color: "#ffffff",
  fontFamily: "var(--font-inter) !important",
  background: "transparent",
  borderStyle: "none",
  width: "100%",
  height: "44px",
  fontWeight: 600,
  "&:focus": {
    outline: "none",
  },
  "-webkit-appearance": "textfield",
  "::-webkit-search-decoration": {
    "-webkit-appearance": "none",
  },
  '[type="number"]': {
    "-moz-appearance": "textfield",
  },
  "::-webkit-outer-spin-button": {
    "-webkit-appearance": "none",
  },
  "::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
  },
  "::placeholder": {
    color: `${customTheme.color.dark[200]}`,
  },
});

const MaxTagContainer = styled("div")({
  fontFamily: "var(--font-inter)",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "14px",
  color: "#f7653b",
  padding: "10px 12px",
  background: "transparent",
  borderRadius: "0 6px 6px 0",
  display: "flex",
  alignItems: "center",
  position: "relative",
  cursor: "pointer",
});

export default Input;
