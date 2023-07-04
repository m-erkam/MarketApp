import React, {useEffect, useState} from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import LoginInputBox from './components/LoginInputBox';
import styles from "./styles/LoginStyle";
import axios from 'axios';


function Login({navigation}){
    const [username, setUsername] = useState("atuny0");
    const [password, setPassword] = useState("9uQFF1Lh");
    const URL = "https://dummyjson.com/users";    
    const [users, setUsers] = useState([]);
    let realUser;
    let isUser = false;

    async function fetch(){
        const response = await axios.get(URL);
        setUsers(response.data.users);
        
    }

    useEffect(()=>{
        fetch();
    }, [])

    function handleLogin(){

        for(let i = 0; i<users.length; i++){
            const user = users[i];
         
            if(user.username == username){
                if(user.password == password){
                    isUser = true;
                    realUser=user;
                }
            }
        }
        if(isUser){
            navigation.navigate("RoofCart", realUser);
        }else{
            Alert.alert("Wrong username or password");
        }
        
    }

    function handleSignUp(){
        navigation.navigate("SignUp");
    }

    function changeUsername(username){
        setUsername(username);   
    }
    function changePassword(password){
        setPassword(password);
    }

    return(
        <View style={styles.container}>
            <View style={styles.input_box}>
                <LoginInputBox title="Username" onChange={changeUsername} value={username} isHidden={false}/>
            </View>
            <View style={styles.input_box}>
                <LoginInputBox title="Password" onChange={changePassword} value={password} isHidden={true}/>
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