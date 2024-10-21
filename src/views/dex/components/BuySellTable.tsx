import Button from "@/components/Button";
import InfoTip from "@/components/InfoTip";
import Input from "@/components/Input";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import BuySellOfferModal from "../modal/BuySellOfferModal";

interface IProps {
  baseTokenBalance: any;
  action: string;
  selectQuoteToken: {
    name: string;
    balance: any;
  };
}

const BuySellTable = (props: IProps) => {
  const { action, selectQuoteToken, baseTokenBalance } = props;
  const [quoteToken, setQuoteToken] = useState<string>("");
  const [baseToken, setBaseToken] = useState<string>("");
  const [buyTotal, setBuyTotal] = useState<string>("0");
  const [sellTotal, setSellTotal] = useState<string>("0");
  const [openOfferModal, setOpenOfferModal] = useState<boolean>(false);

  useEffect(() => {
    if (quoteToken.length && baseToken.length) {
      if (action === "Buy") {
        setBuyTotal((Number(quoteToken) * Number(baseToken)).toString());
      }
      if (action === "Sell") {
        setSellTotal((Number(quoteToken) * Number(baseToken)).toString());
      }
    } else {
      setBuyTotal("0");
      setSellTotal("0");
    }
  }, [quoteToken, baseToken]);

  return (
    <CardContent>
      <CardSection>
        <CardColumn1 className={"table-border single-line-center-center"}>
          Price
        </CardColumn1>
        <CardColumn2 className={"table-border text-right"}>
          <Input
            value={quoteToken}
            setValue={setQuoteToken}
            alignInput={"right"}
          />
        </CardColumn2>
        <CardColumn3 className={"table-border single-line-center-center"}>
          {selectQuoteToken.name}
        </CardColumn3>
      </CardSection>
      <CardSection>
        <CardColumn1 className={"table-border single-line-center-center"}>
          Amount
        </CardColumn1>
        <CardColumn2 className={"table-border text-right"}>
          <Input
            value={baseToken}
            setValue={setBaseToken}
            alignInput={"right"}
          />
        </CardColumn2>
        <CardColumn3 className={"table-border single-line-center-center"}>
          ARTH-DP
        </CardColumn3>
      </CardSection>
      <CardSection style={{ marginBottom: "40px" }}>
        <CardColumn1 className={"table-border single-line-center-center"}>
          Total
        </CardColumn1>
        <CardColumn2 className={"table-border text-right"}>
          <Input
            disabled={true}
            value={
              action === "Buy" ? buyTotal.toString() : sellTotal.toString()
            }
            setValue={action === "Buy" ? setBuyTotal : setSellTotal}
            alignInput={"right"}
          />
        </CardColumn2>
        <CardColumn3 className={"table-border single-line-center-center"}>
          {selectQuoteToken.name}
        </CardColumn3>
      </CardSection>
      <CardSection style={{ alignItems: "center" }}>
        <CardColumn2>
          {action === "Buy" ? (
            Number(selectQuoteToken.balance) < Number(quoteToken) ||
            Number(selectQuoteToken.balance) < Number(buyTotal) ? (
              <InfoTip
                type={"Error"}
                msg={`You don't have enough ${selectQuoteToken.name} tokens`}
              />
            ) : (
              <InfoTip
                type={"Warning"}
                msg={"Enter a price to unlock amount"}
              />
            )
          ) : Number(baseToken) > Number("231273892") ? (
            <InfoTip
              type={"Error"}
              msg={`You don't have enough ARTH-DP tokens`}
            />
          ) : (
            <InfoTip type={"Warning"} msg={"Enter a price to unlock amount"} />
          )}
        </CardColumn2>
        <CardColumn1></CardColumn1>
        <CardColumn3 style={{ textAlign: "center" }}>
          <Button
            disabled={false}
            text={`${action}`}
            onClick={() => setOpenOfferModal(true)}
          />
        </CardColumn3>
      </CardSection>
      <BuySellOfferModal
        subTitle={`Here you can place an order to ${action.toLowerCase()} debt tokens.`}
        openModal={openOfferModal}
        onModalClose={() => setOpenOfferModal(false)}
        action={action}
        tableData={{
          quote: quoteToken,
          base: baseToken,
          total: action === "Buy" ? buyTotal.toString() : sellTotal.toString(),
          quoteTokenBalance: selectQuoteToken.balance,
          selectQuoteToken,
        }}
      />
    </CardContent>
  );
};

const CardContent = styled("div")({
  display: "flex",
  padding: "0 32px 32px 32px",
  alignItems: "self-start",
  marginTop: "24px",
  flexDirection: "column",
  "@media (max-width: 600px)": {
    padding: "0 16px 16px 16px",
  },
});

const CardSection = styled("div")({
  display: "flex",
  flexDirection: "row",
  width: "100%",
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

export default BuySellTable;
