//Load and configure dotenv environment variables
import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import express from 'express'
import { createServer } from 'http'
import { expressMiddleware } from '@apollo/server/express4'
import { ResolverContext } from './graphql/api'
import { createApolloServer } from './graphql/apolloServer'

import { container } from './util/container'

const app = express()
const port = process.env.PORT || 4000

//Middleware
app.use(express.json()) //to parse JSON bodies

const CORS_WHITELIST = [
  'http://localhost:4000'
]

async function startServer() {
  const httpServer = createServer(app)
  const apolloServer = createApolloServer(httpServer)
  await apolloServer.start()

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({ origin: CORS_WHITELIST, credentials: true }),
    expressMiddleware(apolloServer, {
      context: async ({req}): Promise<ResolverContext> => {
        return {
          req,
          container,
        }
      },
    })
  )

  httpServer.listen(port, () => {
    console.log("Server ready at http://localhost:%d/graphql", port)
  })
}

startServer().catch((error) => {
  console.error('Error starting server:', error)
  process.exit(1)
})