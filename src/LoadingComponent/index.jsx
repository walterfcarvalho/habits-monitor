import { TailSpin } from 'react-loader-spinner'
import styled from 'styled-components'

const TailSpinContainer = styled.div`
  margin: 20px 5px 20px 5px;
`

const LoadingComponent = ({size}) => {

  return <TailSpinContainer>
    <TailSpin
      height={size ? size : "80"}
      width={size ? size : "80"}
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  </TailSpinContainer>
}

export default LoadingComponent