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
    ScrollView,
    TextInput,
    TouchableOpacity
} from 'react-native';
import SearchComponent from '../SearchComponent'
import Loading from '../CommonCommponent/Loading'
import MapView from 'react-native-maps';
import Geolocation from 'Geolocation'
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Coordinate: null
        };
    }
    componentDidMount()
    {

        Geolocation.getCurrentPosition((data) => {
            //this.setState({Coordinate:JSON.stringify(data)});
            this.setState({Coordinate: data});
        }, (e) => {});
    }
    render() {
        if (this.state.Coordinate != null) {
             
            return (


              <View style={styles.container}>
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
