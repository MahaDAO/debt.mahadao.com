import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import React, { useState } from 'react';
import { BigNumber, utils } from 'ethers';

import Button from '../../Button/Button';
import IconLoader from "../../IconLoader";
import DesktopWalletInfo from "./modal/WalletInfo/DesktopWalletInfo";

import config from '../../../config';
import { truncateMiddle } from '../../../utils';
import { BackgroundAbsolute } from "../../Selector";
import ChooseWallet from "./modal/WalletInfo/ChooseWallet";

interface AccountButtonProps {
  showWarning: boolean;
}

const AccountButton: React.FC<AccountButtonProps> = ({
  showWarning = false
}: AccountButtonProps) => {
  const [showWalletInfo, setShowWalletInfo] = useState<boolean>(false);
  const [showWalletOption, setShowWalletOption] = useState<boolean>(false);

  const { account, ethereum }: { account: any, ethereum?: any } = useWallet();

  const switchMetamaskChain = () => {
    // @ts-ignore
    if (window.ethereum) {
      // @ts-ignore
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: utils.hexStripZeros(BigNumber.from(config.chainId).toHexString()) }],
      })
        .then(() => {
          window.location.reload();
        })
        .catch((error: any) => {
          if (error.code === 4902) addNetworkToMetamask();
        });
    }
  }

  const addNetworkToMetamask = () => {
    if (!ethereum?.request) return;
    if (ethereum) {
      ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: utils.hexStripZeros(BigNumber.from(config.chainId).toHexString()),
              chainName: config.networkName,
              rpcUrls: [],
              iconUrls: [],
              blockExplorerUrls: [config.etherscanUrl],
              nativeCurrency: {
                name: config.blockchainTokenName,
                symbol: config.blockchainToken,
                decimals: config.blockchainTokenDecimals
              },
            },
          ],
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error: any) => {
          if (error.code === 4001) {
            // EIP-1193 userRejectedRequest error.
            console.log('We cannot encrypt anything without the key.');
          }
        });
    }
  }

  return (
    <div>
      <ChooseWallet
        openModal={showWalletOption}
        onClose={() => setShowWalletOption(false)}
      />
      {showWalletInfo && <BackgroundAbsolute onClick={() => setShowWalletInfo(false)} />}
      <StyledAccountButton>
      {
        showWarning
        ? (
          <Button
            onClick={switchMetamaskChain}
            text="Switch network"
          />
        )
        : (
      !account ? (
      <Button
        variant="transparent"
        text="Connect"
        tracking_id={'connect_wallet'}
        onClick={() => {
          setShowWalletOption(true);
        }}
      />
    ) : (
      <Button
        onClick={() => setShowWalletInfo(!showWalletInfo)}
        variant={'transparent'}
        text={truncateMiddle(account, 12, '...')}
      >
        <IconLoader iconName={'Wallet'} width={24} height={24} className="m-r-8" />
      </Button>
    ))
        }
      </StyledAccountButton>
      <DesktopWalletInfo
        modalOpen={showWalletInfo}
        onClose={() => {
          setShowWalletInfo(false)
        }}
      />
    </div>
  );
};

const StyledAccountButton = styled.div``;

export default AccountButton;
