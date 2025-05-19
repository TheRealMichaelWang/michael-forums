import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// Create an HTTP link to connect to the GraphQL server
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // The URI of the GraphQL server
});

// Initialize and export the Apollo Client instance
export const client = new ApolloClient({
  link: httpLink, // Specifies the connection link for sending GraphQL requests to the server
  cache: new InMemoryCache(), // Sets up an in-memory cache to store and manage query results efficiently
});