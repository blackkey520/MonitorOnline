/**
 * 监控类别（单页）专题组件
 * liz
 * 2016.12.19
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ListView
} from 'react-native';
/*
redux相关引用
*/
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as SearchAction from '../../Actions/SearchAction'
/*
场景参数变量
*/
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var layoutWidth=width/4-30;
var layoutHeight=width/4-28;

 class MonitorTypeItem extends Component {
  //  构造方法
  constructor(props) {
      super(props);
      // 初始化ListView数据
      var ds=new ListView.DataSource({rowHasChanged:(row1,row2)=>row1!==row2});
      this.state = {
          dataSource:ds.cloneWithRows(this.props.dataArr)
      };
  }
  // 组件渲染方法
  render() {
    return (
      <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          contentContainerStyle={styles.contentViewStyle}
          scrollEnabled={false}
           removeClippedSubviews={false}
          />

    );
  }
  // 监测类别专题单项点击方法
  MonitorTypeItmeClick(rowData)
  {

    let text=rowData.MonitorTypeName;
    // 特殊处理VOC的搜索参数
    if(rowData.MonitorTypeName=='VOCs')
    {
      text='voc';
    }
    // 清理历史搜索条件记录
    this.props.ClearHistorySearch();
    // 复位查询记录
    this.props.ResetSearch();
    // 更改搜索框显示文字
    this.props.ChangeSearchText(text);
    // 切换查询结果场景
    this.props.ChangeSearchScene('result');
    // 构造保存查询历史记录参数
     let SearchDetail = {
         lable:'[专题]',
         text: text
     };
    //  保存查询历史记录
    this.props.SaveSearch(SearchDetail);
  }
  // ListView行渲染方法
  renderRow(rowData){
      return (
        <TouchableOpacity onPress={()=>{this.MonitorTypeItmeClick(rowData)}} style={styles.LayoutSytle}>
           <Image style={styles.ImgStyle} source={{uri:rowData.MonitorTypeIco}}/>
           <Text style={styles.TextStyle}>
             {rowData.MonitorTypeName}
           </Text>
        </TouchableOpacity>
      );
  }
}
// 连接器动态导出组件
export default connect((state) => ({search: state.SearchReducers}), (dispatch) => ({
    // 复位查询信息方法
    ResetSearch:()=>dispatch(SearchAction.ResetSearch()),
    // 保存查询历史记录方法
    SaveSearch:(SearchDetail)=>dispatch(SearchAction.SaveSearch(SearchDetail)),
    // 修改搜索框文本方法
    ChangeSearchText:(text)=>dispatch(SearchAction.ChangeSearchText(text)),
    // 切换场景方法
    ChangeSearchScene:(scene)=>dispatch(SearchAction.ChangeSearchScene(scene)),
    // 清空历史查询条件记录方法
    ClearHistorySearch:()=>dispatch(SearchAction.ClearHistorySearch())
}))(MonitorTypeItem)
const styles = StyleSheet.create({
  contentViewStyle:{
      flexWrap:'wrap',
      flexDirection:'row',
      width:width,
  },
ImgStyle:{
  width:50,
  height:50
},
TextStyle:{
  fontSize:12,
  marginTop:5
},
 LayoutSytle:{
   width:layoutWidth,
   height:layoutHeight,
   justifyContent:'center',
   alignItems:'center',
   marginTop:15,
   marginLeft:width/4-layoutWidth-5,
 }
});
