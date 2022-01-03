module.exports = {
  preset: './jest.presets.js',
  transform: {
    '\\.html$': 'jest-raw-loader',
    '\\.txt$': 'jest-raw-loader',
    '\\.json$': 'babel-jest',
  },
  testRunner: 'jest-jasmine2',
}
