import { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Button from '../../../components/Button';
import InfoTip from '../../../components/InfoTip';
import Input from '../../../components/Input';
import { getDisplayBalance } from '../../../utils/formatBalance';
import BuySellOfferModal from '../modals/BuySellOfferModal';
import Selector from '../../../components/Selector';
import useCore from '../../../hooks/useCore';
import useTokenBalance from '../../../hooks/useTokenBalance';

interface IProps {
  baseTokenBalance: any,
  action: string,
  selectQuoteToken: {
    name: string,
    balance: any
  }
}

function BuySellTable(props: IProps) {
  const core = useCore()
  const { action, selectQuoteToken, baseTokenBalance } = props;
  const [quoteToken, setQuoteToken] = useState<string>('')
  const [baseToken, setBaseToken] = useState<string>('')
  const [buyTotal, setBuyTotal] = useState<string>('0')
  const [sellTotal, setSellTotal] = useState<string>('0')
  const [openOfferModal, setOpenOfferModal] = useState<boolean>(false)

  const usdcbal = useTokenBalance(core.tokens['USDC'])
  const mahabal = useTokenBalance(core.tokens['MAHA'])

  let actionButton: boolean = false
  actionButton =
    action === "Buy" ?
      Number(selectQuoteToken.balance) < Number(quoteToken) ||
      Number(selectQuoteToken.balance) < Number(buyTotal)
      :
      Number(baseToken) > Number(getDisplayBalance(baseTokenBalance.value))

  // console.log('totalQuoteToken', totalQuoteToken, Number(getDisplayBalance(quoteTokenBalance.value, 6, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 }), Number(getDisplayBalance(baseTokenBalance.value, 18, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 }));
  console.log('first', buyTotal, sellTotal)

  useEffect(() => {
    if (quoteToken.length && baseToken.length) {
      if (action === 'Buy') {
        setBuyTotal((Number(quoteToken) * Number(baseToken)).toString())
      }
      if (action === 'Sell') {
        setSellTotal((Number(quoteToken) * Number(baseToken)).toString())
      }

    } else {
      setBuyTotal('0')
      setSellTotal('0')
    }

  }, [quoteToken, baseToken])

  console.log("test buysell", Number(baseToken), getDisplayBalance(baseTokenBalance.value))

  return (
    <CardContent>
      <CardSection>
        <CardColumn1
          className={'table-border single-line-center-center'}>Price</CardColumn1>
        <CardColumn2
          className={'table-border text-right'} >
          <Input
            value={quoteToken}
            setValue={setQuoteToken}
            alignInput={'right'}
          />
        </CardColumn2>
        <CardColumn3
          className={'table-border single-line-center-center'}>{selectQuoteToken.name}</CardColumn3>
      </CardSection>
      <CardSection>
        <CardColumn1 className={'table-border single-line-center-center'}>Amount</CardColumn1>
        <CardColumn2 className={'table-border text-right'}>
          <Input
            value={baseToken}
            setValue={setBaseToken}
            alignInput={'right'}
          />
        </CardColumn2>
        <CardColumn3 className={'table-border single-line-center-center'}>ARTH-DP</CardColumn3>
      </CardSection>
      <CardSection style={{ marginBottom: '40px' }}>
        <CardColumn1 className={'table-border single-line-center-center'}>Total</CardColumn1>
        <CardColumn2 className={'table-border text-right'}>
          <Input
            disabled={true}
            value={action === 'Buy' ? buyTotal.toString() : sellTotal.toString()}
            setValue={action === 'Buy' ? setBuyTotal : setSellTotal}
            alignInput={'right'}
          />
        </CardColumn2>
        <CardColumn3 className={'table-border single-line-center-center'}>{selectQuoteToken.name}</CardColumn3>
      </CardSection>
      <CardSection style={{ alignItems: 'center' }}>
        <CardColumn2>
          {
            action === "Buy" ?
              Number(selectQuoteToken.balance) < Number(quoteToken) || Number(selectQuoteToken.balance) < Number(buyTotal)
                ? <InfoTip type={'Error'} msg={`You don't have enough ${selectQuoteToken.name} tokens`} />
                : <InfoTip type={'Warning'} msg={'Enter a price to unlock amount'} />
              :
              Number(baseToken) > Number(getDisplayBalance(baseTokenBalance.value))
                ? <InfoTip type={'Error'} msg={`You don't have enough ARTH-DP tokens`} />
                : <InfoTip type={'Warning'} msg={'Enter a price to unlock amount'} />
          }
        </CardColumn2>
        <CardColumn1></CardColumn1>
        <CardColumn3 style={{ textAlign: 'center' }}>
          <Button
            disabled={actionButton}
            text={`${action}`}
            onClick={() => setOpenOfferModal(true)}
          />
        </CardColumn3>
      </CardSection>
      <BuySellOfferModal
        subTitle={`Here you can place an order to ${action.toLowerCase()} debt tokens.`}
        openModal={openOfferModal}
        onModalClose={() => setOpenOfferModal(false)}
        action={action}
        tableData={{
          quote: quoteToken,
          base: baseToken,
          total: action === 'Buy' ? buyTotal.toString() : sellTotal.toString(),
          quoteTokenBalance: selectQuoteToken.balance,
          selectQuoteToken
        }}
      />
    </CardContent>
  )
}

export default BuySellTable

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
  flex-basis: 20%;
`
const CardColumn2 = styled.div`
  flex-basis: 55%;
`
const CardColumn3 = styled.div`
  flex-basis: 25%;
`
