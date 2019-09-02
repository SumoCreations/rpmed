import { resetTable } from "./resetTable"

export const resetTestTables = async () => {
  resetTable(process.env.DYNAMODB_USER_LOOKUP_TABLE, i => ({
    email: i.email,
  }))
  resetTable(process.env.DYNAMODB_RESOURCES_TABLE, i => ({
    partitionKey: i.partitionKey,
    sortKey: i.sortKey,
  }))
  resetTable(process.env.DYNAMODB_TOKEN_LOOKUP_TABLE, i => ({
    id: i.id,
  }))
}
