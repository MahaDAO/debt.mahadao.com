import IERC20 from "./abi/IERC20.json";
import MockERC20 from "./abi/MockERC20.json";
import { IABIS } from "../../utils/interface";
import DebtPool from "./abi/DebtPool.json";
import ArthDebtPool from "./abi/ArthDebtPool.json";
import StakingRewardsV2 from "./abi/StakingRewardsV2.json"
import MatchingMarket from "./abi/MatchingMarket.json"

const abis: IABIS = {
  IERC20,
  MockERC20,
  DebtPool,
  ArthDebtPool,
  StakingRewardsV2,
  MatchingMarket
};

export default abis;
