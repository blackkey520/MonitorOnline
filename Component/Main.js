/**
 * 主页Tab选项卡场景
 * liz
 * 2016.12.19
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    Platform,
    Image
} from 'react-native';
/*
第三方组件引用
*/
import ScrollableTabView from 'react-native-scrollable-tab-view';
/*
组件引用
*/
import Home from './Home/Home';
import Map from './Map/Map';
import Mine from './Mine/Mine';
import Monitor from './Monitor/Monitor';
import CustomTabBar from '../CostomModule/CostomTabBar';

export default class Main extends Component {
    // 路由必须参数
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    // 路由标识
    static defaultProps() {
        return {key: 'main'};
    }
    // 构造函数
    constructor(props) {
        super(props);
        // 组件内state记录动态切换的场景名称和默认的、点击后的图片路径
        this.state = {
            tabNames: ['首页', '地图', '监控', '我的'],
            tabIconNames: ['tab_home', 'tab_map', 'tab_jc', 'tab_wo'],
            tabSelectIconNames:['tab_home_hover','tab_map_hover','tab_jc_hover','tab_wo_hover']
        };
    }
    // 组件渲染方法
    render() {
      let tabNames = this.state.tabNames;
      let tabIconNames = this.state.tabIconNames;
      let tabSelectIconNames=this.state.tabSelectIconNames;


      // if (!this.state.logined) {
      //     return <Login afterLogin={this._afterLogin}/>
      // }
        return (
          <ScrollableTabView
              // 指定单个选项卡的渲染组件
              renderTabBar={() => <CustomTabBar tabNames={tabNames} tabSelectIconNames={tabSelectIconNames} tabIconNames={tabIconNames}/>}
              tabBarPosition='bottom'
              onChangeTab={
                  (obj) => {
                      console.log('被选中的tab下标：' + obj.i);
                  }
              }
              onScroll={
                  (position) => {
                      console.log('滑动时的位置：' + position);
                  }
              }
              locked={true}
              initialPage={0}
              prerenderingSiblingsNumber={1}
          >
            <Home tabLabel="首页"/>
            <Map tabLabel="地图"/>
            <Monitor tabLabel="监控"/>
            <Mine tabLabel="我的"/>
          </ScrollableTabView>

        );
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },

});
