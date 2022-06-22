import { BigNumber, Contract } from "ethers";
import { useCallback, useEffect, useState } from "react";
import Numeral from 'numeral';

import useCore from "../useCore";
import ERC20 from "../../protocol/ERC20";
import { BasicState } from "../../utils/interface";
import { useBlockNumber } from "../../state/application/hooks";
import { useTransactionAdder } from '../../state/transactions/hooks';
import { useAddPopup } from '../../state/application/hooks';
import formatErrorMessage from '../../utils/formatErrorMessage';
import { getDisplayBalance } from '../../utils/formatBalance';
import {
  LOADING_DEFAULT_BASIC_STATE,
  NON_LOADING_DEFAULT_BASIC_STATE,
} from "../../utils/constants";


const useDeposit = (amount: BigNumber) => {
  const core = useCore();
  const addTransaction = useTransactionAdder();
  const addPopup = useAddPopup();
  const contract = core.contracts["Staking-RewardsV2"];

  console.log('useDeposit contract', contract)

  const action = useCallback(
    async (callback?: () => void): Promise<void> => {
     

      try {
        const response = await contract.stake(amount)
        addTransaction(response, {
          summary: `Stake ${Numeral(getDisplayBalance(amount, 18, 3)).format(
            '0,0.00a',
          )} ARTH-DP`,
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
    [core, amount],
  )
  
  return action;
}

export default useDeposit;