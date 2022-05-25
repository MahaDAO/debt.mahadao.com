import { useWallet } from "use-wallet";
import { useCallback, useEffect, useState } from "react";

import useCore from "../useCore";
import {PoolTokenRateState} from "../../utils/interface";
import {
  LOADING_POOLTOKEN_RATE_STATE,
  NON_LOADING_POOLTOKEN_RATE_STATE,
} from "../../utils/constants";

const useGetPoolTokenRewardsRate = () => {
  const [value, setValue] = useState<PoolTokenRateState>(
    LOADING_POOLTOKEN_RATE_STATE
  );

  const core = useCore();
  const { account } = useWallet();

  const fetchTokenRewardRate = useCallback(async () => {
    if (!account) {
      setValue(NON_LOADING_POOLTOKEN_RATE_STATE);
      return;
    }

    const rateARTH = await core.contracts.ARTHStakingChild.rewardRate();
    const rateUSDC = await core.contracts.USDCStakingChild.rewardRate();
    const rateMAHA = await core.contracts.MAHAStakingChild.rewardRate();
    const rateSCLP = await core.contracts.SCLPStakingChild.rewardRate();

    const rates = {
      maha: rateMAHA,
      arth: rateARTH,
      usdc: rateUSDC,
      scallop: rateSCLP,
    };

    setValue({
      isLoading: false,
      ...rates,
    });

  }, [account, core]);

  useEffect(() => {
    if (core.isUnlocked) {
      setValue(LOADING_POOLTOKEN_RATE_STATE);
      fetchTokenRewardRate().catch((err) => {
        setValue(NON_LOADING_POOLTOKEN_RATE_STATE);
        console.error(`Failed to fetch PoolToken rewards rate: ${err.stack}`);
      });
    } else {
      setValue(NON_LOADING_POOLTOKEN_RATE_STATE);
    }
  }, [account, core]);

  return value;
};

export default useGetPoolTokenRewardsRate;
