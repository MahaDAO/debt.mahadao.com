import Button from "@/components/Button";
import Input from "@/components/Input";
import InputContainer from "@/components/InputContainer";
import Modal from "@/components/Modal/Modal";
import States from "@/components/States";
import useWithdraw from "@/hooks/callbacks/useWithdraw";
import useCore from "@/hooks/useCore";
import useGetDepositBalance from "@/hooks/useGetDepositBalance";
import ERC20 from "@/protocol/ERC20";
import { formatToBN, getDisplayBalance } from "@/utils/formatBalance";
import { useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useMemo, useState } from "react";

const WithdrawModal = (props: any) => {
  const { openModal, onModalClose, selectedData } = props;
  const isMobile = useMediaQuery("(max-width: 600px)");
  const core = useCore();
  const [val, setVal] = useState("");
  const [isInputFieldError, setIsInputFieldError] = useState<boolean>(false);
  const [withdrawing, setWithdrawing] = useState<boolean>(false);

  useEffect(() => {
    setVal("0");
  }, []);

  const token: ERC20 = useMemo(() => {
    return selectedData;
  }, [core, selectedData]);

  const balance = useGetDepositBalance(core.myAccount);

  const withdrawAction = useWithdraw(val);

  const handleWithdraw = () => {
    withdrawAction(() => {
      // props.onCancel();
    });
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
      title="Withdraw your debt tokens"
      subTitle="You can withdraw your debt token from this model and use it to sell it for other tokens in the buy/sell seciton below."
    >
      <div>
        <div>
          <InputContainer
            label={"Enter Amount"}
            dataLabel={"Balance: "}
            dataValue={`${Number(
              getDisplayBalance(balance.value, 18, 3)
            ).toLocaleString()}`}
            className={"m-b-32"}
          >
            <States
              state={isAmountGreaterThanBalance ? "error" : "default"}
              msg={"Amount cannot be greater than your staked mount"}
            >
              <div className={"single-line-center-between"}>
                <Input
                  value={val}
                  setValue={setVal}
                  maxTag={true}
                  onMaxClick={() => {
                    setVal(
                      Number(getDisplayBalance(balance.value, 18, 3)).toString()
                    );
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
          direction={isMobile ? "column-reverse" : "row"}
          style={{ marginTop: "32px" }}
        >
          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <Button
              variant="transparent"
              text="Cancel"
              size="lg"
              onClick={onModalClose}
              tracking_id="stake_withdraw"
              tracking_params={{
                action: "cancel",
                collateral: "",
                amount: Number(val),
              }}
            />
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <Button
              disabled={isInputFieldError || !Number(val) || withdrawing}
              text={"Withdraw"}
              loading={withdrawing}
              size={"lg"}
              onClick={handleWithdraw}
              tracking_id={"stake_withdraw"}
              tracking_params={{
                action: "confirm",
                collateral: "",
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
