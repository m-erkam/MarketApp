import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgUri } from 'react-native-svg';


function ProductBox(props){
    const handleFav = () => {
        props.handleFav(props.product);
    }

    const handleCart = () => {
        props.handleCart(props.product);
    }

    
    return(
        <View style={styles.container} >
            <View>
                <Image source={{uri: props.product.thumbnail}} style={{width:118, height:118, borderRadius:5,}} resizeMode="contain" />
            </View>
            <View style={styles.inner_part}>
                <View style={styles.inner_left}>
                    <Text style={styles.title}> {props.product.title} </Text>
                    <Text style={styles.price}> {props.product.price}$ </Text>
                </View>
                <View style={styles.inner_right}>
                    <View style={styles.favorite_button}>
                            <TouchableOpacity onPress={handleFav}>
                                <SvgUri  uri="https://upload.wikimedia.org/wikipedia/commons/3/35/Emoji_u2665.svg" height={33} width={33}  viewBox='0 0 128 128'/>
                                {/* <Image source={{uri:"https://upload.wikimedia.org/wikipedia/commons/3/35/Emoji_u2665.svg"}} style={{height:30, width:30}} /> */}                    
                            </TouchableOpacity>
                        </View>
                        <View style={styles.favorite_button}>
                            <TouchableOpacity onPress={handleCart}>                            
                                <Image  source={{uri: "https://o.remove.bg/downloads/c3f07685-43a2-4cd9-a5c3-d7c9b5f89e9f/png-transparent-computer-icons-shopping-cart-e-commerce-add-to-cart-button-purple-angle-text-removebg-preview.png"}} style={{width:34, height:34}}/>
                            </TouchableOpacity>
                    </View>
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
        borderColor:"#C0C0C0",
        backgroundColor:"white",
        maxHeight:120,


    },
    title:{
        margin:3,
        fontSize:17,
        fontWeight:"bold",
        color:"black",
        maxWidth:Dimensions.get("window").width*3/7,
    },
    price:{
        margin:3,
        fontSize:17,
        fontWeight:"600",
        color:"#ff9800"

    },
    favorite_button:{
        margin:3,
        padding:3,
        justifyContent:"center",
        alignItems:"center",
        height:45,
        width:45,
        borderRadius:22,
        borderColor:"#ff9800",
        borderWidth:2,
        

      
    },
    inner_part:{
        margin:10,
        marginTop:10,
        flexDirection:"row",
        justifyContent:"space-between",
        flex:1,
    },
    inner_right:{
        flexDirection:"column",
    },
    inner_left:{
        justifyContent:"space-between",
        padding:6,
    }
   
})

export default ProductBox;