import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import ContractBalanceContainer from './components/ContractBalanceContainer';
import DebtCard from './components/DebtCard';

// import LockerGraph from './components/LockerGraph';

const LockDeposit = () => {
  const isMobile = useMediaQuery({ maxWidth: '680px' })

  return (
    <div className='custom-container' style={{ marginTop: '150px', }}>
      <div className="m-b-40">
        <PageHeading>{'DEBT POOL'}</PageHeading>
        <CardSubHeader>
          The debt pool is a way for holders to get reimbursed from protocol revenue. You can burn your
          debt tokens for USDC that gets collected from the protocol's revenue at a 1:1 ratio. Or you can choose to
          sell your debt tokens for either USDC or MAHA at a price you choose.
        </CardSubHeader>
      </div>
      <DebtContainer style={{ flexDirection: isMobile ? 'column' : 'row' }}>
        <DebtCard price={1} symbol={'ARTH-DP'} />
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
  margin-bottom: 8px;
`;

const InfoHeader = styled.div`
  // max-width: 450px;
  margin-left: auto;
  margin-right: auto;
`

const CardSubHeader = styled.div`
  color: #999;
  display: flex;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 32px 30px 32px;
  border-bottom: 1px solid #FFFFFF20;
  @media (max-width: 600px) {
    padding: 16px;
  }
`
