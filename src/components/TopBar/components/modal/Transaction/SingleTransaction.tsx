import { styled } from "@mui/material/styles";
import customTheme from "@/customTheme";
import React from "react";
import { custom } from "viem";
import { TransactionDetails } from "@/utils/interface";
import IconLoader from "@/components/IconLoader/IconLoader";
import { getChainConfig } from "@/config/wagmiConfig";
import { polygon } from "viem/chains";

interface TransactionProps {
  tx: TransactionDetails;
}

const SingleTransaction: React.FC<TransactionProps> = ({ tx }) => {
  const summary = tx.summary;
  const pending = !tx.receipt;
  const success =
    !pending &&
    tx &&
    (tx.receipt?.status === 1 || typeof tx.receipt?.status === "undefined");
  const date = tx?.confirmedTime || tx?.addedTime;

  return (
    <TransactionWrapper>
      <IconWrapper pending={pending} success={success}>
        {pending ? (
          <IconLoader iconName={"ColoredPending"} iconType={"status"} />
        ) : success ? (
          <IconLoader iconName={"ColoredSuccess"} iconType={"status"} />
        ) : (
          <IconLoader iconName={"ColoredAlert"} iconType={"status"} />
        )}
      </IconWrapper>
      <InfoSection>
        <Title
          href={`${getChainConfig(polygon.id)?.blockExplorers.default.url}/tx/${
            tx.hash
          }`}
          target="_blank"
        >
          {summary ?? tx.hash}
        </Title>
        <Date>{date}</Date>
      </InfoSection>
      <StateWrapper pending={pending} success={success}>
        {pending ? "Pending" : success ? "" : "Failed"}
      </StateWrapper>
    </TransactionWrapper>
  );
};

const TransactionWrapper = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const IconWrapper = styled("div")<{ pending: boolean; success?: boolean }>(
  ({ pending, success }) => ({
    color: pending
      ? customTheme.color.primary[500]
      : success
      ? customTheme.color.green[500]
      : customTheme.color.red[500],
  })
);

const StateWrapper = styled("div")<{ pending: boolean; success?: boolean }>(
  ({ pending, success }) => ({
    color: pending ? "#FCB400" : success ? "#00000000" : "#FA4C69",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "130%",
  })
);

const InfoSection = styled("div")({
  flex: 1,
  textAlign: "left",
  marginBottom: "16px",
  marginLeft: "14px",
});

const Title = styled("a")({
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "20px",
  color: "rgba(255, 255, 255, 0.88)",
  marginBottom: "4px",
  cursor: "pointer",
  "&:hover": { color: "rgba(255, 255, 255, 0.88)" },
});

const Date = styled("p")({
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "12px",
  lineHeight: "130%",
  color: "rgba(255, 255, 255, 0.64)",
  marginBottom: "0",
});

export default SingleTransaction;
