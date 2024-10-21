import React, { CSSProperties } from "react";
import { styled } from "@mui/material/styles";
import TextWrapper from "../TextWrapper.tsx/TextWrapper";
import Loader from "react-spinners/BeatLoader";
import customTheme from "@/customTheme";

interface InputContainerProps {
  label: string;
  dataLabel?: string;
  dataValue?: string;
  dontShowBackground?: boolean;
  className?: string;
  children: any;
  dataValueLoading?: boolean;
}

const InputContainer = (props: InputContainerProps) => {
  const {
    dataValueLoading = false,
    label = "",
    dataLabel = "",
    dataValue = "",
    dontShowBackground = false,
    className = "",
    children,
  } = props;

  const IContainerStyle = () => {
    let returnObj: CSSProperties = {};

    if (dontShowBackground) {
      returnObj["padding"] = "0px";
      returnObj["backgroundColor"] = "transparent";
    }

    return returnObj;
  };

  return (
    <IContainer style={IContainerStyle()} className={className}>
      <div className="single-line-center-between m-b-12">
        <TextWrapper
          text={label}
          fontWeight={600}
          Fcolor={customTheme.color.transparent[100]}
          className="p-r-8"
        />
        {dataValueLoading ? (
          <Loader color="#ffffff" loading={true} size={4} margin={2} />
        ) : (
          <TextWrapper
            text={`${dataLabel} ${dataValue}`}
            fontWeight={600}
            Fcolor={customTheme.color.transparent[100]}
            align="right"
          />
        )}
      </div>
      {children}
    </IContainer>
  );
};

const IContainer = styled("div")({
  background: "rgba(255, 255, 255, 0.08)",
  borderRadius: "8px",
  padding: "12px",
});

export default InputContainer;
