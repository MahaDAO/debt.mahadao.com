import styled from 'styled-components';
import {useMediaQuery} from "react-responsive";
import _ from 'underscore'

import BuySellTable from './components/BuySellTable';
import useTokenBalance from '../../hooks/useTokenBalance';
import useCore from '../../hooks/useCore';
import { getDisplayBalance } from '../../utils/formatBalance';
import BuyOrdersCard from './components/BuyOrdersCard';
import SellOrdersCard from './components/SellOrdersCard';
import { useEffect, useState } from 'react';
import Selector from '../../components/Selector';
import { FormControlLabel, Grid, Switch, Typography } from '@material-ui/core';
import { AntSwitch } from '../../components/AntSwitch';

function Dex() {

  const core = useCore()
  const isMobile = useMediaQuery({ maxWidth: '600px' });
  const baseTokenBalance = useTokenBalance(core.tokens['ARTH-DP'])
  const quoteTokenBalance = useTokenBalance(core.tokens['USDC'])
  let arthUsdcPairStatus = JSON.parse(localStorage.getItem('ARTH-DP/USDC pair') || 'false')

  const [selectQuoteToken, setSelectQuoteToken] = useState<string>('USDC')
  const [selectorQToken, setSelectorQToken] = useState<boolean>(arthUsdcPairStatus)

  const usdcbal = useTokenBalance(core.tokens['USDC'])
  const mahabal = useTokenBalance(core.tokens['MAHA'])

  useEffect(() => {
    if(selectorQToken){
      setSelectQuoteToken('MAHA')
    }else {
      setSelectQuoteToken('USDC')
    }
  }, [selectorQToken])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('ARTH-DP/USDC pair', `${event.target.checked}`)
    setSelectorQToken(event.target.checked);

  };


  return (
    <div className='custom-container'>
      <Typography component="div" align={'center'} className={'m-b-20'}>
          <Grid component="label" container alignItems="center" justifyContent={'center'} spacing={1}>
            <Grid className={'textWhite'} item>
              ARTH-DP / USDC
            </Grid>
            <Grid item>
              <AntSwitch checked={arthUsdcPairStatus || selectorQToken} onChange={handleChange} name="checkedC" />
            </Grid>
            <Grid className={'textWhite'} item>
              ARTH-DP / MAHA
            </Grid>
          </Grid>
        </Typography>
      <div style={{display: 'flex', flexDirection: isMobile? 'column' : 'row'}}>
        <Wrapper>
          <Card className={'material-primary'}>
            <CardHeader>Buy Debt</CardHeader>
            <CardSubHeader>lorem ipsum lorem ipsum lorem ipsum lorem ipsum</CardSubHeader>
            <CardSection style={{marginBottom: '20px', fontWeight: 'bold',}} className={'alignItemsCenter'}>
              <CardColumn1 className='text-center'>AVAILABLE</CardColumn1>
              <CardColumn2 className='text-right'>
                {
                  selectQuoteToken == "USDC" ? 
                  Number(getDisplayBalance(usdcbal.value, 6, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 }) :
                  Number(getDisplayBalance(mahabal.value, 18, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 })
                  
                }
                
              </CardColumn2>
              <CardColumn3 className='text-center'>
                {selectQuoteToken}
              </CardColumn3>
            </CardSection>
            <BuySellTable
              baseTokenBalance={baseTokenBalance}
              // quoteTokenBalance={quoteTokenBalance}
              action={'Buy'}
              selectQuoteToken={{name: selectQuoteToken, balance: 
                selectQuoteToken == "USDC" ? 
                Number(getDisplayBalance(usdcbal.value, 6, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 }) :
                Number(getDisplayBalance(mahabal.value, 18, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 })
              }}
            />
          </Card>
        </Wrapper>
        <Wrapper>
          <Card className={'material-primary'}>
            <CardHeader>Sell Debt</CardHeader>
            <CardSubHeader>lorem ipsum lorem ipsum lorem ipsum lorem ipsum</CardSubHeader>
            <CardSection style={{marginBottom: '20px', fontWeight: 'bold',}} className={'alignItemsCenter'}>
              <CardColumn1 className='text-center'>AVAILABLE</CardColumn1>
              <CardColumn2 className='text-right'>
                { Number(getDisplayBalance(baseTokenBalance.value, 18, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 }) }
              </CardColumn2>
              <CardColumn3 className='text-center'>ARTH-DP</CardColumn3>
            </CardSection>
            <BuySellTable
              baseTokenBalance={baseTokenBalance}
              // quoteTokenBalance={quoteTokenBalance}
              action={'Sell'}
              selectQuoteToken={{name: selectQuoteToken, balance: 
                selectQuoteToken == "USDC" ? 
                Number(getDisplayBalance(usdcbal.value, 6, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 }) :
                Number(getDisplayBalance(mahabal.value, 18, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 })
              }}
            />
          </Card>
        </Wrapper>
      </div>

      <div style={{display: 'flex', flexDirection: isMobile? 'column' : 'row'}}>
        <Wrapper>
          <Card className={'material-primary'}>
            <CardHeader>Buy Orders</CardHeader>
            <CardSubHeader>lorem ipsum lorem ipsum lorem ipsum lorem ipsum</CardSubHeader>
            <BuyOrdersCard selectQuoteToken={selectQuoteToken} />
          </Card>
        </Wrapper>
        <Wrapper>
          <Card className={'material-primary'}>
            <CardHeader>Sell Orders</CardHeader>
            <CardSubHeader>lorem ipsum lorem ipsum lorem ipsum lorem ipsum</CardSubHeader>
            <SellOrdersCard selectQuoteToken={selectQuoteToken} />
          </Card>
        </Wrapper>
      </div>

      {/* <div style={{display: 'flex'}}>
        <Wrapper>
          <Card className={'material-primary'}>
            <CardHeader>My Orders</CardHeader>
            <CardSubHeader>lorem ipsum lorem ipsum lorem ipsum lorem ipsum</CardSubHeader>
            <MyOrders />
          </Card>
        </Wrapper>
        <Wrapper>
          <Card className={'material-primary'}>
            <CardHeader>Market History</CardHeader>
            <CardSubHeader>lorem ipsum lorem ipsum lorem ipsum lorem ipsum</CardSubHeader>
            <MyOrders />
          </Card>
        </Wrapper>
      </div> */}

    </div>
    
  )
}

export default Dex


const Wrapper = styled.div`
  min-width: 200px;
  width: 100%;
  border-radius: 6px;
  height: 100%;
  border: 1px solid;
  border-image-source: linear-gradient(180deg,
  rgba(255, 116, 38, 0.1) 0%,
  rgba(255, 255, 255, 0) 100%);
  margin-bottom: 50px;
  margin-right: 5px;
  @media (max-width: 768px) {
    margin-top: 0;
    margin-bottom: 8px;
  }
`;

const CardHeader = styled.h2`
  color: #fff;
  display: flex;
  font-weight: 600;
  font-size: 18px;
  justify-content: start;
  align-items: center;
  text-align: center;
  padding: 32px 0 0 32px;
  // border-bottom: 1px solid #FFFFFF20;
  margin-bottom: 8px;
  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const CardSubHeader = styled.div`
  color: #999;
  display: flex;
  font-size: 14px;
  justify-content: start;
  align-items: center;
  text-align: center;
  padding: 0 32px 20px 32px;
  border-bottom: 1px solid #FFFFFF20;
  @media (max-width: 600px) {
    padding: 16px;
  }
`

const Card = styled.div`
  padding: 5px 0;
  color: #eee;
  position: relative;
  background-clip: padding-box;
  border: 1px solid;
  border-image-source: linear-gradient(
    180deg,
    rgba(255, 116, 38, 0.1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(70px);
  border-radius: 6px;
  @media (max-width: 768px) {
    min-height: auto;
  }
  min-height: 400px;
`;

const CardSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0 32px 0px 32px;
  margin-top: 24px;

  &:last-child {
    margin-bottom: 0;
  }
  &.right {
    text-align: right;
  }
`;

const CardColumn1 = styled.div`
  flex-basis: 20%; 
`
const CardColumn2 = styled.div`
  flex-basis: 55%; 
`
const CardColumn3 = styled.div`
  flex-basis: 25%;
`