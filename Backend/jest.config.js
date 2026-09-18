/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'mjs'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: './tsconfig.json' }],
    '^.+\\.mjs$': ['ts-jest', { tsconfig: './tsconfig.json' }],
  },
  transformIgnorePatterns: [],
  // Explicitly map paths without needing to require tsconfig.json
  moduleNameMapper: {
    '^@prisma/(.*)$': '<rootDir>/src/prisma/$1',
    '^@utils/(.*)$': '<rootDir>/server/utils/$1',
  },
};