import { combineReducers } from 'redux'
import UserReducers from './UserReducers'

//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
  UserReducers
})

export default rootReducer
