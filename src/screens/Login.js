import React, {Component} from "react";
import {View, Text, StyleSheet, ImageBackground} from "react-native"
import CustomInput from "../components/CustomInput";
import CustomLongButton from "../components/CustomLongButton";
//import firebase from "react-native-firebase";
export default class Login extends Component{

    state={
        email:"",
        password:""
    }

    handleSubmit = () => {
        console.log(this.state.email);

            if(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(this.state.email)){
                firebase.auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(()=>{

                    return this.props.navigation.navigate("MapScreen")
                })
                .catch(error=>{
                    console.log('error at login', error);

                    alert("something went wrong with login")
                })

            }
            else{
                alert("invalid email")
            }

    }

    render(){
        return (
        <ImageBackground
            source={{uri:"https://images.unsplash.com/photo-1529619768328-e37af76c6fe5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"}}
            style={{flex:1,justifyContent:"center", alignItems:"center"}}>
        <CustomInput
            onChangeText={email=>this.setState({email})}
            placeholder="Enter email"/>
        <CustomInput
            onChangeText={password=>this.setState({password})}
            placeholder="Enter password"/>
        <CustomLongButton onPress={this.handleSubmit}/>
    </ImageBackground>
        )
    }
}
