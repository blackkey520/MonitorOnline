/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    Platform,
    Image
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Home from './Home/Home';
import Map from './Map/Map';
import Mine from './Mine/Mine';
import Monitor from './Monitor/Monitor';
import App from './Map/MapTest'

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home'  //默认选中主页
        }
    }
    render() {
        return (
            <TabNavigator>
                {this.renderTabBarItem('首页', 'tab_home', 'tab_home_hover', 'home', '首页', Home) }
                {this.renderTabBarItem('地图', 'tab_map', 'tab_map_hover', 'map', '地图', Map) }
                {this.renderTabBarItem('监控', 'tab_jc', 'tab_jc_hover', 'monior', '监控', Monitor) }
                {this.renderTabBarItem('我的', 'tab_wo', 'tab_wo_hover', 'mine', '我的', Mine) }
            </TabNavigator>
        );
    }
    renderTabBarItem(title, icon_name, icon_name_selected, selectedTab, componentName, Component) {
        return (
            <TabNavigator.Item
                title={title}
                renderIcon={() => <Image source={{ uri: icon_name }} style={styles.iconStyle} />}
                renderSelectedIcon={() => <Image source={{ uri: icon_name_selected }} style={styles.iconStyle} />}
                selected={this.state.selectedTab === selectedTab}
                onPress={() => this.setState({ selectedTab: selectedTab }) }
                selectedTitleStyle={styles.selectedTitleStyle}
                >
                <Navigator
                    initialRoute={{ name: componentName, component: Component }}
                    ref="navigator"
                    //配置场景
                    configureScene={
                        (route) => {
                            //这个是页面之间跳转时候的动画，具体有哪些？可以看这个目录下，有源代码的: node_modules/react-native/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js
                            return Navigator.SceneConfigs.FadeAndroid;
                        }
                    }
                    renderScene={
                        (route, navigator) => {
                            let Component = route.component;
                            return <Component {...route.params} navigator={navigator} />
                        }
                    }
                    />

            </TabNavigator.Item>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    selectedTitleStyle:{
        color:'#3A84FF'
    },
    iconStyle: {
        width: Platform.OS === 'ios' ? 30 : 25,
        height: Platform.OS === 'ios' ? 30 : 25
    }
});
