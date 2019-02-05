import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import MapboxGL from '@mapbox/react-native-mapbox-gl';

export default class Map extends Component{
    render(){

        return (
            <View style={styles.container}>
                <MapboxGL.MapView
                    showUserLocation={true}
                    zoomLevel={12}
                    styleURL={'mapbox://styles/mapbox/traffic-night-v2'}
                    userTrackingMode={MapboxGL.UserTrackingModes.Follow}
                    style={{flex:1}}
                />
                <Text>

                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})