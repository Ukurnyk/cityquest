import type { CodegenConfig } from '@graphql-codegen/cli';
import path from 'path';

const config: CodegenConfig = {
  schema: path.resolve(__dirname, 'src/gql/schema.graphql'),
  documents: [path.resolve(__dirname, 'src/gql/queries.graphql')],
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        scalars: {
          DateTime: 'string',
          UUID: 'string',
        },
      },
    },
  },
};

export default config;
