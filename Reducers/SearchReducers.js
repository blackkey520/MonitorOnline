/**
 * 查询Reducers
 * liz
 * 2016.12.19
 */


// 倒入ListView组件，供组件内State动态加载查询结果用
import {
    ListView
} from 'react-native';

// 初始化State
const initialState = {
  index:1,// 当前查询页码 number
  Searching:false,// 是否正在查询中 bool
  ResultData:[],// 查询出的结果数据 array
  SearchScene:'history',// 当前的查询场景 ‘history、result’
  SearchText:'',// 当前文本框的值 string
  HistorySearchDetail:null, // 历史查询条件信息 obj
  ResultDataSource:(new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})).cloneWithRows([]), // 查询结果DataSource
  SearchToastMessage:"",// 查询过程中所有需要返回的信息
  HistoryDataSource:(new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})).cloneWithRows([]),// 历史查询记录的DataSource
};
//state store model
export default SearchReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'ChangeSearchScene': // 更新查询场景
            return {
              ...state,
              SearchScene:action.scene
            }
        case 'ChangeSearchText': // 更改查询文本框的值
            return {
              ...state,
              SearchText:action.text
            }
        case 'SaveSecondSearchDetail':// 保存第二次查询的条件记录
            return {
              ...state,
              HistorySearchDetail:action.SecondSearchDetail
            }
        case 'ClearHistorySearch':// 清空历史查询记录
            return{
              ...state,
              HistorySearchDetail:null
            }
        case 'LoadSearchHistory':// 加载历史查询信息
            return {
              ...state,
              HistoryDataSource:state.HistoryDataSource.cloneWithRows(action.SearchHistory),
            }
        case 'ResetResult': // 保存第一次查询的结果数据到数组
            return{
              ...state,
              ResultData:[],
              Searching: false,
              SearchToastMessage:"",
              index:1,
            }

        case 'Searching'://正在查询
            return {
              ...state,
              Searching: true,
              SearchToastMessage:""
            }
        case 'SearchSuccess'://查询成功
            return {
              ...state,
              index:state.index + 1,
              ResultData:state.ResultData.concat(action.resultdata),
              SearchToastMessage:""
            }
        case 'LoadDataSource'://装载数据源
            return{
              ...state,
              ResultDataSource:state.ResultDataSource.cloneWithRows(state.ResultData),
              Searching:false,
              SearchToastMessage:"",
            }
        case 'SearchFaild'://查询失败
            return {
              ...state,
              Searching:false,
              SearchToastMessage:action.errorMessage
            }
        default:
            return state;
    }

}
