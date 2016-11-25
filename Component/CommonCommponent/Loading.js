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
