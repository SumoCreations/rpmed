const merge = require('merge')
const ts_preset = require('ts-jest/jest-preset')
const dynamo_preset = require('@shelf/jest-dynamodb/jest-preset')

const preset = merge.recursive(ts_preset, dynamo_preset, {
  globals: {
    test_url: `http://${process.env.HOST || '127.0.0.1'}:${process.env.PORT ||
      3000}`,
  },
})

module.exports = preset
