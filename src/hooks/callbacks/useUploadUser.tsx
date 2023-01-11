import { useCallback } from "react";

import useCore from "../useCore";
import { useTransactionAdder } from '../../state/transactions/hooks';
import { useAddPopup } from '../../state/application/hooks';
import formatErrorMessage from '../../utils/formatErrorMessage';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';

const useUploadUser = (amount: string, address: string) => {

  let bnAmount: BigNumber
  if(amount.length){
    bnAmount = BigNumber.from(parseUnits(amount))
  } else {
    bnAmount = BigNumber.from(parseUnits('0'))
  }

  const core = useCore();
  const addTransaction = useTransactionAdder();
  const addPopup = useAddPopup();
  const contract = core.contracts["Staking-RewardsV2"];

  console.log('amount', bnAmount.toString(), 'address', address, 'contract', contract)


  const action = useCallback(
    async (callback?: () => void): Promise<void> => {

      try {
        const response = await contract.mint(address, bnAmount)
        console.log('response', response)
        addTransaction(response, {
          summary: `Register ${address}',
          )}`,
        });

        if (callback) callback();
      } catch (e: any) {
        console.log('useUploadUser e', e)
       
        addPopup({
          error: {
            message: formatErrorMessage(e?.data?.message || e?.message),
            stack: e.stack,
          },
        });
      }
    },
    [addPopup, addTransaction, contract, amount, address],
  )
  
  return action;
}

export default useUploadUser;