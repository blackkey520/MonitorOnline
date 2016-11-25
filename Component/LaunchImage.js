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
  Image,
  
} from 'react-native';

 import Login from './Login';

export default class LaunchImage extends Component {
  render() {
    return (
      // <Image source={{uri:'launchimage'}} style={styles.launchImageStyle}/>
      <View>
        <Image source={{uri:'launchimage'}} style={styles.launchImageStyle}/>
      </View>
    );
  }
  componentDidMount(){
    //定时：隔2s切换到Main
    setTimeout(()=>{
        //跳转，页面切换
        this.props.navigator.replace({
            component:Login,
        });
    },500)

  }
}

const styles = StyleSheet.create({

 launchImageStyle:{
     flex:1
 }
});
