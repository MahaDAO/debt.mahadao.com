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
import { formatToBN } from '../../../utils/formatBalance';
import useSellOffer from '../../../hooks/state/useSellOffer';

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
    if(action === 'Buy')
      setTokenToApprove(core.tokens.USDC)
    if(action === 'Sell') 
      setTokenToApprove(core.tokens['ARTH-DP'])

  }, [tableData])

  const [approveStatus, approve] = useApprove(
    tokenToApprove,
    core.contracts['MatchingMarket'].address
  );

  console.log('tableData.total', tableData.total)

  const buyOfferAction = useBuyOffer(formatToBN(tableData.total, 6), formatToBN(baseToken), action) 

  function handleBuyOffer() {
    console.log('buyoffer')
    buyOfferAction(() => {
      // props.onCancel();
    })
  };
 
  const sellOfferAction = useSellOffer(formatToBN(baseToken), formatToBN(tableData.total, 6), action) 

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
      title={`${action} Offer`}
    >
      <div>
        <div>
          <InputContainer
            label={''}
            dataLabel={''}
            dataValue={``}
            dataValueLoading={false}
            className={'m-b-32'}
          >
            <States
              state={isAmountGreaterThanBalance? 'error': 'default'}
              msg={'Amount cannot be greater than your balance'}
            >
              <div className={'single-line-center-between m-b-8'}>
                {/* <CollateralDropDown selectedSymbol={'Price'}/> */}
                <Input
                  disabled={true}
                  value={quoteToken}
                  setValue={setQuoteToken}
                />
                <CollateralDropDown selectedSymbol={'USDC'}/>

              </div>
              <div className={'single-line-center-between m-b-8'}>
                <Input
                  disabled={true}
                  value={baseToken}
                  setValue={setBaseToken}
                />
                <CollateralDropDown selectedSymbol={'ARTH-DP'}/>

              </div>
              <div className={'single-line-center-between m-b-8'}>
                <Input
                  disabled={true}
                  value={totalQuoteToken}
                  setValue={setTotalQuoteToken}
                  // maxTag={true}
                />
                <CollateralDropDown selectedSymbol={'USDC'}/>

              </div>
            </States>
          </InputContainer>
        </div>
        <Grid
          container
          spacing={2}
          direction={isMobile ? 'column-reverse' : 'row'}
        >
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Button
              variant={'transparent'}
              text="Cancel"
              size={'lg'}
              onClick={onModalClose}
              tracking_id={'stake_deposit'}
              // tracking_params={{
              //   action: 'cancel',
              //   collateral: selectedData.displayName,
              //   amount: Number(quoteToken),
              // }}
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
                tracking_id={'approve_stake_deposit'}
                // tracking_params={{
                //   collateral: selectedData.displayName,
                // }}
              />
            ) : (
              <Button
                disabled={isInputFieldError || !Number(quoteToken) || depositing}
                text={`${action}`}
                loading={depositing}
                size={'lg'}
                onClick={action === 'Buy' ? handleBuyOffer : handleSellOffer}
                tracking_id={'stake_deposit'}
                // tracking_params={{
                //   action: 'confirm',
                //   collateral: selectedData.displayName,
                //   amount: Number(quoteToken),
                // }}
              />
            )}
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
}

export default BuySellOffer


