"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    schema: './../server/src/graphql/api/**/*.gql',
    documents: './src/graphql/**/*.gql',
    generates: {
        'src/generated/graphql.ts': {
            plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
        }
    }
};
exports.default = config;
