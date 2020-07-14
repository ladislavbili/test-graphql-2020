import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Login from './login';
import List from './list';

export default class Navigation extends Component {

  render(){
    if(!this.props.authentificated){
      return(
        <div className="root">
          <Route path='/' component={Login} />
        </div>
      )
    }else {
      return(
        <div className="root">
          <Route path='/' component={List} />
        </div>
      )
    }
  }
}
