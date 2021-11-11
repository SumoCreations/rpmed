import * as React from 'react'
import { ErrorCode, ErrorItem, ErrorList, ErrorView } from './LoadError'

export const InternalError: React.FC<{
  error: Error | null
  extraInfo?: object
}> = ({ error, extraInfo }) => (
  <ErrorView>
    <h2>An error prevented this page from rendering:</h2>
    <ErrorList>
      <ErrorItem>
        <strong>Name:</strong> {error ? error.name : 'n/a'}
      </ErrorItem>
      <ErrorItem>
        <strong>Message:</strong> {error ? error.message : 'n/a'}
      </ErrorItem>
    </ErrorList>
    {extraInfo ? (
      <React.Fragment>
        <h3>Complete Stack Trace:</h3>
        <ErrorCode>{JSON.stringify(extraInfo)}</ErrorCode>
      </React.Fragment>
    ) : null}
  </ErrorView>
)
