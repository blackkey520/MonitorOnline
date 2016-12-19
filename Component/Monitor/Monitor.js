/**
 * 监控场景组件
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
} from 'react-native';
/*
组件引用
*/
import SearchComponent from '../Search/SearchComponent'
import FirstMenuComponent from './FirstMenuComponent'
import MenuData from '../../Config/Menu.json'
/*
场景参数变量
*/
var Dimensions=require('Dimensions');
var {width,height}=Dimensions.get('window');


export default class Monitor extends Component {
  //路由组件必须代码
  static contextTypes = {
      router: React.PropTypes.object.isRequired
  };
  //路由路径标识
  static defaultProps() {
      return {key: 'monitor'};
  }
  // 组件渲染方法
  render() {
    return (
      <View style={styles.MonitorLayout}>
        <View style={styles.MonitorTop}>
          {/* 渲染查询组件 */}
          <SearchComponent ></SearchComponent>
        </View>
        <ScrollView style={styles.MonitorBottom}>
          {/* 渲染菜单组件 */}
          {this.renderMenu()}
        </ScrollView>
      </View>
    );

  }
  // 菜单组件渲染方法
  renderMenu()
  {
    var menuArr=[];
    // 读取全局json数组动态创建菜单
    for(var i=0;i<MenuData.length;i++)
      {
        var firstMenu=MenuData[i];
        menuArr.push(
            // 渲染一级菜单组件
            <FirstMenuComponent
              FirstMenuTitle={firstMenu.FirstMenuName}
              childrenMenu={firstMenu.SecondMenu}
              key={i}>

              </FirstMenuComponent>
        );
      }
      return menuArr;
  }
}

const styles = StyleSheet.create({

 MonitorLayout:{
   flex:1
 },
 MonitorTop:{
   height:45,
   backgroundColor:'white',
   justifyContent: 'center',
   alignItems: 'center',
   borderBottomColor:'#EFEFF4',
   borderBottomWidth:0.3,
   marginTop:20
 },
 MonitorBottom:{
   backgroundColor:'#efeff4'
 }
});
