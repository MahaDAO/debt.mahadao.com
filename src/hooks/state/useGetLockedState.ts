import { useCallback, useEffect, useState } from 'react';

import useCore from '../useCore';
import { LockedState } from '../../utils/interface';
import { useBlockNumber } from '../../state/application/hooks';
import { LOADING_DEFAULT_LOCKED_STATE, NON_LOADING_DEFAULT_LOCKED_STATE } from '../../utils/constants';

const useGetLockedState = (address: string | null) => {
  const [state, setState] = useState<LockedState>(LOADING_DEFAULT_LOCKED_STATE);

  const core = useCore();
  const blockNumber = useBlockNumber();

  const fetchValue = useCallback(async () => {
    const gasOptions = core.gasOptions();
    const lockedState: any = await core.contracts.VotingEscrow.locked(address, gasOptions);
    const newState: LockedState = {
      isLoading: false,
      lockedOn: lockedState.start,
      amountLocked: lockedState.amount,
      lockedUntil: lockedState.end
    }
    setState(newState);
  }, [core, address]);

  useEffect(() => {
    if (core && address) {
      fetchValue().catch((err) => {
        setState(NON_LOADING_DEFAULT_LOCKED_STATE);
        console.error(`Failed to locked state: ${err.stack}`)
      });
    } else {
      setState(NON_LOADING_DEFAULT_LOCKED_STATE);
    }
  }, [blockNumber, core, fetchValue, address]);

  return state;
};

export default useGetLockedState;
