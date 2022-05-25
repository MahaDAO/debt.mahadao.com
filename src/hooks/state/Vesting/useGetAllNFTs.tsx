import { useWallet } from "use-wallet";
import { useCallback, useEffect, useState } from "react";
import useCore from "../../useCore";
import {BigNumber} from "ethers";
import useGetNumberOfNFTs from "./useGetNumberOfNFTs";

export interface IState {
  id: BigNumber;
  lockEnds: BigNumber;
  lockAmount: BigNumber;
  lockValue: BigNumber;
}

export interface IPassingState {
  isLoading: boolean;
  value: IState[];
}

export const Initial_Loading = {
  isLoading: true,
  value: [],
}

export const Initial_Non_Loading = {
  isLoading: false,
  value: [],
}

const useGetAllNFTs = () => {
  const [value, setValue] = useState<IPassingState>(
    Initial_Loading
  );

  const core = useCore();
  const { account } = useWallet();
  const contract = core.getVestingContract();
  const noOfNFTs = useGetNumberOfNFTs();

  const fetchData = useCallback(async () => {
    if (!account) {
      setValue(Initial_Non_Loading);
      return;
    }

    if (noOfNFTs.isLoading) {
      setValue(Initial_Loading)
    }

    const arr = Array.from({length: parseInt(noOfNFTs.value.toString())}, (v, i) => i)

    const nfts = await Promise.all(
      arr.map(async (idx) => {
        const nftId = await contract.tokenOfOwnerByIndex(account, idx)
        const locked = await contract.locked(nftId)
        const lockValue = await contract.balanceOfNFT(nftId)

        //ToDo: get Nft image
        /*const Nftbase64Data = await contract.tokenURI(nftId)
        const dataURI = Nftbase64Data;
        const json = atob(dataURI.substring(29));
        const Nftbase64DataFormatted = JSON.parse(json);*/

        return {
          id: nftId,
          lockEnds: locked[1],
          lockAmount: locked[0],
          lockValue: lockValue,
        }
      })
    )

    setValue({
      isLoading: false,
      value: nfts,
    })
  }, [account, contract, noOfNFTs.isLoading, noOfNFTs.value]);

  useEffect(() => {
    if (core) {
      setValue(Initial_Loading);
      fetchData().catch((err) => {
        setValue(Initial_Non_Loading);
        console.error(`Failed to fetch PoolToken rewards: ${err.stack}`);
      });
    }
  }, [setValue, core, account, fetchData]);

  return value;
};

export default useGetAllNFTs;
