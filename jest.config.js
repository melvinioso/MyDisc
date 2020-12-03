module.exports = {
  roots: ['<rootDir>'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**'],
  testPathIgnorePatterns: ['/node_modules/'],
};
