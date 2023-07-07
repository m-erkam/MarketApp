import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

function LoginInputBox(props){
    return(
        <View>
            <TextInput placeholder={props.title} 
                        value={props.value} 
                        onChangeText={props.onChange} 
                        style={styles.input_text}
                        secureTextEntry={props.isHidden}
                        />      
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