import { useCallback } from "react";

import useCore from "../useCore";
import { useAddPopup } from "../../state/application/hooks";
import formatErrorMessage from "../../utils/formatErrorMessage";
import { useTransactionAdder } from "../../state/transactions/hooks";

const useClaimDebtPool = (pool: string) => {
  const core = useCore();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();

  const action = useCallback(
    async (callback?: () => void): Promise<void> => {
      const contract = core.contracts.StakingMaster;

      try {
        const response = await contract.getReward();

        addTransaction(response, {
          summary: `Claim rewards`,
        });

        if (callback) callback();
      } catch (e: any) {
        addPopup({
          error: {
            message: formatErrorMessage(e?.data?.message || e?.message),
            stack: e.stack,
          },
        });
      }
    },
    [core.contracts, addPopup, addTransaction]
  );

  return action;
};

export default useClaimDebtPool;
