import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

function ProfileBox(props){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{props.value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        borderWidth:1,
        borderRadius:5,
        padding:5,
        backgroundColor:"white",
    },
    text:{
        color:"black",
    }
})

export default ProfileBox;
