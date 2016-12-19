/**
 * 全局查询组件（公用）
 * liz
 * 2016.12.19
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
    Image
} from 'react-native';
/*
场景参数变量
*/
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

export default class SearchComponent extends Component {
  //路由组件必须代码
  static contextTypes = {
      router: React.PropTypes.object.isRequired
  };
  // 组件渲染方法
    render() {
        return (
            <View style={styles.SearchLayout}>
                {/* 渲染文本框查询视图 */}
                <View style={styles.TextStyle}>
                    <View style={styles.SearchLeft}>
                        <Image source={{
                            uri: 'search_icon'
                        }} style={{
                            width: 25,
                            height: 25,
                            marginLeft:5
                        }}/>
                    </View>
                    <View >
                        <TextInput onFocus={()=>{
                          // 路由跳转查询详细页面
                          this.context.router.push('/search/searchdetail')
                        }} defaultValue="" clearTextOnFocus={true} style={styles.TextInputStyle}/>
                    </View>

                </View>
                {/* 渲染二维码查询视图 */}
                <View style={styles.SearchRight}>
                    <Image source={{
                        uri: 'scan_icon'
                    }} style={{
                        width: 25,
                        height: 25
                    }}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    SearchLeft: {
        justifyContent: 'center',
    },
    SearchRight: {
        justifyContent: 'center',
        height: 37,
        width:37,
        alignItems:'center',
        backgroundColor:'white',
        borderColor: '#D6D6D8',
        borderWidth: 1,
    },

    SearchLayout: {
        width:width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-around'

    },
    TextStyle:{
      height: 37,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around',
      borderColor: '#D6D6D8',
      borderWidth: 1,
      backgroundColor:'white'
    },
    TextInputStyle: {

        width: width - 95,
        height: 35,

    }
});
