import React from "react";
import styled from "styled-components";

import theme from "../../theme";
import TextWrapper from "../TextWrapper";
import { BackgroundAbsolute } from "../Selector";
import IconLoader, { IconLoaderProps } from "../IconLoader";

interface CollateralDropDownProps {
  selectedSymbol: IconLoaderProps['iconName'];
  symbols?: IconLoaderProps['iconName'][];
  multiIcons?: boolean;
  multiIconsSymbols?: IconLoaderProps['iconName'][];
  showDropDown?: boolean;
  toggleDropDown?: () => void;
  hasDropDown?: boolean;
  ondropDownValueChange?: (value: IconLoaderProps['iconName']) => void
  border?: string;
}

const CollateralDropDown = (props: CollateralDropDownProps) => {
  const {
    selectedSymbol,
    symbols,
    multiIcons = false,
    multiIconsSymbols,
    showDropDown = false,
    toggleDropDown,
    hasDropDown = false,
    ondropDownValueChange,
    border = '0 6px 6px 0',
  } = props

  return (
    <MainContainer>
      {!multiIcons
        ? (<Container
          style={{ borderRadius: border }}
          className={"single-line-center-start"}
          onClick={() => {
            if (toggleDropDown) toggleDropDown()
          }}
        >
          <IconLoader iconName={selectedSymbol} iconType={"tokenSymbol"} height={20} width={20} />
          <TextWrapper
            text={selectedSymbol}
            fontWeight={600}
            Fcolor={theme.color.transparent[100]}
            className={'m-l-8'}
          />
          {hasDropDown &&
            <IconLoader iconName={showDropDown ? 'ArrowUp' : 'ArrowDown'} iconType={"arrow"} height={16} width={16}
              className={"m-l-8"} />}
        </Container>)
        : (<Container
          style={{ borderRadius: border }}
          className={"single-line-center-start"}
          onClick={() => {
            if (toggleDropDown) toggleDropDown()
          }}
        >
          {multiIconsSymbols?.map((data, index) => {
            return (
              <IconLoader
                iconName={data}
                iconType={"tokenSymbol"}
                height={20}
                width={20}
                className={index !== 0 ? "m-l--4" : ""}
              />
            )
          })}
          <div className="m-l-8 single-line-center-start">
            {multiIconsSymbols?.map((data, index) => {
              return (
                <TextWrapper
                  text={index === 0 ? data : `-${data}`}
                  fontWeight={600}
                  Fcolor={theme.color.transparent[100]}
                />
              )
            })}
          </div>
          {hasDropDown &&
            <IconLoader iconName={showDropDown ? 'ArrowUp' : 'ArrowDown'} iconType={"arrow"} height={16} width={16}
              className={"m-l-8"} />}
        </Container>)
      }
      {showDropDown &&
        <BackgroundAbsolute
          onClick={() => {
            if (toggleDropDown) toggleDropDown()
          }}
        />}

      {hasDropDown && showDropDown && <CustomDropDownContainer>
        {symbols?.map((item, index) => {
          return (
            <CustomDropDownLi
              onClick={() => {
                if (ondropDownValueChange) ondropDownValueChange(item);
              }}
              key={index}
            >
              <IconLoader iconName={item} iconType={"tokenSymbol"} height={20} width={20} />
              <CustomDropDownLiText>{item}</CustomDropDownLiText>
            </CustomDropDownLi>
          );
        })}
      </CustomDropDownContainer>}

    </MainContainer>
  );
};

export default CollateralDropDown;

const MainContainer = styled.div`
  position: relative;
`;

const Container = styled.div`
  height: 44px;
  padding: 12px;
  background: #1F1E1E;
`;

const CustomDropDownContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 111;
  background: #1f1e1e;
  border-radius: 6px;
  min-width: max-content;
`;

const CustomDropDownLi = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  padding: 0 12px;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: rgba(62, 62, 62, 0.31);
  }
`;

const CustomDropDownLiText = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.64);
  margin-left: 5px;
`;
