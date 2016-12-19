/**
 * 首页场景组件
 * liz
 * 2016.12.19
 */


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  AsyncStorage
} from 'react-native';


export default class Home extends Component {
  // 组件渲染方法
  render() {
    return (
      <View style={styles.TextStyle}>
        <Text onPress={()=>{
          this.clear();
        }}>
          主页
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
