import { BigNumber, ethers } from 'ethers';
import { useCallback, useMemo } from 'react';

import ERC20 from '../../protocol/ERC20';
import useAllowance from '../state/useAllowance';
import { useHasPendingApproval, useTransactionAdder } from '../../state/transactions/hooks';
import useCore from '../useCore';
import { current } from '@reduxjs/toolkit';

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
};

/**
 * Returns a variable indicating the state of the approval and a function which 
 * approves if necessary or early returns.
 */
function useApprove(token: ERC20, spender: string, approveAmount: string): [ApprovalState, () => Promise<void>] {
  const core = useCore()
  const pendingApproval = useHasPendingApproval(token?.address, spender);
  const currentAllowance = useAllowance(token, spender, pendingApproval);
  // Check the current approval status.
  const approvalState: ApprovalState = useMemo(() => {
    // We might not have enough data to know whether or not we need to approve.
    if (approveAmount == "")
      return ApprovalState.UNKNOWN;
    console.log(currentAllowance, BigNumber.from(String(Number(approveAmount) * 1000000)))
    if (!currentAllowance || currentAllowance < BigNumber.from(String(Number(approveAmount) * 1000000))) {
      return ApprovalState.NOT_APPROVED;
    }

    return currentAllowance.lt(BigNumber.from(approveAmount))
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [currentAllowance, pendingApproval]);

  const addTransaction = useTransactionAdder();
  const approve = useCallback(async (): Promise<void> => {
    console.log('approval-state', approvalState);
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('Approve was called unnecessarily');
      return;
    }


    // @ts-ignore
    let symbol =  token.symbol
    try {
      console.log('-----', approveAmount, '-----');
      const response = await token.approve(spender, BigNumber.from(String(Number(approveAmount) * 1000000)));
      addTransaction(response, {
        summary: `Approve ${symbol}`,
        approval: {
          tokenAddress: token.address,
          spender: spender,
        },
      });
      
    } catch (error) {
      console.log('approve error', error)
    }

  }, [approvalState, token, spender, addTransaction]);

  return [approvalState, approve];
};

export default useApprove;
