import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'

function MainRoundButton(props){
    return(
        <TouchableOpacity style={styles.container}>
            <Text> Button</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        borderRadius:40,
        height:100,
        width:100,
        backgroundColor:"#CCFFFF",
    },
    
})

export default MainRoundButton;