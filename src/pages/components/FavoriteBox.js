import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const FavoriteBox = (props) => {
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={props.gotoDetails} style={styles.container_button}>
                <Image source={{uri:props.product.thumbnail}} style={{height:90, width:90, borderRadius:5}}/>
                <View>
                    <Text style={styles.title}> {props.product.title}</Text>
                    <Text style={styles.price}> {props.product.price}$</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.buttons}>
                <View style={styles.button_outline}>
                    <TouchableOpacity onPress={props.handleFav}>
                        <MaterialCommunityIcons name="heart-off-outline" color={"red"} size={30} />
                    </TouchableOpacity>
                </View>
                <View style={styles.button_outline}>
                    <TouchableOpacity onPress={props.handleCart}>
                        <MaterialCommunityIcons name="cart-outline" color={"#0067FF"} size={30} />
                    </TouchableOpacity>
                </View>
                
            </View>
    </View>
        
        
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        backgroundColor:"white",
        borderWidth:1,
        borderRadius:5,
        borderColor:"#e0e0e0",
    },
    container_button:{
        flexDirection:"row",
        flex:1,
    },
    title:{
        padding:5,
        fontSize:18,
        fontWeight:"bold",
        color:"black"
    },
    price:{
        padding:5,
        fontSize:17,
        color:"#85BB65",
        fontWeight:"bold",
    },
    buttons:{
        justifyContent:"space-evenly",
        padding:3,
        flexDirection:"row",
        alignItems:"flex-end"
    },
    button_outline:{
        margin:3,
        padding:3,
        justifyContent:"center",
        alignItems:"center",
        height:45,
        width:45,
        borderRadius:22,
        borderColor:"#ff9800",
        borderWidth:2,
    }
})

export default FavoriteBox;