import { useWallet } from "use-wallet";
import styled from "styled-components";
import { BigNumber, utils } from 'ethers';

import Modal from "../../../../Modal";
import IconLoader from "../../../../IconLoader";
import TextWrapper from "../../../../TextWrapper";
import metamaskimg from "../../../../../assets/images/Metamask.svg";
import walletConnectimg from "../../../../../assets/images/walletConnect.png";
import { noOp } from "../../../../../utils/constants";
import { Mixpanel } from "../../../../../analytics/Mixpanel";
import config from '../../../../../config';

interface Iprops {
  openModal: boolean;
  onClose: () => void;
}

const ChooseWallet = (props: Iprops) => {
  const { openModal, onClose } = props;
  const { connect, connector } = useWallet();

  const onWalletConnectClick = () => {
    if (connector === 'walletconnect') return;
    // Mixpanel.track(`buttonClick:walletConnect_connect`)

    connect("walletconnect")
      .then(() => {
        onClose();
      })
      .catch((e) => {
        console.log("WalletConnect connect error", e)
      });
  }

  return (
    <Modal
      open={openModal}
      handleClose={() => onClose()}
      title={"Connect a wallet to login"}
    >
      <Option
        className={`single-line-center-between`}
        onClick={connector === "injected" ? noOp : () => {
          connect('injected')
            .then(() => {
              console.log('Connected')
              onClose();
              localStorage.removeItem('disconnectWallet')
            })
            .catch((e) => {
              console.log('Connection error', e)
            })
        }}
      >
        <div className="single-line-center-start">
          <img src={metamaskimg} width={40} alt={"metamask"} className="m-r-12" />
          {
            <TextWrapper
              text={"Metamask"}
              fontSize={18}
              fontWeight={600}
            />
          }
        </div>
        {
          connector === 'injected'
            ? <IconLoader iconName={'Copied'} />
            : <IconLoader iconName={"ArrowTailRight"} iconType={"arrow"} />
        }
      </Option>
      {/* <Option
        onClick={connector === 'walletconnect' ? () => { } : onWalletConnectClick}
        className={`m-t-16 single-line-center-between ${connector === 'walletconnect' ? "" : "pointer"}`}
      >
        <div className="single-line-center-start">
          <img src={walletConnectimg} width={40} alt={"walletConnectimg"} className="m-r-12" />
          <TextWrapper
            text={"WalletConnect"}
            fontSize={18}
            fontWeight={600}
          />
        </div>
        {
          connector === 'walletconnect'
            ? < IconLoader iconName={'Copied'} />
            : <IconLoader iconName={"ArrowTailRight"} iconType={"arrow"} />
        }
      </Option> */}
      {/*<div className="bottom-divider" />
      <div className="p-t-32 single-line-center-center">
        <div className="single-line-center-center">
          <TextWrapper
            text={"New to Ethereum?"}
            className={"m-r-4"}
          />
          <div
            className="pointer"
            onClick={() => window.open("https://ethereum.org/en/wallets/find-wallet/")}
          >
            <TextWrapper
              text={"Learn more about wallets"}
              Fcolor={theme.color.primary[300]}
            />
          </div>
        </div>
      </div>*/}
    </Modal>
  );
}

export default ChooseWallet;

const Option = styled.div`
  padding: 12px 24px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  box-sizing: border-box;
  border-radius: 6px;
`;
