import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Redirect from './redirect';
import List from './list';
import Edit from './edit';

export default class Navigation extends Component {

  render(){
    return(
      <div className="root">
        <BrowserRouter>
          <Switch>
            <Route exact path='/list' component={List} />
            <Route exact path='/task/:id' component={Edit} />
            <Route path='/' component={Redirect} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
