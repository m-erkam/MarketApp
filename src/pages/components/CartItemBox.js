import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import QuantityBox from './QuantityBox';

const CartItemBox = (props) => {
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={props.gotoDetails} style={styles.box}>
                <Image source={{uri:props.product.thumbnail}} style={{height:80, width:80, borderRadius:5}}/>
                <View style={{flex:1}}>
                    <Text style={styles.title}> {props.product.title}</Text>
                    <Text style={styles.price}> {props.product.price}$ </Text>
                </View>
                <View style={{justifyContent:"center", alignItems:"center"}}>
                    <QuantityBox quantity={props.quantity} incQuantity={props.incQuantity} decQuantity={props.decQuantity}/>
                </View>
            </TouchableOpacity>
            <View style={styles.delete}>
                <TouchableOpacity onPress={props.delete}>
                    <MaterialCommunityIcons name="delete" color={"red"} size={40}/>
                </TouchableOpacity>
            </View>
            
            
            
        </View>
        
        
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        borderWidth:1,
        borderColor:"#E0E0E0",
        padding:5,
    },
    box:{
        flexDirection:"row",
        flex:1,
    },
    title:{
        padding:3,
        margin:3,
        fontSize:18,
        fontWeight:"bold",
        
    },
    price:{
        padding:3,
        margin:3,
        fontSize:18,
        fontWeight:"bold",
        color:"#85BB65",
    },  
    delete:{
        justifyContent:"center",
    },

})

export default CartItemBox;