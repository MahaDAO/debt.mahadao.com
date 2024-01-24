import { ethers } from 'ethers';
import { Grid } from "@material-ui/core";
import Loader from 'react-spinners/BeatLoader';
import { BigNumber } from "@ethersproject/bignumber";
import { useState, useEffect, useMemo } from 'react';

import theme from "../../../theme";

import ToolTip from "../../../components/Tooltip";
import TextWrapper from "../../../components/TextWrapper";
import { DECIMALS_18, LOADING_DEFAULT_BASIC_STATE } from "../../../utils/constants";

import { getDisplayBalance } from '../../../utils/formatBalance';

import useGetDebtPoolSupply from '../../../hooks/state/useGetDebtPoolSupply';
import useCore from '../../../hooks/useCore';
import useGetCirculatingSupply from '../../../hooks/state/useGetCirculatingSupply';

const ContractBalanceContainer = () => {

  const totalCirculatingSupply = useGetCirculatingSupply();
  const totalSupply = useGetDebtPoolSupply('ARTH-DP')

  const percentOfDebtBurned = useMemo(() => {
    if (totalCirculatingSupply.isLoading) return {
      isLoading: true,
      value: BigNumber.from(0)
    };

    if (Number(getDisplayBalance(totalCirculatingSupply.value, 18, 3)) < 0 || !totalCirculatingSupply) return {
      isLoading: false,
      value: BigNumber.from(0)
    }

    if (totalSupply.value !== totalCirculatingSupply.value && !totalSupply.value.isZero()) {
      // let val = ((Number(ethers.utils.formatEther(totalSupply.value)) - Number(ethers.utils.formatEther(totalCirculatingSupply.value))) / Number(ethers.utils.formatEther(totalSupply.value)))

      let diff = totalSupply.value.sub(totalCirculatingSupply.value)
      let val = (totalCirculatingSupply.value.sub(totalSupply.value)).mul(100).div(totalCirculatingSupply.value).toNumber()

      console.log('sdf', val)
      let bigval = ethers.utils.parseEther(`${val}`)

      return {
        isLoading: false,
        value: bigval
      }
    }

    return {
      isLoading: false,
      value: ethers.utils.parseEther(`0`)
    }

  }, [totalSupply, totalCirculatingSupply]);


  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div className="material-primary m-b-16 single-line-center-center" style={{ flex: 1 }}>
        <div className="m-b-8">
          {
            totalCirculatingSupply.isLoading
              ? <Loader color={'#ffffff'} loading={true} size={4} margin={2} />
              : (
                <TextWrapper
                  text={
                    Number(getDisplayBalance(totalCirculatingSupply.value, 18, 3)).toLocaleString(undefined, { minimumFractionDigits: 3 }) +
                    ' ARTH-DP'
                  }
                  fontSize={24}
                  fontWeight={'bold'}
                  Fcolor={'#FFFFFF'}
                  align="center"
                  className='m-b-16'
                />
              )
          }
          {
            percentOfDebtBurned.isLoading
              ? <Loader color={'#ffffff'} loading={true} size={4} margin={2} />
              : (
                <TextWrapper
                  text={
                    '(' +
                    Number(getDisplayBalance(percentOfDebtBurned.value, 18, 3)).toLocaleString(undefined, { minimumFractionDigits: 3 }) +
                    ' % debt burned)'
                  }
                  fontSize={24}
                  // fontWeight={'bold'}
                  Fcolor={theme.color.transparent[100]}
                  align="center"
                />
              )
          }
        </div>
        {/* <div className="single-line-center-center">
          <TextWrapper text={'Total MAHA locked:'} Fcolor={theme.color.transparent[100]} align="center" />
          <ToolTip toolTipText={'The total MAHA locked by all users.'} className='m-l-4' />
        </div> */}
      </div>
      <div className="material-primary single-line-center-center" style={{ flex: 1 }}>
        <div>
          {
            totalSupply.isLoading
              ? <div className="single-line-center-center">
                <Loader color={'#ffffff'} loading={true} size={4} margin={2} />
              </div>
              : (
                <TextWrapper
                  text={`$ ${Number(getDisplayBalance(totalSupply.value, 18, 3)).toLocaleString(undefined, { minimumFractionDigits: 3 })
                    }`}
                  fontSize={24}
                  fontWeight={'bold'}
                  Fcolor={'#FFFFFF'}
                  align="center"
                  className='m-b-16'
                />
              )
          }
          <div className="single-line-center-center m-b-16">
            <TextWrapper fontSize={24} text={'Total debt issued'} Fcolor={theme.color.transparent[100]} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default ContractBalanceContainer;
