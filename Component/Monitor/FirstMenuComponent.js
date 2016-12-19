/**
 *  一级菜单渲染组件
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
    Image,

} from 'react-native';
/*
场景参数变量
*/
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
/*
组件引用
*/
import MenuComponent from './MenuComponent'

export default class FirstMenuComponent extends Component {
  // 组件渲染方法
    render() {
        return (
            <View style={styles.MenuLayout}>
              {/* 渲染一级菜单 */}
              <View style={styles.MenuTop}>
                <Text style={styles.TextStyle}>
                  {this.props.FirstMenuTitle}
                </Text>
              </View>
              {/* 渲染二级菜单 */}
              <View style={styles.MenuBottom}>
                {this.renderMenu()}
              </View>
            </View>
        );
    }
    // 二级菜单渲染方法
    renderMenu(){

      var SecondMenuData=this.props.childrenMenu;
      var menuArr=[];
      // 循环传递进来的二级菜单数据渲染二级菜单
      for(var i=0;i<SecondMenuData.length;i++)
        {
          var secondMenu=SecondMenuData[i];
          menuArr.push(
            // 渲染二级菜单组件
              <MenuComponent
                menuImg={secondMenu.SecondMenuIco}
                menuTarget={secondMenu.SecondMenuTarget}
                menuTitle={secondMenu.SecondMenuName}
                key={i}>
                </MenuComponent>
          );
        }
        return menuArr;
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
