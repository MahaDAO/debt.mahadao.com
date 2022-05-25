import { BigNumber } from "ethers";
import { useCallback, useEffect, useState } from "react";

import useCore from "../useCore";
// import ERC20 from '../../protocol/ERC20';
import { BasicState } from "../../utils/interface";
import { useBlockNumber } from "../../state/application/hooks";
import {
  LOADING_DEFAULT_BASIC_STATE,
  NON_LOADING_DEFAULT_BASIC_STATE,
} from "../../utils/constants";

const useGetVESupply = () => {
  const [balance, setBalance] = useState<BasicState>(
    LOADING_DEFAULT_BASIC_STATE
  );

  const core = useCore();
  const blockNumber = useBlockNumber();

  const fetchBalance = useCallback(async () => {
    const gasOptions = core.gasOptions();
    const bal: BigNumber = await core.contracts.VotingEscrow.supply(gasOptions);
    setBalance({ isLoading: false, value: bal });
  }, [core]);

  useEffect(() => {
    if (core) {
      fetchBalance().catch((err) => {
        setBalance(NON_LOADING_DEFAULT_BASIC_STATE);
        console.error(`Failed to fetch supply locked: ${err.stack} `);
      });
    } else {
      setBalance(NON_LOADING_DEFAULT_BASIC_STATE);
    }
  }, [blockNumber, core, fetchBalance]);

  return balance;
};

export default useGetVESupply;
