import React from "react";
import styled from "styled-components";

import theme from "../../theme";

import TextWrapper from "../TextWrapper";

interface StatesProps {
  state: 'error' | 'warning' | 'default';
  msg?: string;
  children: any;
}

const States = (props: StatesProps) => {
  const {
    state,
    msg = "",
    children,
  } = props;

  let color = theme.color.transparentog;
  if (state === 'error') {
    color = theme.color.red[300];
  } else if (state === 'warning') {
    color = theme.color.yellow[300];
  }


  return (
    <div>
      <Container style={{ borderColor: color }}>
        {children}
      </Container>
      <TextWrapper
        text={msg}
        className={'m-t-4'}
        fontSize={12}
        Fcolor={color}
      />
    </div>

  )
}

export default States;

const Container = styled.div`
  border: 1px solid;
  border-radius: 6px;
`;
