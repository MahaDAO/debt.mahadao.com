import Button from "@/components/Button";
import Input from "@/components/Input";
import InputContainer from "@/components/InputContainer";
import Modal from "@/components/Modal/Modal";
import States from "@/components/States";
import { useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";

const WithdrawModal = (props: any) => {
  const { openModal, onModalClose, selectedData } = props;
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [val, setVal] = useState("");

  const handleWithdraw = () => {};

  const isAmountGreaterThanBalance = true;

  useEffect(() => {
    setVal("0");
  }, []);

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
            label="Enter Amount"
            dataLabel="Balance: "
            dataValue={`${Number("312738712").toLocaleString()}`}
            className="m-b-32"
          >
            <States
              state={isAmountGreaterThanBalance ? "error" : "default"}
              msg="Amount cannot be greater than your staked amount"
            >
              <div className="single-line-center-between">
                <Input
                  value={val}
                  setValue={setVal}
                  maxTag={true}
                  onMaxClick={() => setVal("312738712")}
                />
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
              disabled={false}
              text="Withdraw"
              loading={false}
              size="lg"
              onClick={handleWithdraw}
              tracking_id="stake_withdraw"
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
