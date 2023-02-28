import { useState } from "react"
import { Card, CardColumn1, CardColumn2, CardColumn3, CardHeader, CardSection, CardSubHeader, Wrapper } from ".."
import Button from "../../../components/Button"
import useCore from "../../../hooks/useCore"
import useTokenBalance from "../../../hooks/useTokenBalance"
import { getDisplayBalance } from "../../../utils/formatBalance"
import BuySellTable from "./BuySellTable"

function BuyDebt(){
  const core = useCore()

  let arthUsdcPairStatus = localStorage.getItem('selectorQToken') || 'usdc'
  const [selectQuoteToken, setSelectQuoteToken] = useState<string>('USDC')
  const [selectorQToken, setSelectorQToken] = useState<string>(arthUsdcPairStatus)

  const baseTokenBalance = useTokenBalance(core.tokens['ARTH-DP'])
  const usdcbal = useTokenBalance(core.tokens['USDC'])
  const mahabal = useTokenBalance(core.tokens['MAHA'])
  const sclpbal = useTokenBalance(core.tokens['SCLP'])

  const handleChange = (val: string) => {
    localStorage.setItem('selectorQToken', val)
    console.log('handleChange', val)
    setSelectorQToken(val);

  };

    return(
        <div className="m-t-90">
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
            </div>
            <Wrapper>
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
                            Number(getDisplayBalance(sclpbal.value, 18, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 })}}
                    />
                </Card>
            </Wrapper> 
        </div>
    )
}

export default BuyDebt