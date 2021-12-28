import * as React from 'react'
import Container from './Container'
import styled from './styled-components'

const ContentRegion = styled.div`
  background: ${(p: any) => p.theme.colorSecondary};
  display: flex;
  flex-grow: 1;
`

const InternalContentArea = styled.div`
  padding: 12px 20px;
`

const TextFormContent = styled.article`
  max-width: 800px;
  margin: 0 auto;
`

const ContentMainHeading = styled.h1`
  font-size: 1.75em;
  color: ${(p: any) => p.theme.colorBodyText};
  text-align: center;
  padding-bottom: 3px;
  margin-bottom: 16px;
  border-bottom: 1px solid ${(p: any) => p.theme.colorContentAreaBorder};
`

const Content: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ContentRegion>
    <Container>
      <InternalContentArea>{children}</InternalContentArea>
    </Container>
  </ContentRegion>
)

export { TextFormContent, ContentMainHeading }
export default Content
