import {useCallback} from "react";
import {useTransactionAdder} from "../../state/transactions/hooks";

import useCore from "../useCore";
import {DAY_IN_MS} from "../../utils/constants";
import {useAddPopup} from "../../state/application/hooks";
import formatErrorMessage from "../../utils/formatErrorMessage";
import {BigNumber} from "ethers";

const useIncreaseLockTime = (id: BigNumber, lockDuration: number) => {
  const core = useCore();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();
  const contract = core.getVestingContract();

  return useCallback(
    async (onSuccess: () => void, onFailure: () => void): Promise<void> => {
      try {
        const response = await contract.increaseUnlockTime(
          id,
          lockDuration,
        );

        addTransaction(response, {
          summary: `Increase lock time for #${id.toString()}`,
        });

        const tx = await response.wait();

        if (tx?.status === 1) onSuccess()
        if (tx?.status !== 1) onFailure();
      } catch (e: any) {
        console.log('error', e);
        addPopup({
          error: {
            message: formatErrorMessage(e?.data?.message || e?.message),
            stack: e?.stack,
          },
        });
        onFailure();
      }
    },
    [contract, id, lockDuration, addTransaction, addPopup]
  );
};

export default useIncreaseLockTime;
