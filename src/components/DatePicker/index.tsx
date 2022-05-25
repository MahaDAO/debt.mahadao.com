import styled from "styled-components";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Calendar as Cal } from "react-date-range";
import React, { useEffect, useState } from "react";

import theme from "../../theme";
import '../../customCss/CustomDateRangePicker.css';

import Button from "../Button";

import { addWeeks, addYears } from "../../utils/constants";

interface IProps {
  selectedDates: any;
  openCalendar: boolean;
  onApplyPressCallback: (data: any) => void;
  onClearPressCallback: (data: any) => void;
  minDate?: any;
  maxDate?: any;
  className?: string;
}

const DatePicker = (props: IProps) => {
  const {
    selectedDates,
    openCalendar,
    onApplyPressCallback,
    onClearPressCallback,
    className,
    minDate = addWeeks(new Date(), 1),
    maxDate = addYears(new Date(), 4),
  } = props;

  const [date, setDate] = useState<any>(selectedDates);

  useEffect(() => {
    if (!openCalendar) {
      setDate(selectedDates);
    }
  }, [openCalendar, selectedDates]);

  /*useEffect(() => {
    if (!openCalendar) {
      setDate(selectedDates);
    }
  }, [selectedDates]);*/

  if (openCalendar) {
    return (
      <CalendarPosition className={className}>
        <div>
          <CustomButtonContainer>
            <div className="m-r-8">
              <Button
                onClick={() => onApplyPressCallback(date)}
                size={'sm'}
              >
                Apply
              </Button>
            </div>
            <div className="">
              <Button
                onClick={() => onClearPressCallback(date)}
                variant={'transparent'}
                size={'sm'}
              >
                Clear
              </Button>
            </div>
          </CustomButtonContainer>
          <Cal
            minDate={minDate}
            maxDate={maxDate}
            onChange={(item: any) => {
              setDate(item)
            }}
            date={date}
          />
        </div>
      </CalendarPosition>
    );
  }

  return <div />;
}

export default DatePicker;

const CalendarPosition = styled.div`
  position: absolute;
  z-index: 111;
  top: calc(50% - 28px);
  left: 50%;
  background: #2A2827;
  border-radius: 6px;
  transform: translate(-50%, -50%);
`;

const CustomButtonContainer = styled.div`
  position: absolute;
  z-index: 101;
  right: 0;
  bottom: -54px;
  padding: 10px 20px;
  display: flex;
  width: 332px;
  justify-content: center;
  background: ${theme.color.dark[300]};
  border-radius: 0 0 6px 6px;
`;
