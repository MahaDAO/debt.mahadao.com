import { BigNumber } from "ethers";
import { useCallback, useEffect, useState } from "react";

import useCore from "../useCore";
import { BasicState } from "../../utils/interface";
import { useBlockNumber } from "../../state/application/hooks";
import {
  LOADING_DEFAULT_BASIC_STATE,
  NON_LOADING_DEFAULT_BASIC_STATE,
} from "../../utils/constants";
import { useSelector } from "react-redux";
import { AppState } from "../../state";
import { useWallet } from "use-wallet";

const useGetDebtPoolSupply = (symbol: string | null) => {
  const core = useCore();
  const blockNumber = useBlockNumber();
  const { account } = useWallet();

  const [state, setState] = useState<BasicState>(LOADING_DEFAULT_BASIC_STATE);

  const totalSupplyState = useSelector(
    (state: AppState) => state.token.totalSupply
  )

  // console.log("useTotalSupply", totalSupply)

  const action = useCallback(async () => {
    let contract;
    contract = core.contracts["ARTH-DP"]

    if (!account) {
      setState({ isLoading: false, value: BigNumber.from(0) });
      return;
    }

    if(totalSupplyState && totalSupplyState[core.contracts["ARTH-DP"].address]){
      setState({ isLoading: false, value: totalSupplyState[core.contracts["ARTH-DP"].address] });
      return;
    }

    const totalSupply: BigNumber = await contract.totalSupply();
    const newState: BasicState = {
      isLoading: false,
      value: totalSupply,
    };

    setState(newState);
  }, [core, symbol, account]);

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
