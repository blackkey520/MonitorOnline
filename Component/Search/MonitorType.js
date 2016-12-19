/**
 * 监控类别专题组件
 * liz
 * 2016.12.19
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
/*
组件引用
*/
import MonitorTypeData from '../../Config/MonitorType.json'
import MonitorTypeItem from './MonitorTypeItem'
/*
场景参数变量
*/
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

export default class MonitorType extends Component {
  // 构造方法
  constructor(props) {
      super(props);
      // 组件页面切换状态
      this.state = {
          activePage: 0
      }
  }
  组件渲染方法
  render() {
    return (
      <View style={styles.LayoutSytle}>
        <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => { this.onScrollAnimationEnd(e) } }
            >
            {/* 渲染监控类别专题列表 */}
            {this.renderMonitorTypeItem()}
        </ScrollView>
        <View style={styles.indicatorViewStyle}>
            {/* 渲染分页显示组件 */}
            {this.renderIndicator() }
        </View>
      </View>
    );
  }
  // 专题列表渲染方法
  renderMonitorTypeItem()
  {
    var monitorTypeArr=[];
    // 读取全局json循环调用监控专题组件渲染列表
    for(var i=0;i<MonitorTypeData.length;i++)
      {
        var pageData=MonitorTypeData[i];
        monitorTypeArr.push(
            <MonitorTypeItem
              dataArr={pageData.Item}
              key={i}>
            </MonitorTypeItem>
        );
      }
      return monitorTypeArr;
  }
  // 分页组件渲染方法
  renderIndicator() {
      var indicatorArr = [], style;
      // 读取全局json第一层循环渲染分页组件
      for (var i = 0; i < MonitorTypeData.length; i++) {
          style = (i === this.state.activePage) ? { color: 'black' } : { color: 'gray' };
          indicatorArr.push(
              // &bull;渲染出来是一个小圆点
              <Text key={i} style={[{ fontSize: 25 }, style]}>&bull; </Text>
          );
      }
      return indicatorArr;
  }
  // 响应Scroll组件动画结束事件改变当前显示页数
  onScrollAnimationEnd(e) {

      var currentPage = Math.floor(e.nativeEvent.contentOffset.x / width);
      this.setState({
          activePage: currentPage
      });
  }
}
const styles = StyleSheet.create({

 LayoutSytle:{
   flexDirection:'column',
   justifyContent: 'center',
   alignItems: 'center',
   borderBottomColor:'#EFEFF4',
   borderBottomWidth:1,

 },
 indicatorViewStyle:{
   flexDirection: 'row',
   justifyContent: 'center',
 }
});
