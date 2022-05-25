import { useWallet } from "use-wallet";
import { useCallback, useEffect, useState } from "react";

import useCore from "../useCore";
import config from "../../config";
import { PoolTokenRateState } from "../../utils/interface";
import {
  LOADING_POOLTOKEN_RATE_STATE,
  NON_LOADING_POOLTOKEN_RATE_STATE,
} from "../../utils/constants";

const useGetPoolTokenRewards = () => {
  const [value, setValue] = useState<PoolTokenRateState>(
    LOADING_POOLTOKEN_RATE_STATE
  );

  const core = useCore();
  const { account } = useWallet();

  const fetchCashPrice = useCallback(async () => {
    if (!account) {
      setValue(NON_LOADING_POOLTOKEN_RATE_STATE);
      return;
    }

    const earnedARTH = await core.getTokenRewardPool('MAHAX', 'ARTH').earned(account);
    const earnedUSDC = await core.getTokenRewardPool('MAHAX', 'USDC').earned(account);
    const earnedMAHA = await core.getTokenRewardPool('MAHAX', 'MAHA').earned(account);
    const earnedSCLP = await core.getTokenRewardPool('MAHAX', 'SCLP').earned(account);


    const rates = {
      maha: earnedMAHA,
      arth: earnedARTH,
      usdc: earnedUSDC,
      scallop: earnedSCLP,
    };


    setValue({
      isLoading: false,
      ...rates,
    });
  }, [account, core]);

  useEffect(() => {
    let refreshInterval: any;
    if (core) {
      fetchCashPrice().catch((err) => {
        setValue(LOADING_POOLTOKEN_RATE_STATE);
        console.error(`Failed to fetch PoolToken rewards: ${err.stack}`);
      });
      refreshInterval = setInterval(() => {
        fetchCashPrice().catch((err) => {
          setValue(LOADING_POOLTOKEN_RATE_STATE);
          console.error(`Failed to fetch PoolToken rewards: ${err.stack}`);
        });
      }, 10000);
    } else {
      setValue(LOADING_POOLTOKEN_RATE_STATE);
    }

    return () => clearInterval(refreshInterval);
  }, [setValue, core, account, fetchCashPrice]);

  return value;
};

export default useGetPoolTokenRewards;
