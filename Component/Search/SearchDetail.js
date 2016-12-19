/**
 * 查询详细组件
 * liz
 * 2016.12.19
 */

import React, {Component, PropTypes} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity
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
/*
组件引用
*/
import MonitorType from './MonitorType'
import SearchResult from './SearchResult'
import SearchHisory from './SearchHistory'
/*
通用组件引用
*/
import Loading from '../Common/Loading'
import Tips from '../Common/Tips'

class SearchDetail extends Component {
    //构造函数
    constructor(props) {
        super(props);
        this.props.LoadStorage();//加载历史查询记录
    }
    //路由组件必须代码
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    //路由路径标识
    static defaultProps() {
        return {key: 'search/searchdetail'};
    }


    //自动提交方法，暂时失效
    handleUpdateChange(text) {
        this.props.ChangeSearchText(text);
        this.props.ChangeSearchScene('history');
        //2s后判断当前输入的值和Reducers存储的状态值是否相同，如果相同则触发查询方法
        setTimeout(function() {

            if (text != this.props.search.SearchText) {
                return;
            } else {
                if (text) {

                  this.porps.ClearHistorySearch();
                  this.props.ResetSearch();
                  this.props.ChangeSearchScene('result');

                }
            }
        }.bind(this), 2000);
    }
    /*
    *查询结果渲染方法
    */
    renderResultView()
    {
        return (
          <View style={{marginTop:60}}>
              {/* 查询结果组件渲染，传递PageSize参数 */}
              <SearchResult  size={10}></SearchResult>
          </View>
        )
    }
    /*
    *历史记录渲染方法
    */
    renderHistoryView()
    {

        return (
            <ScrollView keyboardDismissMode ={'interactive'} alwaysBounceVertical ={false}>
                {/* 监控类别专题组件渲染 */}
                <MonitorType />
                {/* 历史查询记录组件渲染 */}
                <SearchHisory />
                {/* 清空按钮渲染 */}
                <TouchableOpacity onPress={() => {
                    this.props.ClearHistory()
                }} style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop:10
                }}>
                    <Text style={{
                        fontSize: 14,
                        color: '#D6D6D8',

                    }}>清除搜索记录</Text>
                </TouchableOpacity>
                {/* 由于ScrollView组件存在bug底层显示不全，所以加上空的View设定高度把结果数据顶上来 */}
                <View style={{height:180,}}>

                </View>
            </ScrollView>
        );

    }
    /*
    *返回按钮渲染方法
    */
    GetBack()
    {
      //判断当前场景是否是结果组件,是的话复位查询状态并且切换场景到历史组件
      if(this.props.search.SearchScene=="result")
      {
        this.props.ResetSearch();
        this.props.ChangeSearchText('');
        this.props.ClearHistorySearch();
        this.props.ChangeSearchScene('history');
      }else {
          this.context.router.goBack()
      }
    }
    /*
    *组件渲染方法
    */
    render() {
        return (
            <View style={styles.LayoutSytle}>
                <View style={styles.SearchStyle}>
                  {/* 返回组件渲染 */}
                    <TouchableOpacity onPress={this.GetBack.bind(this)}>
                        <Image source={{
                            uri: 'back_icon'
                        }} style={{
                            marginLeft: 10,
                            width: 16,
                            height: 25,
                            marginBottom: 5
                        }}/>
                    </TouchableOpacity>
                    {/* 查询文本框渲染 */}
                    <View style={styles.TextStyle}>
                        <TextInput  autoCapitalize ={'none'} value ={this.props.search.SearchText} onChangeText ={(text) => {
                            //this.handleUpdateChange(text)
                            // 响应输入事件改变Reducers中状态值，并且切换场景为历史组件
                            this.props.ChangeSearchText(text);
                            this.props.ChangeSearchScene('history');

                        }}
                        onSubmitEditing={()=>{
                          // 响应键盘完成编辑事件触发切换场景，并且复位所有查询记录
                          this.props.ClearHistorySearch();
                          this.props.ResetSearch();
                          this.props.ChangeSearchScene('result');

                        }} style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 10,
                            height: 35,
                            width: width - 55
                        }} placeholder='请输入关键字搜索' clearTextOnFocus={true}/>

                    </View>

                </View>
                {/* 渲染查询视图 */}
                <View style={styles.MonitorTypeStyle}>
                    {/* 判断当前场景选择对应的渲染方法 */}
                    {this.props.search.SearchScene=="history"?this.renderHistoryView():this.renderResultView()}
                </View>
                {/* 根据返回的信息更新Tips组件 */}
                {this.props.search.SearchToastMessage != ""
                    ? <Tips AutoShow={true} Message={this.props.search.SearchToastMessage} // position='top'
    positionValue={200} fadeInDuration={150} fadeOutDuration={200} opacity={0.8}/>
                    : null
}
            </View>
        );
    }
}
// 连接器动态导出组件
export default connect((state) => ({search: state.SearchReducers}), (dispatch) => ({
    // 清除搜索历史记录方法
    ClearHistory: () => dispatch(SearchAction.ClearHistory()),
    // 复位查询方法
    ResetSearch:()=>dispatch(SearchAction.ResetSearch()),
    // 保存查询记录方法
    SaveSearch:(SearchDetail)=>dispatch(SearchAction.SaveSearch(SearchDetail)),
    // 加载历史查询记录方法
    LoadStorage:()=>dispatch(SearchAction.LoadStorage()),
    // 改变搜索框内值的状态的方法
    ChangeSearchText:(text)=>dispatch(SearchAction.ChangeSearchText(text)),
    // 操作场景的方法
    ChangeSearchScene:(scene)=>dispatch(SearchAction.ChangeSearchScene(scene)),
    // 清空历史查询条件记录的方法
    ClearHistorySearch:()=>dispatch(SearchAction.ClearHistorySearch())
}))(SearchDetail)

const styles = StyleSheet.create({
    LayoutSytle: {

        flexDirection: 'column',
        backgroundColor: '#efeff4'
    },
    SearchStyle: {
        borderBottomColor: '#EFEFF4',
        borderBottomWidth: 0.3,
        backgroundColor: '#efeff4',
        marginTop: 20,
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50
    },
    MonitorTypeStyle: {
        backgroundColor: 'white'
    },
    TextStyle: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderColor: '#D6D6D8',
        borderWidth: 1,

        marginLeft: 6,

        backgroundColor: 'white'
    }
});
