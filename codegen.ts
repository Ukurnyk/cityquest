import type { CodegenConfig } from '@graphql-codegen/cli';
import path from 'path';

const config: CodegenConfig = {
  schema: path.resolve(__dirname, 'src/gql/schema.graphql'),
  documents: [path.resolve(__dirname, 'src/gql/queries.graphql')],
  generates: {
    './src/gql/types.ts': {
      plugins: ['typescript'],
      config: {
        scalars: {
          DateTime: 'string',
          UUID: 'string',
        },
        enumsAsTypes: true,
        skipTypename: false,
        constEnums: true,
      },
    },
    './src/gql/operations.ts': {
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        scalars: {
          DateTime: 'string',
          UUID: 'string',
        },
        skipTypename: false,
        constEnums: true,
      },
      preset: 'import-types',
      presetConfig: {
        typesPath: './types',
      },
    },
  },
};

export default config;
