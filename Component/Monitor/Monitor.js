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
import MenuData from '../../Config/Menu.json'
// var MenuData  =require('../../LocalData/topMidLeft.json');

var Dimensions=require('Dimensions');
var {width,height}=Dimensions.get('window');
export default class Monitor extends Component {
  static contextTypes = {
      router: React.PropTypes.object.isRequired
  };
  static defaultProps() {
      return {key: 'monitor'};
  }
  render() {
    return (
      <View style={styles.MonitorLayout}>
        <View style={styles.MonitorTop}>
          <SearchComponent ></SearchComponent>
        </View>
        <ScrollView style={styles.MonitorBottom}>
          {this.renderMenu()}
        </ScrollView>
      </View>
    );

  }
  renderMenu()
  {
    var menuArr=[];
    for(var i=0;i<MenuData.length;i++)
      {
        var firstMenu=MenuData[i];
        menuArr.push(
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
   borderBottomColor:'black',
   borderBottomWidth:0.3,
   marginTop:20
 },
 MonitorBottom:{
   backgroundColor:'#efeff4'
 }
});
