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
    Image
} from 'react-native';

import MineCellComponent from './MineCellComponent'
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
export default class Mine extends Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.MineLayout}>
                    <View style={styles.TopMineStyle}>
                        <Image source={{
                            uri: 'bg_user'
                        }} style={styles.TopImgStyle}/>
                        <View style={styles.UserStyle}>
                            <View style={{
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                width: 100,
                                height: 120
                            }}>
                                <Image source={{
                                    uri: 'userlogo'
                                }} style={{
                                    height: 70,
                                    width: 70
                                }}/>
                                <Text style={{
                                    fontSize: 15,
                                    color: 'white'
                                }}>
                                    超级管理员
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop:20}}>
                        <MineCellComponent cellLeftImg="address_icon" cellTitle="通讯录"/>
                        <MineCellComponent cellLeftImg="focused_icon" cellTitle="我的关注"/>
                        <MineCellComponent cellLeftImg="msg_icon2" cellTitle="我的消息"/>
                    </View>
                    <View style={{marginTop:20}}>
                        <MineCellComponent cellLeftImg="setting_icon" cellTitle="系统设置"/>
                        <MineCellComponent cellLeftImg="clear_icon" cellTitle="缓存清理"/>
                        <MineCellComponent cellLeftImg="updata_icon" cellTitle="版本更新"/>
                    </View>
                    <View style={{marginTop:20}}>
                        <MineCellComponent cellLeftImg="tab_map_hover" cellTitle="退出登陆"/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    UserStyle: {

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.0)',
        paddingHorizontal: width / 2 - 25,
        paddingVertical: 100,

        ...StyleSheet.absoluteFillObject
    },
    TopImgStyle: {
        width: width,
        height: 240
    },
    TopMineStyle: {
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    MineLayout: {
        flexDirection: 'column',

        backgroundColor: '#efeff4',
        height: width*3,
        ...StyleSheet.absoluteFillObject
    }
});
