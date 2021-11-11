import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import introspectionQueryResultData from './schema'
import { fetchValidatedToken } from './session'
import store from './store'

/**
 * Ensures the Apollo client can properly match union types
 * rather than guessing and possible performing incrrect caching.
 */
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

/**
 * The base configuration for the client to access the remote API.
 */
const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
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
      const token = await fetchValidatedToken(store)
      success({ token })
    })
)

/**
 * The client with our final cache / link configuration.
 */
export const client = new ApolloClient({
  cache: new InMemoryCache({ fragmentMatcher }),
  link: asyncAuthLink.concat(setAuthorizationLink).concat(httpLink),
})
