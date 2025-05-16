import type { CodegenConfig } from '@graphql-codegen/cli';
    
const config: CodegenConfig = {
    schema: './src/graphql/api/**/*.gql',
    generates: {
        'src/generated/graphql.ts': {
            plugins: ['typescript', 'typescript-resolvers']
        }
    }
};

export default config;