import React from 'react';
import styled, { keyframes } from 'styled-components';

import arthLogo from '../../assets/icons/tokenSymbol/ARTH.svg';

interface IProps {
  width?: string;
  height?: string;
}

const LoadingPage = (props: IProps) => {
  return (
    <MainDiv>
      <ElementConatiner>
        <LoadingIndicator />
        <ArthLogo src={arthLogo} alt="ARTH" />
      </ElementConatiner>
    </MainDiv>
  );
};

const rotate = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }

  50% {
    transform: rotate(180deg) scale(0.8);
  }

  100% {
    transform: rotate(360deg) scale(1);
  }
`;

const plus = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.8);
  }
  
  100% {
    transform: scale(1);
  }
`;

const MainDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 200px;
  background: transparent;
  z-index: 20;
`;

const ElementConatiner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoadingIndicator = styled.div`
  width: 60px;
  height: 60px;
  border: 3px solid #fd5656;
  border-left-color: transparent;
  animation: ${rotate} 2s linear infinite;
  border-radius: 50%;
`;

const ArthLogo = styled.img`
  width: 58px;
  height: 58px;
  animation: ${plus} 2s linear infinite;
  position: absolute;
  top: 0;
`;

export default LoadingPage;
