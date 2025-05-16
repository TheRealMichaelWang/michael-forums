import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadTypedefsSync } from '@graphql-tools/load'
import { DocumentNode } from 'graphql'
import { resolve } from 'path'

// Use a glob pattern to load all .gql files from the schemas folder
const sources = loadTypedefsSync(resolve(__dirname, './api/**/*.gql'), {
  loaders: [new GraphQLFileLoader()],
})

export const typeDefs = sources.map(source => source.document).filter((x): x is DocumentNode => x !== null)