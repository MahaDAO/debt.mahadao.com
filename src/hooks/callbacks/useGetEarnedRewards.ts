import { BigNumber } from "ethers";
import { useCallback, useEffect, useState } from "react";

import useCore from "../useCore";
import { BasicState } from "../../utils/interface";
import {
  LOADING_DEFAULT_BASIC_STATE,
  NON_LOADING_DEFAULT_BASIC_STATE,
} from "../../utils/constants";
import { useSelector } from "react-redux";
import { AppState } from "../../state";
import { useAccount } from "wagmi";

const useGetEarnedRewards = () => {
  const [state, setState] = useState<BasicState>(LOADING_DEFAULT_BASIC_STATE);
  const core = useCore();
  const { address: account } = useAccount();

  const rewardsOf = useSelector((state: AppState) => state.token.yourRewards);

  const action = useCallback(async () => {
    if (!account) {
      setState({ isLoading: false, value: BigNumber.from(0) });
      return;
    }
    if (rewardsOf && account && rewardsOf[account]) {
      setState({ isLoading: false, value: rewardsOf[account] });
      return;
    }

    const contract = core.contracts["Staking-RewardsV2"];
    const response: BigNumber = await contract.earned(account);
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
