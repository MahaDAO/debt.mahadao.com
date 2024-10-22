import { createContext, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { useEthersProvider, useEthersSigner } from "@/ethers";
import { useAccount } from "wagmi";
import config from "../../config";
import Protocol from "../../protocol";
import { ProtocolContext } from "../../utils/interface";

export const Context = createContext<ProtocolContext>({
  core: new Protocol(config),
});

export const ProtocolProvider = ({ children }: any) => {
  const provider = useEthersProvider();
  const signer = useEthersSigner();

  const [core, setCore] = useState<Protocol>(new Protocol(config, provider));

  // const { ethereum, account } = useWallet();
  const { address: account } = useAccount();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!core && config) {
      const newCore = new Protocol(config);
      if (account) {
        // Wallet was unlocked at initialization.
        newCore.unlockWallet(provider, account, dispatch, signer);
        console.log("unlockWallet newCore");
      }
      setCore(newCore);
    } else if (account) {
      core.unlockWallet(provider, account, dispatch, signer);
      console.log("unlockWallet oldCore");
    }
  }, [account, core, signer, provider]);

  const memoizedCore = useMemo(() => {
    return core;
  }, [core]);

  return (
    <Context.Provider value={{ core: memoizedCore }}>
      {children}
    </Context.Provider>
  );
};
