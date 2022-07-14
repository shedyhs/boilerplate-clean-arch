/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  // setupFilesAfterEnv: ['<rootDir>/src/shared/infra/prisma-mock.ts'],
  roots: ['<rootDir>/src'],
  setupFiles: ['<rootDir>/setup-jest.ts'],
  transform: {
    '^.+\\.ts?$': ['@swc/jest'],
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
};
