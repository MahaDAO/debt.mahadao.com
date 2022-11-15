import { useState, useEffect, useMemo } from 'react';
import {useMediaQuery} from "react-responsive";
import {Grid} from "@material-ui/core";

import Modal from "../../../components/Modal";
import InputContainer from "../../../components/InputContainer";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import States from "../../../components/States";
import CollateralDropDown from "../../../components/CollateralDropDown";
import ERC20 from '../../../protocol/ERC20';
import useApprove, {ApprovalState} from '../../../hooks/callbacks/useApprove';
import useCore from '../../../hooks/useCore';
import useBuyOffer from '../../../hooks/state/useBuyOffer';
import { formatToBN, getDisplayBalance } from '../../../utils/formatBalance';
import useSellOffer from '../../../hooks/state/useSellOffer';
import IconLoader from '../../../components/IconLoader';
import styled from 'styled-components';

function BuySellOffer(props: any) {

  const {openModal, onModalClose, action, tableData} = props;
  const isMobile = useMediaQuery({ maxWidth: '600px' });
  const core = useCore()

  const [quoteToken, setQuoteToken] = useState<string>('0')
  const [baseToken, setBaseToken] = useState<string>('0')
  const [totalQuoteToken, setTotalQuoteToken] = useState<string>('0')
  const [isInputFieldError, setIsInputFieldError] = useState<boolean>(false);
  const [depositing, setDepositing] = useState<boolean>(false);
  const [tokenToApprove, setTokenToApprove] = useState<ERC20>(core.tokens.USDC)

  useEffect(() => {
    setQuoteToken(tableData.quote)
    setBaseToken(tableData.base)
    setTotalQuoteToken(tableData.total)
    if(action === 'Buy'){
      if(tableData.selectQuoteToken.name == "USDC"){
        setTokenToApprove(core.tokens.USDC)
      }else{
        setTokenToApprove(core.tokens.MAHA)
      }
    }
    if(action === 'Sell') 
      setTokenToApprove(core.tokens['ARTH-DP'])

  }, [tableData])

  const [approveStatus, approve] = useApprove(
    tokenToApprove,
    core.contracts['MatchingMarket'].address
  );

  console.log('tableData.total', tableData.total)

  const buyOfferAction = useBuyOffer(formatToBN(tableData.total, 6), formatToBN(baseToken), action, tableData.selectQuoteToken.name) 

  function handleBuyOffer() {
    console.log('buyoffer')
    buyOfferAction(() => {
      // props.onCancel();
    })
  };
 
  const sellOfferAction = useSellOffer(formatToBN(baseToken), formatToBN(tableData.total, 6), action, tableData.selectQuoteToken.name) 

  function handleSellOffer() {
    console.log('selloffer')
    sellOfferAction(() => {
      // props.onCancel();
    })
  };

  const isApproved = approveStatus === ApprovalState.APPROVED;
  const isApproving = approveStatus === ApprovalState.PENDING;

  const isAmountGreaterThanBalance = false

  return (
    <Modal
      closeButton
      handleClose={onModalClose}
      open={openModal}
      title={`${action} Order`}
    >
      {/* <Card > */}
        <CardContent>
          <CardSection>
            <TextWithIcon>Price</TextWithIcon>
            <StyledValue>
              {tableData.quote} {tableData.selectQuoteToken.name}
            </StyledValue>
          </CardSection>
          <CardSection>
            <TextWithIcon>Amount</TextWithIcon>
            <StyledValue>
              {tableData.base} ARTH-DP
            </StyledValue>
          </CardSection>
          <CardSection className={'m-b-40'}>
            <TextWithIcon>Total</TextWithIcon>
            <StyledValue>
              {tableData.total} {tableData.selectQuoteToken.name}
            </StyledValue>
          </CardSection>
          <Grid
            container
            spacing={2}
            direction={isMobile ? 'column-reverse' : 'row'}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Button
                variant={'transparent'}
                text="Cancel"
                size={'lg'}
                onClick={onModalClose}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              {!isApproved ? (
                <Button
                  loading={isApproving}
                  text={isApproving ? 'Approving' : 'Approve'}
                  size={'lg'}
                  onClick={approve}
                  disabled={isInputFieldError || isApproved || !Number(quoteToken)}
                />
              ) : (
                <Button
                  disabled={isInputFieldError || !Number(quoteToken) || !Number(baseToken) || depositing}
                  text={`${action}`}
                  loading={depositing}
                  size={'lg'}
                  onClick={action === 'Buy' ? handleBuyOffer : handleSellOffer}
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
      {/* </Card> */}
    </Modal>
  );
}

export default BuySellOffer

const CardContent = styled.div`
  display: flex;
  padding: 0px;
  align-items: self-start;
  flex-direction: column;
  // margin-top: 24px;
  @media (max-width: 600px) {
    padding: 0 16px 16px 16px;
  }
`;

const LinkA = styled.a`
  color: #fff;
  text-decoration: none;
  border-bottom: 1px dotted #fff;
`;

const CardHeader = styled.h2`
  color: #fff;
  display: flex;
  font-weight: 600;
  font-size: 18px;
  justify-content: start;
  align-items: center;
  text-align: center;
  padding: 32px;
  border-bottom: 1px solid #FFFFFF20;
  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const StyledValue = styled.span`
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.88);
  text-align: right;
`;

const CardSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  &:last-child {
    margin-bottom: 0;
  }
  &.right {
    text-align: right;
  }
`;

// const Card = styled.div`
//   padding: 5px 0;
//   color: #eee;
//   position: relative;
//   background-clip: padding-box;
//   border: 1px solid;
//   border-image-source: linear-gradient(
//     180deg,
//     rgba(255, 116, 38, 0.1) 0%,
//     rgba(255, 255, 255, 0) 100%
//   );
//   background: rgba(255, 255, 255, 0.02);
//   backdrop-filter: blur(70px);
//   border-radius: 6px;
//   @media (max-width: 768px) {
//     min-height: auto;
//   }
//   min-height: 400px;
// `;

const TextWithIcon = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: rgba(255, 255, 255, 0.64);
  margin: 5px 0;
`;
