"use client";

import { styled } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import BuySellTable from "./components/BuySellTable";
import BuyOrdersCard from "./components/BuyOrdersCard";
import SellOrdersCard from "./components/SellOrdersCard";

const Dex = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  let arthUsdcPairStatus = localStorage.getItem("selectorQToken") || "usdc";

  const [selectQuoteToken, setSelectQuoteToken] = useState<string>("USDC");
  const [selectorQToken, setSelectorQToken] =
    useState<string>(arthUsdcPairStatus);

  useEffect(() => {
    if (selectorQToken === "maha") {
      setSelectQuoteToken("MAHA");
    } else if (selectorQToken === "usdc") {
      setSelectQuoteToken("USDC");
    } else {
      setSelectQuoteToken("SCLP");
    }
  }, [selectorQToken]);

  const handleChange = (val: string) => {
    localStorage.setItem("selectorQToken", val);
    console.log("handleChange", val);
    setSelectorQToken(val);
  };

  return (
    <div className="custom-container">
      <CardHeader
        style={{
          fontSize: "24px",
          justifyContent: "center",
        }}
      >
        Sell Your Debt Early
      </CardHeader>
      <CardSubHeader style={{ justifyContent: "center", marginBottom: "24px" }}>
        In this section, you can place orders to sell your debt tokens (ARTH-DP)
        for other tokens at a price that you choose. On a monthly basis the team
        will attempt to regularly fullfil the orders with whatever inventory was
        available at that time.
      </CardSubHeader>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "24px",
        }}
      >
        <div style={{ marginRight: "10px" }}>
          <Button
            text="ARTH-DP / USDC"
            onClick={() => {
              handleChange("usdc");
            }}
            variant={selectorQToken === "usdc" ? "default" : "transparent"}
          />
        </div>
      </div>
      <div
        style={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}
      >
        <Wrapper>
          <Card className="material-primary">
            <CardHeader>SELL DEBT</CardHeader>
            <CardSubHeader>
              Sell your debt tokens for {selectQuoteToken}
            </CardSubHeader>
            <CardSection
              style={{ marginBottom: "20px", fontWeight: "bold" }}
              className={"alignItemsCenter"}
            >
              <CardColumn1 className="text-center">AVAILABLE</CardColumn1>
              <CardColumn2 className="text-right">
                {Number("2131278").toLocaleString("en-US", {
                  minimumFractionDigits: 3,
                })}
              </CardColumn2>
              <CardColumn3 className="text-center">ARTH-DP</CardColumn3>
            </CardSection>
            <BuySellTable
              baseTokenBalance={"123123"}
              // quoteTokenBalance={quoteTokenBalance}
              action={"Sell"}
              selectQuoteToken={{
                name: selectQuoteToken,
                balance: 2232,
              }}
            />
          </Card>
        </Wrapper>
      </div>
      <div
        style={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}
      >
        <Wrapper>
          <Card className={"material-primary"}>
            <CardHeader>Buy Orders</CardHeader>
            <CardSubHeader>All orders buying debt tokens</CardSubHeader>
            <BuyOrdersCard selectQuoteToken={selectQuoteToken} />
          </Card>
        </Wrapper>

        <Wrapper>
          <Card className={"material-primary"}>
            <CardHeader>Sell Orders</CardHeader>
            <CardSubHeader>All orders selling debt tokens</CardSubHeader>
            <SellOrdersCard selectQuoteToken={selectQuoteToken} />
          </Card>
        </Wrapper>
      </div>
    </div>
  );
};

const Wrapper = styled("div")({
  minWidth: "200px",
  width: "100%",
  borderRadius: "6px",
  height: "100%",
  border: "1px solid",
  borderImageSource:
    "linear-gradient(180deg, rgba(255, 116, 38, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
  marginBottom: "50px",
  marginRight: "5px",
  "@media (max-width: 768px)": {
    marginTop: 0,
    marginBottom: "8px",
  },
});

const CardHeader = styled("h2")({
  color: "#ffffff",
  display: "flex",
  fontWeight: 600,
  fontSize: "18px",
  justifyContent: "start",
  alignItems: "center",
  textAlign: "center",
  padding: "32px 0 0 32px",
  marginBottom: "8px",
  "@media (max-width: 600px)": {
    padding: "16px",
  },
});

const CardSubHeader = styled("div")({
  color: "#999",
  display: "flex",
  fontSize: "14px",
  justifyContent: "start",
  alignItems: "center",
  textAlign: "center",
  padding: "0 32px 20px 32px",
  borderBottom: "1px solid #FFFFFF20",
  "@media (max-width: 600px)": {
    padding: "16px",
  },
});

const Card = styled("div")({
  padding: "5px 0",
  color: "#eee",
  position: "relative",
  backgroundClip: "padding-box",
  border: "1px solid",
  borderImageSource:
    "linear-gradient(180deg, rgba(255, 116, 38, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
  background: "rgba(255, 255, 255, 0.02)",
  backdropFilter: "blur(70px)",
  borderRadius: "6px",
  "@media (max-width: 768px)": { minHeight: "auto" },
  minHeight: "400px",
});

const CardSection = styled("div")({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  padding: "0 32px 0px 32px",
  marginTop: "24px",

  "&:last-child": {
    marginBottom: 0,
  },

  "&.right": {
    textAlign: "right",
  },
});

const CardColumn1 = styled("div")({
  flexBasis: "20%",
});

const CardColumn2 = styled("div")({
  flexBasis: "55%",
});

const CardColumn3 = styled("div")({
  flexBasis: "25%",
});

export default Dex;
