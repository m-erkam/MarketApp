import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


const QuantityBox = (props) => {
    

    return(
        <View style={styles.container}>
            <Text style={styles.title}> Quantity </Text>
            <View style={styles.bottom}>
                <TouchableOpacity onPress={props.decQuantity}>
                    <Text style={styles.text}> - </Text>
                </TouchableOpacity>
                <Text style={styles.text}> {props.quantity}</Text>

                <TouchableOpacity onPress={props.incQuantity}>
                    <Text style={styles.text}> + </Text>
                </TouchableOpacity>
            </View>
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding:5,
    },
    title:{
        fontWeight:"bold",
        fontSize:15,
    },
    bottom:{
        flexDirection:"row",
        borderWidth:1,
        justifyContent:"space-between",
        borderRadius:10,
    },
    text:{
        fontSize:20,
        fontWeight:"bold",

    
    },
    button:{
        
    }

})

export default QuantityBox;