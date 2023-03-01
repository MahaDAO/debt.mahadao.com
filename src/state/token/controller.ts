import { Dispatch } from '@reduxjs/toolkit';

import config from '../../config';
import {IMulticallInput} from '../../utils/interface';
import { Protocol } from '../../protocol/Protocol';

import * as Actions from './actions';
import { BigNumber } from 'ethers';

export const initUser = (core: Protocol, dispatch: Dispatch, chainId: number) => {
  setTimeout(() => _initUser(core, dispatch, chainId), 3000);
  _initUser(core, dispatch, chainId)
};
 
const _initUser = (core: Protocol, dispatch: Dispatch, chainId: number) => {

  for (const token of config.supportedTokens) {

    core.multicall[chainId].on(`BALANCE_OF_${token}`, (bal) =>{

      dispatch(
        Actions.updateBalanceOf({
          bal,
          who: core.myAccount,
          token: core.tokens['ARTH-DP'].address,
        }),
      )
    });
    core.multicall[chainId].on(`TOTAL_SUPPLY_OF_${token}`, (supply) =>{
      dispatch(
        Actions.updateTotalSupply({
          supply,
          token: core.tokens['ARTH-DP'].address,
        }),
      )
    });
    core.multicall[chainId].on(`YOUR_ALLOCATION_${token}`, (allocation) =>{
      dispatch(
        Actions.updateAllocation({
          allocation,
          account: core.myAccount,
        }),
      )
    });
    core.multicall[chainId].on(`YOUR_REWARDS_${token}`, (rewards) =>{
      dispatch(
        Actions.updateRewards({
          rewards,
          account: core.myAccount,
        }),
      )
    });
  }

  const addCallsArray: Array<IMulticallInput> = [];

  for (const token of config.supportedTokens) {
    addCallsArray.push(
      {
      key: `BALANCE_OF_${token}`,
      target: core.tokens['ARTH-DP'].address,
      call: ['balanceOf(address)(uint256)', core.myAccount],
      convertResult: (val: any) => val,
      },
      {
        key: `TOTAL_SUPPLY_OF_${token}`,
        target: core.tokens['ARTH-DP'].address,
        call: ['totalSupply()(uint256)'],
        convertResult: (val: any) => val,
      },
      {
        key: `YOUR_ALLOCATION_${token}`,
        target: core.contracts['Staking-RewardsV2'].address,
        call: ['balanceOf(address)(uint256)', core.myAccount],
        convertResult: (val: any) => val,
      },
      {
        key: `YOUR_REWARDS_${token}`,
        target: core.contracts['Staking-RewardsV2'].address,
        call: ['earned(address)(uint256)', core.myAccount],
        convertResult: (val: any) => val,
      },
    );
  }

  core.multicall[chainId].addCalls(addCallsArray);
};
