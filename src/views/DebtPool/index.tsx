"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import DebtCard from "./components/DebtCard";

const LockDeposit = () => {
  const isMobile = useMediaQuery("(max-width: 680px)");

  return (
    <div className="custom-container" style={{ marginTop: "110px" }}>
      <div className="m-b-40">
        <CardSubHeader>
          The payback pool is a platform for holders to get reimbursed from
          protocol revenue. You can burn your debt tokens for USDC that gets
          collected from the protocol's revenue at a 1:1 ratio. Or you can
          choose to sell your debt tokens for either USDC or MAHA at a price you
          choose.
        </CardSubHeader>
      </div>
      <DebtContainer style={{ flexDirection: isMobile ? "column" : "row" }}>
        <DebtCard price={1} symbol={"ARTH-DP"} />
      </DebtContainer>
    </div>
  );
};

const DebtContainer = styled("div")({
  display: "flex",
  marginBottom: "50px",
});

const CardSubHeader = styled("div")(() => ({
  color: "#999",
  display: "flex",
  fontSize: "16px",
  justifyContent: "start",
  alignItems: "center",
  padding: "0 0px 30px 0px",
  borderBottom: "1px solid #ffffff20",
  "@media (max-width: 600px)": {
    padding: "16px",
  },
}));

export default LockDeposit;
