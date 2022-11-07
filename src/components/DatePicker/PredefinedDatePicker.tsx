import React, {useEffect, useState} from "react";
import styled from "styled-components";
import TextWrapper from "../TextWrapper";
import theme from "../../theme";
import Button from "../Button";

interface IProps {
  selectedDate: any;
  dropdownValue: string[];
  openCalendar: boolean;
  onApplyPressCallback: (data: any) => void;
  onCancelPressCallback: () => void;
  onCustomPressCallback: () => void;
  className?: string;
}

const PredefinedDatePicker = (props: IProps) => {
  const {
    selectedDate,
    dropdownValue,
    openCalendar,
    onApplyPressCallback,
    onCancelPressCallback,
    onCustomPressCallback,
    className,
  } = props;

  const [date, setDate] = useState<string>(selectedDate);

  useEffect(() => {
    if (openCalendar) {
      setDate(selectedDate);
      if (!dropdownValue.includes(selectedDate)) onCustomPressCallback();
    }
  }, [selectedDate, openCalendar]);

  const onApplyPress = () => {
    onApplyPressCallback(date)
  }

  const onCancel = () => {
    onCancelPressCallback()
  }

  if (openCalendar) {
    return (
      <CalendarPosition className={className}>
        <CustomDropDownContainer>
          {dropdownValue?.map((item, index) => {
            return (
              <CustomDropDownLi
                onClick={() => {
                  if (item !== "Custom") setDate(item)
                  else onCustomPressCallback()
                }}
                key={index}
                style={item === date? {background: 'rgba(255, 255, 255, 0.08)'}: {}}
              >
                <TextWrapper
                  text={item}
                  fontWeight={item === date? 600: 300}
                />
              </CustomDropDownLi>
            );
          })}
          <ButtonContainer>
            <div className="m-b-16"><Button onClick={() => onApplyPress()}>Apply</Button></div>
            <Button onClick={() => onCancel()} variant={"transparent"}>Cancel</Button>
          </ButtonContainer>
        </CustomDropDownContainer>
      </CalendarPosition>
    )
  }

  return <div/>
}

export default PredefinedDatePicker;

const CalendarPosition = styled.div`
  position: absolute;
  z-index: 111;
  top: 50%;
  left: 50%;
  background: #2A2827;
  border-radius: 6px;
  transform: translate(-50%, -50%);
`;

const CustomDropDownContainer = styled.div`
  background: ${theme.color.dark[300]};
  border-radius: 6px;
  overflow: hidden;
  min-width: 160px;
`;

const CustomDropDownLi = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 20px;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const ButtonContainer = styled.div`
  padding: 32px 20px 12px 20px;
  
`
