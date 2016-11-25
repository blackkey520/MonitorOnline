/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Platform,
    Image,

} from 'react-native';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
import MenuComponent from './MenuComponent'
export default class FirstMenuComponent extends Component {
    render() {
        return (
            <View style={styles.MenuLayout}>
              <View style={styles.MenuTop}>
                <Text style={styles.TextStyle}>
                  {this.props.FirstMenuTitle}
                </Text>
              </View>

              <View style={styles.MenuBottom}>
                <MenuComponent menuImg="realtime_icon" menuTitle="实时数据"></MenuComponent>
                <MenuComponent menuImg="realtime_icon" menuTitle="实时数据"></MenuComponent>
                <MenuComponent menuImg="realtime_icon" menuTitle="实时数据"></MenuComponent>
                <MenuComponent menuImg="realtime_icon" menuTitle= "实时数据"></MenuComponent>
                <MenuComponent menuImg="realtime_icon" menuTitle="实时数据"></MenuComponent>
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  MenuLayout:{
    flexDirection:'column',

  },
  MenuBottom:{
    flexDirection:'row',
    justifyContent:'flex-start',
    backgroundColor:'white',
    flexWrap:'wrap'
  },
  MenuTop:{
    backgroundColor:'#efeff4',
    justifyContent:'center',

    height:28,

  },
  TextStyle:{
    marginLeft:15,
    fontSize:12
  }
});
