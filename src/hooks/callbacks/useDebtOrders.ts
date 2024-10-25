import { BigNumber, ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  Multicall,
  ContractCallResults,
  ContractCallContext,
} from "ethereum-multicall";

import useCore from "../useCore";
import abi from "../../protocol/deployments/abi/MatchingMarket.json";
import { useActivePopups } from "@/state/application/hooks";

interface IOrders {
  id: number;
  pay_amt: BigNumber;
  pay_gem: string;
  buy_amt: BigNumber;
  buy_gem: string;
  owner: string;
  timestamp: string;
}

const useDebtOrders = (selectQuoteToken: string, responseHash?: string) => {
  const [orders, setSellOrderData] = useState<IOrders[]>([]);
  const activePopups = useActivePopups();
  const core = useCore();

  const currentPopups = activePopups.find(
    (popup) => popup.content.txn?.hash === responseHash
  );

  const transactionSuccess = !!currentPopups?.content.txn?.success;

  const getSellOrderData = useCallback(async () => {
    const contract = await core.contracts["MatchingMarket"];
    const testLastOfferId = await contract.last_offer_id();

    // you can use any ethers provider context here this example is
    // just shows passing in a default provider, ethers hold providers in
    // other context like wallet, signer etc all can be passed in as well.
    const multicall = new Multicall({
      // @ts-ignore
      ethersProvider: core.provider,
      tryAggregate: true,
    });

    const calls = [];

    console.log("lastOfferId", testLastOfferId.toString());

    for (let i = 1; i <= testLastOfferId.toString(); i++) {
      calls.push({
        reference: "fooCall" + i,
        methodName: "offers",
        methodParameters: [i],
      });
    }

    const contractCallContext: ContractCallContext[] = [
      {
        reference: "testContract",
        contractAddress: contract.address,
        abi: abi,
        calls,
      },
    ];

    const results: ContractCallResults = await multicall.call(
      contractCallContext
    );

    const orders = results.results.testContract.callsReturnContext.map(
      (r, index) => ({
        id: index + 1,
        pay_amt: BigNumber.from(r.returnValues[0]),
        pay_gem: r.returnValues[1],
        buy_amt: BigNumber.from(r.returnValues[2]),
        buy_gem: r.returnValues[3],
        owner: r.returnValues[4],
        timestamp: r.returnValues[5],
      })
    );

    setSellOrderData(orders.filter((t) => t.buy_amt._hex !== "0x00"));
  }, [core.contracts, core.provider]);

  useEffect(() => {
    getSellOrderData();
  }, [getSellOrderData, selectQuoteToken]);

  useEffect(() => {
    if (transactionSuccess) {
      window.location.reload();
    }
  }, [getSellOrderData, transactionSuccess]);

  return orders;
};

export default useDebtOrders;
