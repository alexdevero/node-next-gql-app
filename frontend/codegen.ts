import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8080/graphql',
  documents: './graphql/**/*.graphql',
  generates: {
    './generated/graphql.tsx': {
      // preset: 'client',
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
    // './graphql.schema.json': {
    //   plugins: ['introspection'],
    // },
  },
}

export default config
