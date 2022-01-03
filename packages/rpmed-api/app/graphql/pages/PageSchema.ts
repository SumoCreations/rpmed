import { gql } from 'apollo-server-lambda'

export const SectionItemTypeDef = gql`
  """
  A content item that can appear within a section on a page.
  """
  type SectionItem {
    """
    The unique identifier for this page
    """
    id: ID!
    """
    The icon of the item.
    """
    icon: String
    """
    The name/title of the item.
    """
    name: String
    """
    The description of this item.
    """
    description: String
    """
    The type of content this item points to.
    """
    type: String
    """
    The target url or content ID of this item.
    """
    target: String
    """
    The resulting URL this item will point to..
    """
    url: String
    """
    The order this item should appear.
    """
    position: Int
  }
`

export const SectionTypeDef = gql`
  """
  A section of content that can appear on a page.
  """
  type Section {
    """
    The unique identifier for this page
    """
    id: ID!
    """
    The name/title of the section.
    """
    name: String
    """
    The order this section should appear.
    """
    position: Int
    """
    The items in this section.
    """
    items: [SectionItem]
  }
`

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
    """
    The sections of content on the page.
    """
    sections: [Section]
  }
`

export const typeDefs = gql`
  ${SectionItemTypeDef}
  ${SectionTypeDef}
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

    """
    A specific page in the system via slug.
    """
    pageBySlug(slug: String!): PageQueryOutput!
  }

  """
  A content item that can appear within a section on a page.
  """
  input SectionItemInput {
    """
    The unique identifier for this page
    """
    id: ID!
    """
    The icon of the item.
    """
    icon: String
    """
    The name/title of the item.
    """
    name: String
    """
    The description of this item.
    """
    description: String
    """
    The type of content this item points to.
    """
    type: String
    """
    The target url or content ID of this item.
    """
    target: String
    """
    The order this item should appear.
    """
    position: Int
  }

  """
  A section of content that can appear on a page.
  """
  input SectionInput {
    """
    The unique identifier for this page
    """
    id: ID!
    """
    The name/title of the section.
    """
    name: String
    """
    The order this section should appear.
    """
    position: Int
    """
    The items in this section.
    """
    items: [SectionItemInput]
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
    """
    The sections of content on the page.
    """
    sections: [SectionInput]
  }

  extend type Mutation {
    """
    Creates a new page.
    """
    makePage(pageInput: PageInput!): PageMutationOutput!

    """
    Removes an existing page.
    """
    destroyPage(id: String!): PageMutationOutput!
  }
`
