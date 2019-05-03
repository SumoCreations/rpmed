import { gql } from "apollo-server-lambda"

export const ProductRegistrationTypeDef = gql`
  """
  A troubleshooting registration for a product.
  """
  type ProductRegistration {
    """
    The unique identifier for this registration
    """
    id: ID!
    """
    The domain to match email addresses to via this registration.
    """
    domain: String!
    """
    The actual name of the registration.
    """
    name: String!
    """
    A hint or maintenance tip to prevent the registration.
    """
    careTip: String
    """
    A description of the registration and/or it's cause in detail.
    """
    synopsis: String!
    """
    A solution to resolve the registration.
    """
    solution: String!
    """
    An associated fee for servicing this issue.
    """
    fee: Int!
    """
    An official code used to identify this registration.
    """
    faultCode: String!
  }
`

export const typeDefs = gql`
  ${ProductRegistrationTypeDef}

  type ValidationError {
    """
    A path indicating the attribute that failed validation.
    """
    path: String!, 
    """
    A brief description of why the specified attribute failed validation.
    """
    message: String!
  }

  """
  The result of a query for a registration or registrations.
  """
  type ProductRegistrationQueryOutput {
    """
    The resulting registration if the operation was successful.
    """
    productRegistration: ProductRegistration
    """
    The resulting registrations if the operation was successful and multiple results were returned.
    """
    productRegistrations: [ProductRegistration]
    """
    The size of the paginated results.
    """
    pageSize: Int
    """
    This key can be used to continue querying paginated results.
    """
    lastEvaluatedKey: String
    """
    Any validation errors encountered while running the mutation.
    """
    errors: [ValidationError]
    """
    A simple boolean indicating whether or not the operation was successful.
    """
    success: Boolean!
  }
  
  """
  The result of a mutation applied to a registration.
  """
  type ProductRegistrationMutationOutput {
    """
    The resulting registration if the operation was successful.
    """
    productRegistration: ProductRegistration
    """
    Any validation errors encountered while running the mutation.
    """
    errors: [ValidationError]
    """
    A simple boolean indicating whether or not the operation was successful.
    """
    success: Boolean!
  }

  type Query {
    """
    All registrations in the system
    """
    productRegistrations: ProductRegistrationQueryOutput!
    """
    A specific registration in the system via ID.
    """
    productRegistration(id: String!): ProductRegistrationQueryOutput!
  }

  """
  A set of fields used to create or update a registration.
  """
  input NewProductRegistrationInput {
    domain: String!
    name: String
  }

  """
  A set of fields used to create or update a registration.
  """
  input ExistingProductRegistrationInput {
    id: ID!
    domain: String!
    name: String
  }

  type Mutation {
    """
    Creates a new registration.
    """
    createProductRegistration(
      productRegistrationInput: NewProductRegistrationInput!
    ): ProductRegistrationMutationOutput!

    """
    Updates an existing registration.
    """
    updateProductRegistration(
      productRegistrationInput: ExistingProductRegistrationInput!
    ): ProductRegistrationMutationOutput!

    """
    Removes an existing registration.
    """
    destroyProductRegistration(
      id: String!
    ): ProductRegistrationMutationOutput!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`
