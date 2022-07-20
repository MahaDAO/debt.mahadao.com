import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import React from 'react'
import { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InputContainer from '../../components/InputContainer';
import useUploadUser from '../../hooks/state/useUploadUser';
import { formatToBN } from '../../utils/formatBalance';

function Form() {
  const [amount, setAmount] = useState<string>('0')
  const [address, setAddress] = useState<string>('')
  
  const uploadAction = useUploadUser(amount, address)

  const handleUpload = () => {
    uploadAction(() => {})
  }

  return (
    <div className='custom-container' style={{marginTop: '150px', color: 'white', padding: '0 200px'}}>
      <h1 
        className={'m-b-32'}
        >Register User</h1>
      <InputContainer
        label={'Enter Amount and Address'}
        className={'custom-mahadao-container-content'}
        
      >
        <div className={'single-line-center-between m-b-20'}>
          <Input
            value={amount}
            setValue={setAmount}
            placeholder={'Amount'}
          />
        </div>
        <div className={'single-line-center-between m-b-20'}>
          {/* <input type={'text'} value={address} onChange={(e) => setAddress(e.target.value)} /> */}
          <Input
            value={address}
            setValue={setAddress}
            placeholder={'Address'}
            isNum={false}
          />
        </div>
        <Button
          text={'Upload'}
          size={'lg'}
          onClick={handleUpload}
        />
      </InputContainer>
    
    </div>
  )
}

export default Form