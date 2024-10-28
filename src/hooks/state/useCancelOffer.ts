import { useCallback } from "react";

import useCore from "../useCore";
import { useTransactionAdder } from "../../state/transactions/hooks";
import { useAddPopup } from "../../state/application/hooks";
import formatErrorMessage from "../../utils/formatErrorMessage";
import { BigNumber } from "ethers";

const useCancelOffer = (id: number) => {
  const core = useCore();
  const addTransaction = useTransactionAdder();
  const addPopup = useAddPopup();
  const contract = core.contracts["MatchingMarket"];

  const action = async (
    id: number,
    callback?: (responseHash?: string) => void
  ) => {
    try {
      const response = await contract["cancel(uint256)"](
        BigNumber.from(`${id}`)
      );
      addTransaction(response, {
        summary: `Cancel Offer ${id}`,
      });

      if (callback) callback(response.hash);
    } catch (e: any) {
      console.log("useCancelOffer e", e);

      addPopup({
        error: {
          message: formatErrorMessage(e?.data?.message || e?.message),
          stack: e.stack,
        },
      });
    }
  };

  return action;
};

export default useCancelOffer;
