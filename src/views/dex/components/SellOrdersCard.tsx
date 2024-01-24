import styled from 'styled-components';
import { BigNumber, ethers } from 'ethers'
import Numeral from 'numeral';
import CancelIcon from '@material-ui/icons/Cancel';

import useCore from '../../../hooks/useCore';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { formatToBN, getDisplayBalance } from '../../../utils/formatBalance';
import useCancelOffer from '../../../hooks/state/useCancelOffer';
import useDebtOrders from '../../../hooks/callbacks/useDebtOrders';

interface IProps {
  selectQuoteToken: string
}

function SellOrdersCard(props: IProps) {
  const { selectQuoteToken } = props

  const core = useCore()

  const sellOrderData = useDebtOrders(selectQuoteToken)
  const [cancelId, setCancelId] = useState<number>(0)
  const owner = core.myAccount

  const sellOrderAction = useCancelOffer(cancelId)

  const handleCancelOrder = (id: number) => {
    setCancelId(id)
    sellOrderAction(id)
  }

  const tokenAddr = core.tokens[selectQuoteToken].address
  const sortedorders = useMemo(() => sellOrderData
    .filter((a) => a.buy_gem.toLowerCase() === tokenAddr.toLowerCase())
    .sort((a, b) => {
      const apayAmt = getDisplayBalance(a.pay_amt, 18, 3)
      const abuyAmt = getDisplayBalance(a.buy_amt, 6, 3)
      const aprice = Number(abuyAmt) / Number(apayAmt)

      const bpayAmt = getDisplayBalance(b.pay_amt, 18, 3)
      const bbuyAmt = getDisplayBalance(b.buy_amt, 6, 3)
      const bprice = Number(bbuyAmt) / Number(bpayAmt)

      return Number(aprice) - Number(bprice)
    }), [sellOrderData, tokenAddr])

  return (
    <CardContent>

      <CardSection style={{ marginBottom: '20px', fontWeight: 'bold', }}>
        <CardColumn1 className='text-center'>Price</CardColumn1>
        <CardColumn2 className='text-center'>{selectQuoteToken}</CardColumn2>
        <CardColumn3 className='text-center'>ARTH-DP</CardColumn3>
        <div style={{ padding: '13px' }}></div>
      </CardSection>
      {
        sortedorders?.map((order, index) => {
          const payAmt = getDisplayBalance(BigNumber.from(order.pay_amt), 18, 3)
          const buyAmt = getDisplayBalance(BigNumber.from(order.buy_amt), 6, 3)
          const price = Number(buyAmt) / Number(payAmt)

          return (
            <CardSection key={index}>
              <CardColumn1 className={'table-border single-line-center-center'}>
                {Numeral(price).format('0.000')}
              </CardColumn1>
              <CardColumn2 className={'table-border single-line-center-center'}>
                {Numeral(buyAmt).format('0.000')}
              </CardColumn2>
              <CardColumn3 className={'table-border single-line-center-center'}>
                {Numeral(payAmt).format('0.000')}
              </CardColumn3>
              {
                owner.toLowerCase() === order.owner.toLowerCase() ?
                  <div className={'single-line-center-center pointer'} onClick={() => { handleCancelOrder(order.id) }} style={{ padding: '9px' }}>
                    <CancelIcon />
                  </div>
                  : <div />
              }

            </CardSection>
          )
        })

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
