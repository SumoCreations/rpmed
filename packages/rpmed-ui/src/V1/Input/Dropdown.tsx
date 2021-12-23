import {
  faChevronCircleDown,
  faSearch,
} from '@fortawesome/pro-regular-svg-icons'
import debounce from 'lodash.debounce'
import { transparentize } from 'polished'
import * as React from 'react'
import { RequiredIcon } from '../Form'
import * as Indicators from '../Indicators'
import styled from '../styled-components'
import { InputWrapper } from './FieldContainer'
import { Icon, IconLocation } from './Icon'
import { Text } from './Text'

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  width: auto;
  position: relative;
`

const ResultView = styled.div`
  background: ${p => p.theme.colorBodyTextInverted};
  display: flex;
  border: 2px solid ${p => p.theme.colorButtonPrimary};
  border-top: 0;
  box-shadow: 0 0 2px ${p => p.theme.colorButtonPrimary};
  border-radius: ${p => p.theme.borderRadius};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  flex-direction: column;
  position: absolute;
  top: calc(100% - 4px);
  width: 100%;
  z-index: 5;
  max-height: 16rem;
  overflow-y: auto;
`

// eslint-disable-next-line
const Field = styled.p<{
  active?: boolean
  padding?: string
  height?: string
  primary?: boolean
}>`
  display: flex;
  background: ${p => p.theme.colorBodyTextInverted};
  border: ${p =>
    p.active
      ? `2px solid ${p.theme.colorButtonPrimary}`
      : p.primary
      ? `2px solid ${p.theme.colorPrimary}`
      : `1px solid ${p.theme.colorContentAreaBorder}`};
  border-radius: ${p => p.theme.borderRadius};
  font-size: ${p => p.theme.inputTextSize};
  padding: ${p => p.padding || p.theme.inputPadding};
  flex-grow: 1;
  flex-shrink: 1;
  width: auto;
  margin-bottom: auto;
  height: ${p => p.height || 'auto'};
  box-shadow: ${p =>
    p.active ? `0 0 2px ${p.theme.colorButtonPrimary}` : `none`};
  max-width: 100%;
`

const SearchField = styled(Text as any)`
  padding: ${p => p.theme.inputPadding};
  margin: 0.5rem;
  display: flex;
  flex-shrink: 1;
  min-height: 2rem;
` as any

const Label = styled.span<{ inactive: boolean }>`
  display: flex;
  margin: auto 0;
  opacity: ${p => (p.inactive ? 0.75 : 1)};
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Overlay = styled.span`
  background: ${p => transparentize(0.8)(p.theme.colorBodyTextInverted)};
  position: fixed;
  z-index: 4;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
`

type DismissFn = () => void

export type DropDownSelectFn<T> = (selection: T) => void

export interface IDropdown {
  value: string
  placeholder?: string
  onDismiss?: () => void
  required?: boolean
  margin?: string
  padding?: string
  height?: string
  primary?: boolean
  searchable?: boolean
  loading?: boolean
}

export interface IDynamicDropdownProps<T> extends IDropdown {
  onDismiss?: () => void
  onSelect: DropDownSelectFn<T>
  label?: string
  name: string
  ignoreIds?: string[]
  clearable?: string
}

interface IDropdownProps extends IDropdown {
  children: (searchValue: string, dismiss: DismissFn) => JSX.Element
}

const { useState } = React

export const Dropdown: React.FunctionComponent<IDropdownProps> = ({
  value,
  children,
  height,
  loading,
  padding,
  placeholder,
  primary,
  onDismiss,
  required,
  searchable,
}) => {
  const [active, setActive] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const updateSearch = debounce(
    (updatedVal: string) => {
      setSearchValue(updatedVal)
    },
    300,
    { leading: false, trailing: true }
  )
  const onClick: React.MouseEventHandler = () => setActive(!active)
  const onChange: React.ChangeEventHandler = e =>
    updateSearch((e.target as HTMLInputElement).value)
  const dismiss: DismissFn = () => {
    setActive(false)
    setSearchValue('')
    if (onDismiss) {
      onDismiss()
    }
  }
  const searchEnabled = typeof searchable !== 'undefined' ? searchable : true
  const hasValue = typeof value === 'string' && value.length > 0
  return (
    <React.Fragment>
      <Container>
        <InputWrapper>
          <Field
            onClick={onClick}
            active={active}
            padding={padding}
            primary={primary}
            height={height}
          >
            <Label inactive={!hasValue}>
              {hasValue ? value : placeholder || ''}{' '}
              {required && <RequiredIcon />}
            </Label>
          </Field>
          <Icon icon={faChevronCircleDown} active={active} />
          {active ? (
            <ResultView>
              {searchEnabled ? (
                <InputWrapper sticky={true}>
                  <SearchField type="search" onChange={onChange} />
                  <Icon icon={faSearch} location={IconLocation.Start} />
                </InputWrapper>
              ) : null}
              {loading ? (
                <Indicators.Spinner />
              ) : (
                children(searchValue, dismiss)
              )}
            </ResultView>
          ) : null}
        </InputWrapper>
      </Container>
      {active ? <Overlay onClick={dismiss} /> : null}
    </React.Fragment>
  )
}
