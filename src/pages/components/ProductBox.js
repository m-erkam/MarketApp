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
        <View style={styles.container}>
            <View>
                <Image source={{uri: props.product.thumbnail}} style={{width:120, height:120, borderRadius:5,}} resizeMode="contain" />
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
                                <Image  source={{uri: "https://w7.pngwing.com/pngs/798/196/png-transparent-computer-icons-shopping-cart-e-commerce-add-to-cart-button-purple-angle-text.png"}} style={{width:30, height:30}}/>
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
        maxHeight:120,


    },
    title:{
        margin:3,
        fontSize:17,
        fontWeight:"bold",
        maxWidth:Dimensions.get("window").width*3/7,
    },
    price:{
        margin:3,
        fontSize:17,

    },
    favorite_button:{
        margin:3,
        padding:3,
        justifyContent:"center",
        alignItems:"center",
        height:45,
        width:45,
        borderRadius:22,
        borderWidth:1,
        borderColor:"pink",
        

      
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
    }
   
})

export default ProductBox;