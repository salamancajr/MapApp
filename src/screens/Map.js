import React, {Component} from "react";
import {fetchVenueImage, getRestaurants, getRestaurantInfo, saveInFirebase, getPinnedImages} from "../store/actions"
import {View, Text, Image, StyleSheet, Animated, Dimensions, TouchableOpacity, Platform, Linking, TouchableWithoutFeedback} from "react-native";
import Mapbox from '@mapbox/react-native-mapbox-gl';
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-picker";
import accessToken from "../utils/accessToken";
Mapbox.setAccessToken(accessToken);
console.disableYellowBox = true;

class Map extends Component{

    state={
        translateY:new Animated.Value(Dimensions.get("screen").height*.5),
        icon:"https://images.unsplash.com/photo-1549584888-9c65c19ac032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
        image:"https://images.unsplash.com/photo-1549584888-9c65c19ac032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
        name:"",
        coordinates:"",
        rating:"",
        cameraImage:""
    }
    email = "";

    componentDidMount(){
        this.props.getRestaurants()
        let email = this.props.navigation.getParam("email")
        this.email = email.split("@")[0];
        this.props.getPinnedImages(email.split("@")[0])

    }



    handlePress = (restaurant) => {
        let {icon, image, name, placeId, lat, lng, rating} = restaurant;

        this.setState({icon})
       this.props.getRestaurantInfo(placeId, ()=>{
            Animated.timing(this.state.translateY, {
                duration:500,
                toValue:0.1
            }).start()
        })
        console.ignoredYellowBox = ['Warning:'];
        this.props.fetchVenueImage(image, imageResponse=>this.setState({image:imageResponse.url, name, rating, coordinates:{lat, lng}}))

    }
    handleClose = () => (
        Animated.timing(this.state.translateY, {
            duration:500,
            toValue:Dimensions.get("screen").height*.5
        }).start()
    )

    renderAnnotations () {
        return(
            this.props.restaurants&&
            this.props.restaurants.map(restaurant=>{
                return (
                    <TouchableOpacity
                        key={restaurant.placeId}
                        onPress={()=>this.handlePress(restaurant)}>
                        <Mapbox.PointAnnotation
                            id={restaurant.name}
                            coordinate={[restaurant.lng, restaurant.lat]}>
                            <View style={styles.venueMarker}>
                                <Icon name="ios-restaurant" size={20}
                                color="blue"/>
                            </View>
                        </Mapbox.PointAnnotation>
                    </TouchableOpacity>
                )
            })
        )
    }


      renderPinnedImages () {

        return(
            this.props.pinnedImages.length?this.props.pinnedImages.map(pinnedImage=>{

            return (
                <Mapbox.PointAnnotation
                    key={pinnedImage.id}
                    id='pointAnnotation'
                    coordinate={[pinnedImage.coordinates.longitude, pinnedImage.coordinates.latitude]}>
                    <Image source={{uri:pinnedImage.image}} style={styles.pinnedImages}/>
                </Mapbox.PointAnnotation>

            )
        }):null)
    }

    linkToDirections = () => {
        let {lat, lng } = this.state.coordinates;

        if(Platform.OS=="ios"){
            Linking.openURL(`maps://app?daddr=${lat},${lng}&dirflg=r`)
        }
        else{
        Linking.openURL(`google.navigation:q=${lat},${lng}&mode=transit`)
        }

    }

    takePhoto = () => {
        ImagePicker.showImagePicker({title:"Select", maxHeight:180, maxWidth:200}, (res)=>{
            if(res.error){
                alert("Something wrong happened")
            }
            else{
                this.setState({cameraImage:res.uri})
                navigator.geolocation.getCurrentPosition(pos => {
                    let {latitude, longitude} = pos.coords;
                    console.log(latitude, longitude );

                    this.props.saveInFirebase(res, this.email, {latitude, longitude}, ()=>this.props.getPinnedImages(this.email))
                })
            }
        })
    }
    render(){

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.handleClose}>
                    <Mapbox.MapView
                        styleURL={'mapbox://styles/mapbox/traffic-night-v2'}
                        zoomLevel={11}
                        centerCoordinate={[-73.935242, 40.730610]}
                        style={styles.container}>
                        {this.renderAnnotations()}
                        {this.renderPinnedImages()}
                    </Mapbox.MapView>
                </TouchableWithoutFeedback>
                <View
                    style={{backgroundColor:"red"}}
                    coordinate={[-73.935242, 40.730610]}>
                </View>
                <Animated.View
                    style={[
                        styles.slider,
                        {transform:[{translateY:this.state.translateY}]}
                    ]}>
                    <Image
                        source={{uri:this.state.icon}}
                        style={styles.sliderIcon}/>
                    <View style={styles.sliderContentContainer}>
                    <View style={{justifyContent:"space-around"}}>
                        <Text style={{color:"white", fontSize:20}}>
                            {this.state.name}
                        </Text>
                        <Text style={styles.sliderContentText}>
                            Rating: {this.state.rating}
                        </Text>
                        <TouchableOpacity onPress={this.linkToDirections}>
                        <Text style={styles.sliderContentText}>
                        Click here for directions
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <Image source={{uri:this.state.image}} style={{width:100, height:80, borderRadius:10}}/>

                    </View>
                    <Text style={styles.reviewText}>
                        {this.props.selectedRestaurant.result&&this.props.selectedRestaurant.result.reviews[0].text}
                    </Text>

                </Animated.View>
                <TouchableOpacity
                    onPress={this.takePhoto}
                    style={styles.cameraButton}>
                    <Icon
                        name="md-camera"
                        size={40}
                        color="blue"
                        />
                </TouchableOpacity>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    venueMarker:{
        width:30,
        height:30,
        borderWidth:1,
        borderColor:"blue",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:50,
        backgroundColor:"white"
    },
    cameraButton:{
        position:"absolute",
        top:10,
        right:10,
        borderRadius:50,
        width:60,
        height:60,
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center"
    },
    reviewText:{
        width:"90%",
        color:"white",
        alignSelf:"center"
    },
    sliderContentText:{
        color:"white",
        fontSize:17
    },
    sliderContentContainer:{
        width:"90%",
        alignSelf:"center",
        flexDirection:"row",
        justifyContent:"space-around",
        alignContent:"center",
        borderRadius:10,
        borderWidth:2,
        borderColor:"white",
        marginTop:45,
        marginBottom:15,
        paddingVertical:15
    },
    sliderIcon:{
        width:30,
        height:30,
        position:"absolute",
        left:"50%",
        top:5,
        transform:[{translateX:-15}]
    },
    slider:{
        height:"50%",
        position:"absolute",
        top:"50%",
        width:"100%",
        backgroundColor:"black",
        borderTopWidth:2,
        borderTopColor:"grey"
    },
    pinnedImages:{
        width:80,
        height:80,
        borderWidth:1,
        borderColor:"blue",
        borderRadius:40
    }
})

const mapStateToProps = (state) => {
    let restaurants = state.restaurants&&state.restaurants.map(restaurant=>{
        return {
            ...restaurant.geometry.location, placeId:restaurant.place_id,
            icon:restaurant.icon,
            image:restaurant.photos[0].photo_reference,
            rating:restaurant.rating,
            name:restaurant.name
        }
    })


    return {
        pinnedImages:state.pinnedImages,
        restaurants,
        selectedRestaurant:state.selectedRestaurant
    }
}

export default connect (mapStateToProps, {getRestaurants, getRestaurantInfo, saveInFirebase, getPinnedImages, fetchVenueImage})(Map)