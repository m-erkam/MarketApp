import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'

const FavoriteBox = (props) => {
    return(
        <View >
            <TouchableOpacity onPress={props.gotoDetails} style={styles.container}>
                <Image source={{uri:props.product.thumbnail}} style={{height:80, width:80, borderRadius:5}}/>
                <Text style={styles.title}>{props.product.title}</Text>
            </TouchableOpacity>
        </View>
        
        
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        borderWidth:1,
        borderColor:"#E0E0E0"
    },
    title:{
        padding:5,
        margin:5,
        fontSize:18,
        fontWeight:"bold",
    }
})

export default FavoriteBox;