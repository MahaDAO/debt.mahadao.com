import { BigNumber } from "ethers";
import { useCallback } from "react";
import Numeral from 'numeral';
import { parseUnits } from 'ethers/lib/utils';

import useCore from "../useCore";
import { useTransactionAdder } from '../../state/transactions/hooks';
import { useAddPopup } from '../../state/application/hooks';
import formatErrorMessage from '../../utils/formatErrorMessage';
import { formatToBN, getDisplayBalance } from '../../utils/formatBalance';

const useBuyoffer = (pay_amt: BigNumber, buy_amt: BigNumber, txAction: string) => {

  const pay_gem = txAction === "Buy" ? '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174' : '0x2da2874F40c4c5DF7D80aBABe016d915fd8A9355'
  const buy_gem = txAction === "Buy" ? '0x2da2874F40c4c5DF7D80aBABe016d915fd8A9355' : '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'

  const core = useCore();
  const addTransaction = useTransactionAdder();
  const addPopup = useAddPopup();
  const contract = core.contracts["MatchingMarket"];

  const action = useCallback(
    async (callback?: () => void): Promise<void> => {

      try {
        const response = await contract.offer(pay_amt, pay_gem , buy_amt, buy_gem , 0, true)
        console.log('response', response)
        addTransaction(response, {
          summary: `${txAction} ${Numeral(getDisplayBalance(buy_amt, 18, 3)).format(
            '0,0.00a',
          )}`,
        });

        if (callback) callback();
      } catch (e: any) {
        console.log('useBuyoffer e', e)
       
        addPopup({
          error: {
            message: formatErrorMessage(e?.data?.message || e?.message),
            stack: e.stack,
          },
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [core, pay_amt, buy_amt],
  )
  
  return action;
}

export default useBuyoffer;