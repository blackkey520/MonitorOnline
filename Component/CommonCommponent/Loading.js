/**
 * 公共Loading组件
 * Param：
 * LoadingTitle=>Loading中现实的文字
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


export default class Loading extends Component {
  render() {
    return (
      <View style={styles.TextStyle}>
        <Text>
          {this.props.LoadingTitle}
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
