import { useWallet } from 'use-wallet';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../useCore';
import { RewardEarned } from '../../utils/interface';
import { LOADING_DEFAULT_REWARD_EARNED, NON_LOADING_DEFAULT_REWARD_EARNED } from '../../utils/constants';


const useGetDirectorsDebtPool = (symbol: string | null) => {
  const [state, setState] = useState<RewardEarned>(LOADING_DEFAULT_REWARD_EARNED);
  const core = useCore();
  const { account } = useWallet();


  const action = useCallback(async () => {
    const contract = symbol === 'ARTH' ? core.contracts.DebtPoolArth : core.contracts.DebtPoolArthX;;
    const Directors: any = await contract.directors(account);

    const newState: RewardEarned = {
      isLoading: false,
      value: Directors?.rewardEarned
    }

    setState(newState)
  }, [account, symbol, core])

  useEffect(() => {
    if (core && account) {
      action().catch((err) => {
        setState(NON_LOADING_DEFAULT_REWARD_EARNED);
        console.error(`Failed to locked state: ${err.stack}`)
      });
    } else {
      setState(NON_LOADING_DEFAULT_REWARD_EARNED);
    }
  }, [core, action, account]);

  return state;
}

export default useGetDirectorsDebtPool
