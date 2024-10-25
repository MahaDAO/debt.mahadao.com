import useDebtOrders from "@/hooks/callbacks/useDebtOrders";
import useCancelOffer from "@/hooks/state/useCancelOffer";
import useCore from "@/hooks/useCore";
import { getDisplayBalance } from "@/utils/formatBalance";
import { styled } from "@mui/material/styles";
import { BigNumber } from "ethers";
import CancelIcon from "@mui/icons-material/Cancel";
import Numeral from "numeral";
import React, { useEffect, useMemo, useState } from "react";
import { useActivePopups } from "@/state/application/hooks";

interface IProps {
  selectQuoteToken: string;
  buyResponseHash?: string;
}

const BuyOrdersCard = (props: IProps) => {
  const { selectQuoteToken, buyResponseHash } = props;

  const core = useCore();

  const [cancelId, setCancelId] = useState<number>(0);
  const owner = core.myAccount;

  const buyOrderData = useDebtOrders(selectQuoteToken, buyResponseHash);
  const activePopups = useActivePopups();

  const [transactionHash, setTransactionHash] = useState<string>();

  const currentPopup = activePopups.find(
    (popup) => popup.content.txn?.hash === transactionHash
  );

  const transactionSuccess = !!currentPopup?.content.txn?.success;

  const tokenAddr = core.tokens[selectQuoteToken].address;
  const sortedorders = useMemo(
    () =>
      buyOrderData
        .filter((a) => a.pay_gem.toLowerCase() === tokenAddr.toLowerCase())
        .sort((a, b) => {
          const apayAmt = getDisplayBalance(a.buy_amt, 18, 3);
          const abuyAmt = getDisplayBalance(a.pay_amt, 6, 3);
          const aprice = Number(abuyAmt) / Number(apayAmt);

          const bpayAmt = getDisplayBalance(b.buy_amt, 18, 3);
          const bbuyAmt = getDisplayBalance(b.pay_amt, 6, 3);
          const bprice = Number(bbuyAmt) / Number(bpayAmt);

          return Number(bprice) - Number(aprice);
        }),
    [buyOrderData, tokenAddr]
  );

  const cancelOrderAction = useCancelOffer(cancelId);

  const handleCancelOrder = (id: number) => {
    setCancelId(id);
    cancelOrderAction(id, (responseHash) => {
      setTransactionHash(responseHash);
    });
  };

  useEffect(() => {
    if (transactionSuccess) {
      window.location.reload();
    }
  }, [transactionSuccess]);

  return (
    <CardContent>
      <CardSection style={{ marginBottom: "20px", fontWeight: "bold" }}>
        <CardColumn1 className="text-center">Price</CardColumn1>
        <CardColumn2 className="text-center">{selectQuoteToken}</CardColumn2>
        <CardColumn3 className="text-center">ARTH-DP</CardColumn3>
        <div style={{ padding: "13px" }}></div>
      </CardSection>
      {sortedorders.map((order) => {
        const payAmt = getDisplayBalance(BigNumber.from(order.buy_amt), 18, 3);
        const buyAmt = getDisplayBalance(BigNumber.from(order.pay_amt), 6, 3);
        const price = Number(buyAmt) / Number(payAmt);

        return (
          <CardSection key={order.id}>
            <CardColumn1 className={"table-border single-line-center-center"}>
              {Numeral(price).format("0.000")}
            </CardColumn1>
            <CardColumn2 className={"table-border single-line-center-center"}>
              {Numeral(buyAmt).format("0.000")}
            </CardColumn2>
            <CardColumn3 className={"table-border single-line-center-center"}>
              {Numeral(payAmt).format("0.000")}
            </CardColumn3>
            {owner.toLowerCase() === order.owner.toLowerCase() ? (
              <div
                className={"single-line-center-center pointer p9"}
                onClick={() => {
                  handleCancelOrder(order.id);
                }}
              >
                <CancelIcon />
              </div>
            ) : (
              <div />
            )}
          </CardSection>
        );
      })}
    </CardContent>
  );
};

const CardContent = styled("div")({
  display: "flex",
  padding: "0 32px 32px 32px",
  alignItems: "self-start",
  marginTop: "24px",
  flexDirection: "column",
  "@media (max-width: 600px)": { padding: "0 16px 16px 16px" },
});

const CardSection = styled("div")({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  "&:last-child": { marginBottom: "0" },
  "&.right": { textAlign: "right" },
});

const CardColumn1 = styled("div")({
  flexBasis: "33%",
  padding: "9px",
});
const CardColumn2 = styled("div")({
  flexBasis: "33%",
  padding: "9px",
});
const CardColumn3 = styled("div")({
  flexBasis: "33%",
  padding: "9px",
});

export default BuyOrdersCard;
