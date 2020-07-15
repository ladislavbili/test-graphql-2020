import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class List extends Component {

  render() {
    const { data, loading, error, client } = this.props.tasksData;
    if (loading) return ( <p>LOADING</p> );
    if (error){
      console.log(error);
      return ( <p>ERROR</p> )
    }
    if (!data) return ( <p>Not found</p> );
    return (
      <ListGroup>
        <Button
          className="mb-3"
          color="danger"
          onClick={ () => {
            this.props.logoutUser().then(( response ) => {
              localStorage.removeItem("acctok");
              client.writeData({ data: { isLoggedIn: false } });
            });
          }}
          >
          log out
        </Button>
        {
          data.tasks.map( (task) =>
            <ListGroupItem key={task.id}>
              <Link to={`/task/${task.id}`}>
                { task.title }
                { task.tags.map((tag) => <span key={tag.id} className="label label-info mr-1 ml-1 pr-1 pl-1" style={{backgroundColor: tag.color, color: "white"}}>{tag.title}</span> ) }
              </Link>
          </ListGroupItem>
          )
        }
      </ListGroup>
    );
  }
}
