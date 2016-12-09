/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
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

import ScrollableTabView from 'react-native-scrollable-tab-view';
import Home from './Home/Home';
import Map from './Map/Map';
import Mine from './Mine/Mine';
import Monitor from './Monitor/Monitor';
import CustomTabBar from '../CostomModule/CostomTabBar';

export default class Main extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    static defaultProps() {
        return {key: 'main'};
    }
    constructor(props) {
        super(props);

        this.state = {
            tabNames: ['首页', '地图', '监控', '我的'],
            tabIconNames: ['tab_home', 'tab_map', 'tab_jc', 'tab_wo'],
            tabSelectIconNames:['tab_home_hover','tab_map_hover','tab_jc_hover','tab_wo_hover']
        };
    }
    render() {
      let tabNames = this.state.tabNames;
      let tabIconNames = this.state.tabIconNames;
      let tabSelectIconNames=this.state.tabSelectIconNames;


      // if (!this.state.logined) {
      //     return <Login afterLogin={this._afterLogin}/>
      // }
        return (
          <ScrollableTabView
              // renderTabBar={() => <ScrollableTabBar/>}
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
