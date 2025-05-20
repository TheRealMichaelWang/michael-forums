import type { CodegenConfig } from '@graphql-codegen/cli';
    
const config: CodegenConfig = { 
    schema: './../server/src/graphql/api/**/*.gql',
    documents: './src/graphql/**/*.gql',   
    generates: {
        'src/generated/graphql.ts': {
            plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
        }
    }
};

export default config;