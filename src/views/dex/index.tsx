import styled from 'styled-components';
import {useMediaQuery} from "react-responsive";

import BuySellTable from './components/BuySellTable';
import useTokenBalance from '../../hooks/useTokenBalance';
import useCore from '../../hooks/useCore';
import { getDisplayBalance } from '../../utils/formatBalance';

function Dex() {

  const core = useCore()
  const isMobile = useMediaQuery({ maxWidth: '600px' });
  const baseTokenBalance = useTokenBalance(core.tokens['ARTH-DP'])
  const quoteTokenBalance = useTokenBalance(core.tokens['USDC'])

  return (
    <div className='custom-container'>
      <div style={{display: 'flex', flexDirection: isMobile? 'column' : 'row'}}>
        <Wrapper>
          <Card className={'material-primary'}>
            <CardHeader>Buy Debt</CardHeader>
            <CardSubHeader>lorem ipsum lorem ipsum lorem ipsum lorem ipsum</CardSubHeader>
            <BuySellTable
              baseTokenBalance={baseTokenBalance}
              quoteTokenBalance={quoteTokenBalance}
              action={'Buy'}
              availableToken={{name: 'USDC', balance: Number(getDisplayBalance(quoteTokenBalance.value, 6, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 })}}
            />
          </Card>
        </Wrapper>
        <Wrapper>
          <Card className={'material-primary'}>
            <CardHeader>Sell Debt</CardHeader>
            <CardSubHeader>lorem ipsum lorem ipsum lorem ipsum lorem ipsum</CardSubHeader>
            <BuySellTable
              baseTokenBalance={baseTokenBalance}
              quoteTokenBalance={quoteTokenBalance}
              action={'Sell'}
              availableToken={{name: 'ARTH-DP', balance: Number(getDisplayBalance(baseTokenBalance.value, 18, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 })}}
            />
          </Card>
        </Wrapper>
      </div>

      <div style={{display: 'flex'}}>
        <Wrapper>
          <Card className={'material-primary'}>
            <CardHeader>Buy Orders</CardHeader>
          </Card>
        </Wrapper>
        <Wrapper>
          <Card className={'material-primary'}>
            <CardHeader>Sell Orders</CardHeader>
          </Card>
        </Wrapper>
      </div>

      <div style={{display: 'flex'}}>
        <Wrapper>
          <Card className={'material-primary'}>
            <CardHeader>My Orders</CardHeader>
          </Card>
        </Wrapper>
        <Wrapper>
          <Card className={'material-primary'}>
            <CardHeader>Market History</CardHeader>
          </Card>
        </Wrapper>
      </div>

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
