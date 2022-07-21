import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import ContractBalanceContainer from './components/ContractBalanceContainer';
import DeptCard from './components/DeptCard';

// import LockerGraph from './components/LockerGraph';

const LockDeposit = () => {
  const isMobile = useMediaQuery({maxWidth: '680px'})

  return (
    <div className='custom-container' style={{marginTop: '150px', }}>
      <div className="m-b-40">
        <PageHeading>{'DEBT POOL'}</PageHeading>
      </div>
      <DebtContainer style={{flexDirection: isMobile ? 'column' : 'row'}}>
        <DeptCard price={1} symbol={'ARTH-DP'} />
        <ContractBalanceContainer />
      </DebtContainer>
      {/* <LockerGraph /> */}
    </div>
  )
}

export default LockDeposit;

const DebtContainer = styled.div`
  display: flex;
  margin-bottom: 50px;
`

const PageHeading = styled.p`
  font-family: Syne;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-align: center;
  color: #ffffff;
  margin-bottom: 16px;
`;

const InfoHeader = styled.div`
  // max-width: 450px;
  margin-left: auto;
  margin-right: auto;
`
