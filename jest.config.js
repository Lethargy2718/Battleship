/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: "jsdom",
    transform: {
        "^.+.tsx?$": ["ts-jest", {}],
    },
    moduleNameMapper: {
        "\\.(svg)$": "<rootDir>/tests/__mocks__/file-mock.js",
    },
};
