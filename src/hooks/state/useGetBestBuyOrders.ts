import { useCallback, useEffect, useState } from "react"
import { useBlockNumber } from "../../state/application/hooks";
import useCore from "../useCore";

const useGetBestBuyOrders = (selectQuoteToken: string) => {
    const core = useCore();
    const blockNumber = useBlockNumber();
    const [data, setData] = useState<any[]>([])
    
    const fetchValue = useCallback(async() => {
        const marketAddress = core.contracts["MatchingMarket"].address
        const baseTokenAddress = core.contracts["ARTH-DP"].address
        const quoteTokenAddress = core.contracts[selectQuoteToken].address
        let uiHelperContract = core.contracts["UIHelper"]

        try {
            const res = await uiHelperContract.getBestBuyOrders(marketAddress,baseTokenAddress, quoteTokenAddress, 5 )
            // console.log("useGetBestBuyOrders res", res)
            setData(res)
        } catch (error) {
            console.log("useGetBestBuyOrders error", error)
        }
    }, [])

    useEffect(() => {

        fetchValue()
            .catch((err) => console.log("err", err))
    }, [selectQuoteToken])

    return data

}

export default useGetBestBuyOrders