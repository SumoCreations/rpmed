import styled from '../styled-components'

const FieldContainer = styled.div<{ margin?: string }>`
  margin: ${p => p.margin || '12px 0'};
  max-width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
`

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
`

export default FieldContainer
