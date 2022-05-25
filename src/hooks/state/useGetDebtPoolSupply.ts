import { BigNumber } from "ethers";
import { useCallback, useEffect, useState } from "react";

import useCore from "../useCore";
import { BasicState } from "../../utils/interface";
import { useBlockNumber } from "../../state/application/hooks";
import {
  LOADING_DEFAULT_BASIC_STATE,
  NON_LOADING_DEFAULT_BASIC_STATE,
} from "../../utils/constants";

const useGetDebtPoolSupply = (symbol: string | null) => {
  const core = useCore();
  const blockNumber = useBlockNumber();

  const [state, setState] = useState<BasicState>(LOADING_DEFAULT_BASIC_STATE);

  const action = useCallback(async () => {
    const contract =
      symbol === "ARTH"
        ? core.contracts["ARTH-StakingMaster"]
        : core.contracts["ARTHX-StakingMaster"];

    const totalSupply: BigNumber = await contract.totalSupply();

    const newState: BasicState = {
      isLoading: false,
      value: totalSupply,
    };

    setState(newState);
  }, [core, symbol]);

  useEffect(() => {
    if (core) {
      action().catch((err) => {
        setState(NON_LOADING_DEFAULT_BASIC_STATE);
        console.error(`Failed to locked state: ${err.stack}`);
      });
    } else {
      setState(NON_LOADING_DEFAULT_BASIC_STATE);
    }
  }, [core, action, blockNumber]);

  return state;
};

export default useGetDebtPoolSupply;
