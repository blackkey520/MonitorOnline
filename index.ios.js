/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Navigator} from 'react-native';
import {Provider} from 'react-redux';
import {getStore} from './Store/store'
import GlobalRouter from './Config/globalRouter';

export default class MonitorOnline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store: null
        }
    }
    componentDidMount() {
        const store = getStore();
        this.setState({store: store});
    }

    render() {
      if(!this.state.store){
          return (
              <View>
                 <Text>在加载store。。。</Text>
              </View>
          );
      }

        return (
            <Provider store={this.state.store}>
                <GlobalRouter/>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('MonitorOnline', () => MonitorOnline);
