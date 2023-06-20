import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native'

function SignUpInputBox(props){


    return(
        <View>
            <Text> {props.title} </Text>
            <View style={styles.input_box}>
                <TextInput placeholder={props.title + "..."}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input_box:{
        padding:5,
        margin:5,
        borderRadius:8,
        borderWidth:1,
        borderColor:"black",
    }
})


export default SignUpInputBox;