import styled from 'styled-components';
import {BigNumber, ethers} from 'ethers'
import Numeral from 'numeral';
import CancelIcon from '@material-ui/icons/Cancel';

import useCore from '../../../hooks/useCore';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useCancelOffer from '../../../hooks/state/useCancelOffer';

interface IProps {
  selectQuoteToken: string
}


function BuyOrdersCard(props: IProps) {

  const {selectQuoteToken} = props

  const core = useCore()


  const [buyOrderData, setBuyOrderData] = useState<any[]>([])
  const [sellOrderData, setSellOrderData] = useState<any[]>([])
  const [cancelId, setCancelId] = useState<number>(0)
  const owner = core.myAccount

  let allOfers: any = []

  useEffect(() => {
    getBuyOrderData()
    console.log("inside useeffect")
  
  }, [selectQuoteToken])
  

  const getBuyOrderData = async() => {
    
    let buyOrderArr: any = []
    let sellOrderArr: any = []

    const testLastOfferId = await core.contracts['MatchingMarket'].last_offer_id()
    
    for(let i = 1; i <= testLastOfferId.toString(); i++){
      const offer = await core.contracts['MatchingMarket'].offers(i)

      if(offer[5]._hex !== "0x00"){
        if(offer.buy_gem.toLowerCase() === core.tokens['ARTH-DP'].address.toLowerCase()){
          if(offer.pay_gem.toLowerCase() === core.tokens['USDC'].address.toLowerCase())
            buyOrderArr.push({offer, i, exchangeToken: 'USDC'})
          if(offer.pay_gem.toLowerCase() === core.tokens['MAHA'].address.toLowerCase())
            buyOrderArr.push({offer, i, exchangeToken: 'MAHA'})
          if(offer.pay_gem.toLowerCase() === core.tokens['SCLP'].address.toLowerCase())
            buyOrderArr.push({offer, i, exchangeToken: 'SCLP'})

          const finalArr = buyOrderArr.sort((a: any, b: any) => Number(getDisplayBalance(a.offer.buy_amt)) - Number(getDisplayBalance(b.offer.buy_amt)))
          setBuyOrderData(finalArr)
        }
      }
    }
  }

  const cancelOrderAction = useCancelOffer(cancelId)

  const handleCancelOrder = (id: number) => {
    setCancelId(id)
    cancelOrderAction(id)
  }

  console.log("buyOrderData",buyOrderData)



  return (
    <CardContent>
      
      <CardSection style={{marginBottom: '20px', fontWeight: 'bold',}}>
        <CardColumn1 className='text-center'>Price</CardColumn1>
        <CardColumn2 className='text-center'>{selectQuoteToken}</CardColumn2>
        <CardColumn3 className='text-center'>ARTH-DP</CardColumn3>
        <div style={{padding: '13px'}}></div>
      </CardSection>
      {
        buyOrderData?.filter((a) => a.exchangeToken == selectQuoteToken).map((order: any) => {

          const payAmt = getDisplayBalance(order.offer.pay_amt, 6, 3)
          const buyAmt = getDisplayBalance(order.offer.buy_amt)
          const price = Number(payAmt) / Number(buyAmt)
  
          return(
            <CardSection key={order.i} >
              <CardColumn1 className={'table-border single-line-center-center'}>
                { Numeral(price).format('0.000') }
              </CardColumn1>
              <CardColumn2 className={'table-border single-line-center-center'}>
                { Numeral(payAmt).format('0.000')}
              </CardColumn2>
              <CardColumn3 className={'table-border single-line-center-center'}>
                { Numeral(buyAmt).format('0.000') }
              </CardColumn3>
              {
                owner === order.offer.owner ? 
                <div className={'single-line-center-center pointer p9'} onClick={() => {handleCancelOrder(order.i)}} >
                  <CancelIcon />
                </div>
                : <div className={'single-line-center-center pointer p9'}><CancelIcon color={'disabled'} style={{color: '#444'}} /></div>
              }
              
            </CardSection>
          )
        } )

      }
  
    </CardContent>
  )
}

export default BuyOrdersCard


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