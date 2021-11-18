import { gql } from 'apollo-server-lambda'

export const PageTypeDef = gql`
  """
  A page on the customer service portal.
  """
  type Page {
    """
    The unique identifier for this page
    """
    id: ID!
    """
    The title of the page.
    """
    title: String
    """
    The slug of the page.
    """
    slug: String
    """
    The seo keywords of the page.
    """
    keywords: String
    """
    The description of the page.
    """
    description: String
  }
`

export const typeDefs = gql`
  ${PageTypeDef}

  """
  The result of a query for a page or pages.
  """
  type PageQueryOutput {
    """
    The resulting page if the operation was successful.
    """
    page: Page
    """
    The resulting pages if the operation was successful and multiple results were returned.
    """
    pages: [Page]
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
  The result of a mutation applied to a page.
  """
  type PageMutationOutput {
    """
    The resulting page if the operation was successful.
    """
    page: Page
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
    All pages in the system
    """
    pages: PageQueryOutput!
    """
    A specific page in the system via ID.
    """
    page(id: ID!): PageQueryOutput!
  }

  """
  A set of fields used to create or update a page.
  """
  input PageInput {
    """
    The id of the customer associated to the page.
    """
    id: ID
    """
    The id of the customer associated to the page.
    """
    title: String!
    """
    The slug of the page.
    """
    slug: String!
    """
    The meta keywords of the page for SEO purposes.
    """
    keywords: String
    """
    The page description for SEO purposes.
    """
    description: String
  }


  extend type Mutation {
    """
    Creates a new page.
    """
    makePage(
      pageInput: PageInput!
    ): PageMutationOutput!

    """
    Removes an existing page.
    """
    destroyPage(id: String!): PageMutationOutput!
  }
`
