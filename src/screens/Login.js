import React from "react";
import {View, Text, StyleSheet, ImageBackground} from "react-native"
import CustomInput from "../components/CustomInput";
import CustomLongButton from "../components/CustomLongButton";

export default (props) => (
    <ImageBackground source={{uri:"https://images.unsplash.com/photo-1529619768328-e37af76c6fe5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"}} style={{flex:1,justifyContent:"center", alignItems:"center"}}>
        <CustomInput placeholder="Enter email"/>
        <CustomInput placeholder="Enter password"/>
        <CustomLongButton onPress={()=>props.navigation.navigate("MapScreen")}/>
    </ImageBackground>
)