import IERC20 from "./abi/IERC20.json";
import MockERC20 from "./abi/MockERC20.json";
import { IABIS } from "../../utils/interface";
import DebtPool from "./abi/DebtPool.json";
import DebtToken from "./abi/DebtToken.json";
import StakingRewardsV2 from "./abi/StakingRewardsV2.json"
import MatchingMarket from "./abi/MatchingMarket.json"
import Snapshot from "./abi/Snapshot.json"

const abis: IABIS = {
  IERC20,
  MockERC20,
  DebtPool,
  DebtToken,
  StakingRewardsV2,
  MatchingMarket,
  Snapshot
};

export default abis;
