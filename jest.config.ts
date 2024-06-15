import { Config } from 'jest';

const config: Config = {
  preset: '@testing-library/react-native',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|react-native-svg|i18n-js)',
    'jest-runner',
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '@react-native'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^assets/(.*)$': '<rootDir>/assets/$1',
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testMatch: ['**/*.test.ts?(x)', '**/*.test.js?(x)'],
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.tsx',
    '<rootDir>/src/navigators/error-boundary/*.tsx',
    '<rootDir>/src/storage/index.ts',
    '<rootDir>/src/store/*.ts',
    '<rootDir>/src/modules/**/*.tsx',
  ],
};

export default config;
