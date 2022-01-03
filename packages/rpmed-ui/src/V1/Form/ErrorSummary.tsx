import { faExclamationTriangle } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormikErrors } from 'formik'
import { decamelize } from 'humps'
import * as React from 'react'
import styled, { remCalc } from '../styled-components'

const ErrorList = styled.ul`
  list-style: none;
  padding: ${remCalc(8)} ${remCalc(12)};
  margin: 0;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
`

const ErrorItem = styled.li`
  margin: ${remCalc(4)} 0;
  display: flex;
  flex-direction: row;
  font-size: ${remCalc(12)};
  font-family: ${p => p.theme.fontFamilyBody};
`

const Icon = styled.span`
  opacity: 0.75rem;
  padding-right: 0.5rem;
  display: block;
  color: ${p => p.theme.colorErrorText};
`

interface IErrorSummaryProps<T> {
  errors?: FormikErrors<T>
}

interface IIndexed {
  [key: string]: any
}

const renderError = (error: any) => {
  if (typeof error === 'object') {
    return Object.keys(error)
      .map(k => `${k} ${error[k]}`)
      .join(', ')
  }
  return error
}

export function ErrorSummaryRenderer<T extends IIndexed>(): React.ComponentType<
  IErrorSummaryProps<T>
> {
  return (props: IErrorSummaryProps<T>) => {
    const errors = props.errors || ({} as IIndexed)
    return props.errors ? (
      <ErrorList>
        {Object.keys(props.errors || {}).map(field => (
          <ErrorItem key={`error${field}`}>
            <Icon>
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </Icon>{' '}
            <span>
              {field.charAt(0).toUpperCase()}
              {decamelize(field)
                .split('_')
                .join(' ')
                .slice(1)}{' '}
              {`${renderError(errors[field])}`.toLowerCase()}
            </span>
          </ErrorItem>
        ))}
      </ErrorList>
    ) : null
  }
}
