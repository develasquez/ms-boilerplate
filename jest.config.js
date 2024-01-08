module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [ "**/tests/**/*.[jt]s?(x)"],
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/node_modules/"
  ],
  "coverageThreshold": {
    "global": {
      "lines": 80,
      "statements": 80,
      "functions": 80,
    }
  }
};