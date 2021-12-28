import { transparentize } from 'polished'
import { Flex } from 'rebass'
import styled from './styled-components'

export const View = styled.article`
  background: ${(p: any) => p.theme.colorContentAreaBackground};
  border: 1px solid ${(p: any) => p.theme.colorContentAreaBorder};
  border-radius: ${(p: any) => p.theme.borderRadius};
  display: flex;
  flex-direction: column;
  padding: 18px;
  width: auto;
  flex-grow: 1;
  box-shadow: 0 0 36px rgba(0, 0, 0, 0.3);
  position: relative;

  & + & {
    margin-top: 18px;
  }
`

export const Header = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  margin-top: -1rem;
  padding-top: 1rem;
  background: ${(p: any) =>
    transparentize(0.2)(p.theme.colorContentAreaBackground)};
  z-index: 10;
`

export const Flat = styled(View)`
  box-shadow: none;
  border: 2px solid ${(p: any) => p.theme.colorContentAreaBorder};
`

export const Border = styled(View)`
  box-shadow: none;
  border: 1px solid ${(p: any) => p.theme.colorContentAreaBorder};
  padding: 8px;
`

export const CenteredSection = styled(Flex)`
  display: flex;
  align-content: center;
  margin: 0 auto;
`

export const Padding = styled.p`
  display: flex;
  margin: 0 auto;
  padding: 12px 0;
`
