import { BigNumber } from "ethers";
import { useCallback, useEffect, useState } from "react";

import useCore from "../useCore";
import { BasicState } from "../../utils/interface";
import { useBlockNumber } from "../../state/application/hooks";
import {
  LOADING_DEFAULT_BASIC_STATE,
  NON_LOADING_DEFAULT_BASIC_STATE,
} from "../../utils/constants";

const useGetMAHAXBalance = (address: string | null) => {
  const [state, setState] = useState<BasicState>(LOADING_DEFAULT_BASIC_STATE);

  const core = useCore();
  const blockNumber = useBlockNumber();

  const fetchValue = useCallback(async () => {
    const gasOptions = core.gasOptions();
    const balance: BigNumber = await core.contracts.VotingEscrow[
      "balanceOf(address)"
    ](address, gasOptions);
    const newState: BasicState = {
      isLoading: false,
      value: balance,
    };
    setState(newState);
  }, [core, address]);

  useEffect(() => {
    if (core && address) {
      fetchValue().catch((err) => {
        setState(NON_LOADING_DEFAULT_BASIC_STATE);
        console.error(`Failed to fetch MAHAX Balance: ${err.stack}`);
      });
    } else {
      setState(NON_LOADING_DEFAULT_BASIC_STATE);
    }
  }, [blockNumber, core, fetchValue, address]);

  return state;
};

export default useGetMAHAXBalance;
