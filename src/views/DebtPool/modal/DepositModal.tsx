import Modal from "../../../components/Modal";
import {IModalProps} from "../../../utils/interface";
import {useMediaQuery} from "react-responsive";
import styled from "styled-components";
import { parseUnits } from 'ethers/lib/utils';
import React, {useEffect, useMemo, useState} from "react";
import useCore from "../../../hooks/useCore";
import useApprove, {ApprovalState} from "../../../hooks/callbacks/useApprove";
import {BigNumber} from "ethers";
import InputContainer from "../../../components/InputContainer";
import Input from "../../../components/Input";
import CollateralDropDown from "../../../components/CollateralDropDown";
import {Grid} from "@material-ui/core";
import Button from "../../../components/Button";
import {BNZERO} from "../../../utils/constants";
import TextWrapper from "../../../components/TextWrapper";
import Selector from "../../../components/Selector";
import ERC20 from "../../../protocol/ERC20";
import useTokenBalanceOf from "../../../hooks/useTokenBalanceOf";
import {useWallet} from "use-wallet";
import {formatToBN, getDisplayBalance} from "../../../utils/formatBalance";
import States from "../../../components/States";
import theme from "../../../theme";
import InfoTip from "../../../components/InfoTip";
import useDeposit from '../../../hooks/callbacks/useDeposit'

const DepositModal = (props: any) => {
  const {openModal, onModalClose, selectedData} = props;
  const {account} = useWallet();
  const isMobile = useMediaQuery({ maxWidth: '600px' });
  const [val, setValue] = useState<string>('0');
  const [isInputFieldError, setIsInputFieldError] = useState<boolean>(false);
  const [depositing, setDepositing] = useState<boolean>(false);

  const core = useCore();

  // useEffect(() => {
  //   setValue('0')
  // }, [])
 
  console.log('core.signer', core)

  // const token: ERC20 = useMemo(() => {
  //   return new ERC20(
  //     selectedData.address,
  //     core.signer || core.provider,
  //     selectedData.displayName,
  //     18,
  //   );
  // }, [core, selectedData.displayName, selectedData.address])

  const token: ERC20 = useMemo(() => {
    return selectedData;
  }, [core, selectedData])


  const balance = useTokenBalanceOf(token, '0x61837551968B5496c63EbCC82cBfE2C8e1Fe798c');

  const [approveStatus, approve] = useApprove(
    token,
    "0xd03785C2F0399bdAcACd2F3F85eD1C8D1141b42b"
  );

  const depositAction = useDeposit(val)  

  function handleDeposit() {

    depositAction(() => {
      // props.onCancel();
    })
  };

  const isApproved = approveStatus === ApprovalState.APPROVED;
  const isApproving = approveStatus === ApprovalState.PENDING;

  const isAmountGreaterThanBalance = useMemo(() => {
    const bn = formatToBN(val, token.decimal);
    return bn.gt(balance.value);
  }, [val, token.decimal, balance.value]);

  return (
    <Modal
      closeButton
      handleClose={onModalClose}
      open={openModal}
      title={`Stake your token`}
    >
      <div>
        <div>
          <InputContainer
            label={'Enter Amount'}
            dataLabel={'Balance: '}
            dataValue={`${Number(getDisplayBalance(balance.value, 18, 3)).toLocaleString()}`}
            dataValueLoading={balance.isLoading}
            className={'m-b-32'}
          >
            <States
              state={isAmountGreaterThanBalance? 'error': 'default'}
              msg={'Amount cannot be greater than your balance'}
            >
              <div className={'single-line-center-between'}>
                <Input
                  value={val}
                  setValue={setValue}
                  maxTag={true}
                  onMaxClick={() => {
                    setValue(Number(getDisplayBalance(balance.value, 18, 3)).toString())
                  }}
                />
                {/* <CollateralDropDown selectedSymbol={'ARTH-DP'}/> */}
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
              tracking_params={{
                action: 'cancel',
                collateral: selectedData.displayName,
                amount: Number(val),
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {!isApproved ? (
              <Button
                loading={isApproving}
                text={isApproving ? 'Approving' : 'Approve'}
                size={'lg'}
                onClick={approve}
                disabled={isInputFieldError || isApproved || !Number(val)}
                tracking_id={'approve_stake_deposit'}
                tracking_params={{
                  collateral: selectedData.displayName,
                }}
              />
            ) : (
              <Button
                disabled={isInputFieldError || !Number(val) || depositing || isAmountGreaterThanBalance}
                text={'Deposit'}
                loading={depositing}
                size={'lg'}
                onClick={handleDeposit}
                tracking_id={'stake_deposit'}
                tracking_params={{
                  action: 'confirm',
                  collateral: selectedData.displayName,
                  amount: Number(val),
                }}
              />
            )}
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

export default DepositModal;


