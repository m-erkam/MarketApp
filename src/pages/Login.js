import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MainPage from './MainPage';
import LoginInputBox from './components/LoginInputBox';
import styles from "./styles/LoginStyle";
import SignUp from './SignUp';

function Login({navigation}){
    function handleLogin(){
        navigation.navigate("MainPage");
    }

    function handleSignUp(){
        navigation.navigate("SignUp");
    }

    return(
        <View style={styles.container}>
            <View style={styles.input_box}>
                <LoginInputBox title="Username" />
            </View>
            <View style={styles.input_box}>
                <LoginInputBox title="Password" />
            </View>
            
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.button_text}> Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignUp} style={styles.button}>
                <Text style={styles.button_text}> Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login;