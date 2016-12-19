/**
 * 路由跳转测试组件
 * liz
 * 2016.12.19
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';


export default class UnitTest extends Component {
  //路由组件必须代码
  static contextTypes = {
      router: React.PropTypes.object.isRequired
  };
  //路由路径标识
  static defaultProps() {
      return {key: 'danweixinxi'};
  }
  // 组件渲染方法
  render() {
    return (
      <View style={styles.TextStyle}>
        <Text>
          这是RouterTest页面
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

 TextStyle:{
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
 }
});
