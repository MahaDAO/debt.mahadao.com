import React from "react";
import styled from "styled-components";

import theme from "../../theme";
import ComingSoonImg from '../../assets/images/ComingSoon.svg'

import Button from "../Button";
import TextWrapper from "../TextWrapper";

const NoPageFound = () => {
  return (
    <MainPageContainer>
      <MainContainer className="single-line-center-center">
        <div className="text-center">
          <img src={ComingSoonImg} alt={'ComingSoon'} className="m-b-24" />
          <TextWrapper
            text={'Oops!'}
            fontWeight={"bold"}
            fontSize={32}
            fontFamily={"Syne"}
            className="m-b-4"
            align={"center"}
          />
          <TextWrapper
            text={'The page you are looking for was move, removed, renamed or might never existed.'}
            fontWeight={300}
            Fcolor={theme.color.transparent[100]}
            className="m-b-32"
            align={"center"}
          />
          <ButtonContainer>
            <Button to={"locker"}>Home</Button>
          </ButtonContainer>
        </div>

      </MainContainer>
    </MainPageContainer>
  )
}

export default NoPageFound;

const MainPageContainer = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 112px;
  min-height: calc(100vh - 112px);
  padding: 0 60px 80px;
  @media (max-width: 600px) {
    padding: 0;
  }
`
const ButtonContainer = styled.div`
    max-width: 150px;
    margin: auto;
  
`;

const MainContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 0 20px;
`;
