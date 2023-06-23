import React from 'react'
import { View, Text, Image, TouchableOpacity,Alert } from 'react-native'
import styles from "./styles/ProductDetailsStyle"
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from './redux/actions/cartActions';


function ProductDetails({route}){
    
    const item = route.params;


    const dispatch = useDispatch();
    const cart = useSelector((store) => store.cart);
    
    const handleCart = () => {
        if(cart.length == 0){
            dispatch(addCart(item));
        }else{
            for (let i = 0; i < cart.length; i++) {
                if(cart[i].title == item.title){
                    Alert.alert("Already in cart!");
                    break;
                }else if(i == cart.length-1){
                    dispatch(addCart(item)); 
                }           
            }
        }
    }
    return(
        <View style={styles.container} >
            <View style={styles.image}>
                <Image source={{ uri:item.images[0]}} style={{height:350, width:350}} resizeMode="contain"/>
            </View>
            <View style={styles.after_image}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}> {item.description} </Text>
            </View>
            <View style={styles.price_box}>
                <View style={styles.price_inner_box}>
                    <Text style={styles.price}> {item.price}$</Text>
                    <TouchableOpacity style={styles.cart} onPress={handleCart}>
                        <Text style={styles.cart_text}> Add to cart </Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    )
}

export default ProductDetails;