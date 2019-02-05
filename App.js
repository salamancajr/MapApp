import Login from "./src/screens/Login";
import MapScreen from "./src/screens/Map";
import {createStackNavigator, createAppContainer} from "react-navigation"

const App = createStackNavigator({
    Login:{screen:Login, navigationOptions:{
        headerTitle:"Login",
        headerStyle:{
            backgroundColor:"black"
        },
        headerTitleStyle:{
            color:"white"
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
export default createAppContainer(App);