import { faExclamationTriangle } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect, getIn } from 'formik'
import { transparentize } from 'polished'
import * as React from 'react'
import styled from '../styled-components'

const Error = styled.p`
  background: ${p => transparentize(0.9)(p.theme.colorErrorText)};
  border: 1px solid ${p => transparentize(0.7)(p.theme.colorErrorText)};
  border-radius: ${p => p.theme.borderRadius};
  color: ${p => p.theme.colorErrorText};
  display: flex;
  flex-direction: row;
  margin: 1rem auto;
  padding: 0.5rem 0.875rem;

  & > * {
    margin: auto;
  }
`

const Icon = styled.span`
  opacity: 0.75rem;
  padding-right: 1rem;
  display: block;
`

const ErrorComponent: React.FunctionComponent<{
  formik?: any
  name: string
}> = props => {
  const error = getIn((props.formik || {}).errors, props.name)
  return error ? (
    <Error>
      <Icon>
        <FontAwesomeIcon icon={faExclamationTriangle} size={'2x'} />
      </Icon>{' '}
      <span>{error}</span>
    </Error>
  ) : null
}

export const GeneralError = connect(ErrorComponent)
