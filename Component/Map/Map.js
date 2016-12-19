/**
 * 地图场景组件
 * liz
 * 2016.12.19
 */


import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity
} from 'react-native';
/*
组件引用
*/
import SearchComponent from '../Search/SearchComponent'
import Loading from '../CommonCommponent/Loading'
import MapView from 'react-native-maps';
import Geolocation from 'Geolocation'
/*
场景参数变量
*/
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

export default class Map extends Component {
    // 构造方法
    constructor(props) {
        super(props);
        // 手机坐标状态
        this.state = {
            Coordinate: null
        };
    }
    // 组件加载完毕方法
    componentDidMount()
    {
      // 获取经纬度坐标并且更新状态
        Geolocation.getCurrentPosition((data) => {
            //this.setState({Coordinate:JSON.stringify(data)});
            this.setState({Coordinate: data});
        }, (e) => {});
    }
    // 组件渲染方法
    render() {
        // 判断坐标信息是否为空，否则渲染正在加载地图视图
        if (this.state.Coordinate != null) {
            return (
              <View style={styles.container}>
                {/* 渲染地图组件 */}
                <MapView
                  initialRegion={{
                      latitude: this.state.Coordinate.coords.latitude,
                      longitude: this.state.Coordinate.coords.longitude,
                      latitudeDelta: 0.4,
                      longitudeDelta: 0.4,

                  }}
                  showsUserLocation= {true}
                  followsUserLocation={true}
                  toolbarEnabled= {true}
                  // loadingEnabled= {true}
                  style={styles.map}
                />
                {/* 渲染全局查询组件 */}
                <View style={styles.bubble}>
                  <SearchComponent >
                  </SearchComponent>
                </View>
                {/* <View style={styles.buttonContainer}>
                  <TouchableOpacity

                    style={[styles.bubble, styles.button]}
                  >
                    <Text>Jump</Text>
                  </TouchableOpacity>
                  <TouchableOpacity

                    style={[styles.bubble, styles.button]}
                  >
                    <Text>Animate</Text>
                  </TouchableOpacity>
                </View> */}
              </View>

            );
        } else {
            return (
                // 渲染正在加载地图视图
                <Loading LoadingTitle="努力加载地图中"></Loading>
            );
        }
    }

}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.0)',
    paddingHorizontal: 2,
    paddingVertical: 20
  },
  //
  // button: {
  //   width: 80,
  //   paddingHorizontal: 12,
  //   alignItems: 'center',
  //   marginHorizontal: 10,
  // },
  // buttonContainer: {
  //   flexDirection: 'row',
  //   marginVertical: 20,
  //   backgroundColor: 'transparent',
  // },
});
