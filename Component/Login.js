/**
 * 登陆场景
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
    TextInput,
    TouchableOpacity,
    Button,
    AsyncStorage
} from 'react-native';
/*
redux相关引用
*/
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userActions from '../Actions/UserAction'
/*
组件引用
*/
import Main from './Main';
import Loading from './Common/Loading'
import Tips, {DURATION}  from './Common/Tips'
/*
场景参数变量
*/
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');


class Login extends Component {

    //上下文属性校验（确保属性合法，如果产生不合法的属性信息便于调试）
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    static propTypes = {
        Login: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    };
    // 路由属性，识别页面
    static defaultProps() {
        return {key: 'login'};
    }
    // 构造方法
    constructor(props) {
        super(props);
        // 组件内部State记录登陆信息
        this.state = {
            userName: '',
            passWord: '',
            autoLogin: false,
            isReminber: false
        };
    }
    // 组件即将渲染方法
    componentWillMount(){
      // 加载登陆信息
      this.props.LoadLoginMessage();
    }
    // 组件渲染完毕方法
    componentDidMount(){
      // 从本地存储获取登陆信息
      AsyncStorage.getItem('loginmessage').then((data) => {
          if (data) {
              loginmessage = JSON.parse(data);
              // 判断当前登陆状态
              if(loginmessage.isLogin)
              {
                //跳转主页面
                this.context.router.push('/main?anim=pushFromRight')
              }else {
                // 判断记住我的选项是否勾选
                if(loginmessage.isReminber)
                {
                  // 为组件内State赋值
                  this.setState({
                    userName: loginmessage.userName,
                    passWord: loginmessage.passWord,
                    autoLogin: loginmessage.autoLogin,
                    isReminber: loginmessage.autoLogin
                  });
                  // 如果勾选自动登陆
                  if(loginmessage.autoLogin)
                  {
                    // 调用登陆方法
                    this.props.Login(loginmessage)
                  }
                }

              }
          }
      }).catch((err) => {
          alert(err);
      });


    }
    // 组件即将重新渲染触发方法
    componentDidUpdate(){
      // 判断当前是否为登陆状态
      if(this.props.user.isLogin)
      {
        // 向主页跳转
        this.context.router.push('/main?anim=pushFromRight')
      }
    }
    // 组件渲染方法
    render() {
      // 判断当前是否正在登陆
        if (this.props.user.Logining) {
            // 渲染正在登陆Loading视图
             return (<Loading Message="正在登陆..."/>)

        } else {
            return (

                <View style={styles.LoginLayout}>

                    <Image source={{
                        uri: 'bg_login'
                    }} style={styles.launchImageStyle}/>
                    <View style={styles.LoginForm}>

                        <Image source={{
                            uri: 'bg_logo'
                        }} style={{
                            height: 30,
                            width: 80,
                            marginBottom: 20
                        }}/>

                        <Text style={{
                            fontSize: 25,
                            width: 270,
                            color: 'white',
                            marginBottom: 50
                        }}>智能环境综合监控系统</Text>

                        <View style={[
                            styles.TextInputStyle, {
                                marginBottom: 10
                            }
                        ]}>
                            <Image source={{
                                uri: 'ueser_icon'
                            }} style={{
                                width: 20,
                                height: 20,
                                marginBottom: 8
                            }}/>
                            <TextInput  keyboardType={'default'} clearTextOnFocus={true} placeholderTextColor='white' placeholder='请输入用户名' autoCapitalize={'none'} autoCorrect={false} onChangeText={(text) => {
                              // 动态更新组件内State记录用户名
                                this.setState({userName: text});
                            }}
                            value={this.state.userName}
                            style={{
                                width: width - 120,
                                marginLeft: 10,
                                marginBottom: 8,
                                color: 'white'
                            }}/>
                        </View>
                        <View style={[
                            styles.TextInputStyle, {
                                marginBottom: 20
                            }
                        ]}>
                            <Image source={{
                                uri: 'password_icon'
                            }} style={{
                                width: 20,
                                height: 20,
                                marginBottom: 8
                            }}/>
                            <TextInput clearTextOnFocus={true} keyboardType={'default'} placeholderTextColor='white' placeholder='请输入密码' autoCapitalize={'none'} autoCorrect={false} password={true} onChangeText={(text) => {
                              // 动态更新组件内State记录密码
                                this.setState({passWord: text});
                            }}
                            value={this.state.passWord}
                            style={{
                                width: width - 120,
                                marginLeft: 10,
                                marginBottom: 8,
                                color: 'white'
                            }}/>
                        </View>
                        <View style={styles.checkStyle}>
                            <TouchableOpacity style={styles.checkStyleDetail} onPress={() => {
                              // 动态更新组件内State记录记住我
                                this.setState({
                                    isReminber: this.state.isReminber
                                        ? false
                                        : true
                                });
                            }}>
                                <Image source={{
                                    uri: this.state.isReminber
                                        ? 'checkbox_on'
                                        : 'checkbox_off'
                                }} style={{
                                    width: 12,
                                    height: 12
                                }}/>
                                <Text style={{
                                    fontSize: 11,
                                    color: 'white',
                                    marginLeft: 3
                                }}>记住密码</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.checkStyleDetail} onPress={() => {
                              // 动态更新组件内State记录是否自动登陆
                                this.setState({
                                    autoLogin: this.state.autoLogin
                                        ? false
                                        : true
                                });
                            }}>
                                <Image source={{
                                    uri: this.state.autoLogin
                                        ? 'checkbox_on'
                                        : 'checkbox_off'
                                }} style={{
                                    width: 12,
                                    height: 12
                                }}/>
                                <Text style={{
                                    fontSize: 11,
                                    color: 'white',
                                    marginLeft: 3
                                }}>自动登陆</Text>
                            </TouchableOpacity>
                        </View>
                        <View >

                            <TouchableOpacity onPress={() =>
                              // 调用登陆方法
                              this.props.Login(this.state)
                            } style={styles.ButtonStyle}>
                                <Text style={{
                                    fontSize: 15,
                                    color: 'white'
                                }}>
                                    登  陆
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    {
                        //  判断Reducer中全局存储的返回信息渲染Tip视图
                         this.props.user.LoginToastMessage!=""
                         ?<Tips
                           AutoShow={true}
                          Message={this.props.user.LoginToastMessage}
                          // position='top'
                          positionValue={200}
                          fadeInDuration={150}
                          fadeOutDuration={200}
                          opacity={0.8}
                           />
                        :null
                    }

                </View>

            );
        }
    }
}

//使用连接器链接action 与 reducer中的state
export default connect((state) => ({user: state.UserReducers}), (dispatch) => ({
  // 登陆方法
    Login: (loginmessage) => dispatch(userActions.Login(loginmessage)),
    // 加载登陆信息方法
    LoadLoginMessage: () => dispatch(userActions.LoadLoginMessage())
}))(Login)

const styles = StyleSheet.create({
    ButtonStyle: {
        backgroundColor: '#05B1E3',
        width: 280,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    checkStyleDetail: {
        flexDirection: 'row'
    },
    LoginForm: {
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.0)',
        paddingHorizontal: 0,
        paddingVertical: 150,
        width: width,
        height: 700,
        ...StyleSheet.absoluteFillObject
    },
    TextInputStyle: {
        flexDirection: 'row',
        width: width - 100,
        borderBottomWidth: 0.5,
        borderBottomColor: 'white'
    },
    checkStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width - 100,
        marginBottom: 20
    },
    launchImageStyle: {
        flex: 1,
        resizeMode: 'cover'
    },
    LoginLayout: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        ...StyleSheet.absoluteFillObject
    }
});
