import { createAction } from '@reduxjs/toolkit';
import { BigNumber } from 'ethers';
import { BasicState } from '../../utils/interface';

export type BalanceOfType = { bal: BigNumber; who: string; token: string };
export const updateBalanceOf = createAction<BalanceOfType>('token/updateBalanceOf');

export type AllowanceType = {bal: BigNumber; account: string; spender: string };
export const updateAllowance = createAction<AllowanceType>('token/updateAllowance')

export type TotalSupplyType = {supply: BigNumber, token: string, }
export const updateTotalSupply = createAction<TotalSupplyType>('token/updateTotalSupply')

export type AllocationType = {allocation: BigNumber, account: string}
export const updateAllocation = createAction<AllocationType>('token/updateAllocation')

export type RewardsType = {rewards: BigNumber, account: string}
export const updateRewards = createAction<RewardsType>('token/updateRewards')

export type GetOrderType = {offers: any, lastId: BigNumber}
export const updateOrdersList = createAction<GetOrderType>('token/updateOrdersList')