import { useCallback, useEffect, useState } from "react"
import { useBlockNumber } from "../../state/application/hooks";
import useCore from "../useCore";

const useGetBestSellOrders = (selectQuoteToken: string) => {
    const core = useCore();
    const blockNumber = useBlockNumber();
    const [data, setData] = useState<any[]>([])

    const fetchValue = useCallback(async() => {
        const marketAddress = core.contracts["MatchingMarket"].address
        const baseTokenAddress = core.contracts["ARTH-DP"].address
        const quoteTokenAddress = core.contracts[selectQuoteToken].address
        let uiHelperContract = core.contracts["UIHelper"]

        try {
            const res = await uiHelperContract.getBestSellOrders(marketAddress,baseTokenAddress, quoteTokenAddress, 50 )
            // console.log("useGetBestSellOrders res", res)
            setData(res)
        } catch (error) {
            console.log("useGetBestSellOrders error", error)
        }
    }, [])

    useEffect(() => {
        fetchValue()
            .catch((err) => console.log("err", err))
    }, [])

    return data

}

export default useGetBestSellOrders