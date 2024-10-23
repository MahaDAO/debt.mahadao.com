"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import InputContainer from "@/components/InputContainer";
import useUploadUser from "@/hooks/callbacks/useUploadUser";
import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";

const Form = () => {
  const isMobile = useMediaQuery("(max-width: 680px)");
  const [amount, setAmount] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const uploadAction = useUploadUser(amount, address);

  const handleUpload = () => {
    uploadAction(() => {});
  };

  return (
    <div
      className="custom-container"
      style={{
        marginTop: "150px",
        color: "white",
        padding: isMobile ? "0 16px" : "0 200px",
      }}
    >
      <CardHeader className="m-b-32">Register User</CardHeader>
      <InputContainer
        label="Enter Amount and Address"
        className="custom-mahadao-container-content"
      >
        <div className="single-line-center-between m-b-20">
          <Input value={amount} setValue={setAmount} placeholder="Amount" />
        </div>
        <div className="single-line-center-between m-b-20">
          <Input
            value={address}
            setValue={setAddress}
            placeholder="Address"
            isNum={false}
          />
        </div>
        <Button text="Upload" size="lg" onClick={handleUpload} />
      </InputContainer>
    </div>
  );
};

const CardHeader = styled("h2")({
  color: "#fff",
  display: "flex",
  fontWeight: 600,
  fontSize: "18px",
  justifyContent: "start",
  alignItems: "center",
  padding: "32px",
  borderBottom: "1px solid #ffffff20",
  "@media (max-width: 600px)": {
    padding: "16px",
  },
});

export default Form;
