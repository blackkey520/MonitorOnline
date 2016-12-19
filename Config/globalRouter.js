/**
 * 全局路由组件
 * liz
 * 2016.12.19
 */


 /*
 redux相关引用
 */
import React, { Component, PropTypes } from 'react';
import { createMemoryHistory, Router, IndexRoute, Route } from 'react-router';
import { createNavigatorRouter } from 'react-native-navigator-router';
/*
组件引用
*/
import Login from '../Component/Login';//登陆页面
import Main from '../Component/Main'; //主页
import SearchDetail from '../Component/Search/SearchDetail'//搜索详情页面
import UnitTest from  '../Component/Monitor/UnitTest' //测试页面

export default class GlobalRouter extends Component {
  // 组件渲染方法
    render() {
        return (
          <Router history={createMemoryHistory('/')}>
            <Route path='/' component={createNavigatorRouter(null,{backgroundColor:'white'})}>
              <IndexRoute component={Login} />
              <Route path="/login" component={Login} />
              <Route path="/main" component={Main} />
              <Route path="/danweixinxi" component={UnitTest} />
              <Route path="/search/searchdetail" component={SearchDetail} />
            </Route>
          </Router>
        );
    }
}
