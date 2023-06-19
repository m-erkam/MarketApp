import React, {useState} from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

function LoginInputBox(props){
const [input, setInput] = useState("");

    return(
        <View>
            <TextInput placeholder={props.title} value={input} onChangeText={setInput} style={styles.input_text}/>      
        </View>
    )
}

const styles = StyleSheet.create({
    input_text:{
        fontSize:18,
        fontWeight:"bold",
        justifyContent:"center",
    }
})

export default LoginInputBox;