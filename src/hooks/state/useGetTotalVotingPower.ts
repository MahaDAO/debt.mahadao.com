import { BigNumber } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../useCore';
import { BasicState } from '../../utils/interface';
import { useBlockNumber } from '../../state/application/hooks';
import { LOADING_DEFAULT_BASIC_STATE, NON_LOADING_DEFAULT_BASIC_STATE } from '../../utils/constants';

const useGetTotalVotingPower = () => {
  const [state, setState] = useState<BasicState>(LOADING_DEFAULT_BASIC_STATE);

  const core = useCore();
  const blockNumber = useBlockNumber();

  const fetchValue = useCallback(async () => {
    const gasOptions = core.gasOptions();
    const totalSupply: BigNumber = await core.contracts.VotingEscrow["totalSupply(uint256)"](
      Math.floor(Date.now() / 1000),
      gasOptions
    );
    const newState: BasicState = {
      isLoading: false,
      value: totalSupply
    }
    setState(newState);
  }, [core,]);

  useEffect(() => {
    if (core) {
      fetchValue().catch((err) => {
        setState(NON_LOADING_DEFAULT_BASIC_STATE);
        console.error(`Failed to fetch total voting power: ${err.stack}`)
      });
    } else {
      setState(NON_LOADING_DEFAULT_BASIC_STATE);
    }
  }, [blockNumber, core, fetchValue]);

  return state;
};

export default useGetTotalVotingPower;
