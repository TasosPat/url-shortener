import type { Config } from 'jest';

const config: Config = {
    transform: {
        "^.+\\.ts?$": "esbuild-jest"
      },
  testEnvironment: 'node',
  verbose: true,
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};

export default config;