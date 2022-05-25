import { useWallet } from "use-wallet";
import { useCallback, useEffect, useState } from "react";
import {
  LOADING_DEFAULT_BASIC_STATE,
  NON_LOADING_DEFAULT_BASIC_STATE,
} from "../../../utils/constants";
import {BasicState} from "../../../utils/interface";
import useCore from "../../useCore";

const useGetNumberOfNFTs = () => {
  const [value, setValue] = useState<BasicState>(
    LOADING_DEFAULT_BASIC_STATE
  );

  const core = useCore();
  const { account } = useWallet();
  const contract = core.getVestingContract();

  const fetchData = useCallback(async () => {
    if (!account) {
      setValue(NON_LOADING_DEFAULT_BASIC_STATE);
      return;
    }

    const number = await contract.balanceOf(account);

    setValue({
      isLoading: false,
      value: number
    })

  }, [account, contract]);

  useEffect(() => {
    if (core) {
      fetchData().catch((err) => {
        setValue(NON_LOADING_DEFAULT_BASIC_STATE);
        console.error(`Failed to fetch PoolToken rewards: ${err.stack}`);
      });
    }
  }, [setValue, core, account, fetchData]);

  return value;
};

export default useGetNumberOfNFTs;
