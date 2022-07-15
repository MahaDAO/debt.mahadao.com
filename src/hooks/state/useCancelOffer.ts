import { useCallback } from "react";

import useCore from "../useCore";
import { useTransactionAdder } from '../../state/transactions/hooks';
import { useAddPopup } from '../../state/application/hooks';
import formatErrorMessage from '../../utils/formatErrorMessage';

const useCancelOffer = (id: number) => {
  console.log('useCancelOffer id', id)
  const core = useCore();
  const addTransaction = useTransactionAdder();
  const addPopup = useAddPopup();
  const contract = core.contracts["MatchingMarket"];

  const action = useCallback(
    async (callback?: () => void): Promise<void> => {

      try {
        const response = await contract.cancel(id)
        console.log('response', response)
        addTransaction(response, {
          summary: `Cancel Offer ${id}',
          )}`,
        });

        if (callback) callback();
      } catch (e: any) {
        console.log('useCancelOffer e', e)
       
        addPopup({
          error: {
            message: formatErrorMessage(e?.data?.message || e?.message),
            stack: e.stack,
          },
        });
      }
    },
    [addPopup, addTransaction, contract, id],
  )
  
  return action;
}

export default useCancelOffer;