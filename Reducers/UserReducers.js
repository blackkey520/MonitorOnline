/**
 * 用户Reducers
 * liz
 * 2016.12.19
 */

// 初始化State
const initialState = {
  user:null, //保存的用户信息 object
  isLogin:false, //当前登陆状态 bool
  Logining:false,//是否正在登陆 bool
  LoginMessage:null,//登陆时保存的登陆信息 object
  LoginToastMessage:"",//登陆过程中所有产生的提示信息 string
};

export default UserReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'Logining'://正在登陆
            return {
              ...state,
              Logining: true,
              LoginToastMessage:""
            }
        case 'LoginSuccess'://登陆成功
            return {
              ...state,
              isLogin:true,
              Logining:false,
              user:action.user,
              LoginToastMessage:""
            }
        case 'LoginFaild'://登陆失败
            return {
              ...state,
              isLogin:false,
              Logining:false,
              user:null,
              LoginToastMessage:action.errorMessage
            }
        case 'LoadingLoginMessage'://加载保存的登陆信息
          return{
            ...state,
            user:action.user,
          }
        default:
            return state;
    }

}
