import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


const QuantityBox = () => {
    

    return(
        <View style={styles.container}>
            <Text style={styles.title}> Quantity </Text>
            <TouchableOpacity>
                
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding:5,
        borderWidth:1,
    },
    title:{
        fontWeight:"bold",
        fontSize:15,
    }

})

export default QuantityBox;