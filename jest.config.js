module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'entities',
    'dto',
    '<rootDir>/main.ts',
    '<rootDir>/prisma',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
};
