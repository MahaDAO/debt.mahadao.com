import { BigNumber } from 'ethers';
import Protocol from '../protocol';

export type BasicState = {
  isLoading: boolean;
  value: BigNumber;
};

export type BasicStateString = {
  isLoading: boolean;
  value: string;
}

export type IModalProps = {
  openModal: boolean;
  onModalClose: () => void;
};

export type RewardEarned = {
  isLoading: boolean;
  value: BigNumber;
};

export type DebtPoolTokenRateState = {
  isLoading: boolean;
  poolToken: BigNumber;
  arth: BigNumber;
  maha: BigNumber;
  usdc: BigNumber;
};

export type LockedState = {
  isLoading: boolean;
  lockedOn: BigNumber;
  lockedUntil: BigNumber;
  amountLocked: BigNumber;
};

export type PoolTokenRateState = {
  isLoading: boolean;
  arth: BigNumber;
  maha: BigNumber;
  usdc: BigNumber;
  scallop: BigNumber;
};

export type IABIS = {
  [key: string]: any[];
};

export type Deployments = {
  [contractName: string]: {
    address: string;
    abi: string;
  };
};

export type EthereumConfig = {
  testing: boolean;
  autoGasMultiplier: number;
  defaultConfirmations: number;
  defaultGas: string;
  defaultGasPrice: string;
  ethereumNodeTimeout: number;
};

export type Configuration = {
  chainId: number;
  networkName: string;
  networkDisplayName: string;
  etherscanUrl: string;
  defaultProvider: string;
  deployments: Deployments;
  config?: EthereumConfig;
  blockchainToken: 'MATIC' | 'ETH' | 'BNB';
  refreshInterval: number;
  gasLimitMultiplier: number;
  blockchainTokenName: string;
  blockchainTokenDecimals: number;
  networkSetupDocLink?: string;
  supportedTokens: string[];
  decimalOverrides: { [name: string]: number };
}

export interface IMulticallInput {
  key: string;
  target: string;
  call: (string | number)[];
  convertResult: (val: any) => any;
};

export type DateInput = {
  startDate: any,
  endDate: any
};

export type PopupContent = {
  txn?: {
    hash: string;
    success: boolean;
    loading?: boolean;
    summary?: string;
  };
  error?: {
    message: string;
    stack: string;
  };
};

export type PopupList = Array<{
  key: string;
  show: boolean;
  content: PopupContent;
  removeAfterMs: number | null;
}>;

export interface ApplicationState {
  blockNumber: { [chainId: number]: number };
  popupList: PopupList;
  walletModalOpen: boolean;
  settingsMenuOpen: boolean;
};

export interface TransactionDetails {
  hash: string;
  approval?: { tokenAddress: string; spender: string };
  summary?: string;
  receipt?: SerializableTransactionReceipt;
  lastCheckedBlockNumber?: number;
  addedTime: number;
  confirmedTime?: number;
  from: string;
};

export interface TransactionState {
  [chainId: number]: {
    [txHash: string]: TransactionDetails;
  };
};

export interface SerializableTransactionReceipt {
  to: string;
  from: string;
  contractAddress: string;
  transactionIndex: number;
  blockHash: string;
  transactionHash: string;
  blockNumber: number;
  status?: number;
};

export interface ModalsContext {
  content?: React.ReactNode,
  isOpen?: boolean,
  onPresent: (content: React.ReactNode) => void,
  onDismiss: () => void
};

export interface ProtocolContext {
  core: Protocol;
};

export type SingleDateInput = Date | number | string;
