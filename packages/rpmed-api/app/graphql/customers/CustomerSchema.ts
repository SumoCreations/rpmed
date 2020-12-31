import { gql } from 'apollo-server-lambda'

export const typeDefs = gql`
  """
  A customer of Riverpoint Medical.
  """
  type Customer {
    """
    The unique identifier for this customer
    """
    id: ID!
    """
    The email of the customer.
    """
    email: String
    """
    The name of the customer.
    """
    name: String
    """
    The phone number of the customer.
    """
    phone: String
    """
    The street address for the customer.
    """
    street: String
    """
    The street address (line 2) for the customer.
    """
    street2: String
    """
    The city of the address for the customer.
    """
    city: String
    """
    The state of the address for the customer.
    """
    state: String
    """
    The zip of the address for the customer.
    """
    zip: String
    """
    The country of the address for the customer.
    """
    country: String
    """
    The specialty of the customer.
    """
    specialty: String
  }

  """
  The result of a query for a customer or customers.
  """
  type CustomerQueryOutput {
    """
    The resulting customer if the operation was successful.
    """
    customer: Customer
    """
    The resulting customers if the operation was successful and multiple results were returned.
    """
    customers: [Customer]
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
  The result of a mutation applied to a customer.
  """
  type CustomerMutationOutput {
    """
    The resulting customer if the operation was successful.
    """
    customer: Customer
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
    All customers in the system
    """
    customers(search: String): CustomerQueryOutput!
    """
    A specific customer in the system via ID.
    """
    customer(id: String!): CustomerQueryOutput!
  }

  """
  A set of fields used to create or update a customer.
  """
  input NewCustomerInput {
    """
    The email of the customer.
    """
    email: String!
    """
    The name of the customer.
    """
    name: String
    """
    The phone number of the customer.
    """
    phone: String
    """
    The street address for the customer.
    """
    street: String
    """
    The street address (line 2) for the customer.
    """
    street2: String
    """
    The city of the address for the customer.
    """
    city: String
    """
    The state of the address for the customer.
    """
    state: String
    """
    The zip of the address for the customer.
    """
    zip: String
    """
    The country of the address for the customer.
    """
    country: String
    """
    The specialty of the customer.
    """
    specialty: String
  }

  """
  A set of fields used to create or update a customer.
  """
  input ExistingCustomerInput {
    id: ID!
    email: String!
    name: String
  }

  extend type Mutation {
    """
    Creates a new customer.
    """
    createCustomer(customerInput: NewCustomerInput!): CustomerMutationOutput!

    """
    Updates an existing customer.
    """
    updateCustomer(
      customerInput: ExistingCustomerInput!
    ): CustomerMutationOutput!

    """
    Removes an existing customer.
    """
    destroyCustomer(id: String!): CustomerMutationOutput!
  }
`
