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
import { Provider } from 'react-redux';
import {getStore} from '../Store/store';
 import Login from './Login';

export default class LaunchImage extends Component {
  constructor(props){
       super(props);
       this.state={
           store:null
       }
  }

    componentDidMount(){
        const store = getStore();
        this.setState({
            store:store
        });
    }
  render() {
    if(!this.state.store){
        return (
          <Provider store={store}>
            <View>
              <Image source={{uri:'launchimage'}} style={styles.launchImageStyle}/>
            </View>
          </Provider>
        );
    }

  }
   
}

const styles = StyleSheet.create({

 launchImageStyle:{
     flex:1
 }
});
