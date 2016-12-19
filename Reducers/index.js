/**
 * 合并Reducers的组件
 * liz
 * 2016.12.19
 */

 /**
  * 倒入系统内所有的Reducers
  */
import { combineReducers } from 'redux'
import UserReducers from './UserReducers'
import SearchReducers from './SearchReducers'
//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
  UserReducers,
  SearchReducers
})
export default rootReducer
