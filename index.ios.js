/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import Login from './Component/Login';

export default class MonitorOnline extends Component {
  render() {
    return (
      <Navigator
                    initialRoute={{ name: '登陆', component: Login }}
                    ref="navigator"
                    //配置场景
                    configureScene={
                        (route) => {
                            //这个是页面之间跳转时候的动画，具体有哪些？可以看这个目录下，有源代码的: node_modules/react-native/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js
                            return Navigator.SceneConfigs.HorizontalSwipeJump  ;
                        }
                    }
                    renderScene={
                        (route, navigator) => {
                            let Component = route.component;
                            return <Component {...route.params} navigator={navigator} />
                        }
                    }
                    />
    );
  }
}


AppRegistry.registerComponent('MonitorOnline', () => MonitorOnline);
