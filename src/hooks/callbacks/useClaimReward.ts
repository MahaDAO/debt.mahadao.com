import { useCallback } from "react";
import { useTransactionAdder } from "../../state/transactions/hooks";

import useCore from "../useCore";
import { useAddPopup } from "../../state/application/hooks";
import formatErrorMessage from "../../utils/formatErrorMessage";

const useClaimReward = (symbol: string | null) => {
  const core = useCore();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();

  const action = useCallback(
    async (callback?: () => void): Promise<void> => {
      try {
        const contract =
          symbol === "ARTH"
            ? core.contracts["ARTH-StakingMaster"]
            : core.contracts["ARTHX-StakingMaster"];

        const response = await contract.getReward();

        addTransaction(response, {
          summary: `Claim Reward from ${symbol?.toString()} Debt Pool`,
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
    [core, addPopup, symbol, addTransaction]
  );

  return action;
};

export default useClaimReward;
