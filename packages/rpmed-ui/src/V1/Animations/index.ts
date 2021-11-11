import styled, { keyframes } from '../styled-components'

// Create the keyframes
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(1440deg);
  }
`

// Here we create a component that will rotate everything we pass in over two seconds
export const Rotate = styled.div`
  display: flex;
  flex-grow: 0;
  margin: auto;
  animation: ${rotate} 3s ease-in-out infinite;
`
