import { BigNumber } from 'ethers';
import {
  BasicState,
  LockedState,
  RewardEarned,
  ApplicationState,
  TransactionState,
  DateInput,
  SingleDateInput,
  EthereumConfig,
  BasicStateString,
  PoolTokenRateState,
  DebtPoolTokenRateState
} from './interface';

export const DAY = 86400;
export const DAY_IN_MS = 86400000;

export const YEAR = 365 * 86400;
export const YEAR_IN_MS = YEAR * 1000;

export const MONTH = 31 * 24 * 60 * 60;
export const MONTH_IN_MS = MONTH * 1000;

export const WEEK = 7 * 86400;
export const WEEK_IN_MS = 7 * 86400000;

export const MAXTIME = 4 * 365 * 86400;
export const MAXTIME_IN_MS = 4 * 365 * 86400000;

export const LOADING_DEFAULT_BASIC_STATE: BasicState = {
  isLoading: true,
  value: BigNumber.from(0)
};

export const NON_LOADING_DEFAULT_BASIC_STATE: BasicState = {
  isLoading: false,
  value: BigNumber.from(0)
};

export const LOADING_DEBTPOOLTOKEN_RATE_STATE: DebtPoolTokenRateState = {
  isLoading: true,
  poolToken: BigNumber.from(0),
  arth: BigNumber.from(0),
  usdc: BigNumber.from(0),
  maha: BigNumber.from(0)
};

export const NON_LOADING_DEBTPOOLTOKEN_RATE_STATE: DebtPoolTokenRateState = {
  isLoading: false,
  arth: BigNumber.from(0),
  poolToken: BigNumber.from(0),
  usdc: BigNumber.from(0),
  maha: BigNumber.from(0)
};

export const LOADING_DEFAULT_LOCKED_STATE: LockedState = {
  isLoading: true,
  lockedOn: BigNumber.from(0),
  lockedUntil: BigNumber.from(0),
  amountLocked: BigNumber.from(0)
};

export const LOADING_DEFAULT_BASIC_STATE_STRING: BasicStateString = {
  isLoading: true,
  value: "",
};

export const LOADING_POOLTOKEN_RATE_STATE: PoolTokenRateState = {
  isLoading: true,
  arth: BigNumber.from(0),
  usdc: BigNumber.from(0),
  maha: BigNumber.from(0),
  scallop: BigNumber.from(0),
};

export const NON_LOADING_POOLTOKEN_RATE_STATE: PoolTokenRateState = {
  isLoading: false,
  arth: BigNumber.from(0),
  usdc: BigNumber.from(0),
  maha: BigNumber.from(0),
  scallop: BigNumber.from(0),
};

export const NON_LOADING_DEFAULT_BASIC_STATE_STRING: BasicStateString = {
  isLoading: false,
  value: "0",
};

export const NON_LOADING_DEFAULT_LOCKED_STATE: LockedState = {
  isLoading: false,
  lockedOn: BigNumber.from(0),
  lockedUntil: BigNumber.from(0),
  amountLocked: BigNumber.from(0)
};

export const LOADING_DEFAULT_REWARD_EARNED: RewardEarned = {
  isLoading: true,
  value: BigNumber.from(0)
};

export const NON_LOADING_DEFAULT_REWARD_EARNED: RewardEarned = {
  isLoading: false,
  value: BigNumber.from(0)
};

export const DEFAULT_ETHEREUM_CONFIG: EthereumConfig = {
  testing: false,
  autoGasMultiplier: 1.5,
  defaultConfirmations: 1,
  defaultGas: '6000000',
  defaultGasPrice: '1000000000000',
  ethereumNodeTimeout: 10000,
};

export const DEFAULT_DATEINPUT_STATE: DateInput = {
  startDate: new Date(),
  endDate: new Date(
    Date.now() % DAY_IN_MS === 0 ? Date.now() + WEEK_IN_MS + DAY_IN_MS : (Math.floor(Date.now() / DAY_IN_MS) * DAY_IN_MS) + WEEK_IN_MS + DAY_IN_MS
  )
};

export const DEFAULT_SINGLE_DATEINPUT_STATE: SingleDateInput = new Date(
  Date.now() % DAY_IN_MS === 0 ? Date.now() + WEEK_IN_MS + DAY_IN_MS : (Math.floor(Date.now() / DAY_IN_MS) * DAY_IN_MS) + WEEK_IN_MS + DAY_IN_MS
);

export const DECIMALS_18 = BigNumber.from(10).pow(18);

export const INITIAL_APP_STATE: ApplicationState = {
  blockNumber: {},
  popupList: [],
  walletModalOpen: false,
  settingsMenuOpen: false,
};

export const INITIAL_TRANSACTION_STATE: TransactionState = {};

export const BNZERO = BigNumber.from(0);
export const BNHUNDRED = BigNumber.from(100);

export const noOp = () => { };

export const handleDate = (date: any) => {
  return new Date(date.setHours(0, 0, 0, 0));
}

export const addDays = (date: Date, no: number = 1) => {
  return handleDate(new Date(date.getTime() + (DAY_IN_MS) * no));
}

export const addWeeks = (date: Date, no: number = 1) => {
  return handleDate(new Date(date.getTime() + (WEEK_IN_MS) * no));
}

export const addMonths = (date: Date, no: number = 1) => {
  return handleDate(new Date(date.getTime() + MONTH_IN_MS * no));
}

export const addYears = (date: Date, no: number = 1) => {
  return handleDate(new Date(date.getTime() + YEAR_IN_MS * no));
}
