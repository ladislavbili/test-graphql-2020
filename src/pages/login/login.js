import React, { Component } from 'react';
import { Col, Button, FormGroup, Label, Input } from 'reactstrap';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: 'test2@test.sk',
      password: 'Popoluska',
    }
  }

  render() {
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
        <Button
          color="primary"
          onClick={ () => {
            this.props.login({ variables: { email: this.state.email, password: this.state.password } }).then( ( response ) => {
              localStorage.setItem("acctok", response.data.loginUser.accessToken);
              this.props.client.writeData({ data: { isLoggedIn: true } });
            }).catch( (err) => {
              console.log(err.message);
            });
          }}
          >
          Login
        </Button>
        </div>
    );
  }
}
