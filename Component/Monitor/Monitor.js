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
  ScrollView,

} from 'react-native';

import SearchComponent from '../SearchComponent'
import FirstMenuComponent from './FirstMenuComponent'

var Dimensions=require('Dimensions');
var {width,height}=Dimensions.get('window');
export default class Monitor extends Component {
  render() {
    return (
      <View style={styles.MonitorLayout}>
        <View style={styles.MonitorTop}>
          <SearchComponent ></SearchComponent>
        </View>
        <ScrollView style={styles.MonitorBottom}>
          <FirstMenuComponent FirstMenuTitle="基本信息"></FirstMenuComponent>
          <FirstMenuComponent FirstMenuTitle="监控预警"></FirstMenuComponent>
          <FirstMenuComponent FirstMenuTitle="监控预警"></FirstMenuComponent>
          <FirstMenuComponent FirstMenuTitle="监控预警"></FirstMenuComponent>
          <FirstMenuComponent FirstMenuTitle="监控预警"></FirstMenuComponent>
        </ScrollView>
      </View>
    );
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
   borderBottomColor:'black',
   borderBottomWidth:0.3,
   marginTop:20
 },
 MonitorBottom:{
   backgroundColor:'#efeff4'
 }
});
