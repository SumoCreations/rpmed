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
  A validation error that provides details for an unsuccesful mutation or query.
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

  """
  Used as an argument on any query incorporating the relay connection spec
  to orchestrate paginated results
  """
  input ConnectionPayload {
    """
    The id of the item to fetch forward pagination. Use with first.
    """
    after: ID
    """
    The id of the item to fetch backward pagination. Use with last.
    """
    before: ID
    """
    A limit when performing forward pagination.
    """
    first: Int
    """
    A limit when performing backward pagination.
    """
    last: Int
  }

  """
  A description of a pagination destination to fetch additional paginated results.
  """
  type PaginationEntry {
    """
    The id of the entry to use for the pagination request.
    """
    cursor: ID!
  }

  """
  Provides essential pagination info for a connection (or paginated request)
  """
  type PageInfo {
    """
    Indicates whether or not there is a next page after this connection result.
    """
    hasNextPage: Boolean!
    """
    Returns any available pages after to the current set based on the limit.
    """
    hasNextPages(amount: Int!): [PaginationEntry]!
    """
    Indicates whether or not there is a previous page before this connection result.
    """
    hasPreviousPage: Boolean!
    """
    Returns any available pages prior to the current set based on the limit.
    """
    hasPreviousPages(amount: Int!): [PaginationEntry]!
    """
    The cursor representing the id of the first item in the connection result.
    """
    startCursor: ID!
    """
    The cursor representing the id of the last item in the connection result.
    """
    endCursor: ID!
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
