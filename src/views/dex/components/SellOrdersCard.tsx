import React, { useState } from "react";
import { styled } from "@mui/material/styles";

interface IProps {
  selectQuoteToken: string;
}

const SellOrdersCard = (props: IProps) => {
  const { selectQuoteToken } = props;

  const [cancelId, setCancelId] = useState<number>(0);

  const handleCancelOrder = (id: number) => {
    setCancelId(id);
    // sellOrderAction(id)
  };

  return (
    <CardContent>
      <CardSection style={{ marginBottom: "20px", fontWeight: "bold" }}>
        <CardColumn1 className="text-center">Price</CardColumn1>
        <CardColumn2 className="text-center">{selectQuoteToken}</CardColumn2>
        <CardColumn3 className="text-center">ARTH-DP</CardColumn3>
        <div style={{ padding: "13px" }}></div>
      </CardSection>
      {[1, 2, 3, 4].map((order, index) => {
        return (
          <CardSection>
            <CardColumn1 className={"table-border single-line-center-center"}>
              {2312321}
            </CardColumn1>
            <CardColumn2 className={"table-border single-line-center-center"}>
              {2131234}
            </CardColumn2>
            <CardColumn3 className={"table-border single-line-center-center"}>
              {675546}
            </CardColumn3>
            {/* 
            {
                owner.toLowerCase() === order.owner.toLowerCase() ?
                  <div className={'single-line-center-center pointer'} onClick={() => { handleCancelOrder(order.id) }} style={{ padding: '9px' }}>
                    <CancelIcon />
                  </div>
                  : <div />
              } */}
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

export default SellOrdersCard;
