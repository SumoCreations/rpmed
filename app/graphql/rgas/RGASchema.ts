import { gql } from "apollo-server-lambda"

export const typeDefs = gql`
  """
  A Request Goods Authorization.
  """
  type RGA {
    """
    The unique identifier for this RGA
    """
    id: ID!
    """
    The date the RGA was submitted.
    """
    submittedOn: String!
    """
    The email address of the user whom submitted the RGA.
    """
    submittedBy: String!
    """
    The distributor associated to the the RGA.
    """
    distributor: Distributor!
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
  The result of a query for a RGA or RGAs.
  """
  type RGAQueryOutput {
    """
    The resulting RGA if the operation was successful.
    """
    rga: RGA
    """
    The resulting RGAs if the operation was successful and multiple results were returned.
    """
    rgas: [RGA]
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
  The result of a mutation applied to a RGA.
  """
  type RGAMutationOutput {
    """
    The resulting RGA if the operation was successful.
    """
    rga: RGA
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
    All RGAs in the system
    """
    rgas: RGAQueryOutput!
    """
    A specific RGA in the system via ID.
    """
    rga(id: String!): RGAQueryOutput!
  }

  """
  A set of fields used to create or update a RGA.
  """
  input NewRGAInput {
    """
    The id of the customer associated to the RGA.
    """
    submittedBy: String!
    """
    The model number for representing the specific product configuration being registered.
    """
    submittedOn: String!
  }

  type Mutation {
    """
    Creates a new RGA.
    """
    createRGA(
      rgaInput: NewRGAInput!
    ): RGAMutationOutput!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`
