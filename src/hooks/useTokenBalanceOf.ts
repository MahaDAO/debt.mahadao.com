import { BigNumber } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useWallet } from 'use-wallet';

import ERC20 from '../protocol/ERC20';
import { AppState } from '../state';
import { useBlockNumber } from '../state/application/hooks';
import useCore from './useCore';

type State = {
  isLoading: boolean;
  value: BigNumber;
};

const useTokenBalanceOf = (token: ERC20, address: string) => {
  const [balance, setBalance] = useState<State>({ isLoading: true, value: BigNumber.from(0) });

  const balanceOf = useSelector(
    (state: AppState) => state.token.balanceOf[token?.address || ''],
  );

  const core = useCore();
  const { account } = useWallet();
  const blockNumber = useBlockNumber();


  const fetchBalance = useCallback(async () => {
    if (!account) {
      setBalance({ isLoading: false, value: BigNumber.from(0) });
      return;
    }


    if (balanceOf && balanceOf[core.myAccount] && core.myAccount === address) {
      setBalance({ isLoading: false, value: balanceOf[core.myAccount] });
      return;
    }

    const bal = await token.balanceOf(address);
    setBalance({ isLoading: false, value: bal });
  }, [account, token, address, balanceOf, core.myAccount]);

  useEffect(() => {
    if (!token || !token?.address) {
      setBalance({ isLoading: true, value: BigNumber.from(0) });
    } else if (core.isUnlocked && address) {
      fetchBalance().catch((err) =>
        console.error(
          `Failed to fetch token balance of ${address} for ${token.address}: ${err.stack} `,
        ),
      );
    }
  }, [address, blockNumber, account, core.isUnlocked, fetchBalance, token]);

  return balance;
};

export default useTokenBalanceOf;
