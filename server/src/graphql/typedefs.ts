//This file was pulled directly from the Golaith repository..
//Essentially, this file is used to load the GraphQL schema files from the api folder.

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadTypedefsSync } from '@graphql-tools/load'
import { DocumentNode } from 'graphql'
import { resolve } from 'path'

// Use a glob pattern to load all .gql files from the schemas folder
const sources = loadTypedefsSync(resolve(__dirname, './api/**/*.gql'), {
  loaders: [new GraphQLFileLoader()],
})

export const typeDefs = sources.map(source => source.document).filter((x): x is DocumentNode => x !== null)