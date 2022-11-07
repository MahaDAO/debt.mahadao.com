import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InputContainer from '../../components/InputContainer';
import useUploadUser from '../../hooks/state/useUploadUser';
import styled from 'styled-components';

function Form() {
  const isMobile = useMediaQuery({maxWidth: '680px'})
  const [amount, setAmount] = useState<string>('0')
  const [address, setAddress] = useState<string>('')
  
  const uploadAction = useUploadUser(amount, address)

  const handleUpload = () => {
    uploadAction(() => {})
  }

  return (
    <div className='custom-container' style={{marginTop: '150px', color: 'white', padding: isMobile ? '0 16px' : '0 200px'}}>
      <CardHeader 
        className={'m-b-32'}
        >Register User</CardHeader>
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

const CardHeader = styled.h2`
  color: #fff;
  display: flex;
  font-weight: 600;
  font-size: 18px;
  justify-content: start;
  align-items: center;
  text-align: center;
  padding: 32px;
  border-bottom: 1px solid #FFFFFF20;
  @media (max-width: 600px) {
    padding: 16px;
  }
`;