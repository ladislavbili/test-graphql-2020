import React, { Component } from 'react';
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import Login from './login';
import gql from "graphql-tag";

const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
  loginUser(
    email: $email,
    password: $password
  ){
    user{
      fullName
    },
    accessToken
  }
}
`;

export default function LoginContainer(){
  const [login, {data}] = useMutation(LOGIN_USER);
  const client = useApolloClient();
  return (
    <Login login={login} client = {client} />
  )
}
