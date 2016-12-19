
/**
 * 用户Action
 * liz
 * 2016.12.19
 */

// 全局网络访问帮助方法集
import HTTPUtil from '../Common/HTTPUtil'
// 全局网络访问Url信息
import config from '../Config/globalConfig'
// 移动存储操作
import {

    AsyncStorage,

} from 'react-native';
/**
 * 登出方法
 * @param loginmessage {}
 */
export const Logout = (loginmessage)=>{
  return dispatch => {
    // 移除存储的用户信息
    AsyncStorage.removeItem('user');
    loginmessage.isLogin=false;
    // 保存登陆信息
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
/**
 * 登陆方法
 * @param loginmessage {}
 */
export const Login = (loginmessage) => {

    return dispatch => {
      // 判断用户名是否存在，否则dispatch登陆失败，并且给出失败原因
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
        // 执行网络请求
        HTTPUtil.urlpost(url, body).then((data) => {

            //处理 请求success
            if (data && data.requstresult==1) {
              //登陆成功则记录登陆人的对象
              AsyncStorage.setItem('user', JSON.stringify(data.data))
                  .then(
                      ()=> {
                      }
                  )
                  .catch((err)=> {
                      alert(err);
                  });
                  loginmessage.isLogin=true;
                  // dispatch返回的结果
                dispatch(LoginSuccess(data.data));

            } else {
              // dispatch错误的原因
                dispatch(LoginFaild(data.reason));
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
/**
 * 从内部存储加载登陆信息
 */
export const LoadLoginMessage = () => {
    return dispatch => {
        let user;
        //获取用户信息
        AsyncStorage.getItem('user').then((data) => {
            if (data) {
                user = JSON.parse(data);
                // 更新内部存储的用户信息
                dispatch(LoadingLoginMessage(user));
            }
        }).catch((err) => {
            alert(err);
        });


    }
}
/**
 * 加载登陆用户信息
 * @param user {}
 */
const LoadingLoginMessage = (user) => ({type: 'LoadingLoginMessage', user: user})
/**
 * 加载登陆用户信息
 * @param user {}
 */
const LoginSuccess = (user) => ({type: 'LoginSuccess', user: user})
/**
 * 登陆失败
 * @param errorMessage
 */
const LoginFaild = (errorMessage) => ({type: 'LoginFaild',errorMessage:errorMessage})
/**
 * 正在登陆
 */
const Logining = () => ({type: 'Logining'})
