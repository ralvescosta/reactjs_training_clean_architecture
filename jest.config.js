module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/presentation/components/router/**/*',
    '!**/*.d.ts' // remove coverage
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  // alteracao dos paths
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy' // library identity-obj-proxy
  }
}
