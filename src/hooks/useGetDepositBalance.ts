import { BigNumber, Contract } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useWallet } from 'use-wallet';

import useCore from './useCore';
import ERC20 from '../protocol/ERC20';
import { BasicState } from '../utils/interface';
import { useBlockNumber } from '../state/application/hooks';
import { LOADING_DEFAULT_BASIC_STATE, NON_LOADING_DEFAULT_BASIC_STATE } from '../utils/constants';
import { AppState } from '../state';

const useGetDepositBalance = (address: string) => {
  const [balance, setBalance] = useState<BasicState>(LOADING_DEFAULT_BASIC_STATE);
  const { account } = useWallet();

  const core = useCore();
  const blockNumber = useBlockNumber();

  const balanceOf = useSelector(
    (state: AppState) => state.token.yourAllocation,
  );

  const fetchBalance = useCallback(async () => {

    if (!account) {
      setBalance({ isLoading: false, value: BigNumber.from(0) });
      return;
    }

    if(balanceOf && balanceOf[address] && core.myAccount === address){
      setBalance({ isLoading: false, value: balanceOf[address] });
      return;
    }

    const contract = await core.contracts['Staking-RewardsV2']
    const bal: BigNumber = await contract.balanceOf(address);

    setBalance({ isLoading: false, value: bal });
  }, [address]);

  useEffect(() => {
    if (core && address) {
      fetchBalance().catch((err) => {
        setBalance(NON_LOADING_DEFAULT_BASIC_STATE);
        console.error(
          `Failed to fetch token balance of ${address} for ARTH-DP: ${err.stack} `,
        );
      });
    } else {
      setBalance(NON_LOADING_DEFAULT_BASIC_STATE);
    }
  }, [address, blockNumber, core, fetchBalance]);

  return balance;
};

export default useGetDepositBalance;
