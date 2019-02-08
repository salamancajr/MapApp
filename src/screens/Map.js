import React, {Component} from "react";
import {getRestaurants, getRestaurantInfo, saveInFirebase, getPinnedImages} from "../store/actions"
import {View, Text, Image, StyleSheet, Animated, Dimensions, Button, TouchableOpacity, Platform, Linking} from "react-native";
import Mapbox from '@mapbox/react-native-mapbox-gl';
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import API_KEY from "../utils/apiKey";
import ImagePicker from "react-native-image-picker";
Mapbox.setAccessToken('pk.eyJ1IjoiZ2Vvcmdlc2pyIiwiYSI6ImNqcnJmYWN5ODF6YTU0NWw5NGZncDg2azgifQ.L1BZceO57uXG5DfzB_LZ-w');





class Map extends Component{

    state={
        translateY:new Animated.Value(Dimensions.get("screen").height*.5),
        icon:"",
        image:"",
        name:"",
        coordinates:"",
        rating:"",
        cameraImage:""
    }

    componentDidMount(){
            this.props.getPinnedImages()

       this.props.getRestaurants()
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


        fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${image}&key=${API_KEY}`).then((image)=>{
            console.log('image', image);

        return this.setState({image:image.url, name, rating, coordinates:{lat, lng}})})
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

            return (
                <TouchableOpacity
                    key={restaurant.placeId}
                    onPress={()=>this.handlePress(restaurant)}>
                    <Mapbox.PointAnnotation
                        id='pointAnnotation'
                        coordinate={[restaurant.lng, restaurant.lat]}>
                            {/* <View style={styles.annotationContainer}>
                                <View style={styles.annotationFill} />
                            </View> */}
                            <View style={{width:40, height:40, justifyContent:"center", alignItems:"center", borderRadius:50, backgroundColor:"white"}}>
                            <Icon name="ios-restaurant" size={30}
                            color="blue"/>
                            </View>
                        <Mapbox.Callout title='Look! An annotation!' />
                    </Mapbox.PointAnnotation>
                </TouchableOpacity>
            )
        }))


      }


      renderPinnedImages () {
        return(
            this.props.pinnedImages&&this.props.pinnedImages.map(pinnedImage=>{

            return (

                    <Mapbox.PointAnnotation
                        key={pinnedImage.id}
                        id='pointAnnotation'
                        coordinate={[pinnedImage.coordinates.longitude, pinnedImage.coordinates.latitude]}>
                            {/* <View style={styles.annotationContainer}>
                                <View style={styles.annotationFill} />
                            </View> */}
                            <Image source={{uri:pinnedImage.image}} style={{width:80, height:80, borderWidth:1, borderColor:"blue", borderRadius:40}}/>
                    </Mapbox.PointAnnotation>

            )
        }))
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
                      let {latitude, longitude} = pos.coords
                //   this.props.saveInFirebase({latitude, longitude})
                  this.props.saveInFirebase(res, {latitude, longitude})
                  })
              }
          })
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
                    {this.renderPinnedImages()}
                </Mapbox.MapView>
                <Animated.View style={{height:"50%", position:"absolute", top:"50%", width:"100%", backgroundColor:"black", borderTopWidth:2, borderTopColor:"grey",  transform:[{translateY:this.state.translateY}]}}>
                <TouchableOpacity onPress={this.handleClose}>
                    {/* <Text style={{color:"white", fontSize:20}}>
                        &times;
                    </Text> */}
                    <Image source={{uri:this.state.icon}} style={{width:30, height:30, position:"absolute", left:"50%", top:5, transform:[{translateX:-15}]}}/>
                    <View style={{
                        width:"90%",
                        alignSelf:"center",
                        flexDirection:"row", justifyContent:"space-around", alignContent:"center",
                        borderRadius:10,
                        borderWidth:2,
                        borderColor:"white",
                        marginTop:45,
                        marginBottom:15,
                        paddingVertical:15}}>
                    <View style={{justifyContent:"space-around"}}>
                        <Text style={{color:"white", fontSize:20}}>
                            {this.state.name}
                        </Text>
                        <Text style={{color:"white", fontSize:17}}>
                            Rating: {this.state.rating}
                        </Text>
                        <TouchableOpacity onPress={this.linkToDirections}>
                        <Text style={{color:"white", fontSize:17}}>
                        Click here for directions
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <Image source={{uri:this.state.image}} style={{width:100, height:80, borderRadius:10}}/>

                    </View>
                    <Text style={{width:"90%",color:"white", alignSelf:"center"}}>
                        {this.props.selectedRestaurant.result&&this.props.selectedRestaurant.result.reviews[0].text}
                    </Text>
                    </TouchableOpacity>
                </Animated.View>
                <TouchableOpacity onPress={this.takePhoto} style={{position:"absolute", top:10, right:10,borderRadius:50, width:60, height:60, backgroundColor:"white", justifyContent:"center", alignItems:"center"}}>
                <Icon name="md-camera" size={50} color="blue" style={{top:"50%", left:"50%", position:"absolute", transform:[{translateX:-25}, {translateY:-25}]}}/>
                </TouchableOpacity>
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
    console.log('state', state.pinnedImages);


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

export default connect (mapStateToProps, {getRestaurants, getRestaurantInfo, saveInFirebase, getPinnedImages})(Map)