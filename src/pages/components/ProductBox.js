import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function ProductBox(props){
    return(
        <View style={styles.container}>
            <View>
                <Image source={{uri: props.product.thumbnail}} style={{width:100, height:100, borderRadius:5,}}/>
            </View>
            <View style={styles.inner_part}>
                <View style={styles.inner_left}>
                    <Text style={styles.title}> {props.product.title} </Text>
                    <Text style={styles.price}> {props.product.price}$ </Text>
                </View>
                <View style={styles.favorite_button}>
                    <TouchableOpacity>
                        <Image source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Emoji_u2665.svg/128px-Emoji_u2665.svg.png"}} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                </View>
            </View>
                
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        borderRadius:8,
        borderWidth:1,
        borderColor:"#C0C0C0"

    },
    title:{
        margin:5,
        fontSize:17,
        fontWeight:"bold",
        maxWidth:Dimensions.get("window").width/2,
    },
    price:{
        margin:5,
        fontSize:17,

    },
    favorite_button:{
        margin:5,
        padding:5,
        justifyContent:"center",
        alignItems:"center",
        height:40,
        width:40,
        borderRadius:20,
        backgroundColor:"#E3E4FA"
    },
    inner_part:{
        margin:10,
        marginTop:10,
        flexDirection:"row",
        justifyContent:"space-between",
        flex:1,
    },
   
})

export default ProductBox;