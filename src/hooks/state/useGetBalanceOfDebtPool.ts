import { BigNumber } from "ethers";
import { useWallet } from "use-wallet";
import { useCallback, useEffect, useState } from "react";

import useCore from "../useCore";
import { BasicState } from "../../utils/interface";
import {
  LOADING_DEFAULT_BASIC_STATE,
  NON_LOADING_DEFAULT_BASIC_STATE,
} from "../../utils/constants";

const useGetBalanceOfDebtPool = (symbol: string | null) => {
  const [state, setState] = useState<BasicState>(LOADING_DEFAULT_BASIC_STATE);
  const core = useCore();
  const { account } = useWallet();

  const action = useCallback(async () => {
    const contract =
      symbol === "ARTH"
        ? core.contracts.DebtPoolArth
        : core.contracts.DebtPoolArthX;

    const balanceOf: BigNumber = await contract.balanceOf(account);

    const newState: BasicState = {
      isLoading: false,
      value: balanceOf,
    };

    setState(newState);
  }, [account, core, symbol]);

  useEffect(() => {
    if (core && account) {
      action().catch((err) => {
        setState(NON_LOADING_DEFAULT_BASIC_STATE);
        console.error(`Failed to locked state: ${err.stack}`);
      });
    } else {
      setState(NON_LOADING_DEFAULT_BASIC_STATE);
    }
  }, [core, action, account]);

  return state;
};

export default useGetBalanceOfDebtPool;
