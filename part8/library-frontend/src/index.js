import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

const authLink = setContext((req, {prevHeaders}) => {
  const token = localStorage.getItem('libLoginGql');
  return {
    headers: {
      ...prevHeaders,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    , document.getElementById('root'));
