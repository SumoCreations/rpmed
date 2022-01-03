import { transparentize } from 'polished'
import * as React from 'react'
import styled from '../styled-components'

const Container = styled.div`
  background: ${(p) => p.theme.colorContentAreaBackground};
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 100%;
  border-radius: ${(p) => p.theme.borderRadius};
  border: 1px solid ${(p) => p.theme.colorContentAreaBorderSelected};
  box-shadow: 5px 5px 10px
    ${(p) => transparentize(0.75)(p.theme.colorContentAreaBorderSelected)};
  padding: 0;
  margin: 4px 0 0 0;
  z-index: 1;
  max-height: 400px;
  overflow-y: auto;
`

const Suggestion = styled.div`
  display: flex;
  flex-shrink: 0;
  list-style: none;
  padding: 0rem;
  border-bottom: 1px solid
    ${(p) => transparentize(0.7)(p.theme.colorContentAreaBorderSelected)};
  &:hover {
    background: ${(p) => transparentize(0.9)(p.theme.colorPrimary)};
  }
`

const Button = styled.button`
  border: 0;
  background: transparent;
  display: flex;
  cursor: pointer;
  padding: 0.5rem;
  flex-shrink: 1;
  flex-grow: 1;
  overflow: hidden;
`

export interface IAutocompleteOption {
  displayName: string
  value?: string
  view?: JSX.Element
}

export type AutoCompleteSelectHandler = (option: IAutocompleteOption) => void

interface IAutocompleteProps {
  suggestions: IAutocompleteOption[]
  onSelect?: AutoCompleteSelectHandler
}

const makeOnClick = (
  option: IAutocompleteOption,
  handler?: AutoCompleteSelectHandler
): React.MouseEventHandler => (_) => handler && handler(option)

interface IAutocompleteSuggestion {
  displayName: string | JSX.Element
  onClick?: React.MouseEventHandler
}

const DetailView = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`

const DetailContents = styled.p`
  display: flex;
  margin: 0;
  padding: 0.1rem;
  flex-direction: column;
  text-align: left;
`

const DetailHeader = styled.strong`
  font-weight: 600;
  color: ${(p) => p.theme.colorPrimary};
  text-transform: uppercase;
  font-size: ${(p) => p.theme.inputTextSize};
  margin: 0;
`
const DetailDescription = styled.span`
  margin: 0;
  padding: 0;
  display: flex;
  font-size: ${(p) => p.theme.inputTextSize};
  flex-shrink: 1;
`

export const SuggestionDetailView = (props: {
  heading?: string
  description?: string
  icon?: string
}) => (
  <DetailView>
    {props.icon ? <img src={props.icon} alt="" /> : null}
    <DetailContents>
      {props.heading ? <DetailHeader>{props.heading}</DetailHeader> : null}
      {props.description ? (
        <DetailDescription>{props.description}</DetailDescription>
      ) : null}
    </DetailContents>
  </DetailView>
)

export const AutocompleteSuggestion: React.FC<IAutocompleteSuggestion> = (
  p
) => (
  <Suggestion>
    <Button onClick={p.onClick} type="button">
      {p.displayName}
    </Button>
  </Suggestion>
)

interface ICustomAutocompleteProps {
  children: () => JSX.Element
}

export const CustomAutocomplete: React.FC<ICustomAutocompleteProps> = ({
  children,
}) => <Container>{children()}</Container>

export const Autocomplete: React.FC<IAutocompleteProps> = ({
  suggestions,
  onSelect,
}) => (
  <Container>
    {suggestions.map((suggestion, index) => (
      <Suggestion key={`suggestion.${index}`}>
        <Button onClick={makeOnClick(suggestion, onSelect)}>
          {suggestion.view || suggestion.displayName}
        </Button>
      </Suggestion>
    ))}
  </Container>
)
