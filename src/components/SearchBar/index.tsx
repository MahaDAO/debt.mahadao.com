import React from "react";
import styled from "styled-components";
import { InputBase } from "@material-ui/core";

import theme from "../../theme";
import IconLoader from "../IconLoader";

type props = {
  value: string;
  placeholder: string;
  disabled?: boolean;
  setText: (val: string) => void;
};

const SearchBar: React.FC<props> = (props) => {
  const {
    value,
    placeholder,
    disabled = false
  } = props;

  const onValueChange = (value: string) => {
    props.setText(value);
  }

  return (
    <IFieldConatiner>
      <IconLoader iconName={'Search'} className="m-r-12" />
      <InputBase
        inputMode={'text'}
        placeholder={placeholder}
        value={value}
        style={{
          padding: '0',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: '14px',
          color: theme.color.transparent["100"],
          flex: 1,
        }}
        disabled={disabled}
        type={'string'}
        onChange={(event) => onValueChange(event.target.value)}
      />
    </IFieldConatiner>
  );
};

export default SearchBar;

const IFieldConatiner = styled.div`
  display: flex;
  flex-direction: row;
  background: ${theme.color.dark[300]};
  border-radius: 6px;
  max-height: 44px;
  padding: 8px 12px;
`;
