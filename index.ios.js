/**
 * IOS入口组件
 * liz
 * 2016.12.19
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Navigator} from 'react-native';
/**
redux相关组件
 */
import {Provider} from 'react-redux';
import {getStore} from './Store/store'
/**
路由组件
 */
import GlobalRouter from './Config/globalRouter';

export default class MonitorOnline extends Component {
  // 构造函数
    constructor(props) {
        super(props);
        // 组件内记录store状态
        this.state = {
            store: null
        }
    }
    // 组件渲染完方法
    componentDidMount() {
        // 获取store，并且更新状态
        const store = getStore();
        this.setState({store: store});
    }
    // 组件渲染方法
    render() {
      // 判断store是否存在
      if(!this.state.store){
          return (
              <View>
                  {/* 渲染正在加载store视图 */}
                 <Text>在加载store。。。</Text>
              </View>
          );
      }

        return (
            <Provider store={this.state.store}>
                {/* 全局Provider包裹，渲染路由组件 */}
                <GlobalRouter/>
            </Provider>
        );
    }
}
// 注册ios入口组件
AppRegistry.registerComponent('MonitorOnline', () => MonitorOnline);
