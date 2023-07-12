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
        borderRadius:5,
        padding:5,
        margin:5,
        backgroundColor:"white",
        shadowColor: 'black',
        shadowRadius: 5,
        elevation: 10,
    },
    text:{
        color:"black",
    }
})

export default ProfileBox;
