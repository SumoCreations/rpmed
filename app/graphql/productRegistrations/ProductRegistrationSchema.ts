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
    The date the product was registered.
    """
    registeredOn: String!
    """
    The id of the customer the product has been registered.
    """
    customerId: String!
    """
    The id of the product that has been registered.
    """
    productId: String!
    """
    The the model number of the product that has been registered.
    """
    modelNumber: String!
    """
    The serial number associated to the product if applicable.
    """
    serial: String
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
    customerId: String!
    modelNumber: String!
    """
    The serial number associate to the product if it is lotted.
    """
    serial: String
    """
    The date the product was registered.
    """
    registeredOn: String!
  }

  """
  A set of fields used to create or update a registration.
  """
  input ExistingProductRegistrationInput {
    id: ID!
    customerId: String!
    modelNumber: String!
    """
    The serial number associate to the product if it is lotted.
    """
    serial: String
    """
    The date the product was registered.
    """
    registeredOn: String!
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
