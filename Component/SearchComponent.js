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
    Image
} from 'react-native';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

export default class SearchComponent extends Component {
    render() {
        return (
            <View style={styles.SearchLayout}>

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
                        <TextInput defaultValue="" clearTextOnFocus={true} style={styles.TextInputStyle}/>
                    </View>

                </View>
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
        borderWidth: 1.5,
    },

    SearchLayout: {
      width:width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-around'

    },
    TextStyle:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around',
      borderColor: '#D6D6D8',
      borderWidth: 1.5,
      backgroundColor:'white'
    },
    TextInputStyle: {
        marginLeft:13,
        width: width - 95,
        height: 35,

    }
});
