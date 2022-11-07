import { BigNumber, Contract } from "ethers";
import { useCallback, useEffect, useState } from "react";

import useCore from "./useCore";
import ERC20 from "../protocol/ERC20";
import { BasicState } from "../utils/interface";
import { useBlockNumber } from "../state/application/hooks";
import {
  LOADING_DEFAULT_BASIC_STATE,
  NON_LOADING_DEFAULT_BASIC_STATE,
} from "../utils/constants";

const useTotalSupply = (token: ERC20 | Contract) => {
  const [balance, setBalance] = useState<BasicState>(
    LOADING_DEFAULT_BASIC_STATE
  );

  const core = useCore();
  const blockNumber = useBlockNumber();

  const fetchBalance = useCallback(async () => {
    const bal: BigNumber = await token.totalSupply();
    setBalance({ isLoading: false, value: bal });
  }, [token]);

  useEffect(() => {
    if (core) {
      fetchBalance().catch((err) => {
        setBalance(NON_LOADING_DEFAULT_BASIC_STATE);
        console.error(
          `Failed to fetch total supply for ${token.address}: ${err.stack} `
        );
      });
    } else {
      setBalance(NON_LOADING_DEFAULT_BASIC_STATE);
    }
  }, [blockNumber, core, fetchBalance, token]);

  return balance;
};

export default useTotalSupply;
