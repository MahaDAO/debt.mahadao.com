import styled from 'styled-components';
import {ethers} from 'ethers'
import Numeral from 'numeral';
import CancelIcon from '@material-ui/icons/Cancel';

import useCore from '../../../hooks/useCore';
import { useEffect } from 'react';
import { useState } from 'react';
import { formatToBN, getDisplayBalance } from '../../../utils/formatBalance';
import useCancelOffer from '../../../hooks/state/useCancelOffer';


function SellOrdersCard() {

  const core = useCore()

  const [buyOrderData, setBuyOrderData] = useState<any[]>([])
  const [sellOrderData, setSellOrderData] = useState<any[]>([])
  const [cancelId, setCancelId] = useState<number>(0)
  const owner = core.myAccount

  let allOfers: any = []

  useEffect(() => {
    getSellOrderData()
  
  }, [])
  

  const getSellOrderData = async() => {
    
    let buyOrderArr: any = []
    let sellOrderArr: any = []

    const testLastOfferId = await core.contracts['MatchingMarket'].last_offer_id()
    // console.log('testLastOfferId', testLastOfferId.toString());
    
    for(let i = 1; i <= testLastOfferId.toString(); i++){
      const testoffer = await core.contracts['MatchingMarket'].offers(i)
      // console.log('testoffer', testoffer, i)
      if(testoffer[5]._hex !== "0x00"){
        if(testoffer.pay_gem === core.tokens['ARTH-DP'].address) {
          sellOrderArr.push({testoffer, i})
  
          setSellOrderData(sellOrderArr)
        }

        // allOfers.push({testoffer, i})
      }
    }
  // console.log('allOfers', allOfers)

  }

  console.log('sellOrderData', sellOrderData)

  const sellOrderAction = useCancelOffer(cancelId)

  const handleCancelOrder = (id: number) => {
    setCancelId(id)
    sellOrderAction(() => {})
  }

  return (
    <CardContent>
      
      <CardSection style={{marginBottom: '20px', fontWeight: 'bold',}}>
        <CardColumn1 className='text-center'>Price</CardColumn1>
        <CardColumn2 className='text-center'>USDC</CardColumn2>
        <CardColumn3 className='text-center'>ARTH-DP</CardColumn3>
        <div style={{padding: '13px'}}></div>
      </CardSection>
      {
        sellOrderData?.map((order: any) => {

          const payAmt = getDisplayBalance(order.testoffer.pay_amt, 18, 3)
          const buyAmt = getDisplayBalance(order.testoffer.buy_amt, 6, 3)
          const price = Number(buyAmt) / Number(payAmt)
  
          return(
            <CardSection key={order.i}>
              <CardColumn1 className={'table-border single-line-center-center'}>
                { Numeral(price).format('0.000') }
              </CardColumn1>
              <CardColumn2 className={'table-border single-line-center-center'}>
                { Numeral(buyAmt).format('0.000') }
              </CardColumn2>
              <CardColumn3 className={'table-border single-line-center-center'}>
                { Numeral(payAmt).format('0.000')}
              </CardColumn3>
              {
                owner === order.testoffer.owner ?
                  <div className={'single-line-center-center pointer'} onClick={() => {handleCancelOrder(order.i)}} style={{padding: '9px'}}>
                    <CancelIcon />
                  </div>
                :  <div style={{padding: '13px'}}></div>
              }
              
            </CardSection>
          )
        } )

      }
  
    </CardContent>
  )
}

export default SellOrdersCard


const CardContent = styled.div`
  display: flex;
  padding: 0 32px 32px 32px;
  align-items: self-start;
  margin-top: 24px;
  flex-direction: column;
  @media (max-width: 600px) {
    padding: 0 16px 16px 16px;
  }

`;

const CardSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  &:last-child {
    margin-bottom: 0;
  }
  &.right {
    text-align: right;
  }
`;

const CardColumn1 = styled.div`
  flex-basis: 33%; 
  padding: 9px;
`
const CardColumn2 = styled.div`
  flex-basis: 33%; 
  padding: 9px;
`
const CardColumn3 = styled.div`
  flex-basis: 33%; 
  padding: 9px;
`