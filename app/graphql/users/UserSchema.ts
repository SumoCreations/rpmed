import { gql } from "apollo-server-lambda"

export const typeDefs = gql`
  """
  A registered user object from API. Could be a customer, admin, or partner account.
  """
  type User {
    """
    The unique identifier for this user
    """
    id: String!
    """
    The email address for this user.
    """
    email: String!
    """
    The actual first name of the user.
    """
    firstName: String
    """
    The actual last name of the user.
    """
    lastName: String
  }

  type Query {
    """
    All users in the system
    """
    users: [User]
    """
    A specific user in the system via ID.
    """
    user(id: String!): User
    """
    A specific user in the system via email address.
    """
    userWithEmail(email: String!): User
  }

  type Mutation {
    """
    Creates a new authenticatable user.
    """
    createUser(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
    ): User!

    """
    Updates an existing user.
    """
    updateUser(
      id: String!
      email: String!
      password: String
      firstName: String!
      lastName: String!
    ): User!

    """
    Removes an existing user.
    """
    destroyUser(
      id: String!
    ): User!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`
