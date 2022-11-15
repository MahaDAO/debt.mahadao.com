import { useCallback } from "react";

import useCore from "../useCore";
import { useTransactionAdder } from '../../state/transactions/hooks';
import { useAddPopup } from '../../state/application/hooks';
import formatErrorMessage from '../../utils/formatErrorMessage';
import { BigNumber } from "ethers";

const useCancelOffer = (id: number) => {
  console.log('useCancelOffer id', id)
  const core = useCore();
  const addTransaction = useTransactionAdder();
  const addPopup = useAddPopup();
  const contract = core.contracts["MatchingMarket"];

  const action =  async (id: number) => {

    try {
      console.log("useCancelOffer id", id)
      const response = await contract["cancel(uint256)"](BigNumber.from(`${id}`))
      console.log('response', response)
      addTransaction(response, {
        summary: `Cancel Offer ${id}`,
      });

    } catch (e: any) {
      console.log('useCancelOffer e', e)
     
      addPopup({
        error: {
          message: formatErrorMessage(e?.data?.message || e?.message),
          stack: e.stack,
        },
      });
    }
  }
  
  return action;
}

export default useCancelOffer;