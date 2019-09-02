import { gql } from 'apollo-server-lambda'

export const typeDefs = gql`
  type UploadURL {
    """
    The unique file key to use on AWS S3.
    """
    id: ID!
    """
    The endpoint to utilize for uploading the associated file key/id to AWS S3.
    """
    url: String!
  }

  """
  The result of a mutation applied to a customer.
  """
  type UploadMutationOutput {
    """
    The resulting customer if the operation was successful.
    """
    uploads: [UploadURL]
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
  A set of file keys to generate S3 endpoint URLS for.
  """
  input UploadInput {
    keys: [String]!
  }

  extend type Mutation {
    """
    Returns a set of upload endpoints from AWS S3.
    """
    createUploads(uploadInput: UploadInput!): UploadMutationOutput!
  }

  extend type Query {
    info: String
  }
`
