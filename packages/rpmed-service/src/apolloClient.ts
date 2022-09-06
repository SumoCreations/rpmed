import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const fetcher = (input: RequestInfo, init?: RequestInit | undefined) => {
  return window.fetch(input, init)
}

const API_URL = process.env.REACT_APP_API_URL ?? ''

/**
 * Ensures the Apollo client can properly match union types
 * rather than guessing and possible performing incrrect caching.
 */
// const fragmentMatcher = new IntrospectionFragmentMatcher({
//   introspectionQueryResultData,
// })

/**
 * The base configuration for the client to access the remote API.
 */
const httpLink = createHttpLink({
  uri: `${API_URL}/graphql`,
  fetch: fetcher,
})

/**
 * Assigns any available access token as the authorization header
 * for any outgoing request.
 */
const setAuthorizationLink = setContext((_, previousContext) => ({
  headers: {
    Authorization: previousContext.token
      ? `Bearer ${previousContext.token}`
      : null,
  },
}))

/**
 * Fetches a cached token or refreshes the current credentials
 * if necessary.
 */
const asyncAuthLink = setContext(
  _ =>
    new Promise(async success => {
      // const token = await fetchValidatedToken(API_URL)({ getState: () => {} })
      const token = 'test'
      success({ token })
    })
)

/**
 * The client with our final cache / link configuration.
 */
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: asyncAuthLink.concat(setAuthorizationLink).concat(httpLink),
})
