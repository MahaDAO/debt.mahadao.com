import { useCallback } from "react";
import { useAddPopup } from "../../state/application/hooks";
import { useTransactionAdder } from "../../state/transactions/hooks";

import useCore from "../useCore";
import formatErrorMessage from "../../utils/formatErrorMessage";

const useWithdrawMAHA = () => {
  const core = useCore();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();

  const action = useCallback(
    async (callback?: () => void): Promise<void> => {
      try {
        const gasOptions = core.gasOptions();
        const contract = core.contracts.VotingEscrow;

        const response = await contract.withdraw(gasOptions);

        addTransaction(response, {
          summary: `Withdraw MAHA.`,
        });
      } catch (e: any) {
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

export default useWithdrawMAHA;
