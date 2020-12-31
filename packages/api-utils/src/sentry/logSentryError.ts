import * as Sentry from '@sentry/node'
import { flushSentry } from './flushSentry'
export interface ErrorLogArguments {
  variables: any
  /**
   * This is typically a graphql resolver or an
   * identifier
   */
  operationName: string
  /**
   * Typically the context of the request such as that
   * used by the ApolloServer.
   */
  ctx: any
  /**
   * The error to log.
   */
  error: any
  /**
   * Set this to true if you want to log multiple events before
   * awaiting the queue to clear.
   */
  skipFlush?: boolean
  /**
   * Set this to true if you want to also rescord the output of the error
   * with a console.log call.
   */
  console?: boolean
}

/**
 * Logs a detailed error to sentry. You need to initialize sentry somewhere in the
 * execution of your project prior to using this function.
 * @param args A set of arguments to aid in identifying or reviewing the error.
 */
export const logSentryError = async (args: ErrorLogArguments) => {
  Sentry.configureScope((scope) => {
    scope.setExtra('resolver', args.operationName)
    scope.setExtra('variables', args.variables)
    scope.setExtra('context', args.ctx)
  })
  Sentry.captureException(args.error)
  if (args.console) {
    console.log('Logging the following error to sentry:')
    console.log(JSON.stringify(args))
  }
  if (args.skipFlush) {
    return
  }
  await flushSentry()
}
