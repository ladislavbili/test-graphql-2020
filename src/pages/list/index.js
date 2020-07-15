import React, { Component } from 'react';
import { useApolloClient, useQuery, useMutation } from "@apollo/react-hooks";
import List from './list';
import gql from "graphql-tag";

const GET_TASKS = gql`
query {
  tasks {
    id
    title
    createdAt
    tags {
      id
      title
      color
    }
  }
}
`;

const LOGOUT = gql`
mutation logoutUser{
  logoutUser
}
`;

export default function ListContainer(){
  const tasksData = useQuery(GET_TASKS);
  const [logoutUser, {data}] = useMutation(LOGOUT);
  return (
    <List tasksData={tasksData} logoutUser={logoutUser} />
  )
}
