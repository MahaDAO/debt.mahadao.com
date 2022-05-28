import IERC20 from "./abi/IERC20.json";
import MockERC20 from "./abi/MockERC20.json";
import { IABIS } from "../../utils/interface";
import DebtPool from "./abi/DebtPool.json";
import ArthDebtPool from "./abi/ArthDebtPool.json"


const abis: IABIS = {
  IERC20,
  MockERC20,
  DebtPool,
  ArthDebtPool
};

export default abis;
