import { transparentize } from 'polished'
import * as React from 'react'
import styled from '../styled-components'

export const ErrorView = styled.article`
  display: flex;
  flex-direction: column;
  padding: 18px;
  width: auto;
  flex-grow: 1;

  & + & {
    margin-top: 18px;
  }
`

export const ErrorList = styled.ul`
  padding: 0;
  margin: 1rem 0;
  list-style: none;
`

export const ErrorItem = styled.li`
  border-bottom: 1px solid ${p => p.theme.colorContentAreaBorder};
  color: ${p => p.theme.colorPrimary};
  font-size: 0.875rem;
  padding: 0.5rem 0;
`

export const ErrorCode = styled.pre`
  font-size: 0.875rem;
  border-radius: ${p => p.theme.borderRadius};
  background: ${p => transparentize(0.85)(p.theme.colorPrimary)};
  overflow-x: auto;
  padding: 1rem;
  white-space: pre-wrap;
  word-wrap: break-word;
`

export const LoadingError: React.FC<{ error: any }> = ({ error }) => (
  <ErrorView>
    <h2>An error prevented this page from rendering:</h2>
    <ErrorList>
      <ErrorItem>
        <strong>Name:</strong> {error.name}
      </ErrorItem>
      <ErrorItem>
        <strong>Message:</strong> {error.message}
      </ErrorItem>
      <ErrorItem>
        <strong>Info:</strong> {error.extraInfo}
      </ErrorItem>
    </ErrorList>
    <h3>Network Error:</h3>
    <ErrorCode>{JSON.stringify(error.networkError)}</ErrorCode>
    <h3>GraphQL Error:</h3>
    <ErrorCode>{JSON.stringify(error.graphQLErrors)}</ErrorCode>
    <h3>Complete Stack Trace:</h3>
    <ErrorCode>{JSON.stringify(error)}</ErrorCode>
  </ErrorView>
)
