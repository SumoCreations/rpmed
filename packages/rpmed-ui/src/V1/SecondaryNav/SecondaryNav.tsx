import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faChevronCircleRight } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { transparentize } from 'polished'
import React from 'react'
import { Box, Text } from 'rebass'
import * as Card from '../Card'
import LayoutContent from '../Content'
import { InternalError } from '../Errors'
import { Layout } from '../Layout'
import { media } from '../media'
import styled from '../styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  margin: 0;
  position: relative;
  flex-grow: 1;
  width: 100%;
`

const Sticky = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0;
`

const Header = styled.header`
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  flex-shrink: 1;
  margin: 0;
  padding: 0.75rem 0;
`

const Title = styled.h2`
  color: ${(p) => p.theme.colorBodyText};
  font-family: ${(p) => p.theme.fontFamilyBody};
  font-weight: 600;
  font-size: 1.45rem;
  margin: 0;
`

const Nav = styled.nav`
  width: 14rem;
  display: none;
  flex-grow: 0;
  flex-shrink: 0;
  flex-direction: column;
  padding: 0.2rem 1rem;
  background: ${(p) => transparentize(0.9)(p.theme.colorPrimary)};
  position: relative;

  ${media.minMd`display: flex;`}
`

const SecondaryNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const Item = styled.li`
  margin: 0;
  padding: 0;
  display: flex;
  flex-grow: 0;
`

export const Bubble = styled(Box as any)<{ disabled?: boolean }>`
  border-radius: ${(p) => p.theme.borderRadius};
  background: ${(p) =>
    transparentize(p.disabled ? 0.9 : 0.75)(p.theme.colorPrimary)};
  text-align: center;
  flex-shrink: 0;
  font-weight: ${(p) => (p.disabled ? '400' : '600')};
`

const Button = styled.button<{ selected?: boolean }>`
  background: ${(p) =>
    p.selected ? transparentize(0.9)(p.theme.colorPrimary) : 'transparent'};
  border: none;
  border-radius: 0.1rem;
  color: ${(p) => p.theme.colorBodyText};
  display: flex;
  font-size: 0.875rem;
  flex-grow: 1;
  padding: 0.35rem 0.5rem;
  margin: 0;
  text-align: center;

  &:hover {
    background: ${(p) => transparentize(0.9)(p.theme.colorPrimary)};
  }
`

const IconView = styled.span`
  background: ${(p) => p.theme.colorButtonPrimary};
  border-radius: ${(p) => p.theme.borderRadius};
  color: ${(p) => p.theme.colorBodyTextInverted};
  align-content: center;
  margin: auto 0.75rem auto 0;
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  width: auto;
  padding: 0.6rem 0.5rem;

  & > * {
    display: block;
    margin: auto;
  }
`

interface IErrorBoundaryProps {
  title?: string
}
interface IErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: object
}

class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  public static getDerivedStateFromError(error: Error) {
    // tslint:disable-next-line no-console
    console.log(error)
    return { hasError: true, error }
  }

  constructor(props: IErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: {} }
  }

  public componentDidCatch(error: Error | null, errorInfo: object) {
    // TODO: Log error via service such as Sentry
  }

  public render() {
    const { hasError, error, errorInfo } = this.state
    return hasError ? (
      <Layout>
        <LayoutContent>
          <Card.Flat>
            <InternalError error={error} extraInfo={errorInfo} />
          </Card.Flat>
        </LayoutContent>
      </Layout>
    ) : (
      this.props.children
    )
  }
}

const ButtonIconView = styled(IconView as any)`
  background: transparent;
  color: ${(p) => p.theme.colorBodyText};
  padding: 0;
  min-width: 1.5rem;
`

interface ISecondaryNavItem {
  accessory?: JSX.Element | null
  label: string
  selected: boolean
  onClick?: React.MouseEventHandler
  icon?: IconDefinition
}

interface ISecondaryNavProps {
  icon?: IconDefinition
  title?: string
  data: ISecondaryNavItem[]
  hidden?: boolean
}

export const View: React.FunctionComponent<ISecondaryNavProps> = ({
  children,
  data,
  hidden,
  icon,
  title,
}) => (
  <Container>
    {hidden ? null : (
      <Nav hidden={hidden}>
        <Sticky>
          {title ? (
            <Header>
              {icon ? (
                <IconView>
                  <FontAwesomeIcon icon={icon} />
                </IconView>
              ) : null}
              <Title>{title}</Title>
            </Header>
          ) : null}
          <SecondaryNavList>
            {data.map(
              ({ label, onClick, selected, accessory, ...p }, index) => (
                <Item key={`${label}-${index}`}>
                  <Button
                    onClick={onClick}
                    disabled={!onClick}
                    selected={selected}
                  >
                    <ButtonIconView>
                      <FontAwesomeIcon icon={p.icon || faChevronCircleRight} />
                    </ButtonIconView>
                    <Text textAlign="left" width={1}>
                      {label}
                    </Text>
                    {accessory ? accessory : null}
                  </Button>
                </Item>
              )
            )}
          </SecondaryNavList>
        </Sticky>
      </Nav>
    )}
    <Content>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Content>
  </Container>
)
