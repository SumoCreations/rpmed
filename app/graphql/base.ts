import { gql } from 'apollo-server-lambda'

const VERSION = '1.0.0.alpha'

export const typeDefs = gql`
  """
  The root query for the schema.
  """
  type Query {
    version: String!
  }

  """
  The root mutation for the schema.
  """
  type Mutation {
    version: String!
  }

  """
  A validation error that provides details for an unsuccseful mutation or query.
  """
  type ValidationError {
    """
    A path indicating the attribute that failed validation.
    """
    path: String!
    """
    A brief description of why the specified attribute failed validation.
    """
    message: String!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`

export const resolvers = {
  Mutation: { version: () => VERSION },
  Query: { version: () => VERSION },
}
