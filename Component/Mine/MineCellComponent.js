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
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

export default class MineCellComponent extends Component {
    render() {
        return (
          //activeOpacity={0.5}
          <TouchableOpacity   onPress={()=>{alert()}}  style={{height:40}}>
            <View style={styles.CellLayout}>
              <View style={styles.CellLeft}>
                <Image source={{uri:this.props.cellLeftImg}} style={styles.LeftImageStyle}/>
                <Text style={styles.TextStyle}>{this.props.cellTitle}</Text>
              </View>
              <View style={styles.CellRight}>
                <Image source={{uri:'arr_right_icon'}} style={styles.RightImageStyle}/>
              </View>
            </View>
          </TouchableOpacity>

        );
    }
}

const styles = StyleSheet.create({
  CellLayout:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    height:40,
    width:width,
    backgroundColor:'white',
    borderRightColor:'#efeff4',
    borderRightWidth:0.5,
    borderBottomColor:'#efeff4',
    borderBottomWidth:0.5
  },
  CellLeft:{
    marginLeft:15,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  LeftImageStyle:{
    width:20,
    height:20,
    marginTop:3
  },
  RightImageStyle:{
    width:25,
    height:25,
    marginRight:5,
  },
  TextStyle:{
    marginLeft:5,
    marginTop:5,
    fontSize:14
  }
});
