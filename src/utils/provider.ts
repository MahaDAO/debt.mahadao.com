"use client";

import { ethers } from "ethers";

import { Configuration } from "./interface";

export function getDefaultProvider(
  config: Configuration
): ethers.providers.BaseProvider {
  // @ts-ignore
  const _window: { ethereum?: any; web3?: any } = window;

  // Modern dapp browsers.
  if (_window.ethereum) {
    try {
      // Request account access
      // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      // App.YOUR_ADDRESS = accounts[0]
    } catch (error) {
      // User denied account access...
      console.error("User denied account access");
    }

    return new ethers.providers.Web3Provider(_window.ethereum);
  }

  // Legacy dapp browsers...
  if (_window.web3) {
    return new ethers.providers.Web3Provider(_window.web3.currentProvider);
  }

  // If no injected web3 instance is detected, fall back to backup node.
  return new ethers.providers.JsonRpcProvider(config.defaultProvider);
}
