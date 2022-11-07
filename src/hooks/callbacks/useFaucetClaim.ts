import { BigNumber } from 'ethers';
import { useCallback } from 'react';
import { useWallet } from 'use-wallet';

import { useAddPopup } from '../../state/application/hooks';
import { useTransactionAdder } from '../../state/transactions/hooks';

import useCore from '../useCore';
import formatErrorMessage from '../../utils/formatErrorMessage';

const useFaucetClaim = () => {
  const core = useCore();
  const addPopup = useAddPopup();
  const { account } = useWallet();
  const addTransaction = useTransactionAdder();

  const action = useCallback(async (callback?: () => void): Promise<void> => {
    try {
      const contract = core.contracts.MAHA;
      const response = await contract.mint(account, BigNumber.from(10).pow(18).mul(100));

      addTransaction(response, {
        summary: `Claim from Faucet.`
      });

      if (callback) callback();
    } catch (e: any) {
      addPopup({
        error: {
          message: formatErrorMessage(e?.data?.message || e?.message),
          stack: e?.stack,
        },
      });
    }
  }, [core, account, addPopup, addTransaction]);

  return action;
}

export default useFaucetClaim;
