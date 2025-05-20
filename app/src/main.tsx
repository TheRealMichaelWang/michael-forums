// src/main.tsx
import ReactDOM from 'react-dom/client';
//import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { client } from './client';
import ApolloWithAuth from './components/ApolloWithAuth';
import App from './App';

//not sure but this is supposed to access the clerk key from the .env file
const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ClerkProvider publishableKey={clerkPublishableKey}>
    <ApolloWithAuth client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloWithAuth>
  </ClerkProvider>
);