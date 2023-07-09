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
            </TouchableOpacity>
            <View style={styles.options}>
                <View style={styles.quantity}>
                    <QuantityBox quantity={props.quantity} incQuantity={props.incQuantity} decQuantity={props.decQuantity}/>
                </View>
                <View style={styles.delete}>
                    <TouchableOpacity onPress={props.delete}>
                        <MaterialCommunityIcons name="delete" color={"red"} size={35}/>
                    </TouchableOpacity>
                </View>
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
        backgroundColor:"white",
    },
    box:{
        flexDirection:"row",
        flex:1,
    },
    title:{
        padding:3,
        margin:3,
        fontSize:20,
        fontWeight:"bold",
        color:"black",
        
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
    options:{
        flexDirection:"row",
        justifyContent:"space-between",
        
    },
    quantity:{
        justifyContent:"center", 
        alignItems:"center",
        marginBottom:20,
    }

})

export default CartItemBox;