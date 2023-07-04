import React, { useEffect, useState } from 'react'
import { FlatList, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItemBox from './components/CartItemBox';
import { removeCart } from './redux/actions/cartActions';
import styles from "./styles/CartStyle";


function Cart({navigation}){
    const[ totalPrice, setTotalPrice ] = useState(0);
    
    const cart = useSelector((store) => store.cart);

    const dispatch = useDispatch();

    useEffect(() => {
        let total = 0;
        cart.forEach(element => {
            total += element.price;
        });
        setTotalPrice(total);
    }, [cart]);

    
    
    const renderCart = ({item}) => {
        const gotoDetails = () => {
            navigation.navigate("ProductDetails", item);
        }
        const deleteItem = () => {
            dispatch(removeCart(item));
        }

        return(
            <View>
                <CartItemBox product={item} gotoDetails={gotoDetails} delete={deleteItem}/>
            </View>
            
        )
    }

    return(
        <View>
            <FlatList
                data = {cart}
                renderItem={renderCart}
                />
            <Text style={styles.price}> Total price is {totalPrice} </Text>
        </View>
    )
}

export default Cart;
