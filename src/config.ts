import { Configuration } from './utils/interface';

const configurations: { [env: string]: Configuration } = {
  137: {
    networkName: 'Matic Mainnet',
    networkDisplayName: 'Polygon',
    chainId: 137,
    etherscanUrl: 'https://polygonscan.com',
    defaultProvider:
      // 'https://polygon-rpc.com/',
      'https://rpc.ankr.com/polygon',
    logHistoryProvider: 
      'https://polygon.llamarpc.com',
    deployments: require('./protocol/deployments/matic.json'),
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
    blockchainToken: 'MATIC',
    blockchainTokenName: 'MATIC',
    blockchainTokenDecimals: 18,
    networkSetupDocLink: 'https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/',
    supportedTokens: [
      'ARTH-DP',
      'USDC',
      'MAHA',
      'SCLP'
    ],
    decimalOverrides: {
      'ARTH-DP': 18,
      'USDC': 6
    },
  }
};

export default configurations[137];
