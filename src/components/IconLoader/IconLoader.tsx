import Image from "next/image";
import React, { useState } from "react";
// import DefaultIcon from "../../assets/icons/misc/Default.svg"

export interface IconLoaderProps {
  iconName:
    | "ArrowUp"
    | "ArrowDown"
    | "ArrowLeft"
    | "ArrowRight"
    | "ArrowLink"
    | "ArrowLinkColored"
    | "ArrowFilledUp"
    | "ArrowTailUp"
    | "ArrowTailDown"
    | "ArrowTailLeft"
    | "ArrowTailRight"
    | "ARTHlg"
    | "Mahalg"
    | "MAHAStarterlg"
    | "MAHAStartersm"
    | "BSC"
    | "Checked"
    | "Empty"
    | "GreenCheck"
    | "CreameFinance"
    | "PickleFinance"
    | "Sushiswap"
    | "Uniswap"
    | "Yfi"
    | "CosmicFinance"
    | "Cryption"
    | "Dfyn"
    | "Firbird"
    | "Polydex"
    | "YearnFinance"
    | "Info"
    | "Error"
    | "Warning"
    | "Discord"
    | "Facebook"
    | "Forum"
    | "Github"
    | "Instagram"
    | "Medium"
    | "Reddit"
    | "Telegram"
    | "Twitter"
    | "Alert"
    | "Pending"
    | "Success"
    | "Caution"
    | "ColoredSuccess"
    | "ARTH"
    | "ARTHX"
    | "MAHA"
    | "superMAHA"
    | "CNT"
    | "COSMIC"
    | "DFYN"
    | "ETH"
    | "HOPE"
    | "POLYGON"
    | "USDC"
    | "WBTC"
    | "WETH"
    | "DAI"
    | "SCLP"
    | "BNB"
    | "Sync"
    | "InfoToolTip"
    | "Cross"
    | "Calendar"
    | "Menu"
    | "Transaction"
    | "Wallet"
    | "Copy"
    | "Copied"
    | "Search"
    | "Loans"
    | "Starter"
    | "Add"
    | "Delete"
    | "DeleteFaded"
    | "Settings"
    | "Default"
    | "Tick"
    | "ProposalPending"
    | "BentoMenu"
    | string;
  iconType?:
    | "arrow"
    | "infoTip"
    | "exchangePlatform"
    | "socialMedia"
    | "products"
    | "status"
    | "tokenSymbol"
    | "misc"
    | "brandLogo"
    | "checkbox"
    | "chains";
  height?: number;
  width?: number;
  className?: string;
  onClick?: () => void;
}

const IconLoader = (props: IconLoaderProps) => {
  const {
    iconName,
    iconType = "misc",
    height,
    width,
    className = "",
    onClick,
  } = props;
  return (
    <Image
      src={`/icons/${iconType}/${iconName}.svg`}
      alt={iconName}
      width={width ?? 24}
      height={height ?? 24}
      className={className}
      onClick={() => {
        if (onClick) onClick();
      }}
    />
  );
};

export default IconLoader;
