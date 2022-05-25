import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import copyText from 'copy-to-clipboard';
import Loader from "react-spinners/BeatLoader";

import TextWrapper from "../../../../TextWrapper";
import { truncateMiddle } from "../../../../../utils";
import { getDisplayBalance } from "../../../../../utils/formatBalance";

import MetamaskImg from "../../../../../assets/images/Metamask.svg";
import IconLoader from "../../../../IconLoader";
import theme from "../../../../../theme";
import Button from "../../../../Button";
import ConfirmationModal from "../../../../ConfirmationModal";
import useTokenBalanceOf from "../../../../../hooks/useTokenBalanceOf";
import useCore from "../../../../../hooks/useCore";
import DataField from "../../../../DataField";
import useGetVotingPower from "../../../../../hooks/state/useGetVotingPower";
import ChooseWallet from "./ChooseWallet";
import Grid from "@material-ui/core/Grid";

const WalletInfo = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showWalletOption, setShowWalletOption] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

  const core = useCore();
  const { account } = useWallet();
  const votingPower = useGetVotingPower(account);
  const mahaErc20 = core.tokens['MAHA'];
  const { isLoading: isMAHABalanceLoading, value: mahaBalance } = useTokenBalanceOf(mahaErc20, account || "");

  useEffect(() => {
    if (isCopied) {
      const hide = setTimeout(() => {
        setIsCopied(false)
      }, 500)

      return () => {
        clearTimeout(hide)
      }
    }
  }, [isCopied, setIsCopied])


  return (
    <MainContainer>
      <ChooseWallet
        openModal={showWalletOption}
        onClose={() => setShowWalletOption(false)}
      />
      <ConfirmationModal
        modalOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        modalTitle={'Disconnect Wallet'}
        title={`Are you sure you want to disconnect ${truncateMiddle(account || '', 15)}?`}
        subtitle={`${account || ''}`}
        yesText={'Disconnect'}
        noText={'Cancel'}
        yesAction={() => {
          setShowConfirmationModal(false)
          localStorage.setItem('disconnectWallet', '1')
          window.location.reload();
        }}
        noAction={() => setShowConfirmationModal(false)}
      />
      <WalletHeader className="single-line-center-between bottom-divider">
        <TextWrapper
          text={'Your Account'}
          fontWeight={600}
          fontSize={16}
        />
        <div className="single-line-center-start">
          <img src={MetamaskImg} height={32} className="m-r-8" alt="metamask" />
          <TextWrapper
            text={`${truncateMiddle(account || '', 12, '...')}`}
            fontWeight={600}
            fontSize={16}
            className="m-r-8"
          />
          {
            isCopied
              ? <IconLoader
                iconName={'Copied'}
              />
              : <IconLoader
                iconName={'Copy'}
                onClick={() => {
                  const didCopy = copyText(account?.toString() || '');
                  setIsCopied(didCopy);
                }}
                className="pointer"
              />
          }
        </div>
      </WalletHeader>
      <WalletBody>
        <MAHAXContain className={"bottom-divider"}>
          <DataField
            label={"Your MAHAX"}
            value={`${Number(getDisplayBalance(votingPower.value, 18, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 })}`}
            isValueLoading={votingPower.isLoading}
            valueTag={"MAHAX"}
            labelFontWeight={600}
            labelFontSize={16}
            labelFontColor={"#FFF"}
            valueFontWeight={600}
            valueFontSize={16}
            valueFontColor={theme.color.transparent[100]}
          />
        </MAHAXContain>
        <div className="single-line-center-between m-b-20">
          <div className="single-line-center-start">
            <IconLoader iconName={'MAHA'} iconType="tokenSymbol" className="m-r-12" height={44} width={44} />
            {
              isMAHABalanceLoading
                ? <Loader color={'#ffffff'} loading={true} size={8} margin={2} />
                : <TextWrapper
                  text={
                    `${Number(getDisplayBalance(mahaBalance, 18, 3)).toLocaleString()} MAHA`
                  }
                  fontWeight={600}
                />
            }
          </div>
          <TextWrapper
            text={""}
            fontWeight={600}
            Fcolor={theme.color.transparent[100]}
          />
        </div>
        <Grid container spacing={1}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Button variant={'transparent'} onClick={() => setShowWalletOption(true)}>Change</Button>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Button onClick={() => setShowConfirmationModal(true)}>Disconnect</Button>
          </Grid>
        </Grid>
      </WalletBody>
    </MainContainer>
  );
}

export default WalletInfo;

const MainContainer = styled.div`
  width: 100%;
`;

const WalletHeader = styled.div`
  padding-bottom:16px ;
`;

const WalletBody = styled.div`
`;

const MAHAXContain = styled.div`
  padding: 24px 0;
  margin-bottom: 12px;
`;
