//Load and configure dotenv environment variables
import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import cookieParser from 'cookie-parser'
import express from 'express'
import { clerkMiddleware } from '@clerk/express'
import { createServer } from 'http'
import { expressMiddleware } from '@apollo/server/express4'
import { ResolverContext } from './graphql/api'
import { createApolloServer } from './graphql/apolloServer'
import { ensureRegistration } from './util/auth/ensureRegistration'
import { container } from './util/container'

const app = express()
const port = process.env.PORT || 4000

//Middleware
app.use(express.json()) //to parse JSON bodies
app.use(cookieParser()) //to parse cookies, which populate req.cookies
app.use(clerkMiddleware()) //to authenticate requests
app.use(ensureRegistration) //to ensure new users are registered

const CORS_WHITELIST = [
  'http://localhost:4000',
  'https://localhost:4000'
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
          req: req,
          container: container,
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