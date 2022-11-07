import React from 'react';
import styled from 'styled-components';

import IconLoader from "../IconLoader";

export interface InputProps {
  dropDownValues: string[];
  ondropDownValueChange: (data: string) => void;
};

const CustomDropDown: React.FC<InputProps> = (props) => {
  const { dropDownValues, ondropDownValueChange } = props;

  return (
    <CustomDropDownContainer>
      {dropDownValues.map((item, index) => {
        return (
          <CustomDropDownLi
            onClick={() => {
              ondropDownValueChange(item);
            }}
            key={index}
          >
            <IconLoader iconName="ArrowUp" iconType={"arrow"} />
            <CustomDropDownLiText>{item}</CustomDropDownLiText>
          </CustomDropDownLi>
        );
      })}
    </CustomDropDownContainer>
  );
};

const CustomDropDownContainer = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 13;
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

export default CustomDropDown;
