import styled from '../styled-components'

const SectionTitle = styled.h2`
  color: ${p => p.theme.colorPrimary};
  font-size: 0.75rem;
  font-weight: bold;
  line-height: 1em;
  border-bottom: 1px solid ${p => p.theme.colorPrimary};
  padding: 0 0 4px 0;
  margin: 0 0 8px 0;
`

export default SectionTitle
