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
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';

 import Main from './Main';
 var Dimensions = require('Dimensions');
 var {width, height} = Dimensions.get('window');
export default class Login extends Component {
  render() {
    return (
      // <Image source={{uri:'launchimage'}} style={styles.launchImageStyle}/>
      <View style={styles.LoginLayout}>
          <Image source={{uri:'bg_login'}} style={styles.launchImageStyle}/>
          <View style={styles.LoginForm}>

              <Image source={{uri:'bg_logo'}} style={{height:30,width:80,marginBottom:20}}/>

                <Text style={{fontSize:25,width:270,color:'white',marginBottom:50}}>智能环境综合监控系统</Text>

              <View style={[styles.TextInputStyle,{marginBottom:10}]}>
                <Image source={{uri:'ueser_icon' }}  style={{width:20,height:20,marginBottom:8}}/>
                <TextInput autoFocus={true} keyboardType={'default'} clearTextOnFocus={true} style={{width:width-120,marginLeft:10,marginBottom:8,color:'white'}} />
              </View>
              <View style={[styles.TextInputStyle,{marginBottom:20}]}>
                <Image source={{uri:'password_icon' }}  style={{width:20,height:20,marginBottom:8}}/>
                <TextInput clearTextOnFocus={true}  keyboardType={'default'} style={{width:width-120,marginLeft:10,marginBottom:8,color:'white'}}/>
              </View>
              <View style={styles.checkStyle}>
                <View style={styles.checkStyleDetail}>
                  <Image source={{uri:'checkbox_off'}} style={{width:12,height:12}}/>
                  <Text style={{fontSize:11,color:'white',marginLeft:3}}>记住密码</Text>
                </View>
                <View style={styles.checkStyleDetail}>
                  <Image source={{uri:'checkbox_on'}} style={{width:12,height:12}}/>
                  <Text style={{fontSize:11,color:'white',marginLeft:3  }}>自动登陆</Text>
                </View>
              </View>
              <View >
                  <TouchableOpacity onPress={()=>{
                    this.userLogin();
                  }} style={styles.ButtonStyle}>
                    <Text style={{fontSize:15,color:'white'}}>
                      登   陆
                    </Text>
                  </TouchableOpacity>

              </View>
          </View>
      </View>
    );
  }
  userLogin()
  {
    this.props.navigator.replace({
            component:Main,
        });
  }
  componentDidMount(){
    // //定时：隔2s切换到Main
    // setTimeout(()=>{
    //     //跳转，页面切换
    //     this.props.navigator.replace({
    //         component:Main,
    //     });
    // },500)

  }
}

const styles = StyleSheet.create({
  ButtonStyle:{
    backgroundColor:'#05B1E3',
    width:280,
    height:30,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5
  },
  checkStyleDetail:{
    flexDirection:'row'
  },
LoginForm:{
  alignItems: 'center',
  backgroundColor: 'rgba(255,255,255,0.0)',
    paddingHorizontal: 0,
  paddingVertical: 150,
  width:380,
  height:700,
  ...StyleSheet.absoluteFillObject
},
TextInputStyle:{
  flexDirection:'row',
  width:width-100,
  borderBottomWidth:0.5,
  borderBottomColor:'white'
},
checkStyle:{
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between',
  width:width-100,
  marginBottom:20
},
 launchImageStyle:{
     flex:1,
     resizeMode: 'cover',
 },
 LoginLayout:{
   flexDirection:'column',
   justifyContent: 'flex-end',
   ...StyleSheet.absoluteFillObject
 }
});
