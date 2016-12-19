/**
 * 自定义首页选项卡切换TabBar
 * liz
 * 2016.12.19
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Platform
} from 'react-native';


export default class CustomTabBar extends Component {
    static propTypes = {
        goToPage: React.PropTypes.func, // 跳转到对应tab的方法
        activeTab: React.PropTypes.number, // 当前被选中的tab下标
        tabs: React.PropTypes.array, // 所有tabs集合
        tabNames: React.PropTypes.array, // 保存Tab名称
        tabIconNames: React.PropTypes.array, // 保存Tab图标
        tabSelectIconNames:React.PropTypes.array
    };  // 注意这里有分号

    // 组件渲染方法
    render() {
        return (
            <View style={styles.tabs}>
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
            </View>
        );
    }
    // 组件渲染完毕方法
    componentDidMount() {
        // Animated.Value监听范围 [0, tab数量-1]
        this.props.scrollValue.addListener(this.setAnimationValue);
    }
    // 设置动画数值回调函数
    setAnimationValue({value}) {

    }

    // 渲染Tab项方法
    renderTabOption(tab, i) {
        let color = this.props.activeTab == i ? "#3A84FF" : "#ADADAD"; // 判断i是否是当前选中的tab，设置不同的颜色
        let imgsource=this.props.activeTab==i?this.props.tabSelectIconNames[i]:this.props.tabIconNames[i]; //根据选定方式确定图片路径
        return (
            <TouchableOpacity onPress={()=>this.props.goToPage(i)} style={styles.tab} key={tab}>
                <View style={styles.tabItem}>
                  <Image source={{uri:imgsource}} style={styles.iconStyle}/>
                    <Text style={{color: color}}>
                        {this.props.tabNames[i]}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }


}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        height: 50,
    },

    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
    },

    iconStyle: {
        width: Platform.OS === 'ios'
            ? 30
            : 25,
        height: Platform.OS === 'ios'
            ? 30
            : 25
    }
});
