import Button from "@/components/Button";
import { useMediaQuery } from "@mui/material";
import React, { useState, useMemo } from "react";
import { styled } from "@mui/material/styles";
// import styled from 'styled-components';
import Loader from "react-spinners/PulseLoader";
import InfoTip from "@/components/InfoTip";
import DepositModal from "../modal/DepositModal";
import WithdrawModal from "../modal/WithdrawModal";
import useCore from "@/hooks/useCore";
import useGetDebtPoolSupply from "@/hooks/state/useGetDebtPoolSupply";
import useTokenBalanceOf from "@/hooks/useTokenBalanceOf";
import useGetDepositBalance from "@/hooks/useGetDepositBalance";
import useGetStakingRewardsSupply from "@/hooks/state/useGetStakingRewardsSupply";
import useClaimReward from "@/hooks/callbacks/useClaimReward";
import useGetEarnedRewards from "@/hooks/callbacks/useGetEarnedRewards";
import { getDisplayBalance } from "@/utils/formatBalance";
// import { useMediaQuery } from "react-responsive";

// import { getDisplayBalance } from '../../../utils/formatBalance';
// import useClaimReward from '../../../hooks/callbacks/useClaimReward';
// import useGetDebtPoolSupply from '../../../hooks/state/useGetDebtPoolSupply';
// import useGetBalanceOfDebtPool from '../../../hooks/state/useGetBalanceOfDebtPool';
// import DebtToken from "../../../protocol/deployments/abi/DebtToken.json"
// import Button from "../../../components/Button";
// import InfoTip from "../../../components/InfoTip";
// import IconLoader from "../../../components/IconLoader";
// import DepositModal from '../modal/DepositModal';
// import useCore from '../../../hooks/useCore';
// import WithdrawModal from '../modal/WithdrawModal';
// import useTokenBalanceOf from '../../../hooks/useTokenBalanceOf';
// import useGetDepositBalance from '../../../hooks/useGetDepositBalance';
// import useGetStakingRewardsSupply from '../../../hooks/state/useGetStakingRewardsSupply';
// import useGetEarnedRewards from '../../../hooks/callbacks/useGetEarnedRewards';
// import DataField from "../../../components/DataField";
// import theme from "../../../theme";

interface DeptCardProps {
  price: number;
  symbol: string;
}

const DebtCard: React.FC<DeptCardProps> = ({ price, symbol }) => {
  const core = useCore();
  //   const isMobile = useMediaQuery({ maxWidth: '600px' });
  const arthdptoken = core.tokens["ARTH-DP"];

  const [openDepositModal, setOpenDepositModal] = useState<boolean>(false);
  const [openWithdrawModal, setWithdrawModal] = useState<boolean>(false);

  const arthTotalSupply = useGetDebtPoolSupply(symbol);
  const arthBalanceOf = useTokenBalanceOf(arthdptoken, core.myAccount);

  const totalDepositedByUser = useGetDepositBalance(core.myAccount);
  const totalDeposited = useGetStakingRewardsSupply();

  const claimCallback = useClaimReward();
  const earnedRewards = useGetEarnedRewards();

  const depositShare = useMemo(() => {
    if (
      arthBalanceOf.value.isZero() ||
      arthTotalSupply.value.isZero() ||
      arthTotalSupply.value.sub(arthBalanceOf.value).isZero() ||
      totalDeposited.value.isZero()
    )
      return 0;

    let diff = totalDeposited.value.sub(totalDepositedByUser.value);

    return (
      totalDeposited.value
        .sub(diff)
        .mul(10000000)
        .div(totalDeposited.value)
        .toNumber() / 100000
    );
  }, [arthBalanceOf, arthTotalSupply]);

  const handleGetRewards = () => {
    claimCallback(() => {});
  };

  const disableRewardBtn = Number(getDisplayBalance(earnedRewards.value)) > 0;

  const depositDisable = !arthBalanceOf.value.isZero();
  const withdrawDisable = !totalDepositedByUser.value.isZero();

  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Wrapper style={{ marginRight: isMobile ? "" : "16px" }}>
      <Card className={"material-primary"}>
        <CardHeader>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "baseline",
              textAlign: "left",
            }}
          >
            <span>{`${symbol} into Payback Pool`}</span>
          </div>
        </CardHeader>
        <CardContent>
          {/* <CardSection>
            <TextWithIcon>Total Deposited</TextWithIcon>
            <StyledValue>
              {Number(getDisplayBalance(totalDeposited.value, 18, 3)).toLocaleString() || 0} {symbol}
            </StyledValue>
          </CardSection> */}
          <CardSection>
            <TextWithIcon>Your Allocation</TextWithIcon>
            <StyledValue>
              {/* {Number(getDisplayBalance(totalDepositedByUser.value, 18, 3)).toLocaleString() || 0} {symbol} */}
              {Number(
                getDisplayBalance(totalDepositedByUser.value, 18, 3)
              ).toLocaleString() || 0}{" "}
              {symbol}
            </StyledValue>
          </CardSection>
          <CardSection>
            <TextWithIcon>Your Deposit Share</TextWithIcon>
            <StyledValue>
              {depositShare.toFixed(2) != "0.00"
                ? depositShare.toFixed(2)
                : depositShare.toFixed(5)}
              %
            </StyledValue>
          </CardSection>

          <CardSection>
            <TextWithIcon>Your Rewards</TextWithIcon>
            <StyledValue>
              {earnedRewards.isLoading ? (
                <Loader color={"#ffffff"} loading={true} size={4} margin={2} />
              ) : (
                Number(
                  getDisplayBalance(earnedRewards.value, 18, 5)
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 5,
                  maximumFractionDigits: 8,
                })
              )}{" "}
              USDC
            </StyledValue>
          </CardSection>
          <div className={"m-b-8 m-t-40"}>
            <InfoTip
              type={"Info"}
              msg={`This pool allows users to convert their ${symbol} token into debt to the protocol.
              The protocol promises to pay all holders of this pool their ${symbol} (polygon)
              tokens at a price of ${price}$.`}
            />
          </div>
          <div className={"m-b-16 m-t-8"}>
            <InfoTip
              type={"Warning"}
              msg={
                <div>
                  If you can't find your allocation in this pool, you can raise
                  a ticket to{" "}
                  <LinkA
                    target="_blank"
                    href="https://support.mahadao.com/support/tickets/new"
                  >
                    support.mahadao.com
                  </LinkA>
                </div>
              }
            />
          </div>

          <ButtonToBottom
            style={{
              flexDirection: isMobile ? "column" : "row",
              marginBottom: "16px",
            }}
          >
            <Button
              text="Deposit Debt Tokens"
              onClick={() => {
                setOpenDepositModal(true);
              }}
              disabled={!depositDisable}
            />
            <div
              style={{ width: "100px", marginTop: isMobile ? "15px" : "" }}
            ></div>
            <Button
              text="Withdraw Debt Tokens"
              onClick={() => setWithdrawModal(true)}
              disabled={!withdrawDisable}
            />
          </ButtonToBottom>
          <Button
            disabled={earnedRewards.value.eq(0)}
            text="Claim USDC"
            onClick={handleGetRewards}
          />
        </CardContent>
      </Card>
      <DepositModal
        openModal={openDepositModal}
        onModalClose={() => setOpenDepositModal(false)}
        selectedData={arthdptoken}
      />
      <WithdrawModal
        openModal={openWithdrawModal}
        onModalClose={() => setWithdrawModal(false)}
        selectedData={arthdptoken}
      />
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  flex: 2,
  width: "100%",
  borderRadius: 6,
  height: "100%",
  border: "1px solid",
  borderImageSource:
    "linear-gradient(180deg, rgba(255, 116, 38, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
  // marginBottom: 50,
  "@media (max-width: 768px)": {
    marginTop: 0,
    marginBottom: 8,
  },
});

const CardContent = styled("div")({
  display: "flex",
  padding: "0 32px 32px 32px",
  alignItems: "self-start",
  flexDirection: "column",
  marginTop: "24px",
  "@media (max-width: 600px)": {
    padding: "0 16px 16px 16px",
  },
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
  borderBottom: "1px solid #ffffff20",
  "@media (max-width: 600px)": {
    padding: "16px",
  },
});

const StyledValue = styled("span")({
  display: "inline-block",
  fontSize: "18px",
  fontWeight: "bold",
  color: "rgba(255, 255, 255, 0.88)",
  textAlign: "right",
});

const CardSection = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  "&:last-child": {
    marginBottom: 0,
  },
  "&.right": {
    textAlign: "right",
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
  "@media (max-width: 768px)": {
    minHeight: "auto",
  },
  minHeight: "400px",
});

const TextWithIcon = styled("div")({
  fontStyle: "normal",
  fontWeight: 300,
  fontSize: "16px",
  lineHeight: "150%",
  color: "rgba(255, 255, 255, 0.64)",
  margin: "5px 0",
});

const ButtonToBottom = styled("div")({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "flex-end",
  marginTop: "12px",
  width: "100%",
});

export default DebtCard;
