
/**
 * 搜索Action
 * liz
 * 2016.12.19
 */


 /**
  * 倒入公用操作库们
  */
import HTTPUtil from '../Common/HTTPUtil'
import config from '../Config/globalConfig'
import {AsyncStorage} from 'react-native';


/**
 * 加载搜索历史搜索纪录
 */
export const LoadStorage=()=>{
  return dispatch=>{
      // 读取历史搜索记录
      AsyncStorage.getItem('searchHisory').then((data) => {
          var sHistory=[];
          if (data) {
            sHistory=JSON.parse(data);;
          }
          // dispatch历史记录
          dispatch(LoadSearchHistory(sHistory));
        }).catch((err) => {
            alert(err);
        });
  }
}
/**
 * 保存搜索历史记录
 * @param SearchDetail {}
 */
export const SaveSearch= (SearchDetail)=>{
  return dispatch=>{
    // 获取所有历史记录
    AsyncStorage.getItem('searchHisory').then((data) => {
        var sHistory=[];
        if (data) {
          sHistory=JSON.parse(data);;
        }
        // 循环寻找相同的历史记录如果找到的话移除
        for(var i=0;i<sHistory.length;i++)
        {
          if(sHistory[i].text==SearchDetail.text&&sHistory[i].lable==SearchDetail.lable)
          {
            sHistory.splice(i,1);
          }
        }
        // 判断当前历史记录存储，如果超过十条则移除第一条
        if(sHistory.length>10)
        {
          sHistory.splice(0,1);
        }
        // 把新的查询记录push进数组
        sHistory.push(SearchDetail);
        // dispatch新的历史记录
        dispatch(LoadSearchHistory(sHistory));
        // 保存历史记录
        AsyncStorage.setItem('searchHisory', JSON.stringify(sHistory)).then(() => {

        }).catch((err) => {
            alert(err);
        });
    }).catch((err) => {
        alert(err);
    });

  }
}
/**
 * 第二次调用的全文检索方法
 * @param SearchDetail {}
 * @param PageIndex
 * @param PageSize
 */
export const DoSecondSearch = (SearchDetail,PageIndex,PageSize)=>{

  return dispatch=>{
    // dispatch正在搜索
        dispatch(Searching());
        // 取出登陆的用户信息
        AsyncStorage.getItem('user').then((data) => {
            if (data) {
                user = JSON.parse(data);
                // 构建第二次查询结果的实体
                let body = {
                    authorCode: user.User_ID,
                    id: SearchDetail.id,
                    DGIMN:'',
                    type:SearchDetail.type,
                    PageIndex: PageIndex,
                    PageSize: PageSize
                };
                let url = config.api.base + config.api.secondSearch;
                // 请求WebApi拿数据
                HTTPUtil.get(url, body).then((data) => {
                    //处理 请求success
                    if (data && data.requstresult == 1) {
                        // dispatch返回的数据并且装载DataSource
                        dispatch(SearchSuccess(data.data));
                        dispatch(LoadDataSource());
                    } else {
                        // dispatch查询错误并且返回错误详情
                        dispatch(SearchFaild(data.reason));
                    }
                }, (json) => {
                    dispatch(SearchFaild(data.reason));
                })

            }
        }).catch((err) => {
            alert(err);
        });
  }
}
/**
 * 第一次调用的全文检索方法
 * @param Keyword
 * @param PageIndex
 * @param PageSize
 */
export const DoSearch = (Keyword, PageIndex, PageSize) => {

    return dispatch => {
      // dispatch正在搜索
        dispatch(Searching());
        // 取出登陆的用户信息
        AsyncStorage.getItem('user').then((data) => {
            if (data) {
              // 构建第一次全文检索的参数实体
                user = JSON.parse(data);
                let body = {
                    authorCode: user.User_ID,
                    text: Keyword,
                    PageIndex: PageIndex,
                    PageSize: PageSize
                };
                let url = config.api.base + config.api.search;
                // 请求Webapi获取数据
                HTTPUtil.get(url, body).then((data) => {
                    //处理
                    if (data && data.requstresult == 1) {
                        // dispatch返回的数据并且装载DataSource
                        dispatch(SearchSuccess(data.data));
                        dispatch(LoadDataSource());
                    } else {
                      // dispatch查询错误并且返回错误详情
                        dispatch(SearchFaild(data.reason));
                    }
                }, (json) => {
                    dispatch(SearchFaild(data.reason));
                })

            }
        }).catch((err) => {
            alert(err);
        });

    }
}
/**
 * 复位查询
 */
export const ResetSearch = () => {
    return dispatch => {
      //  清空查询结果并且装载DataSource
        dispatch(ResetResult());
        dispatch(LoadDataSource());
    };
}
/**
 * 清空历史查询结果
 */
export const ClearHistory = () =>  {
  return dispatch=>{
    // 从存储中移除所有历史查询结果，并且dispatch加载历史记录更新Reducers中的状态
    AsyncStorage.removeItem('searchHisory');
    dispatch(LoadSearchHistory([]));
  }
}
/**
 * 修改查询文本框中显示的文字
 * @param text
 */
export const ChangeSearchText = (text) =>({type:'ChangeSearchText',text:text});
/**
 * 切换查询组件的场景
 * @param scene
 */
export const ChangeSearchScene = (scene)=>({type:'ChangeSearchScene',scene:scene});
/**
 * 保存历史查询条件记录
 * @param SecondSearchDetail {}
 */
export const SaveSecondSearchDetail= (SecondSearchDetail)=>({type:'SaveSecondSearchDetail',SecondSearchDetail:SecondSearchDetail})
/**
 * 清空历史查询条件记录
 */
export const ClearHistorySearch = ()=>({type:'ClearHistorySearch'});
/**
 * 清空查询结果
 */
const ResetResult = () => ({type: 'ResetResult'})
/**
 * 把查询结果装载进入结果的DataSrouce
 */
const LoadDataSource = () => ({type: 'LoadDataSource'})
/**
 * 查询成功
 * @param resultdata {}
 */
const SearchSuccess = (resultdata) => ({type: 'SearchSuccess', resultdata: resultdata})
/**
 * 查询失败
 * @param errorMessage
 */
const SearchFaild = (errorMessage) => ({type: 'SearchFaild', errorMessage: errorMessage})
/**
 * 正在查询
 */
const Searching = () => ({type: 'Searching'})
/**
 * 装载历史查询记录到历史查询DataSource
 * @param SearchHistory[]
 */
const LoadSearchHistory = (SearchHistory)=>({type:'LoadSearchHistory',SearchHistory:SearchHistory})
