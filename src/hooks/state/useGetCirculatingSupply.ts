import { BigNumber } from "ethers";
import { useCallback, useEffect, useState } from "react";

import useCore from "../useCore";
import { BasicState } from "../../utils/interface";
import { useBlockNumber } from "../../state/application/hooks";
import {
  LOADING_DEFAULT_BASIC_STATE,
  NON_LOADING_DEFAULT_BASIC_STATE,
} from "../../utils/constants";


const useGetCirculatingSupply = () => {
  const core = useCore();
  const blockNumber = useBlockNumber();

  const [state, setState] = useState<BasicState>(LOADING_DEFAULT_BASIC_STATE);

  const action = useCallback(async () => {
    const contract = core.contracts["ARTH-DP-Staking"];
    const totalCirculatingSupply: BigNumber = await contract.getTotalCirculatingSupply();

    const newState: BasicState = {
      isLoading: false,
      value: totalCirculatingSupply,
    };

    setState(newState);
  }, [core]);

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
}

export default useGetCirculatingSupply;