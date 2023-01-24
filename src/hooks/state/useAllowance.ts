import { BigNumber } from 'ethers';
import { useWallet } from 'use-wallet';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../useCore';
import ERC20 from '../../protocol/ERC20';
import { useBlockNumber } from '../../state/application/hooks';
import { useSelector } from 'react-redux';
import { AppState } from '../../state';

const useAllowance = (token: ERC20, spender: string, pendingApproval?: boolean) => {
  const [allowance, setAllowance] = useState<BigNumber>(BigNumber.from(0));

  const stateAllowance = useSelector(
    (state: AppState) => state.token.allowance[token.address]
  )

  const core = useCore();
  const { account } = useWallet();
  const blockNumber = useBlockNumber();

  const fetchAllowance = useCallback(async () => {
    if (!account) return;

    if(stateAllowance && stateAllowance[spender]){
      setAllowance(stateAllowance[spender])
      return
    }
    const allowance = await token.allowance(account, spender);
    setAllowance(allowance);
  }, [account, spender, token]);

  useEffect(() => {
    if (core.isUnlocked) {
      fetchAllowance().catch((err) =>
        console.log(
          `Failed to fetch allowance for ${token.address} ${account} ${spender}: ${err.stack}`,
        ),
      );
    }
  }, [account, core.isUnlocked, fetchAllowance, spender, token]);

  useEffect(() => {
    if (account && spender && token) {
      fetchAllowance().catch((err) => console.log(`Failed to fetch allowance: ${err.stack}`));
    }
  }, [account, blockNumber, spender, token, pendingApproval, fetchAllowance]);

  return allowance;
};

export default useAllowance;
