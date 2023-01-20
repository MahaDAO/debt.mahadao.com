import Modal from "../../../components/Modal";
import { useMediaQuery } from "react-responsive";
import { useEffect, useMemo, useState } from "react";
import InputContainer from "../../../components/InputContainer";
import Input from "../../../components/Input";
import { Grid } from "@material-ui/core";
import Button from "../../../components/Button";
import ERC20 from "../../../protocol/ERC20";
import useTokenBalanceOf from "../../../hooks/useTokenBalanceOf";
import { formatToBN, getDisplayBalance } from "../../../utils/formatBalance";
import States from "../../../components/States";
import useCore from "../../../hooks/useCore";
import useWithdraw from '../../../hooks/callbacks/useWithdraw';
import useGetDepositBalance from "../../../hooks/useGetDepositBalance";

const WithdrawModal = (props: any) => {
  const { openModal, onModalClose, selectedData } = props;
  const core = useCore();
  const isMobile = useMediaQuery({ maxWidth: '600px' });
  const [val, setValue] = useState<string>('');
  const [isInputFieldError, setIsInputFieldError] = useState<boolean>(false);
  const [withdrawing, setWithdrawing] = useState<boolean>(false);

  useEffect(() => {
    setValue('0')
  }, [])

  const token: ERC20 = useMemo(() => {
    return selectedData;
  }, [core, selectedData])

  const balance = useGetDepositBalance(core.myAccount);

  const withdrawAction = useWithdraw(val);

  const handleWithdraw = () => {
    withdrawAction(() => {
      // props.onCancel();
    })
  };

  const isAmountGreaterThanBalance = useMemo(() => {
    const bn = formatToBN(val, token.decimal);
    return bn.gt(balance.value);
  }, [val, token.decimal, balance.value]);

  return (
    <Modal
      closeButton
      handleClose={onModalClose}
      open={openModal}
      title={`Withdraw your debt tokens`}
      subTitle={'You can withdraw your debt tokens from this model and use it to sell it for other tokens in the buy/sell section below.'}
    >
      <div>
        <div>
          <InputContainer
            label={'Enter Amount'}
            dataLabel={'Balance: '}
            dataValue={`${Number(getDisplayBalance(balance.value, 18, 3)).toLocaleString()}`}
            className={'m-b-32'}
          >
            <States
              state={isAmountGreaterThanBalance ? 'error' : 'default'}
              msg={'Amount cannot be greater than your staked mount'}
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
                {/* <CollateralDropDown selectedSymbol={selectedData.displayName}/> */}
              </div>
            </States>
          </InputContainer>
        </div>
        <Grid
          container
          spacing={2}
          direction={isMobile ? 'column-reverse' : 'row'}
          style={{ marginTop: '32px' }}
        >
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Button
              variant={'transparent'}
              text="Cancel"
              size={'lg'}
              onClick={onModalClose}
              tracking_id={'stake_withdraw'}
              tracking_params={{
                action: 'cancel',
                collateral: '',
                amount: Number(val),
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Button
              disabled={isInputFieldError || !Number(val) || withdrawing}
              text={'Withdraw'}
              loading={withdrawing}
              size={'lg'}
              onClick={handleWithdraw}
              tracking_id={'stake_withdraw'}
              tracking_params={{
                action: 'confirm',
                collateral: '',
                amount: Number(val),
              }}
            />
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

export default WithdrawModal;
