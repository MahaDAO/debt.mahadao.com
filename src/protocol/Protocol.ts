import { BigNumber, Contract, ethers, Overrides, providers } from "ethers";

import ERC20 from "./ERC20";
import ABIS from "./deployments/abi";
import { Configuration } from "../utils/interface";
import { getDefaultProvider } from "../utils/provider";
import Multicall from "./Multicall";
import * as tokenState from "../state/token/controller";

/**
 * An API module of ARTH contracts.
 * All contract-interacting domain logic should be defined in here.
 */
export class Protocol {
  myAccount!: string;
  signer?: ethers.Signer;

  config: Configuration;
  contracts: { [name: string]: Contract };
  provider: ethers.providers.BaseProvider;

  // 'ARTH-DP': ERC20;
  // ARTH: ERC20;
  // USDC: ERC20;
  // SCLP: ERC20;

  tokens: {
    [name: string]: ERC20;
  };

  multicall!: { [chainId: number]: Multicall };

  constructor(cfg: Configuration, provider?: any) {
    const { deployments, supportedTokens } = cfg;
    console.log("deployments", deployments);

    // @ts-ignore
    this.multicall = { 137: {} };

    this.contracts = {};
    this.tokens = {};
    for (const [name, deployment] of Object.entries(deployments)) {
      if (!deployment.abi) continue;
      this.contracts[name] = new Contract(
        deployment.address,
        ABIS[deployment.abi],
        provider
      );
      if (supportedTokens.includes(name)) {
        this.tokens[name] = new ERC20(
          deployments[name].address,
          provider,
          name,
          cfg.decimalOverrides[name] || 18
        );
      }

      this.multicall[137] = new Multicall(
        cfg.defaultProvider,
        deployments[name].address
      );
    }

    this.config = cfg;
    this.provider = provider;
  }

  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  async unlockWallet(
    provider: any,
    account: string,
    dispatch: any,
    signer?: providers.JsonRpcSigner
  ) {
    const newProvider = new ethers.providers.Web3Provider(
      provider,
      this.config.chainId
    );

    // await newProvider.send("eth_requestAccounts", []);
    this.signer = signer;
    this.myAccount = account;

    console.log("newProvider", newProvider);
    console.log("this.signer", this.signer);

    for (const [name, contract] of Object.entries(this.contracts)) {
      this.contracts[name] = contract.connect(
        this.signer as providers.JsonRpcSigner
      );
    }

    for (const token of Object.values(this.tokens)) {
      if (token && token.address)
        token.connect(this.signer as providers.JsonRpcSigner);
    }

    console.log("about to call init user");

    tokenState.initUser(this, dispatch, 137);
  }

  get isUnlocked(): boolean {
    return !!this.myAccount;
  }

  gasOptions(gas: BigNumber = BigNumber.from("6000000")): Overrides {
    const multiplied = Math.floor(
      gas.toNumber() * this.config.gasLimitMultiplier
    );
    return {
      gasLimit: BigNumber.from(multiplied),
    };
  }
}
