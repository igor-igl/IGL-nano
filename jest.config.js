module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|cts)$': ['babel-jest'],
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
      isolatedModules: true,
      useESM: false
    }]
  },
  testMatch: [
    '**/*.test.{js,cts,ts}'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(workerpool|@assemblyscript)/)'
  ],
  moduleNameMapper: {
    '\\.wasm$': '<rootDir>/tests/wasmMock.js'
  },
  globals: {
    'WASM_PATH': './build'
  }
};
