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

export default class MenuComponent extends Component {
  static contextTypes = {
      router: React.PropTypes.object.isRequired
  };
    render() {
        return (
          //activeOpacity={0.5}
          <TouchableOpacity  onPress={()=>{this.context.router.push(this.props.menuTarget)}}  style={{height:80}}>
            <View style={styles.MenuLayout}>
              <Image source={{uri:this.props.menuImg}} style={styles.ImageStyle}/>
              <Text style={styles.TextStyle}>{this.props.menuTitle}</Text>
            </View>
          </TouchableOpacity>

        );
    }
}

const styles = StyleSheet.create({
  MenuLayout:{
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    height:80,
    width:width/3-1,
    backgroundColor:'white',
    borderRightColor:'#efeff4',
    borderRightWidth:0.5,
    borderBottomColor:'#efeff4',
    borderBottomWidth:0.5
  },
  ImageStyle:{
    width:25,
    height:25
  },
  TextStyle:{
    marginTop:10,
    fontSize:12
  }
});
