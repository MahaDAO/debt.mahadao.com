import React from "react";
import styled from "styled-components";

import ComingSoonImg from '../../assets/images/ComingSoon.svg'

import theme from "../../theme";
import TextWrapper from "../TextWrapper";


const Maintenance = () => {
  return (
    <MainContainer className="single-line-center-center mo-custom-container">
      <div className="text-center">
        <div className="single-line-center-center">
          <img src={ComingSoonImg} alt={'ComingSoon'} className="m-b-24" />
        </div>
        <TextWrapper
          text={'The smart contracts are being upgraded!'}
          fontWeight={"bold"}
          fontSize={32}
          fontFamily={"Syne"}
          className="m-b-4"
          align={"center"}
        />
        <TextWrapper
          text={'We are currently upgrading this page and it will be back up shortly!'}
          fontWeight={300}
          Fcolor={theme.color.transparent[100]}
          align={"center"}
        />
      </div>

    </MainContainer>
  )
}

export default Maintenance;

const MainContainer = styled.div`
    width: 100%;
    height: 100%;
`;
