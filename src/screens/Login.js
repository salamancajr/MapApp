import React, {Component} from "react";
import {View, Text, StyleSheet, ImageBackground, Button} from "react-native"
import CustomInput from "../components/CustomInput";
import CustomLongButton from "../components/CustomLongButton";
import firebase from "react-native-firebase";
import emailValidator from "../utils/emailValidator";
export default class Login extends Component{

    state={
        email:"",
        password:"",
        hasAccount:false
    }

    handleSignUp = () => {
            if(emailValidator.test(this.state.email) && this.state.password.length>5 && this.state.password == this.state.confirmPassword){
                firebase.auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(()=>{

                    return this.props.navigation.navigate("MapScreen")
                })
                .catch(error=>{
                    alert(error)
                })

            }
            else{
                alert("Please make sure you typed a valid email, are using a password of at least 6 characters, and your password matches the confirm password")
            }

    }

    handleLogin = () => {
        if(emailValidator.test(this.state.email)){
            firebase.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(()=>{

                return this.props.navigation.navigate("MapScreen")
            })
            .catch(error=>{
                console.log('errror', error);

                alert(error)
            })

        }
        else{
            alert("invalid email")
        }
    }

    handleAccountStatus = () => {
        this.state.hasAccount?
        this.setState({hasAccount:false})
        :
        this.setState({hasAccount:true})
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
        {
            !this.state.hasAccount&&
            <CustomInput
            onChangeText={confirmPassword=>this.setState({confirmPassword})}
            placeholder="Confirm password"/>
        }
        <CustomLongButton onPress={this.state.hasAccount?this.handleLogin:this.handleSignUp}/>
        <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={{color:"white"}}>
                {this.state.hasAccount?"Don't have an account?":"Already have an account?"}
            </Text>
            <Button title={this.state.hasAccount?"Sign Up":"Sign In"} onPress={
                //()=>this.props.navigation.navigate("MapScreen")
                this.handleAccountStatus
                }/>
        </View>
    </ImageBackground>
        )
    }
}
