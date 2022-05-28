import React from 'react';
import Highcharts from 'highcharts';
import styled from 'styled-components';
import HighchartsReact from 'highcharts-react-official';

import TextWrapper from '../../../components/TextWrapper';

const options = {
  chart: {
    type: 'line',
    backgroundColor: 'transparent',
    spacing: [10, 10, 10, 0],
    style: {
      fontFamily: 'Inter',
      fontSize: '12px',
      color: '#FFFFFF',
    },
  },
  credits: {
    enabled: false,
  },
  title: {
    text: ''
  },
  colors: ['#FFA981', '#95DCC3', '#EF8FBA', '#F8DF6C', '#BD9CFF'],
  series: [
    {
      showInLegend: false,
      data: [100000000, 250000000, 100000000, 270000000, 220000000, 300000000, 230000000, 350000000]
    }
  ],
  xAxis: [{
    type: 'datetime',
    categories: ['Jan 2021', 'Feb 2021', 'March 2021', 'April 2021', 'May 2021', 'June 2021', 'July 2021', 'August 2021'],
  }],
  yAxis: [{
    gridLineColor: '#FFFFFF20',
    gridLineWidth: '0.5',
    title: {
      text: '',
    }
  }]
};

const LockerGraph = () => {
  return (
    <div className="custom-mahadao-box margin-top-7">
      <div className="single-line-center-start">
        <Indicator></Indicator>
        <TextWrapper
          text={'DAO Voting Power'}
        />
      </div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  )
}

export default LockerGraph;

const Indicator = styled.div`
  height: 8px;
  width: 8px;
  background: #FFA981;
  border-radius: 50%;
  margin-right: 4px;
`;
