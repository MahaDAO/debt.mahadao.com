import { BigNumber, Contract } from "ethers";
import { useCallback, useEffect, useState } from "react";
import Numeral from "numeral";

import useCore from "../useCore";
import ERC20 from "../../protocol/ERC20";
import { BasicState } from "../../utils/interface";
import { useBlockNumber } from "../../state/application/hooks";
import { useTransactionAdder } from "../../state/transactions/hooks";
import { useAddPopup } from "../../state/application/hooks";
import formatErrorMessage from "../../utils/formatErrorMessage";
import { getDisplayBalance } from "../../utils/formatBalance";
import {
  LOADING_DEFAULT_BASIC_STATE,
  NON_LOADING_DEFAULT_BASIC_STATE,
} from "../../utils/constants";
import { parseUnits } from "ethers/lib/utils";

const useDeposit = (amount: string) => {
  let bnAmount: BigNumber;
  if (amount.length) {
    bnAmount = BigNumber.from(parseUnits(amount));
  } else {
    bnAmount = BigNumber.from(parseUnits("0"));
  }

  const core = useCore();
  const addTransaction = useTransactionAdder();
  const addPopup = useAddPopup();
  const contract = core.contracts["Staking-RewardsV2"];

  const action = useCallback(
    async (callback?: (responseHash?: string) => void): Promise<void> => {
      try {
        const response = await contract.stake(bnAmount);

        addTransaction(response, {
          summary: `Stake ${Numeral(getDisplayBalance(bnAmount, 18, 3)).format(
            "0,0.00a"
          )} ARTH-DP`,
        });

        if (callback) callback(response.hash);
      } catch (e: any) {
        console.log("useDeposit e", e);

        addPopup({
          error: {
            message: formatErrorMessage(e?.data?.message || e?.message),
            stack: e.stack,
          },
        });
      }
    },
    [core, bnAmount]
  );

  return action;
};

export default useDeposit;
