import { createReducer } from '@reduxjs/toolkit';
import { BigNumber } from 'ethers';
import { BasicState } from '../../utils/interface';

import * as Actions from './actions';

export interface TokenState {
  balanceOf: {
    [token: string]: {
      [who: string]: BigNumber;
    };
  };
  allowance: {
    [account: string]: {
      [spender: string]: BigNumber
    }
  }
  totalSupply: {
    [token: string]: BigNumber
  }
  yourAllocation: {
    [account: string]: BigNumber
  },
  yourRewards: {
    [account: string]: BigNumber
  }
}

export const initialState: TokenState = {
  balanceOf: {},
  allowance: {},
  totalSupply: {},
  yourAllocation: {},
  yourRewards: {}
};

export default createReducer(initialState, (builder) => {
    builder
      .addCase(
      Actions.updateBalanceOf,
      (t, { payload }: { payload: Actions.BalanceOfType }) => {
        console.log("updateBalanceOf reducer", t, payload)
        t.balanceOf = t.balanceOf || {};
        t.balanceOf[payload.token] = t.balanceOf[payload.token] || {};
        t.balanceOf[payload.token][payload.who] = payload.bal;
      })
      .addCase(
        Actions.updateAllowance,
        (t, { payload }: { payload: Actions.AllowanceType }) => {
          t.allowance = t.allowance || {};

          t.allowance[payload.account] = t.allowance[payload.account] || {}
          t.allowance[payload.account][payload.spender] = payload.bal
        })
      .addCase(
        Actions.updateTotalSupply,
        (t, { payload }: { payload: Actions.TotalSupplyType }) => {

          t.totalSupply = t.totalSupply || {};
          t.totalSupply[payload.token] = t.totalSupply[payload.token] || {}
          t.totalSupply[payload.token] = payload.supply
      })
      .addCase(
        Actions.updateAllocation,
        (t, {payload}: {payload: Actions.AllocationType}) => {
          t.yourAllocation = t.yourAllocation || {};
          t.yourAllocation[payload.account] = t.yourAllocation[payload.account] || {}
          t.yourAllocation[payload.account] = payload.allocation
      })
      .addCase(
        Actions.updateRewards,
        (t, {payload}: {payload: Actions.RewardsType}) => {
          t.yourRewards = t.yourRewards || {};
          t.yourRewards[payload.account] = t.yourRewards[payload.account] || {}
          t.yourRewards[payload.account] = payload.rewards
        }
      )
      // .addCase(
      //   Actions.updateOrdersList,
      //   (t, {payload}: {payload: Actions.GetOrderType}) => {

      //   }
      // )

  }
);


