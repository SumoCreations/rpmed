require('dotenv').config()
module.exports = {
  tables: [
    {
      AttributeDefinitions: [
        {
          AttributeName: 'partitionKey',
          AttributeType: 'S',
        },
        {
          AttributeName: 'sortKey',
          AttributeType: 'S',
        },
        {
          AttributeName: 'indexSortKey',
          AttributeType: 'S',
        },
        {
          AttributeName: 'secondaryIndexSortKey',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'partitionKey',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'sortKey',
          KeyType: 'RANGE',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
      GlobalSecondaryIndexes: [
        {
          IndexName: 'GSI_1',
          KeySchema: [
            {
              AttributeName: 'sortKey',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'indexSortKey',
              KeyType: 'RANGE',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
        },
        {
          IndexName: 'GSI_2',
          KeySchema: [
            {
              AttributeName: 'sortKey',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'secondaryIndexSortKey',
              KeyType: 'RANGE',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
        },
        {
          IndexName: 'GSI_3',
          KeySchema: [
            {
              AttributeName: 'partitionKey',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'indexSortKey',
              KeyType: 'RANGE',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
        },
        {
          IndexName: 'GSI_4',
          KeySchema: [
            {
              AttributeName: 'partitionKey',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'secondaryIndexSortKey',
              KeyType: 'RANGE',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
        },
      ],
      TableName: process.env.DYNAMODB_RESOURCES_TABLE,
    },
    {
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      TableName: process.env.DYNAMODB_TOKEN_LOOKUP_TABLE,
    },
    {
      AttributeDefinitions: [
        {
          AttributeName: 'email',
          AttributeType: 'S',
        },
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'email',
          KeyType: 'HASH',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      GlobalSecondaryIndexes: [
        {
          IndexName: 'UserIdGSI',
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',
            },
          ],
          Projection: {
            ProjectionType: 'KEYS_ONLY',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      ],
      TableName: process.env.DYNAMODB_USER_LOOKUP_TABLE,
    },
  ],
}
