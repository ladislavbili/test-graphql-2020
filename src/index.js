import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import Navigation from './navigation';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import jwtDecode from 'jwt-decode';
import { setContext } from 'apollo-link-context';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('acctok');
  if( !token ){
    return headers;
  }
  console.log(jwtDecode(token));
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    }
  }
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(link)
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div>
          <Route path='/' component={Navigation} />
        </div>
      </BrowserRouter>
    </ApolloProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
