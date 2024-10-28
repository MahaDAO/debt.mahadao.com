import { BigNumber } from "ethers";
import { useCallback } from "react";
import Numeral from "numeral";
import { parseUnits } from "ethers/lib/utils";

import useCore from "../useCore";
import { useTransactionAdder } from "../../state/transactions/hooks";
import { useAddPopup } from "../../state/application/hooks";
import formatErrorMessage from "../../utils/formatErrorMessage";
import { formatToBN, getDisplayBalance } from "../../utils/formatBalance";
import MatchingMarket from "../../protocol/deployments/abi/MatchingMarket.json";
const useSellOffer = (
  pay_amt: BigNumber,
  buy_amt: BigNumber,
  txAction: string,
  quoteTokenName: string
) => {
  const core = useCore();

  const pay_gem =
    txAction === "Buy"
      ? core.tokens[quoteTokenName].address
      : core.tokens["ARTH-DP"].address;
  const buy_gem =
    txAction === "Buy"
      ? core.tokens["ARTH-DP"].address
      : core.tokens[quoteTokenName].address;

  const addTransaction = useTransactionAdder();
  const addPopup = useAddPopup();

  const action = useCallback(
    async (callback?: (responseHash?: string) => void): Promise<void> => {
      try {
        const contract = core.contracts["MatchingMarket"];
        const response = await contract[
          "offer(uint256,address,uint256,address,uint256,bool)"
        ](pay_amt, pay_gem, buy_amt, buy_gem, BigNumber.from("0"), true, {});

        addTransaction(response, {
          summary: `${txAction} ${Numeral(
            getDisplayBalance(buy_amt, 6, 3)
          ).format("0,0.00a")} ${core.tokens["ARTH-DP"].symbol}`,
        });

        if (callback) callback(response.hash);
      } catch (e: any) {
        console.log("useSelloffer e", e);

        addPopup({
          error: {
            message: formatErrorMessage(e?.data?.message || e?.message),
            stack: e.stack,
          },
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [core, pay_amt, buy_amt]
  );

  return action;
};

export default useSellOffer;
