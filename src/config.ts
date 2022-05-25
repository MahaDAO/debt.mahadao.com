import { Configuration } from './utils/interface';

const configurations: { [env: string]: Configuration } = {
  maticMumbai: {
    networkName: 'Matic Mumbai Testnet',
    networkDisplayName: 'Polygon testnet',
    chainId: 80001,
    etherscanUrl: 'https://mumbai.polygonscan.com',
    defaultProvider:
      'https://matic-mumbai.chainstacklabs.com',
    deployments: require('./protocol/deployments/maticMumbai.json'),
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
    blockchainToken: 'MATIC',
    blockchainTokenName: 'MATIC',
    blockchainTokenDecimals: 18,
    networkSetupDocLink: 'https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/',
    supportedTokens: [
      'ARTH',
      'MAHA',
      'DAI',
      'USDC',
      'SCLP'
    ],
    decimalOverrides: {
      USDC: 6,
    },
  },
  /*matic: {
    networkName: 'Matic Mainnet',
    networkDisplayName: 'Polygon',
    chainId: 137,
    etherscanUrl: 'https://polygonscan.com',
    defaultProvider:
      'https://solitary-crimson-wind.matic.quiknode.pro/d9d5c0846efe6098a99c0a8a2c7238692ca33ce0/',
    deployments: require('./protocol/deployments/matic.json'),
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
    blockchainToken: 'MATIC',
    blockchainTokenName: 'MATIC',
    blockchainTokenDecimals: 18,
    networkSetupDocLink: 'https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/'
  }*/
};

export default configurations['maticMumbai'|| 'matic'];
