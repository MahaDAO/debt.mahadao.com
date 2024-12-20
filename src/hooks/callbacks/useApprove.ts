import { BigNumber, ethers } from "ethers";
import { useCallback, useMemo } from "react";

import ERC20 from "../../protocol/ERC20";
import useAllowance from "../state/useAllowance";
import {
  useHasPendingApproval,
  useTransactionAdder,
} from "../../state/transactions/hooks";
import useCore from "../useCore";

const APPROVE_AMOUNT = ethers.constants.MaxUint256;
const APPROVE_BASE_AMOUNT = BigNumber.from("1000000000000000000000000");

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

/**
 * Returns a variable indicating the state of the approval and a function which
 * approves if necessary or early returns.
 */
function useApprove(
  token: ERC20,
  spender: string
): [ApprovalState, () => Promise<void>] {
  const core = useCore();
  const pendingApproval = useHasPendingApproval(token?.address, spender);
  const currentAllowance = useAllowance(token, spender, pendingApproval);

  // Check the current approval status.
  const approvalState: ApprovalState = useMemo(() => {
    // We might not have enough data to know whether or not we need to approve.
    if (!currentAllowance) return ApprovalState.UNKNOWN;

    // The amountToApprove will be defined if currentAllowance is.
    return currentAllowance.lt(APPROVE_BASE_AMOUNT)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [currentAllowance, pendingApproval]);

  const addTransaction = useTransactionAdder();

  const approve = useCallback(async (): Promise<void> => {
    if (
      approvalState !== ApprovalState.NOT_APPROVED &&
      approvalState !== ApprovalState.UNKNOWN
    ) {
      console.error("Approve was called unnecessarily");
      return;
    }

    // @ts-ignore
    let symbol = token.symbol;
    try {
      const response = await token.approve(spender, APPROVE_AMOUNT);
      addTransaction(response, {
        summary: `Approve ${symbol}`,
        approval: {
          tokenAddress: token.address,
          spender: spender,
        },
      });
    } catch (error) {
      console.log("approve error", error);
    }
  }, [approvalState, token, spender, addTransaction]);

  return [approvalState, approve];
}

export default useApprove;
