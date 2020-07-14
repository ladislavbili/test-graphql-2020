import React, { Component } from 'react';
import { Col, Button, FormGroup, Label, Input } from 'reactstrap';
import { useMutation } from "@apollo/react-hooks";
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



export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: 'test2@test.sk',
      password: 'Popoluska',
    }
    this.renderAddButton.bind(this);
  }

  renderAddButton() {
    const [login, {data}] = useMutation(LOGIN_USER);
    const { email, password } = this.state;
    return (
      <Button
        color="primary"
        onClick={ () => {
          login({ variables: { email, password } }).then( ( response ) => {
            console.log(response);
            localStorage.setItem("token", response.loginUser.token);
          }).catch( (err) => {
            console.log(err.message);
          });
        }}
        >
        Login
      </Button>
    );
  }

  render() {
    const AddButton = this.renderAddButton.bind(this);
    return (
      <div className="center login-page">
        <FormGroup row>
          <Label for="email" sm={2}>Email</Label>
          <Col sm={10}>
            <Input type="email" name="email" id="email" placeholder="Používateľský e-mail" value={this.state.email} onChange={ (e) => this.setState({ email: e.target.value }) } />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="password" sm={2}>Password</Label>
          <Col sm={10}>
            <Input type="password" name="password" id="password" placeholder="Používateľské heslo" value={this.state.password} onChange={ (e) => this.setState({ password: e.target.value }) } />
          </Col>
        </FormGroup>
        <AddButton />
        </div>
    );
  }
}
