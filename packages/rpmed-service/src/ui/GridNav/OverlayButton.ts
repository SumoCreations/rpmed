import styled from '../styled-components'

const OverlayButton = styled.button`
  display: block;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0);
  border: none;
  z-index: 1;
  cursor: pointer;
`

export default OverlayButton
