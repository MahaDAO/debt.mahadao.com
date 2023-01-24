import { useWallet } from 'use-wallet';
import React, { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import config from '../../config';
import Protocol from '../../protocol';
import { ProtocolContext } from '../../utils/interface';

export const Context = createContext<ProtocolContext>({ core: new Protocol(config) });

export const ProtocolProvider = ({ children }: any) => {
  const [core, setCore] = useState<Protocol>(new Protocol(config));

  const { ethereum, account } = useWallet();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!core && config) {
      const newCore = new Protocol(config);
      if (account) {
        // Wallet was unlocked at initialization.
        newCore.unlockWallet(ethereum, account, dispatch);
        console.log('unlockWallet newCore')
      }
      setCore(newCore);
    } else if (account) {
      core.unlockWallet(ethereum, account, dispatch);
      console.log('unlockWallet oldCore')
    }
  }, [account, core, ethereum]);

  return <Context.Provider value={{ core }}>{children}</Context.Provider>;
};
