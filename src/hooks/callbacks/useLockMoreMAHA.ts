import {BigNumber} from "ethers";
import {useCallback} from "react";
import {useTransactionAdder} from "../../state/transactions/hooks";

import useCore from "../useCore";
import {useAddPopup} from "../../state/application/hooks";
import {getDisplayBalance} from "../../utils/formatBalance";
import formatErrorMessage from "../../utils/formatErrorMessage";

const useLockMoreMAHA = (amount: BigNumber, id: BigNumber) => {
  const core = useCore();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();

  return useCallback(
    async (onSuccess: () => void, onFailure: () => void): Promise<void> => {
      try {
        const gasOptions = core.gasOptions();
        const contract = core.getVestingContract();
        const response = await contract.increaseAmount(id, amount, gasOptions);

        addTransaction(response, {
          summary: `Add ${Number(
            getDisplayBalance(amount, 18, 3)
          ).toLocaleString("en-US", {
            minimumFractionDigits: 3,
          })} MAHA to lock into #${id.toString()}`,
        });

        const tx = await response.wait();

        if (tx?.status === 1) onSuccess()
        if (tx?.status !== 1) onFailure();
      } catch (e: any) {
        addPopup({
          error: {
            message: formatErrorMessage(e?.data?.message || e?.message),
            stack: e?.stack,
          },
        });
        onFailure()
      }
    },
    [core, id, amount, addTransaction, addPopup]
  );
};

export default useLockMoreMAHA;
