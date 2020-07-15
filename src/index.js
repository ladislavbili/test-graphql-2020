import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './pages/navigation';
import Login from './pages/login';
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

import gql from "graphql-tag";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import createClient from './apollo/createClient';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Navigation /> : <Login />;
}

const client = createClient();

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <IsLoggedIn />
    </ApolloProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
