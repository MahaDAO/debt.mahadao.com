import Button from "@/components/Button";
import Modal from "@/components/Modal/Modal";
import { useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";

const BuySellOfferModal = (props: any) => {
  const { openModal, onModalClose, action, tableData, subTitle } = props;
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [quoteToken, setQuoteToken] = useState<string>("0");
  const [baseToken, setBaseToken] = useState<string>("0");
  const [totalQuoteToken, setTotalQuoteToken] = useState<string>("0");

  const handleBuyOffer = () => {};

  const handleSellOffer = () => {};

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
              {false ? (
                <Button
                  loading={false}
                  text={false ? "Approving" : "Approve"}
                  size={"lg"}
                  onClick={() => {}}
                  disabled={false || !Number(quoteToken)}
                />
              ) : (
                <Button
                  disabled={
                    false || !Number(quoteToken) || !Number(baseToken) || false
                  }
                  text={`${action}`}
                  loading={false}
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
