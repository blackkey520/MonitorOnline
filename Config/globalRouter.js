import React, { Component, PropTypes } from 'react';
import { createMemoryHistory, Router, IndexRoute, Route } from 'react-router';
import { createNavigatorRouter } from 'react-native-navigator-router';

import Login from '../Component/Login';//登陆页面
import Main from '../Component/Main'; //主页
import UnitTest from  '../Component/Monitor/UnitTest'
export default class GlobalRouter extends Component {
    render() {
        return (
          <Router history={createMemoryHistory('/')}>
            <Route path='/' component={createNavigatorRouter(null,{backgroundColor:'white'})}>
              <IndexRoute component={Login} />
              <Route path="/login" component={Login} />
              <Route path="/main" component={Main} />
              <Route path="/danweixinxi" component={UnitTest} />
            </Route>
          </Router>
        );
    }
}
