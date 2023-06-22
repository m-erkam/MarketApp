import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

function ProfileBox(props){
    return(
        <View style={styles.container}>
            <Text>{props.value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        borderWidth:1,
        borderRadius:5,
        margin:5,
        padding:5,
    }
})

export default ProfileBox;
