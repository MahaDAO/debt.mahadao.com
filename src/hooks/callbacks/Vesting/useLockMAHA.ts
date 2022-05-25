import {BigNumber} from "ethers";
import {useCallback} from "react";
import {useTransactionAdder} from "../../../state/transactions/hooks";

import useCore from "../../useCore";
import {useAddPopup} from "../../../state/application/hooks";
import {getDisplayBalance} from "../../../utils/formatBalance";
import formatErrorMessage from "../../../utils/formatErrorMessage";

const useLockMAHA = (amount: BigNumber, lockDuration: number) => {
  const core = useCore();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();

  return useCallback(
    async (onSuccess: () => void, onFailure: () => void): Promise<void> => {
      console.log('data', amount, lockDuration)
      try {
        const contract = core.getVestingContract();
        const response = await contract.createLock(
          amount,
          lockDuration,
        );

        const tx = await response.wait();

        addTransaction(response, {
          summary: `Lock ${Number(
            getDisplayBalance(amount, 18, 3)
          ).toLocaleString("en-US", {minimumFractionDigits: 3})} MAHA.`,
        });

        if (tx?.status === 1) onSuccess();
        if (tx?.status !== 1) onFailure();
      } catch (e: any) {
        console.log("Lock error", e);
        addPopup({
          error: {
            message: formatErrorMessage(e?.data?.message || e?.message),
            stack: e?.stack,
          },
        });
        onFailure()
      }
    },
    [core, amount, addPopup, lockDuration, addTransaction]
  );
};

export default useLockMAHA;
