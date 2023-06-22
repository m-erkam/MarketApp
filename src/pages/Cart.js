import React from 'react'
import { FlatList, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import CartItemBox from './components/CartItemBox';


function Cart({navigation}){
    const cart = useSelector((store) => store.cart);
    
    const renderCart = ({item}) => {
        const gotoDetails = () => {
            navigation.navigate("ProductDetails", item);
        }

        return(
            <View>
               
                <CartItemBox product={item} gotoDetails={gotoDetails}/>
            </View>
            
        )
    }

    return(
        <View>
            <Text> Merhaba </Text>
            <FlatList
                data = {cart}
                renderItem={renderCart}
            >
            </FlatList>
        </View>
    )
}

export default Cart;