import React from "react";
import {TouchableOpacity, Text, StyleSheet} from "react-native";

export default (props) => (
    <TouchableOpacity onPress={()=>props.onPress()} style={styles.button
    }>
        <Text style={styles.buttonText}>
            Submit
        </Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    button:{
        borderWidth:1,
        backgroundColor:"black",
        borderColor:"grey",
        width:"90%",
        height:40,
        borderRadius:7,
        marginBottom:10,
        justifyContent:"center",
        alignItems:"center"
    },
    buttonText:{
        fontWeight:"bold",
        color:"white"
    }
})