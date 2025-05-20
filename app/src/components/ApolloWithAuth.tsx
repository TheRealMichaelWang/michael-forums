import { ApolloProvider, ApolloClient, type NormalizedCacheObject } from "@apollo/client";
import { useAuth } from "@clerk/clerk-react";
import { setContext } from "@apollo/client/link/context";

import React, { useEffect, useState } from "react";

//This component wraps the ApolloProvider and sets the auth token for each request.
// It uses the useAuth hook from Clerk to get the token and sets it in the headers of each request.
// Without this session claims in the backend will always be null.
const ApolloWithAuth: React.FC<{ client: ApolloClient<NormalizedCacheObject>, children: React.ReactNode }> = ({ client, children }) => {
  const { getToken } = useAuth();
  const [authClient, _] = useState<ApolloClient<NormalizedCacheObject>>(client);

  useEffect(() => {
    let authLinkSet = false;
    const setAuthLink = async () => {
      const token = await getToken();
      const authLink = setContext((_, { headers }) => ({
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : "",
        },
      }));
      if (!authLinkSet) {
        authClient.setLink(authLink.concat(client.link));
        authLinkSet = true;
      }
    };
    setAuthLink();
  }, [getToken, client, authClient]);

  return <ApolloProvider client={authClient}>{children}</ApolloProvider>;
};

export default ApolloWithAuth;