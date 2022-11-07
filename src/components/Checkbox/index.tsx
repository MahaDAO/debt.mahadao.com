import React from "react";
import {
  Checkbox as Check,
  CheckboxProps,
  FormControlLabel,
  withStyles
} from '@material-ui/core';

import theme from "../../theme";

import IconLoader from "../IconLoader";
import TextWrapper from "../TextWrapper";

const OrangeCheckBox = withStyles({
  root: {
    color: 'rgba(255, 255, 255, 0.32)',
    '&$checked': {
      color: '#FF7F57',
    },
  },
  checked: {
    color: 'white',
  },
})((props: CheckboxProps) => <Check {...props} />);

interface ICheckboxProps {
  checked: boolean;
  disabled?: boolean;
  handleCheck: () => void;
  label?: string;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

const Checkbox = (props: ICheckboxProps) => {
  const {
    checked,
    disabled = false,
    handleCheck,
    label = "",
    labelPlacement = "end",
  } = props;

  return (
    <FormControlLabel
      value=""
      checked={checked}
      disabled={disabled}
      control={
        <OrangeCheckBox
          icon={<IconLoader iconName={'Empty'} iconType={'checkbox'} width={24} height={24} />}
          checkedIcon={
            <IconLoader iconName={'Checked'} iconType={'checkbox'} width={24} height={24} />
          }
          size={'small'}
        />
      }
      label={
        <TextWrapper
          text={label}
          fontWeight={600}
          Fcolor={checked ? '#FFFFFF' : theme.color.transparent[200]}
        />}
      labelPlacement={labelPlacement}
      onChange={() => handleCheck()}
    />
  )
};

export default Checkbox;
