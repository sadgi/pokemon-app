module.exports = {
    preset: 'ts-jest',
    transform: {
      "^.+\\.css$": "jest-transform-stub", 
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: [
      "<rootDir>/src/setupTests.ts"
    ]
  }
