import Button from "@/components/Button";
import Modal from "@/components/Modal/Modal";
import useApprove, { ApprovalState } from "@/hooks/callbacks/useApprove";
import useBuyoffer from "@/hooks/state/useBuyOffer";
import useSellOffer from "@/hooks/state/useSellOffer";
import useCore from "@/hooks/useCore";
import ERC20 from "@/protocol/ERC20";
import { useActivePopups } from "@/state/application/hooks";
import { formatToBN } from "@/utils/formatBalance";
import { useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";

const BuySellOfferModal = (props: any) => {
  const {
    openModal,
    onModalClose,
    action,
    tableData,
    subTitle,
    buyResponseHash,
    setBuyResponseHash,
    sellResponseHash,
    setSellResponseHash,
  } = props;

  const core = useCore();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [quoteToken, setQuoteToken] = useState<string>("0");
  const [baseToken, setBaseToken] = useState<string>("0");
  const [totalQuoteToken, setTotalQuoteToken] = useState<string>("0");
  const [isInputFieldError, setIsInputFieldError] = useState<boolean>(false);
  const [depositing, setDepositing] = useState<boolean>(false);
  const [tokenToApprove, setTokenToApprove] = useState<ERC20>(core.tokens.USDC);

  const [transactionLoading, setTransactionLoading] = useState<boolean>(false);
  const activePopups = useActivePopups();

  const currentBuyPopup = activePopups.find(
    (popup) => popup.content.txn?.hash === buyResponseHash
  );
  const buyTransactionLoading = currentBuyPopup?.content.txn?.loading;

  const currentSellPopup = activePopups.find(
    (popup) => popup.content.txn?.hash === sellResponseHash
  );
  const sellTransactionLoading = currentSellPopup?.content.txn?.loading;

  useEffect(() => {
    setQuoteToken(tableData.quote);
    setBaseToken(tableData.base);
    setTotalQuoteToken(tableData.total);
    if (action === "Buy") {
      if (tableData.selectQuoteToken.name == "USDC") {
        setTokenToApprove(core.tokens.USDC);
      } else {
        setTokenToApprove(core.tokens.MAHA);
      }
    }
    if (action === "Sell") setTokenToApprove(core.tokens["ARTH-DP"]);
  }, [tableData]);

  const [approveStatus, approve] = useApprove(
    tokenToApprove,
    core.contracts["MatchingMarket"].address
  );

  const buyOfferAction = useBuyoffer(
    formatToBN(tableData.total, 6),
    formatToBN(baseToken),
    action,
    tableData.selectQuoteToken.name
  );

  async function handleBuyOffer() {
    setTransactionLoading(true);
    await buyOfferAction((responseHash) => {
      setBuyResponseHash(responseHash);
      // props.onCancel();
    });
    setTransactionLoading(false);
  }

  const sellOfferAction = useSellOffer(
    formatToBN(baseToken),
    formatToBN(tableData.total, 6),
    action,
    tableData.selectQuoteToken.name
  );

  async function handleSellOffer() {
    setTransactionLoading(true);
    await sellOfferAction((responseHash) => {
      setSellResponseHash(responseHash);
      // props.onCancel();
    });
    setTransactionLoading(false);
  }

  const isApproved = approveStatus === ApprovalState.APPROVED;
  const isApproving = approveStatus === ApprovalState.PENDING;

  const isAmountGreaterThanBalance = false;

  return (
    <Modal
      closeButton
      handleClose={onModalClose}
      open={openModal}
      title={`${action} Order`}
      subTitle={subTitle}
    >
      <div>
        <CardContent>
          <CardSection>
            <TextWithIcon>Price</TextWithIcon>
            <StyledValue>
              {tableData.quote} {tableData.selectQuoteToken.name}
            </StyledValue>
          </CardSection>
          <CardSection>
            <TextWithIcon>Amount</TextWithIcon>
            <StyledValue>{tableData.base} ARTH-DP</StyledValue>
          </CardSection>
          <CardSection className={"m-b-40"}>
            <TextWithIcon>Total</TextWithIcon>
            <StyledValue>
              {tableData.total} {tableData.selectQuoteToken.name}
            </StyledValue>
          </CardSection>
          <Grid
            container
            spacing={2}
            direction={isMobile ? "column-reverse" : "row"}
          >
            <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
              <Button
                variant="transparent"
                text="Cancel"
                size="lg"
                onClick={onModalClose}
              />
            </Grid>
            <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
              {!isApproved ? (
                <Button
                  loading={isApproving}
                  text={isApproving ? "Approving" : "Approve"}
                  size={"lg"}
                  onClick={approve}
                  disabled={
                    isInputFieldError || isApproved || !Number(quoteToken)
                  }
                />
              ) : (
                <Button
                  disabled={
                    isInputFieldError ||
                    !Number(quoteToken) ||
                    !Number(baseToken) ||
                    depositing ||
                    buyTransactionLoading ||
                    sellTransactionLoading ||
                    transactionLoading
                  }
                  text={`${action}`}
                  loading={
                    depositing ||
                    buyTransactionLoading ||
                    sellTransactionLoading ||
                    transactionLoading
                  }
                  size={"lg"}
                  onClick={action === "Buy" ? handleBuyOffer : handleSellOffer}
                  // tracking_id={'stake_deposit'}
                  // tracking_params={{
                  //   action: 'confirm',
                  //   collateral: selectedData.displayName,
                  //   amount: Number(quoteToken),
                  // }}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </Modal>
  );
};

const CardContent = styled("div")({
  display: "flex",
  padding: "0px",
  alignItems: "self-start",
  flexDirection: "column",
  "@media (max-width: 600px)": { padding: "0 16px 16px 16px" },
});

const LinkA = styled("a")({
  color: "#fff",
  textDecoration: "none",
  borderBottom: "1px dotted #fff",
});

const CardHeader = styled("h2")({
  color: "#fff",
  display: "flex",
  fontWeight: 600,
  fontSize: "18px",
  justifyContent: "start",
  alignItems: "center",
  textAlign: "center",
  padding: "32px",
  borderBottom: "1px solid #FFFFFF20",
  "@media (max-width: 600px)": { padding: "16px" },
});

const StyledValue = styled("span")({
  display: "inline-block",
  fontSize: "16px",
  fontWeight: "bold",
  color: "rgba(255, 255, 255, 0.88)",
  textAlign: "right",
});

const CardSection = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  "&:last-child": { marginBottom: "0" },
  "&.right": { textAlign: "right" },
});

const TextWithIcon = styled("div")({
  fontStyle: "normal",
  fontWeight: 300,
  fontSize: "16px",
  lineHeight: "150%",
  color: "rgba(255, 255, 255, 0.64)",
  margin: "5px 0",
});

export default BuySellOfferModal;
