import React, { Component } from 'react';
import { useQuery } from "@apollo/react-hooks";
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


export default class List extends Component {

  render() {
    const { data, loading, error } = useQuery(GET_TASKS);

    if (loading) return ( <p>LOADING</p> );
    if (error) return ( <p>ERROR</p> );
    if (!data) return ( <p>Not found</p> );

    return (
      <div>
        LIST OF {data.length} TASKS
      </div>
    );
  }
}
