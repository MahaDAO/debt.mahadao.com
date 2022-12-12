import { BigNumber } from "ethers";
import { useWallet } from "use-wallet";
import { useCallback, useEffect, useState } from "react";

import useCore from "../useCore";
import { BasicState } from "../../utils/interface";
import {
  LOADING_DEFAULT_BASIC_STATE,
  NON_LOADING_DEFAULT_BASIC_STATE,
} from "../../utils/constants";

const useGetEarnedRewards = () => {
  const [state, setState] = useState<BasicState>(LOADING_DEFAULT_BASIC_STATE);
  const core = useCore();
  const { account } = useWallet();

  const action = useCallback(async () => {
    const contract = core.contracts["Staking-RewardsV2"]

    const response: BigNumber = await contract.earned(account);

    console.log("useGetEarnedRewards", account, response)

    const newState: BasicState = {
      isLoading: false,
      value: response,
    };

    setState(newState);
  }, [account, core]);

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

export default useGetEarnedRewards;
