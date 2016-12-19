/**
 * 查询结果组件
 * liz
 * 2016.12.19
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView,
    ActivityIndicator
} from 'react-native';
/*
redux相关引用
*/
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as SearchAction from '../../Actions/SearchAction'
/*
第三方组件引用
*/
import {PullList} from 'react-native-pull';
/*
场景参数变量
*/
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');


class SearchResult extends Component {
    // 构造方法
    constructor(props) {
        super(props);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }
    // 下啦刷新方法
    onPullRelease(resolve) {
      // 复位查询结果
      this.props.ResetSearch();
      // 历史记录是否为空（第一次检索），或者历史记录中id参数是否为空（监控类别专题检索）来确定调用哪一个全文检索的接口
      if(this.props.search.HistorySearchDetail!=null&&this.props.search.HistorySearchDetail.id!=null)
      {
        // 判断当前页面为1的时候调用查询接口（由于接口存在bug，每页数据都返回的所有数据）
        if(this.props.search.index==1)
        {
          this.props.DoSecondSearch(this.props.search.HistorySearchDetail,this.props.search.index, this.props.size);
        }
      }else {
        this.props.DoSearch(this.props.search.SearchText,this.props.search.index, this.props.size);
      }
      // 隔1s后复位ListView组件
      setTimeout(() => {
          resolve();
      }, 1);

    }
    // ListView顶层加载中的组件渲染方法
	topIndicatorRender(pulling, pullok, pullrelease) {
		return <View>
		  {pulling ?   <ActivityIndicator   /> : null}
       {/* <Text>当前PullList状态: pullok......</Text> */}
		  {pullok ? <ActivityIndicator   />  : null}
      {/* <Text>当前PullList状态: pullrelease......</Text> */}
		  {pullrelease ? <ActivityIndicator   /> : null}
		</View>;
	}
  // ListView底部加载中的渲染方法
    renderFooter() {
      // 判断返回信息为‘没有查询到数据’则不显示等待中的组件
        if(this.props.search.SearchToastMessage=="没有查到数据")
        {
          return (
            <View style={{flexDirection:'row',height: 100,alignItems:'center',justifyContent:'center'}}>
                <Text></Text>
            </View>
          );
        }
        // 如果历史查询条件为空并且历史查询页面为1则不显示等待中的组件（同样是接口bug，具体bug同上）
        else if(this.props.search.HistorySearchDetail!=null&&this.props.search.index!=1)
        {
          <View style={{flexDirection:'row',height: 100,alignItems:'center',justifyContent:'center'}}>

              <Text></Text>
          </View>
        }else {
          return (
              <View style={{flexDirection:'row',height: 100,alignItems:'center',justifyContent:'center'}}>
                  <ActivityIndicator />
                  <Text>正在努力加载</Text>
              </View>
          );
        }
   }
  //  加载更多组件方法
   loadMore() {
     // 历史记录是否为空（第一次检索），或者历史记录中id参数是否为空（监控类别专题检索）来确定调用哪一个全文检索的接口
      if(this.props.search.HistorySearchDetail!=null&&this.props.search.HistorySearchDetail.id!=null)
      {
          // 判断当前页面为1的时候调用查询接口（由于接口存在bug，每页数据都返回的所有数据）
        if(this.props.search.index==1)
        {
          //全文检索接口2直接返回所有数据，加载下一页暂时不处理
          this.props.DoSecondSearch(this.props.search.HistorySearchDetail,this.props.search.index, this.props.size);
        }
      }else {

        this.props.DoSearch(this.props.search.SearchText,this.props.search.index, this.props.size);
      }
   }
  //  头部渲染方法，由于头部在该处没有显示的必要任何情况下都返回空View
    renderHeader() {
     return (
         <View>

         </View>
     );
   }
  //  二级查询页面点击事件方法
   secondLevelClick(lable,text,id,type)
   {
    //  复位查询结果
      this.props.ResetSearch();
      // 构建并且保存查询参数及记录
       let SearchDetail = {
           lable:lable,
           text: text,
           id:id,
           type:type
       };
      this.props.SaveSearch(SearchDetail);
      this.props.SaveSecondSearchDetail(SearchDetail);
   }
  //  单行渲染方法
     renderRow(rowData, sectionID, rowID, highlightRow) {
       if(rowData.lable!=null)//判断返回的数据是否是监测点数据，如果是监测点渲染监测点Item，如果不是渲染二次查询的Item
       {
         return(
          //  需要二级查询的ListView行组件渲染
           <TouchableOpacity onPress={()=>{
             this.secondLevelClick(rowData.lable,rowData.text,rowData.id,rowData.type);
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
       }else  if(rowData.pname!=null){
         return (
          //  不需要二次查询的ListView行组件渲染
             <TouchableOpacity onPress={() => {
                 alert('点击了')
             }} style={styles.LayoutStyle}>
                 <Image source={{
                     uri: 'type_point'
                 }} style={{
                     width: 20,
                     height: 20
                 }}/>
                 <View style={styles.SecondLayoutStyle}>
                     <View style={styles.pointLayoutStyle}>
                         <Text>{rowData.pname}</Text>
                         {/* <Image source={{
                             uri: 'focused_icon'
                         }} style={{
                             width: 10,
                             height: 10,
                             marginLeft: 10
                         }}/>
                         <Text style={{
                             fontSize: 10,
                             color: '#ADADAD'
                         }}>
                             已关注
                         </Text> */}
                     </View>
                     <View style={styles.enterpriseLayoutStyle}>
                         <Text style={{
                             fontSize: 10
                         }}>{rowData.text}</Text>

                         <Image  source={{
                             uri:rowData.tag=='废气'?
                             'zt_fq':rowData.tag=='废水'?
                             'zt_fs':rowData.tag=='环境质量'?
                             'zt_dq':rowData.tag=='水质'?
                             'zt_sz':rowData.tag=='恶臭'?
                             'zt_ec':rowData.tag=='voc'?
                             'zt_voc':rowData.tag=='小型站'?
                             'zt_xxz':rowData.tag=='扬尘'?
                             'zt_yc':'tab_home_hover'
                         }} style={{
                             width: 10,
                             height: 10,
                             marginLeft:10
                         }} />
                         <Text style={{
                             fontSize: 10,
                         }}>
                           {rowData.tag}
                         </Text>
                         <Image source={{
                             uri: 'status_'+rowData.status
                         }} style={{
                             width: 20.3,
                             height: 9,
                             marginLeft: 10
                         }}/>
                     </View>
                 </View>
             </TouchableOpacity>
         )
       }else{
         return (
           <View>
           </View>
         );
       }

    }
    // 组件渲染方法
    render() {
        return (
          <View style={{height:height}} >
            {/* 渲染第三方组件PullList，参数参见API */}
            <PullList
                 style={{}}
                 onPullRelease={this.onPullRelease.bind(this)}
                 topIndicatorRender={this.topIndicatorRender}
                 topIndicatorHeight={60}
                 renderHeader={this.renderHeader}
                 dataSource={this.props.search.ResultDataSource}
                 renderRow={this.renderRow}
                 onEndReached={this.loadMore.bind(this)}
                 onEndReachedThreshold={60}
                 enableEmptySections={true}
                 renderFooter={this.renderFooter}
                 />
            </View>
        );
    }
}
// 连接器动态导出组件
export default connect((state) => ({search: state.SearchReducers}), (dispatch) => ({
  // 第一次查询的方法
    DoSearch: (Keyword, PageIndex, PageSize) => dispatch(SearchAction.DoSearch(Keyword, PageIndex, PageSize)),
    // 复位查询记录
    ResetSearch:()=>dispatch(SearchAction.ResetSearch()),
    // 保存历史查询记录
    SaveSearch:(SearchDetail)=>dispatch(SearchAction.SaveSearch(SearchDetail)),
    // 第二次查询的方法
    DoSecondSearch:(SearchDetail,PageIndex,PageSize)=>dispatch(SearchAction.DoSecondSearch(SearchDetail,PageIndex,PageSize)),
    // 保存第二次查询的条件信息
    SaveSecondSearchDetail:(SearchDetail)=>dispatch(SearchAction.SaveSecondSearchDetail(SearchDetail))
}))(SearchResult)
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
