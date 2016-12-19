/**
 * 公共Toast提示组件
 * Param：
 * AutoShow=》是否自动显示 bool
 * Message=》显示信息的内容
 * position=》显示信息的位置 string=》top bottom
 * positionValue=》决定定位为止 number
 * fadeInDuration=》淡入动画时间 number
 * fadeOutDuration=》淡出动画时间 number
 * opacity=》透明度 number
 * liz
 * 2016.12.19
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
    Text,
} from 'react-native'
// 定义通用变量
export const DURATION = { LENGTH_LONG: 2000, LENGTH_SHORT: 500 };
/*
场景参数变量
*/
const {height, width} = Dimensions.get('window');

export default class Tips extends Component {
    // 构造方法
    constructor(props) {
        super(props);
        this.state = {
            isShow: false, 
            text: '',
            opacityValue: new Animated.Value(this.props.opacity),
        }
    }
    show(text, duration) {
        this.duration = duration || DURATION.LENGTH_SHORT;

        this.setState({
            isShow: true,
            text: text,
        });

        Animated.timing(
            this.state.opacityValue,
            {
                toValue: this.props.opacity,
                duration: this.props.fadeInDuration,
            }
        ).start(() => {
            this.isShow = true;
            this.close();
        });
    }

    close() {
        let delay = this.duration;

        if (!this.isShow) return;
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            Animated.timing(
                this.state.opacityValue,
                {
                    toValue: 0.0,
                    duration: this.props.fadeOutDuration,
                }
            ).start(() => {
                this.setState({
                    isShow: false,
                });
                this.isShow = false;
            });
        }, delay);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
  componentWillMount()
  {
    if(this.props.AutoShow)
    {
      this.show(this.props.Message,DURATION.LENGTH_SHORT);
    }
  }
    render() {
        let pos;
        switch (this.props.position) {
            case 'top':
                pos = this.props.positionValue;
                break;
            case 'center':
                pos = height / 2;
                break;
            case 'bottom':
                pos = height - this.props.positionValue;
                break;
        }
        let view = this.state.isShow ?
            <View
                style={[styles.container, { top: pos }]}
                pointerEvents="none"
                >
                <Animated.View
                    style={[styles.content, { opacity: this.state.opacityValue }, this.props.style]}
                    >
                    <Text style={this.props.textStyle}>{this.state.text}</Text>
                </Animated.View>
            </View> : null;
        return view;
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    content: {
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10,
    },
    text: {
        color: 'white'
    }
});

Tips.propTypes = {
    style: View.propTypes.style,
    position: React.PropTypes.oneOf([
        'top',
        'center',
        'bottom',
    ]),
    textStyle: Text.propTypes.style,
    positionValue: React.PropTypes.number,
    fadeInDuration: React.PropTypes.number,
    fadeOutDuration: React.PropTypes.number,
    opacity: React.PropTypes.number
}

Tips.defaultProps = {
    position: 'bottom',
    textStyle: styles.text,
    positionValue: 120,
    fadeInDuration: 500,
    fadeOutDuration: 500,
    opacity: 1
}
