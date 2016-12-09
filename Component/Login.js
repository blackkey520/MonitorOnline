/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
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

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userActions from '../Actions/UserAction'
import Main from './Main';
import Loading from './Common/Loading'
import Tips, {DURATION}  from './Common/Tips'



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

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            passWord: '',
            autoLogin: false,
            isReminber: false
        };
    }

    componentWillMount(){
      this.props.LoadLoginMessage();
    }
    componentDidMount(){
      AsyncStorage.getItem('loginmessage').then((data) => {
          if (data) {

              loginmessage = JSON.parse(data);
              if(loginmessage.isLogin)
              {
                //跳转主页面
                this.context.router.push('/main')
              }else {

                if(loginmessage.isReminber)
                {
                  this.setState({
                    userName: loginmessage.userName,
                    passWord: loginmessage.passWord,
                    autoLogin: loginmessage.autoLogin,
                    isReminber: loginmessage.autoLogin
                  });
                  if(loginmessage.autoLogin)
                  {
                    this.props.Login(loginmessage)
                  }
                }

              }
          }
      }).catch((err) => {
          alert(err);
      });


    }
    componentDidUpdate(){

      if(this.props.user.isLogin)
      {
        this.context.router.push('/main')
      }
    }
    render() {

        if (this.props.user.Logining) {
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
    Login: (loginmessage) => dispatch(userActions.Login(loginmessage)),
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
        width: 380,
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
