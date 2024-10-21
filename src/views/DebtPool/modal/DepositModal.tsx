import Button from "@/components/Button";
import Input from "@/components/Input";
import InputContainer from "@/components/InputContainer";
import Modal from "@/components/Modal/Modal";
import States from "@/components/States";
import { useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";

const DepositModal = (props: any) => {
  const { openModal, onModalClose, selectedData } = props;
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [val, setVal] = useState("");

  const handleDeposit = () => {};

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
            dataValue={`${Number("312738712").toLocaleString()}`}
            dataValueLoading={false}
            className="m-b-32"
          >
            <States
              state={2 > 3 ? "error" : "default"}
              msg={"Amount cannot be greater than your balance"}
            >
              <div className="single-line-center-between">
                <Input
                  value={val}
                  setValue={setVal}
                  maxTag={true}
                  onMaxClick={() => {
                    setVal(Number("312738712").toString());
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
            {false ? (
              <Button
                loading={false}
                text={false ? "Approving" : "Approve"}
                size="lg"
                onClick={() => {}}
                disabled={false}
                tracking_id="approve_stake_deposit"
                tracking_params={{
                  collateral: selectedData?.displayName,
                }}
              />
            ) : (
              <Button
                disabled={false}
                text="Deposit"
                loading={false}
                size="lg"
                onClick={handleDeposit}
                tracking_id="stake_deposit"
                tracking_params={{
                  action: "confirm",
                  collateral: selectedData?.displayName,
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
