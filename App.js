import Login from "./src/screens/Login"
import React from 'react';
import {createStackNavigator, createAppContainer} from "react-navigation"

const App = createStackNavigator({
    Login:{screen:Login}
})
export default createAppContainer(App);