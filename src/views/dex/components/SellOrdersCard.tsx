import styled from 'styled-components';
import {ethers} from 'ethers'
import Numeral from 'numeral';
import CancelIcon from '@material-ui/icons/Cancel';

import useCore from '../../../hooks/useCore';
import { useEffect } from 'react';
import { useState } from 'react';
import { formatToBN, getDisplayBalance } from '../../../utils/formatBalance';
import useCancelOffer from '../../../hooks/state/useCancelOffer';

interface IProps {
  selectQuoteToken: string,
  sellList: any[]
}

function SellOrdersCard(props: IProps) {
  const {selectQuoteToken, sellList} = props

  const core = useCore()

  const [buyOrderData, setBuyOrderData] = useState<any[]>([])
  const [sellOrderData, setSellOrderData] = useState<any[]>([])
  const [cancelId, setCancelId] = useState<number>(0)
  const owner = core.myAccount

  let allOfers: any = []

  // useEffect(() => {
  //   getSellOrderData()  
  // }, [selectQuoteToken])
  

  // const getSellOrderData = async() => {
  //       let sellOrderArr: any = []

  //   const testLastOfferId = await core.contracts['MatchingMarket'].last_offer_id()
    
  //   for(let i = 1; i <= testLastOfferId.toString(); i++){
  //     const offer = await core.contracts['MatchingMarket'].offers(i)
  //     if(offer[5]._hex !== "0x00"){
  //       if(offer.pay_gem.toLowerCase() === core.tokens['ARTH-DP'].address.toLowerCase()) {
  //         if(offer.buy_gem.toLowerCase() === core.tokens['USDC'].address.toLowerCase())
  //           sellOrderArr.push({offer, i, exchangeToken: 'USDC'})
  //         if(offer.buy_gem.toLowerCase() == core.tokens['MAHA'].address.toLowerCase())
  //           sellOrderArr.push({offer, i, exchangeToken: 'MAHA'})
  //         if(offer.buy_gem.toLowerCase() == core.tokens['SCLP'].address.toLowerCase())
  //           sellOrderArr.push({offer, i, exchangeToken: 'SCLP'})

  //         const finalArr = sellOrderArr.sort((a: any, b: any) => Number(getDisplayBalance(a.offer.pay_amt)) - Number(getDisplayBalance(b.offer.pay_amt)))

  //         setSellOrderData(finalArr)
  //       }
  //     }
  //   }
  // }

  const sellOrderAction = useCancelOffer(cancelId)

  const handleCancelOrder = (id: number) => {
    setCancelId(id)
    sellOrderAction(id)
  }

  console.log('sellList', sellList)

  return (
    <CardContent>
      
      <CardSection style={{marginBottom: '20px', fontWeight: 'bold',}}>
        <CardColumn1 className='text-center'>Price</CardColumn1>
        <CardColumn2 className='text-center'>{selectQuoteToken}</CardColumn2>
        <CardColumn3 className='text-center'>ARTH-DP</CardColumn3>
        <div style={{padding: '13px'}}></div>
      </CardSection>
      {
        sellList
          .filter((item) => item[5]._hex !== "0x00")
          .sort((a: any, b: any) => 
            Number(getDisplayBalance(a.pay_amt)) - Number(getDisplayBalance(b.pay_amt)))
              .map((order: any, i: number) => {

          const payAmt = getDisplayBalance(order.pay_amt, 18, 3)
          const buyAmt = getDisplayBalance(order.buy_amt, selectQuoteToken === 'USDC' ? 6 : 18, 3)
          const price = Number(buyAmt) / Number(payAmt)
  
          return(
            <CardSection key={i}>
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
                owner === order.owner ?
                  <div className={'single-line-center-center pointer p9'} onClick={() => {handleCancelOrder(i)}}>
                    <CancelIcon />
                  </div>
                :  <div className={'single-line-center-center pointer p9'}><div style={{marginRight: '14px'}} className='p5'></div></div>
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