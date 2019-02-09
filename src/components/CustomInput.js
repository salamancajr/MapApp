import React from "react";
import {TextInput, StyleSheet} from "react-native";

export default (props) => (
    <TextInput
        onChangeText={value=>props.onChangeText(value)}
        placeholder={props.placeholder} style={styles.input}/>
)

const styles = StyleSheet.create({
    input:{
        backgroundColor:"rgba(255,255,255,.8)",
        borderWidth:1,
        paddingLeft:10,
        borderColor:"grey",
        width:"90%",
        height:40,
        borderRadius:7,
        marginBottom:15
    }
})