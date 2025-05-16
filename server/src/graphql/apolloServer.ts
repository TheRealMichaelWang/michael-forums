import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { Server } from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema'
import { typeDefs } from './typedefs';
import { resolvers, ResolverContext } from './api'

export const createApolloServer = (httpServer: Server): ApolloServer<ResolverContext> => {
    const schema = makeExecutableSchema<ResolverContext>({
        typeDefs,
        resolvers: resolvers,
    });
    const server = new ApolloServer<ResolverContext>({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
        ],
    });

    return server;
}