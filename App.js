import Login from "./src/screens/Login";
import React from "react";
import {View, TouchableOpacity, Text} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import MapScreen from "./src/screens/Map";
import DrawerContentComponent from "./src/components/DrawerContentComponent";
import {createStackNavigator, createDrawerNavigator, createAppContainer} from "react-navigation"

const Stack = createStackNavigator({
    Login:{screen:Login, navigationOptions:({navigation})=>{
        return{
            headerTitle:"Login",
            headerStyle:{
                backgroundColor:"black"
            },
            headerTitleStyle:{
                color:"white"
            },
            headerLeft:(
                <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                    <Icon name="menu" size={40} color="white"/>
                </TouchableOpacity>
            ),
            headerRight:(
                <View/>
            )
        }
    }},
    MapScreen:{screen:MapScreen, navigationOptions:{
        headerTitle:"Map",
        headerStyle:{
            backgroundColor:"black"
        },
        headerTitleStyle:{
            color:"white"
        },

    }}
})

const App = createDrawerNavigator({
    Stack:{screen:Stack}
}, {
    contentComponent:(props)=>(

        // <ContentComponent {...props}/>
        <DrawerContentComponent/>
    )})
export default createAppContainer(App);