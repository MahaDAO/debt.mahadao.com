import styled from 'styled-components';


function MyOrders() {
  return (
    <CardContent>
      <CardSection style={{marginBottom: '20px', fontWeight: 'bold',}}>
        <CardColumn1 className='text-center'>Action</CardColumn1>
        <CardColumn2 className='text-center'>Price</CardColumn2>
        <CardColumn3 className='text-center'>USDC</CardColumn3>
        <CardColumn4 className='text-center'>ARTH-DP</CardColumn4>
      </CardSection>
      <CardSection>
        <CardColumn1 className={'table-border single-line-center-center'}>Action val</CardColumn1>
        <CardColumn2 className={'table-border single-line-center-center'}>
          Price val
        </CardColumn2>
        <CardColumn3 className={'table-border single-line-center-center'}>USDC val</CardColumn3>
        <CardColumn4 className={'table-border single-line-center-center'}>ARTH-DP val</CardColumn4>
      </CardSection>
      <CardSection>
        <CardColumn1 className={'table-border single-line-center-center'}>Action val</CardColumn1>
        <CardColumn2 className={'table-border single-line-center-center'}>
          Price val
        </CardColumn2>
        <CardColumn3 className={'table-border single-line-center-center'}>USDC val</CardColumn3>
        <CardColumn4 className={'table-border single-line-center-center'}>ARTH-DP val</CardColumn4>
      </CardSection>
    </CardContent>
  )
}

export default MyOrders


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
  flex-basis: 25%; 
  padding: 9px;
`
const CardColumn2 = styled.div`
  flex-basis: 25%; 
  padding: 9px;
`
const CardColumn3 = styled.div`
  flex-basis: 25%; 
  padding: 9px;
`

const CardColumn4 = styled.div`
  flex-basis: 25%; 
  padding: 9px;
`