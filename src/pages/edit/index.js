import React, { Component } from 'react';
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import EditTask from './editTask';

const GET_TASK = gql`
query task($id: Int!) {
  task (
    id: $id
  ) {
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

const GET_TAGS = gql`
query {
  tags {
    id
    title
    color
  }
}
`;

const UPDATE_TASK = gql`
mutation updateTask($id: Int!, $title: String, $tags: [Int]) {
  updateTask(
    id: $id,
    title: $title,
    tags: $tags,
  ){
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

export default function ListContainer(props){
  const taskData = useQuery(GET_TASK, { variables: {id: parseInt(props.match.params.id)} });
  const tagsData = useQuery(GET_TAGS);
  const [updateTask, {data}] = useMutation(UPDATE_TASK);
  return (
    <EditTask taskData={taskData} tagsData={tagsData} updateTask={updateTask} history={props.history} match={props.match} />
  )
}
