

const initialState = {
  user:null,
  isLogin:false,
  Logining:false,
  LoginMessage:null,
  LoginToastMessage:"",
};
//state store model
export default UserReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'Logining'://正在登陆
            return {
              ...state,
              Logining: true
            }
        case 'LoginSuccess'://登陆成功
            return {
              ...state,
              isLogin:true,
              Logining:false,
              user:action.user
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
