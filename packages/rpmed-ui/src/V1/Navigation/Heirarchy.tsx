import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { transparentize } from 'polished'
import * as React from 'react'
import styled from '../styled-components'
import { Badge } from './Badge'

interface INavigationOptions {
  disabled?: boolean
  name: string
  notificationCount?: number
  icon?: IconDefinition
  onClick: React.MouseEventHandler
}

interface INavigationHierarchy {
  name?: string
  options: INavigationOptions[]
}

const Section = styled.section`
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
`

const Heading = styled.h2`
  font-family: ${p => p.theme.fontFamilyBody};
  text-transform: uppercase;
  font-size: 0.675rem;
  letter-spacing: 0.1em;
  font-weight: 400;
`

const Navigation = styled.nav`
  padding: 0;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
`
const NavigationGroup = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
  flex-direction: column;
`

const NavigationOption = styled.li<{ disabled?: boolean }>`
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: row;
  font-size: 1.25rem;
  color: ${p => p.theme.colorPrimary};
`

const OptionButton = styled.button<{ disabled?: boolean }>`
  opacity: ${p => (p.disabled ? 0.5 : 1)};
  pointer-events: ${p => (p.disabled ? 'none' : 'auto')};
  border: 0;
  padding: 0.5rem;
  background: ${p => transparentize(1)(p.theme.colorPrimary)};
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  transition: background 0.1s ease-out;

  &:active:hover {
    background: ${p => transparentize(0.7)(p.theme.colorPrimary)};
    color: ${p => p.theme.colorBodyText};
  }

  &:hover {
    background: ${p => transparentize(0.9)(p.theme.colorPrimary)};
  }
`

const OptionLabel = styled.span`
  font-size: 0.875rem;
  line-height: 1.1;
  margin: auto 10px;
  display: block;
  white-space: nowrap;
`

const OptionIcon = styled.span`
  display: flex;
  align-items: center;
  width: 1.75rem;
  margin-right: 0.5rem;

  & > * {
    margin: auto;
  }
`

export const Heirarchy: React.FC<{
  contents: INavigationHierarchy[]
}> = ({ contents }) => {
  return (
    <Navigation>
      {contents.map((content, i) => (
        <Section key={`section${i}-${content.name}`}>
          {content.name ? <Heading>{content.name}</Heading> : <span />}
          <NavigationGroup>
            {content.options.map((option, ii) => (
              <NavigationOption
                key={`section${i}-${content.name}.option${ii}-${option.name}`}
                disabled={option.disabled}
              >
                <OptionButton
                  onClick={option.onClick}
                  disabled={option.disabled}
                >
                  <OptionIcon>
                    {option.icon ? (
                      <FontAwesomeIcon icon={option.icon} />
                    ) : (
                      <span />
                    )}
                  </OptionIcon>
                  <OptionLabel>{option.name}</OptionLabel>
                  {option.notificationCount && option.notificationCount > 0 ? (
                    <Badge amount={option.notificationCount} />
                  ) : (
                    <span />
                  )}
                </OptionButton>
              </NavigationOption>
            ))}
          </NavigationGroup>
        </Section>
      ))}
    </Navigation>
  )
}
