import React, { ReactElement } from 'react';
import styled from 'styled-components';

import theme from '../../theme';
import IconLoader from "../IconLoader";

interface Iprops {
  type: 'Warning' | 'Info' | 'Error'
  msg: string | ReactElement;
  className?: string;
}

const InfoTip = (props: Iprops) => {
  const {
    type,
    msg,
    className = ''
  } = props;

  let color: string = '#FFFFFF'
  if (type === 'Warning') {
    color = '#FCB400'
  } else if (type === 'Error') {
    color = theme.color.red[300]
  };

  return (
    <CustomBadgeAlert className={className}>
      <IconLoader iconName={type} iconType={'infoTip'} />
      <Text style={{ color: color }}>{msg}</Text>
    </CustomBadgeAlert>
  );
}

export default InfoTip;

const CustomBadgeAlert = styled.div`
  background: rgba(255, 255, 255, 0.08);
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px;
  display: flex;
  align-items: flex-start;
  width: 100%;
`;

const Text = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  color: #FCB400;
  flex: 1;
  padding-left: 10px;
  margin-bottom: 0;
`;
