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
  ScrollView
} from 'react-native';


export default class UnitTest extends Component {
  static contextTypes = {
      router: React.PropTypes.object.isRequired
  };
  static defaultProps() {
      return {key: 'danweixinxi'};
  }
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
