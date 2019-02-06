import React, {Component} from "react";
import {getRestaurants, getRestaurantInfo} from "../store/actions"
import {View, Text, Image, StyleSheet, Animated, Dimensions, TouchableOpacity} from "react-native";
import Mapbox from '@mapbox/react-native-mapbox-gl';
import {connect} from "react-redux";

class Map extends Component{

    state={
        translateY:new Animated.Value(Dimensions.get("screen").height*.5),
        icon:"",
        image:""
    }

    componentDidMount(){
       this.props.getRestaurants()
    }

    handlePress = (placeId, icon, image) => {
        console.log('image', icon);

        this.setState({icon})
       this.props.getRestaurantInfo(placeId, ()=>{
            Animated.timing(this.state.translateY, {
                duration:500,
                toValue:0.1
            }).start()
        })
    }
    handleClose = () => (
        Animated.timing(this.state.translateY, {
            duration:500,
            toValue:Dimensions.get("screen").height*.5
        }).start()
    )

    renderAnnotations () {
        return(
            this.props.restaurants&&this.props.restaurants.map(restaurant=>{
                console.log('rest', restaurant);

            return (
                <TouchableOpacity
                    key={restaurant.placeId}
                    onPress={()=>this.handlePress(restaurant.placeId, restaurant.icon, restaurant.image)}>
                    <Mapbox.PointAnnotation
                        id='pointAnnotation'
                        coordinate={[restaurant.lng, restaurant.lat]}>
                            <View style={styles.annotationContainer}>
                                <View style={styles.annotationFill} />
                            </View>
                        <Mapbox.Callout title='Look! An annotation!' />
                    </Mapbox.PointAnnotation>
                </TouchableOpacity>
            )
        }))


      }
    render(){

        return (
            <View style={styles.container}>
                <Mapbox.MapView
                    styleURL={'mapbox://styles/mapbox/traffic-night-v2'}
                    zoomLevel={11}
                    centerCoordinate={[-73.935242, 40.730610]}
                    style={styles.container}>
                    {this.renderAnnotations()}
                </Mapbox.MapView>
                <Animated.View style={{height:"50%", position:"absolute", top:"50%", width:"100%", backgroundColor:"black", borderTopWidth:2, borderTopColor:"grey",  transform:[{translateY:this.state.translateY}]}}>
                <TouchableOpacity onPress={this.handleClose}>
                    <Text style={{color:"white", fontSize:20}}>
                        &times;
                    </Text>
                    <Image source={{uri:this.state.icon}} style={{width:50, height:50}}/>
                    <Image source={{uri:this.state.image}} style={{width:50, height:50}}/>
                    <Text style={{width:"90%",color:"white", alignSelf:"center"}}>
                        {this.props.selectedRestaurant.result&&this.props.selectedRestaurant.result.reviews[0].text}
                    </Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    annotationContainer: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
      },
      annotationFill: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'orange',
        transform: [{ scale: 0.6 }],
      }
})

const mapStateToProps = (state) => {


    let restaurants = state.restaurants&&state.restaurants.map(restaurant=>{
        return {
            ...restaurant.geometry.location, placeId:restaurant.place_id,
            icon:restaurant.icon,
            image:restaurant.photos[0].photoReference
        }
    })


    return {

        restaurants,
        selectedRestaurant:state.selectedRestaurant
    }
}

export default connect (mapStateToProps, {getRestaurants, getRestaurantInfo})(Map)