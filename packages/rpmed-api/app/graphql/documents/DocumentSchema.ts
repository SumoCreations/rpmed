import { gql } from 'apollo-server-lambda'

export const DocumentTypeDef = gql`
  """
  A document on the customer service portal.
  """
  type Document {
    """
    The unique identifier for this document
    """
    id: ID!
    """
    The title of the document.
    """
    title: String
    """
    The slug of the document.
    """
    slug: String
    """
    The seo keywords of the document.
    """
    keywords: String
    """
    The url to download this document.
    """
    url: String
    """
    The file key as stored on AWS.
    """
    fileKey: String
    """
    The description of the document.
    """
    description: String
  }
`

export const typeDefs = gql`
  ${DocumentTypeDef}

  """
  The result of a query for a document or documents.
  """
  type DocumentQueryOutput {
    """
    The resulting document if the operation was successful.
    """
    document: Document
    """
    The resulting documents if the operation was successful and multiple results were returned.
    """
    documents: [Document]
    """
    The size of the paginated results.
    """
    documentSize: Int
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
  The result of a mutation applied to a document.
  """
  type DocumentMutationOutput {
    """
    The resulting document if the operation was successful.
    """
    document: Document
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
    All documents in the system
    """
    documents: DocumentQueryOutput!
    """
    A specific document in the system via ID.
    """
    document(id: ID!): DocumentQueryOutput!
  }

  """
  A set of fields used to create or update a document.
  """
  input DocumentInput {
    """
    The id of the customer associated to the document.
    """
    id: ID
    """
    The id of the customer associated to the document.
    """
    title: String!
    """
    The slug of the document.
    """
    slug: String!
    """
    The meta keywords of the document for SEO purposes.
    """
    keywords: String
    """
    The S3 file key to generate the download url for the file.
    """
    fileKey: String
    """
    The document description for SEO purposes.
    """
    description: String
  }


  extend type Mutation {
    """
    Creates a new document.
    """
    makeDocument(
      documentInput: DocumentInput!
    ): DocumentMutationOutput!

    """
    Removes an existing document.
    """
    destroyDocument(id: String!): DocumentMutationOutput!
  }
`
