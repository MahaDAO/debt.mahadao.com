import { useWallet } from "use-wallet";
import { useCallback, useEffect, useState } from "react";

import useCore from "../useCore";
import { BasicState } from "../../utils/interface";
import {
  LOADING_DEFAULT_BASIC_STATE,
  NON_LOADING_DEFAULT_BASIC_STATE,
} from "../../utils/constants";
import { useBlockNumber } from "../../state/application/hooks";

const useGetDebtPoolTokenRewards = (pool: string, token: string) => {
  const [value, setValue] = useState<BasicState>(LOADING_DEFAULT_BASIC_STATE);

  const core = useCore();
  const { account } = useWallet();
  const blocknumber = useBlockNumber();

  const fetchCashPrice = useCallback(async () => {
    if (!account) {
      setValue(NON_LOADING_DEFAULT_BASIC_STATE);
      return;
    }

    const stakingChild = await core.getTokenRewardPool(pool, token);
    const earned = await stakingChild.earned(account);

    setValue({
      isLoading: false,
      value: earned,
    });
  }, [account, core, pool, token]);

  useEffect(() => {
    if (core) {
      fetchCashPrice().catch((err) => {
        setValue(NON_LOADING_DEFAULT_BASIC_STATE);
        console.error(
          `Failed to fetch useGetDebtPoolTokenRewards: ${err.stack}`
        );
      });
    } else {
      setValue(NON_LOADING_DEFAULT_BASIC_STATE);
    }
  }, [setValue, core, account, fetchCashPrice, blocknumber]);

  return value;
};

export default useGetDebtPoolTokenRewards;
