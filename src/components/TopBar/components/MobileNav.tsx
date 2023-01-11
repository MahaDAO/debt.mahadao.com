import styled from 'styled-components';
import { useWallet } from "use-wallet";
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";

import Button from "../../Button";
import { BackgroundAbsolute } from "../../Selector";
import MobileWalletInfo from "./modal/WalletInfo/MobileWalletInfo";
import MobileTransactionInfo from "../components/modal/Transaction/MobileTransactionInfo";

import IconLoader from "../../IconLoader";
import { truncateMiddle } from "../../../utils";
import config from "../../../config";
import ChooseWallet from "./modal/WalletInfo/ChooseWallet";

interface props {
  openMenu: boolean;
  isMainnet: boolean;
  showWarning: boolean;
  onClick: () => void;
  onWalletClick: () => void;
}

const MobileNav = (props: props) => {
  const isMobile = useMediaQuery({ maxWidth: '600px' });
  const { account, /* connect */ } = useWallet();
  const [showWalletInfo, setShowWalletInfo] = useState<boolean>(false);
  const [showWalletOption, setShowWalletOption] = useState<boolean>(false);
  const [showTxModal, setShowTxModal] = useState<boolean>(false);

  return (
    <div>
      <MobileWalletInfo
        modalOpen={showWalletInfo && isMobile}
        onClose={() => setShowWalletInfo(false)}
      />
      <ChooseWallet
        openModal={showWalletOption}
        onClose={() => {
          props.onClick()
          setShowWalletOption(false)
        }}
      />
      <MobileTransactionInfo 
      openModal={showTxModal} 
      onDismiss={() => setShowTxModal(false)} 
      />

      {props.openMenu && <BackgroundAbsolute onClick={() => props.onClick()} />}
      <StyledNav style={{ width: props.openMenu ? '100%' : '0%', opacity: props.openMenu ? 1 : 0 }}>
      <WalletButton>
          {
            !account
              ? (
                <Button
                  text="Connect"
                  tracking_id={'connect_wallet'}
                  onClick={() => {
                    setShowWalletOption(true)
                  }}
                />
              )
              : (
            <div className="w-100 p-b-20 bottom-divider">
              <div className="m-b-8">
            <Button
              onClick={() => setShowWalletInfo(!showWalletInfo)}
              variant={'transparent'}
              text={truncateMiddle(account, 12, '...')}
            >
              <IconLoader iconName={'Wallet'} width={24} height={24} className="m-r-8" />
            </Button>
              </div>
            <div className={'m-b-12'}>
              <Button
                onClick={() => {setShowTxModal(true)}}
                variant={'transparent'}
                text={'Transactions'}
              >
                <IconLoader iconName={'Transaction'} width={24} height={24} className="m-r-8" />
              </Button>
            </div>
            {/* <Link to={'/form'} >
              <Button
                
                onClick={() => {}}
                variant={'transparent'}>Register User</Button>
            </Link> */}
            </div>
              )
          }
        </WalletButton>


      </StyledNav>
    </div>
  );
};

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 70px;
  width: 100%;
  left: 0;
  background: #1e1d1d;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  height: calc(100vh - 72px);
  overflow-y: scroll;
  transition: 0.2s ease-out;
  z-index: 111;
`;

const TopMenu = styled.div`
  padding: 16px 12px 16px 12px;
  width: 100%;
`

const BottomMenu = styled.div`
  padding: 24px 12px 16px 12px;
  width: 100%;
`

const WalletButton = styled.div`
  padding: 24px 12px 16px 12px;
  width: 100%;
`

const StyledLink = styled(NavLink)`
  padding: 8px 16px;
  width: 100%;
  border-radius: 2px;
  display: block;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #FFFFFF88;
  margin-bottom: 8px;
  &:hover {
    outline: 1px solid rgba(255, 255, 255, 0.08);
    color: #FFFFFF88;
    opacity: 1;
  }
`;


const StyledLinkHref = styled.a`
  padding: 8px 16px;
  width: 100%;
  border-radius: 2px;
  display: block;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #FFFFFF88;
  margin-bottom: 8px;
  &:hover {
    outline: 1px solid rgba(255, 255, 255, 0.08);
    color: #FFFFFF88;
    opacity: 1;
  }
  &:active {
    background: rgba(255, 255, 255, 0.01);
    border-radius: 2px;
    width: 100%;
    color: #FFFFFF88;
    opacity: 1;
  }
`

export default MobileNav;
