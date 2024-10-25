import { BigNumber } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils";

export function balanceToDecimal(s: string): string {
  return formatUnits(s);
}

export function decimalToBalance(d: string | number, decimals = 18): BigNumber {
  return parseUnits(String(d), decimals);
}
