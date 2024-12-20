import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  bitgetWallet,
  bybitWallet,
  coinbaseWallet,
  foxWallet,
  frameWallet,
  frontierWallet,
  injectedWallet,
  krakenWallet,
  ledgerWallet,
  metaMaskWallet,
  okxWallet,
  phantomWallet,
  rabbyWallet,
  rainbowWallet,
  safeWallet,
  trustWallet,
  uniswapWallet,
  walletConnectWallet,
  zerionWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createClient, http } from "viem";
import { polygon } from "viem/chains";
import { createConfig } from "wagmi";

const WALLETCONNECT_PROJECT_ID = "ebd671c34120033073ea8c98274b161c";
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        injectedWallet,
        metaMaskWallet,
        walletConnectWallet,
        rabbyWallet,
        safeWallet,
        phantomWallet,
        coinbaseWallet,
        okxWallet,
      ],
    },
    {
      groupName: "3rd Party",
      wallets: [
        argentWallet,
        bitgetWallet,
        bybitWallet,
        foxWallet,
        frameWallet,
        frontierWallet,
        krakenWallet,
        ledgerWallet,
        rainbowWallet,
        trustWallet,
        uniswapWallet,
        zerionWallet,
      ],
    },
  ],
  {
    appName: "maha.xyz",
    projectId: WALLETCONNECT_PROJECT_ID as string,
  }
);

export const config = createConfig({
  connectors,
  chains: [polygon],
  client({ chain }) {
    return createClient({
      chain,
      transport: http(
        "https://polygon-mainnet.g.alchemy.com/v2/tHGWQIfQJXs1x3MLBehKqWiCe51nVHmO"
      ),
    });
  },
});

export const getChainConfig = (chainId: number) => {
  return config.chains.find((chain) => chain.id === chainId);
};
