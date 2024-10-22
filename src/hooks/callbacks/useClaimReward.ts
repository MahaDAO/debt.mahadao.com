import { useCallback } from "react";
import { useTransactionAdder } from "../../state/transactions/hooks";

import useCore from "../useCore";
import { useAddPopup } from "../../state/application/hooks";
import formatErrorMessage from "../../utils/formatErrorMessage";

const useClaimReward = () => {
  const core = useCore();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();

  const action = useCallback(
    async (callback?: () => void): Promise<void> => {
      try {
        const contract = core.contracts["Staking-RewardsV2"];

        const response = await contract.getReward();

        addTransaction(response, {
          summary: `Claimed rewards successfully!`,
        });

        if (callback) callback();
      } catch (e: any) {
        console.log(e);
        addPopup({
          error: {
            message: formatErrorMessage(e?.data?.message || e?.message),
            stack: e?.stack,
          },
        });
      }
    },
    [core, addPopup, addTransaction]
  );

  return action;
};

export default useClaimReward;
