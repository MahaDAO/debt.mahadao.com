import React, { useEffect, useState } from "react";
import copyText from "copy-to-clipboard";
import { styled } from "@mui/material/styles";

import Button from "../../../../Button";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import TextWrapper from "@/components/TextWrapper.tsx/TextWrapper";
import IconLoader from "@/components/IconLoader/IconLoader";
import { useAccount, useDisconnect } from "wagmi";
import { truncateAddress } from "@/utils";
import Grid from "@mui/material/Grid2";
import Image from "next/image";

const WalletInfo = ({ onClose }: { onClose: () => void }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { disconnect } = useDisconnect();

  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const account = useAccount();

  useEffect(() => {
    if (isCopied) {
      const hide = setTimeout(() => {
        setIsCopied(false);
      }, 500);

      return () => {
        clearTimeout(hide);
      };
    }
  }, [isCopied, setIsCopied]);

  return (
    <MainContainer>
      <ConfirmationModal
        modalOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        modalTitle={"Disconnect Wallet"}
        title={`Are you sure you want to disconnect ${truncateAddress(
          account.address || "0x"
        )}?`}
        subtitle={`${account.address || ""}`}
        yesText={"Disconnect"}
        noText={"Cancel"}
        yesAction={() => {
          setShowConfirmationModal(false);
          onClose();
          disconnect();
        }}
        noAction={() => setShowConfirmationModal(false)}
      />
      <WalletHeader className="single-line-center-between bottom-divider">
        <TextWrapper text={"Your Account"} fontWeight={600} fontSize={16} />
        <div className="single-line-center-start">
          <Image
            src={"/images/Metamask.svg"}
            width={32}
            height={32}
            className="m-r-8"
            alt="metamask"
          />
          <TextWrapper
            text={`${truncateAddress(account.address || "0x")}`}
            fontWeight={600}
            fontSize={16}
            className="m-r-8"
          />
          {isCopied ? (
            <IconLoader iconName={"Copied"} />
          ) : (
            <IconLoader
              iconName={"Copy"}
              onClick={() => {
                const didCopy = copyText(account.address?.toString() || "");
                setIsCopied(didCopy);
              }}
              className="pointer"
            />
          )}
        </div>
      </WalletHeader>
      <div>
        <Grid container spacing={1} mt={2}>
          <Grid width={"100%"}>
            <Button onClick={() => setShowConfirmationModal(true)}>
              Disconnect
            </Button>
          </Grid>
          {/* <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <Button
              variant={"transparent"}
              onClick={() => setShowWalletOption(true)}
            >
              Change
            </Button>
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <Button onClick={() => setShowConfirmationModal(true)}>
              Disconnect
            </Button>
          </Grid> */}
        </Grid>
      </div>
    </MainContainer>
  );
};

export default WalletInfo;

const MainContainer = styled("div")(() => ({
  width: "100%",
}));

const WalletHeader = styled("div")(() => ({
  paddingBottom: "16px",
}));

const MAHAXContain = styled("div")(() => ({
  padding: "24px 0",
  marginBottom: "12px",
}));
