import { gql } from 'apollo-server-lambda'

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
    registeredOn: String
    """
    The customer profile associated to the registration.
    """
    customer: Customer
    """
    The id of the customer the product has been registered.
    """
    customerId: String
    """
    The id of the product that has been registered.
    """
    productId: String
    """
    The the model number of the product that has been registered.
    """
    modelNumber: String
    """
    The serial number associated to the product if applicable.
    """
    serial: String
    """
    Indicates whether or not the registration belongs to a lotted model number.
    """
    lotted: Boolean
    """
    The vendor who sold the product.
    """
    purchasedFrom: String
    """
    The date the product was purchased.
    """
    purchaseDate: String
    """
    The street address of the customer.
    """
    street: String
    """
    An additional address line i.e. unit number etc. if necessary.
    """
    street2: String
    """
    The customer's city.
    """
    city: String
    """
    The customer's state.
    """
    state: String
    """
    The customer's zipcode.
    """
    zip: String
    """
    The customer's country.
    """
    country: String
    """
    The customer's phone number.
    """
    phone: String
  }
`

export const typeDefs = gql`
  ${ProductRegistrationTypeDef}

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

  extend type Query {
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
    """
    The id of the customer associated to the registration.
    """
    customerId: String!
    """
    The model number for representing the specific product configuration being registered.
    """
    modelNumber: String!
    """
    The serial number associate to the product if it is lotted.
    """
    serial: String
    """
    The date the product was registered.
    """
    registeredOn: String!
    """
    The vendor who sold the product.
    """
    purchasedFrom: String!
    """
    The date the product was purchased.
    """
    purchaseDate: String!
    """
    The street address of the customer.
    """
    street: String
    """
    An additional address line i.e. unit number etc. if necessary.
    """
    street2: String
    """
    The customer's city.
    """
    city: String
    """
    The customer's state.
    """
    state: String
    """
    The customer's zipcode.
    """
    zip: String
    """
    The customer's country.
    """
    country: String
    """
    The customer's phoneNumber.
    """
    phone: String
  }

  """
  A set of fields used to create or update a registration.
  """
  input ExistingProductRegistrationInput {
    id: ID!
    """
    The id of the customer associated to the registration.
    """
    customerId: String!
    """
    The model number for representing the specific product configuration being registered.
    """
    modelNumber: String!
    """
    The serial number associate to the product if it is lotted.
    """
    serial: String
    """
    The date the product was registered.
    """
    registeredOn: String!
    """
    The vendor who sold the product.
    """
    purchasedFrom: String!
    """
    The date the product was purchased.
    """
    purchaseDate: String!
    """
    The street address of the customer.
    """
    street: String
    """
    An additional address line i.e. unit number etc. if necessary.
    """
    street2: String
    """
    The customer's city.
    """
    city: String
    """
    The customer's state.
    """
    state: String
    """
    The customer's zipcode.
    """
    zip: String
    """
    The customer's country.
    """
    country: String
    """
    The customer's phoneNumber.
    """
    phone: String
  }

  extend type Mutation {
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
    destroyProductRegistration(id: String!): ProductRegistrationMutationOutput!
  }
`
