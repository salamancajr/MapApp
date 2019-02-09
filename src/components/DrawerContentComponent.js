import React, {Component} from "react";
import {View, TouchableOpacity, Text, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { withNavigation } from 'react-navigation';
import firebase from "react-native-firebase";
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

class DrawerContentComponent extends Component{

    handleFacebookSignIn = async () => {
        try {
            const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
            // handle this however suites the flow of your app
                alert("Cancelled Log In")
                return;
            }

            console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

            // get the access token
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
            // handle this however suites the flow of your app
            throw new Error('Something went wrong obtaining the users access token');
            }

            // create a new firebase credential with the token
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            // login with credential
           // const firebaseUserCredential = await
            firebase.auth().signInWithCredential(credential).then(()=>{
                this.props.navigation.navigate("MapScreen")
            });

            //console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()))
        } catch (e) {
            console.error(e);
        }

    }

    handleGoogleSignIn = async () => {
        try {
            // Add any configuration settings here:
            await GoogleSignin.configure();

            const data = await GoogleSignin.signIn();

            // create a new firebase credential with the token
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
            // login with credential
            firebase.auth().signInWithCredential(credential).then(()=>{
                this.props.navigation.navigate("MapScreen")

            });

          } catch (e) {
            console.error(e);
          }
    }

    render(){

        return(
            <View style={{marginTop:50, alignItems:"center"}}>
                <TouchableOpacity
                    style={styles.loginButtons}
                    onPress={this.handleFacebookSignIn}>
                <Icon name="facebook-with-circle" size={25} color="blue"/>
                    <Text style={{paddingLeft:10}}>
                        Log In with Facebook
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.loginButtons}
                    onPress={this.handleGoogleSignIn}>
                <Icon name="google--with-circle" size={25} color="blue"/>
                    <Text style={{paddingLeft:10}}>
                        Log In with Google
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loginButtons:{
        paddingVertical:15,
        width:"90%",
        flexDirection:"row",
        alignItems:"center"
    }
})

export default withNavigation(DrawerContentComponent)