import Button from "@/components/Button";
import Input from "@/components/Input";
import InputContainer from "@/components/InputContainer";
import Modal from "@/components/Modal/Modal";
import States from "@/components/States";
import useApprove, { ApprovalState } from "@/hooks/callbacks/useApprove";
import useDeposit from "@/hooks/callbacks/useDeposit";
import useCore from "@/hooks/useCore";
import useTokenBalanceOf from "@/hooks/useTokenBalanceOf";
import ERC20 from "@/protocol/ERC20";
import { formatToBN, getDisplayBalance } from "@/utils/formatBalance";
import { useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useMemo, useState } from "react";

const DepositModal = (props: any) => {
  const { openModal, onModalClose, selectedData } = props;
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [val, setVal] = useState("");
  const [isInputFieldError, setIsInputFieldError] = useState<boolean>(false);
  const [depositing, setDepositing] = useState<boolean>(false);

  const core = useCore();

  const token: ERC20 = useMemo(() => {
    return selectedData;
  }, [core, selectedData]);

  const balance = useTokenBalanceOf(token, core.myAccount);

  const [approveStatus, approve] = useApprove(
    token,
    core.contracts["Staking-RewardsV2"].address
  );

  const depositAction = useDeposit(val);

  const handleDeposit = () => {
    depositAction(() => {});
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
      title="Stake your token"
      subTitle="lorem ispum lorem ipsum lorem ipsum"
    >
      <div>
        <div>
          <InputContainer
            label="Enter Amount"
            dataLabel="Balance: "
            dataValue={`${Number(
              getDisplayBalance(balance.value, 18, 3)
            ).toLocaleString()}`}
            dataValueLoading={balance.isLoading}
            className="m-b-32"
          >
            <States
              state={isAmountGreaterThanBalance ? "error" : "default"}
              msg={"Amount cannot be greater than your balance"}
            >
              <div className="single-line-center-between">
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
              </div>
            </States>
          </InputContainer>
        </div>
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
              tracking_id={"stake_deposit"}
              tracking_params={{
                action: "cancel",
                collateral: selectedData?.displayName,
                amount: Number(val),
              }}
            />
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            {!isApproved ? (
              <Button
                loading={isApproving}
                text={isApproving ? "Approving" : "Approve"}
                size={"lg"}
                onClick={approve}
                disabled={isInputFieldError || isApproved || !Number(val)}
                tracking_id={"approve_stake_deposit"}
                tracking_params={{
                  collateral: selectedData.displayName,
                }}
              />
            ) : (
              <Button
                disabled={
                  isInputFieldError ||
                  !Number(val) ||
                  depositing ||
                  isAmountGreaterThanBalance
                }
                text={"Deposit"}
                loading={depositing}
                size={"lg"}
                onClick={handleDeposit}
                tracking_id={"stake_deposit"}
                tracking_params={{
                  action: "confirm",
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
