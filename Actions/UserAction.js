import HTTPUtil from '../Common/HTTPUtil'
import config from '../Config/globalConfig'
import {

    AsyncStorage,

} from 'react-native';
export const Logout = (loginmessage)=>{
  return dispatch => {
    AsyncStorage.removeItem('user');
    loginmessage.isLogin=false;
    AsyncStorage.setItem('loginmessage', JSON.stringify(loginmessage))
        .then(
            ()=> {
            }
        )
        .catch((err)=> {
            alert(err);
        });
  }
}

export const Login = (loginmessage) => {

    return dispatch => {
      if(loginmessage.userName==""||loginmessage.passWord=="")
      {
          dispatch(LoginFaild('用户名密码不能为空'));
          return;
      }

      loginmessage.isLogin=false;
        dispatch(Logining());
        //构建参数对象
        let body = {
            userName: loginmessage.userName,
            passWord: loginmessage.passWord
        };
        let url = config.api.base + config.api.login;

        HTTPUtil.urlpost(url, body).then((data) => {


            //处理 请求success
            if (data && data.requstresult==1) {
              //登陆成功则记录登陆人的对象
              AsyncStorage.setItem('user', JSON.stringify(data))
                  .then(
                      ()=> {
                      }
                  )
                  .catch((err)=> {
                      alert(err);
                  });
                  loginmessage.isLogin=true;
                dispatch(LoginSuccess(data.data));

            } else {
                dispatch(LoginFaild('登陆失败'));
            }
        }, (json) => {

            dispatch(LoginFaild('登陆异常'));

        })

              //保存登陆页面信息
              AsyncStorage.setItem('loginmessage', JSON.stringify(loginmessage))
                  .then(
                      ()=> {
                      }
                  )
                  .catch((err)=> {
                      alert(err);
                  });
    }
}
export const LoadLoginMessage = () => {
    return dispatch => {

        let user;
        //获取用户信息
        AsyncStorage.getItem('user').then((data) => {
            if (data) {
                user = JSON.parse(data);
                dispatch(LoadingLoginMessage(user));
            }
        }).catch((err) => {
            alert(err);
        });


    }
}
const LoadingLoginMessage = (user) => ({type: 'LoadingLoginMessage', user: user})
const LoginSuccess = (user) => ({type: 'LoginSuccess', user: user})
const LoginFaild = (errorMessage) => ({type: 'LoginFaild',errorMessage:errorMessage})
const Logining = () => ({type: 'Logining'})
