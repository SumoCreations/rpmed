import { gql } from "apollo-server-lambda"

export const typeDefs = gql`
  """
  A distributor of Riverpoint Medical.
  """
  type Distributor {
    """
    The unique identifier for this distributor
    """
    id: ID!
    """
    The domain to match email addresses to via this distributor.
    """
    domain: String!
    """
    The actual name of the distributor.
    """
    name: String
  }

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
  The result of a query for a distributor or distributors.
  """
  type DistributorQueryOutput {
    """
    The resulting distributor if the operation was successful.
    """
    distributor: Distributor
    """
    The resulting distributors if the operation was successful and multiple results were returned.
    """
    distributors: [Distributor]
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
  The result of a mutation applied to a distributor.
  """
  type DistributorMutationOutput {
    """
    The resulting distributor if the operation was successful.
    """
    distributor: Distributor
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
    All distributors in the system
    """
    distributors: DistributorQueryOutput!
    """
    A specific distributor in the system via ID.
    """
    distributor(id: String!): DistributorQueryOutput!
  }

  """
  A set of fields used to create or update a distributor.
  """
  input NewDistributorInput {
    domain: String!
    name: String
  }

  """
  A set of fields used to create or update a distributor.
  """
  input ExistingDistributorInput {
    id: ID!
    domain: String!
    name: String
  }

  type Mutation {
    """
    Creates a new distributor.
    """
    createDistributor(
      distributorInput: NewDistributorInput!
    ): DistributorMutationOutput!

    """
    Updates an existing distributor.
    """
    updateDistributor(
      distributorInput: ExistingDistributorInput!
    ): DistributorMutationOutput!

    """
    Removes an existing distributor.
    """
    destroyDistributor(
      id: String!
    ): DistributorMutationOutput!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`
