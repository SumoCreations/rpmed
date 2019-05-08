import { ApolloServer } from "apollo-server-lambda"
import { schema } from "./graphql"

const server = new ApolloServer({
  playground: {
    settings: {
      "editor.theme": "light",
    },
  },
  schema,
})

export const graphqlHandler = server.createHandler({
  cors: {
    credentials: true,
    origin: true,
  },
})
