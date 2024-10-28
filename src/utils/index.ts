import { Address } from "viem";

export function truncateAddress(address: Address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
