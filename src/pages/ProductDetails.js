import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from "./styles/ProductDetailsStyle"

function ProductDetails({route}){
    
    const item = route.params;

    return(
        <View >
            <View style={styles.container}>
                <Image source={{ uri:item.images[0]}} style={{height:350, width:350}} resizeMode="contain"/>
            </View>
            <View style={styles.after_image}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}> {item.description} </Text>
            </View>

            
        </View>
    )
}

export default ProductDetails;