import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { transparentize } from 'polished'
import * as React from 'react'
import * as Actions from '../Actions'
import * as Indicators from '../Indicators'
import styled from '../styled-components'

const ToolbarView = styled.nav`
  border-bottom: 1px solid ${(p) => transparentize(0.75)(p.theme.colorPrimary)};
  height: 4rem;
  display: flex;
  flex-direction: row;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`

const ToolbarItems = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`

export const Item = styled.li<{ grow?: boolean; spreadLeft?: boolean }>`
  margin: 0 0 0 ${(p) => (p.spreadLeft ? 'auto' : 0)};
  padding: 0;
  display: flex;
  flex-grow: ${(p) => (p.grow ? 1 : 0)};
`

const Breadcrumb = styled.button`
  background: transparent;
  border: transparent;
  font-family: ${(p) => p.theme.fontFamilyBody};
  color: ${(p) => p.theme.colorPrimary};
  font-weight: 600;
  font-size: 0.75rem;
  margin: auto 10px auto 0;
`

interface IBreadcrumb {
  label: string
  onClick?: React.MouseEventHandler
}
interface IBreadcrumbProps {
  data: IBreadcrumb[]
}

export const Breadcrumbs: React.FC<IBreadcrumbProps> = ({ data }) => {
  return (
    <Item>
      {data.map(({ label, onClick }, index) => (
        <Breadcrumb
          key={`${label}-${index}`}
          onClick={onClick}
          disabled={!onClick}
        >
          {label}
        </Breadcrumb>
      ))}
    </Item>
  )
}

export const View: React.FunctionComponent = ({ children }) => (
  <ToolbarView>
    <ToolbarItems>{children}</ToolbarItems>
  </ToolbarView>
)

export interface IToolbarAction {
  loading?: boolean
  icon: IconDefinition
  name: string
  onClick?: React.MouseEventHandler
}

export const Renderer: React.FC<{ rightActions: IToolbarAction[] }> = ({
  rightActions,
}) => {
  return (
    <View>
      <Item spreadLeft={true}>
        <Actions.Group>
          {rightActions.map((action, index) => (
            <React.Fragment key={`${action.name}${index}`}>
              {action.loading ? (
                <Actions.Toolbar>
                  <Indicators.Spinner />
                </Actions.Toolbar>
              ) : (
                <Actions.Toolbar onClick={action.onClick}>
                  <FontAwesomeIcon icon={action.icon} />
                </Actions.Toolbar>
              )}
            </React.Fragment>
          ))}
        </Actions.Group>
      </Item>
    </View>
  )
}
