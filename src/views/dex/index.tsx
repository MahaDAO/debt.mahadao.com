import styled from 'styled-components';
import { useMediaQuery } from "react-responsive";
import _ from 'underscore'

import BuySellTable from './components/BuySellTable';
import useTokenBalance from '../../hooks/useTokenBalance';
import useCore from '../../hooks/useCore';
import { getDisplayBalance } from '../../utils/formatBalance';
import BuyOrdersCard from './components/BuyOrdersCard';
import SellOrdersCard from './components/SellOrdersCard';
import { useEffect, useState } from 'react';
import Selector from '../../components/Selector';
import { FormControl, FormControlLabel, FormLabel, Grid, RadioGroup, Switch, Typography } from '@material-ui/core';
import { AntSwitch } from '../../components/AntSwitch';
import Button from '../../components/Button';
import useGetBestBuyOrders from '../../hooks/state/useGetBestBuyOrders';
import useGetBestSellOrders from '../../hooks/state/useGetBestSellOrders copy';

function Dex() {

  const core = useCore()
  const isMobile = useMediaQuery({ maxWidth: '600px' });
  const baseTokenBalance = useTokenBalance(core.tokens['ARTH-DP'])
  const quoteTokenBalance = useTokenBalance(core.tokens['USDC'])
  let arthUsdcPairStatus = localStorage.getItem('selectorQToken') || 'usdc'

  const [selectQuoteToken, setSelectQuoteToken] = useState<string>('USDC')
  const [selectorQToken, setSelectorQToken] = useState<string>(arthUsdcPairStatus)

  const usdcbal = useTokenBalance(core.tokens['USDC'])
  const mahabal = useTokenBalance(core.tokens['MAHA'])
  const sclpbal = useTokenBalance(core.tokens['SCLP'])

  const buyList = useGetBestBuyOrders(selectQuoteToken)
  const sellList = useGetBestSellOrders(selectQuoteToken)

  useEffect(() => {
    if (selectorQToken === 'maha') {
      setSelectQuoteToken('MAHA')
    } else if (selectorQToken === 'usdc') {
      setSelectQuoteToken('USDC')
    }
    else {
      setSelectQuoteToken('SCLP')
    }
  }, [selectorQToken])

  const handleChange = (val: string) => {
    localStorage.setItem('selectorQToken', val)
    console.log('handleChange', val)
    setSelectorQToken(val);

  };

  return (
    <div className='custom-container'>
      <CardHeader style={{ fontSize: '24px', justifyContent: 'center' }}>Sell Your Debt Early</CardHeader>
      <CardSubHeader style={{ justifyContent: 'center', marginBottom: '24px' }}>
        In this section, you can place orders to sell your debt tokens (ARTH-DP) for other
        tokens at a price that you choose. On a monthly basis the team will attempt to regularly
        fullfil the orders with whatever inventory was available at that time.
      </CardSubHeader>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <div style={{ marginRight: '10px' }}>
          <Button
            text="ARTH-DP / USDC"
            onClick={
              () => { handleChange('usdc') }
            }
            variant={selectorQToken === 'usdc' ? 'default' : 'transparent'}
          />
        </div>
        {/* <div style={{ marginRight: '10px' }}>
          <Button
            text="ARTH-DP / MAHA"
            onClick={
              () => { handleChange('maha') }
            }
            variant={selectorQToken === 'maha' ? 'default' : 'transparent'}
          />
        </div> */}
        {/* <div style={{ marginRight: '10px' }}>
          <Button
            text="ARTH-DP / SCLP"
            onClick={
              () => { handleChange('sclp') }
            }
            variant={selectorQToken === 'sclp' ? 'default' : 'transparent'}
          />
        </div> */}
      </div>
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
        {/* <Wrapper>
          <Card className={'material-primary'}>
            <CardHeader>BUY DEBT</CardHeader>
            <CardSubHeader>Buy debt tokens using {selectQuoteToken}</CardSubHeader>
            <CardSection style={{ marginBottom: '20px', fontWeight: 'bold', }} className={'alignItemsCenter'}>
              <CardColumn1 className='text-center'>AVAILABLE</CardColumn1>
              <CardColumn2 className='text-right'>
                {
                  selectQuoteToken == "USDC" ?
                    Number(getDisplayBalance(usdcbal.value, 6, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 }) :
                    selectQuoteToken == "MAHA" ?
                      Number(getDisplayBalance(mahabal.value, 18, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 }) :
                      Number(getDisplayBalance(sclpbal.value, 18, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 })
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
              selectQuoteToken={{
                name: selectQuoteToken, balance:
                  selectQuoteToken == "USDC" ?
                    Number(getDisplayBalance(usdcbal.value, 6, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 }) :
                    selectQuoteToken == "MAHA" ?
                      Number(getDisplayBalance(mahabal.value, 18, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 }) :
                      Number(getDisplayBalance(sclpbal.value, 18, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 })
              }}
            />
          </Card>
        </Wrapper> */}
        <Wrapper> 
          <Card className={'material-primary'}>
            <CardHeader>SELL DEBT</CardHeader>
            <CardSubHeader>Sell your debt tokens for {selectQuoteToken}</CardSubHeader>
            <CardSection style={{ marginBottom: '20px', fontWeight: 'bold', }} className={'alignItemsCenter'}>
              <CardColumn1 className='text-center'>AVAILABLE</CardColumn1>
              <CardColumn2 className='text-right'>
                {Number(getDisplayBalance(baseTokenBalance.value, 18, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 })}
              </CardColumn2>
              <CardColumn3 className='text-center'>ARTH-DP</CardColumn3>
            </CardSection>
            <BuySellTable
              baseTokenBalance={baseTokenBalance}
              // quoteTokenBalance={quoteTokenBalance}
              action={'Sell'}
              selectQuoteToken={{
                name: selectQuoteToken, balance:
                  selectQuoteToken == "USDC" ?
                    Number(getDisplayBalance(usdcbal.value, 6, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 }) :
                    selectQuoteToken == "MAHA" ?
                      Number(getDisplayBalance(mahabal.value, 18, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 }) :
                      Number(getDisplayBalance(sclpbal.value, 18, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 })
              }}
            />
          </Card>
        </Wrapper>
      </div>

      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
        {/* <Wrapper>
          <Card className={'material-primary'}>
            <CardHeader>Buy Orders</CardHeader>
            <CardSubHeader>All orders buying debt tokens</CardSubHeader>
            <BuyOrdersCard buyList={buyList} selectQuoteToken={selectQuoteToken} />
          </Card>
        </Wrapper> */}
        <Wrapper>
          <Card className={'material-primary'}>
            <CardHeader>Sell Orders</CardHeader>
            <CardSubHeader>All orders selling debt tokens</CardSubHeader>
            <SellOrdersCard sellList={sellList} selectQuoteToken={selectQuoteToken} />
          </Card>
        </Wrapper>
      </div>
    </div>

  )
}

export default Dex


export const Wrapper = styled.div`
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

export const CardHeader = styled.h2`
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

export const CardSubHeader = styled.div`
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

export const Card = styled.div`
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

export const CardSection = styled.div`
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

export const CardColumn1 = styled.div`
  flex-basis: 20%;
`
export const CardColumn2 = styled.div`
  flex-basis: 55%;
`
export const CardColumn3 = styled.div`
  flex-basis: 25%;
`
