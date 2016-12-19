/**
 * 查询历史记录组件
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
  ListView,
  AsyncStorage,
  TouchableOpacity,
  Image
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


class SearchHisory extends Component {
  // 历史记录项点击方法
  HistoryItemClick(rowData)
  {
    // 清空历史查询条件记录
    this.props.ClearHistorySearch();
    // 修改文本框显示数值
    this.props.ChangeSearchText(rowData.text);
    // 保存历史查询条件记录
    this.props.SaveSecondSearchDetail(rowData);
    // 切换结果场景
    this.props.ChangeSearchScene('result');
  }
  // ListView行渲染方法
  renderRow(rowData){
    return (
      <TouchableOpacity onPress={()=>{
        // 调用历史记录项点击方法
        this.HistoryItemClick(rowData);
        // this.secondLevelClick(rowData.lable,rowData.text);
      }} style={styles.LayoutStyle}>
          <Image source={{
              uri:rowData.lable=='[企业]'?
              'type_conmpany':rowData.lable=='[地区]'?
              'type_county':rowData.lable=='[站点]'?
              'type_station':rowData.lable=='[专题]'?
              'search_icon':'ueser_icon'
          }} style={{
              width: 20,
              height: 20
          }}/>
          <View style={styles.SecondLayoutStyle}>
            <View style={styles.pointLayoutStyle}>
               <Text>{rowData.text}</Text>
            </View>

          </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={styles.LayoutStyle}>
        {/* 调用原生ListView组件 */}
        <ListView
          renderRow={this.renderRow.bind(this)}
          dataSource={this.props.search.HistoryDataSource}
          enableEmptySections={true}
        />
      </View>
    );
  }
}
// 连接器动态导出组件
export default connect((state) => ({search: state.SearchReducers}), (dispatch) => ({
  // 文本框内容更改方法
  ChangeSearchText:(text)=>dispatch(SearchAction.ChangeSearchText(text)),
  // 切换场景方法
  ChangeSearchScene:(scene)=>dispatch(SearchAction.ChangeSearchScene(scene)),
  // 保存历史查询条件记录方法
  SaveSecondSearchDetail:(SearchDetail)=>dispatch(SearchAction.SaveSecondSearchDetail(SearchDetail)),
  // 清空历史查询条件记录方法
  ClearHistorySearch:()=>dispatch(SearchAction.ClearHistorySearch())
}))(SearchHisory)
const styles = StyleSheet.create({

 LayoutStyle: {
     flexDirection: 'row',
     justifyContent: 'space-around',
     alignItems: 'center'
 },
 SecondLayoutStyle: {
     height: 50,
     flexDirection: 'column',
     justifyContent: 'space-around',
     alignItems: 'center',
     borderBottomColor: '#EFEFF4',
     borderBottomWidth: 1
 },
 pointLayoutStyle: {
     width: width - 50,
     flexDirection: 'row',
     justifyContent: 'flex-start',
     alignItems: 'center'
 },
 enterpriseLayoutStyle: {
     width: width - 50,
     flexDirection: 'row',
     justifyContent: 'flex-start',
     alignItems: 'center'
 }
});
