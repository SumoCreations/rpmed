# RPMED GraphQL Schema

This package contains all available types as well as Apollo hooks which can be used to run queries or mutations inside any of our react client applications.

## Managing Query or Mutation

If you want to add a new query or mutation to a client you should add the query to this package in the `./graphQL` directory. We are using a simple directory structure where the folders represent a corresponding view in the actual client application.

## Building this Project

All of the types and apollo hooks are generated via the [GraphQL Code Generator ](https://graphql-code-generator.com) library. The schema used is the current deployment on the dev environment. To rebuild the package simply run:

`yarn workspace rpmed-schema build`
