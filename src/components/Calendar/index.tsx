import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { DateRange } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '../../customCss/CustomDateRangePicker.css'

import Button from "../Button";
import theme from "../../theme";

interface Iprops {
  selectedDates: {
    startDate: any,
    endDate: any
  };
  onApplyPressCallback: (data: {
    startDate: any,
    endDate: any
  }) => void,
  onClearPressCallback: (data: {
    startDate: any,
    endDate: any
  }) => void,
  openCalendar: boolean;
  onClose: () => void;
  minDate?: Date;
  maxDate?: Date;
  position?: {
    top: string;
    bottom: string;
    left: string;
    right: string;
  }
  className?: string;
}

interface CalendarPositionProps {
  position: {
    top: string;
    bottom: string;
    left: string;
    right: string;
  }
}

const Calendar = (props: Iprops) => {
  const {
    selectedDates,
    onApplyPressCallback,
    onClearPressCallback,
    openCalendar,
    onClose,
    position = {
      top: '10px',
      bottom: '',
      left: '',
      right: '0px'
    },
    className = "",
    minDate,
    maxDate,
  } = props;

  const [value, setValue] = useState<any>([{
    startDate: null,
    endDate: new Date(),
    key: 'selection'
  }]);

  useEffect(() => {
    setValue([{
      startDate: selectedDates.startDate,
      endDate: selectedDates.endDate,
      key: 'selection'
    }])
  }, [selectedDates.startDate, selectedDates.endDate])

  const onApplyPress = () => {
    onApplyPressCallback({
      startDate: value[0].startDate,
      endDate: value[0].endDate,
    })
    onClose();
  }

  const onClearPress = () => {
    onClearPressCallback({
      startDate: null,
      endDate: new Date(),
    })
    onClose();
  }

  if (openCalendar) {
    return (
      <CalendarPosition position={position} className={className}>
        <div>
          <CustomButtonContainer>
            <div className="m-r-8">
              <Button
                onClick={() => onApplyPress()}
                size={'sm'}
              >
                Apply
              </Button>
            </div>
            <div className="">
              <Button
                onClick={() => onClearPress()}
                variant={'transparent'}
                size={'sm'}
              >
                Clear
              </Button>
            </div>
          </CustomButtonContainer>
          <DateRange
            onChange={(data: any) => setValue([data.selection])}
            // showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={value}
            direction="horizontal"
            scroll={{ enabled: true }}
            minDate={minDate}
            maxDate={maxDate}
            color={'#FF7F57'}
          />
        </div>
      </CalendarPosition>
    )
  }

  return null;
}

export default Calendar;

const CalendarPosition = styled.div<CalendarPositionProps>`
  position: absolute;
  z-index: 111;
  top: ${({ position }) => position.top};
  bottom: ${({ position }) => position.bottom};
  right: ${({ position }) => position.right};
  left: ${({ position }) => position.left};
  background: #2A2827;
  border-radius: 6px;
`;

const CustomButtonContainer = styled.div`
  position: absolute;
  z-index: 101;
  right: 0;
  bottom: 0;
  padding: 10px 20px;
  display: flex;
  width: 332px;
  justify-content: center;
  background: ${theme.color.dark[300]};
  border-radius: 0 0 6px 6px;
}
`;
