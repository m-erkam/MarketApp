import React, { useEffect, useState } from 'react'
import { FlatList, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItemBox from './components/CartItemBox';
import { removeCart } from './redux/actions/cartActions';
import styles from "./styles/CartStyle";


function Cart({navigation}){
    const [ totalPrice, setTotalPrice ] = useState(0);
    const [ quantities, setQuantities ] = useState({});
   
    const cart = useSelector((store) => store.cart);
    const dispatch = useDispatch();

    

    console.log(quantities);

    useEffect(() => {
        let total = 0;
        cart.forEach(element => {
            console.log(element);
            console.log(quantities[element.title]);
            total += element.price ;
        });
        setTotalPrice(total);
    }, [cart]);

    
    
    const incQuantity = (item) => {
        setQuantities(quantities[item.title]+=1);  
    }

    const decQuantity = (item) => {
        setQuantities(quantities[item.title]-=1);
    }


    const renderCart = ({item}) => {

        const gotoDetails = () => {
            navigation.navigate("ProductDetails", item);
        }
        const deleteItem = () => {
            dispatch(removeCart(item));
        }
        

        

        
        return(
            <View>
                <CartItemBox 
                product={item} 
                gotoDetails={gotoDetails} 
                delete={deleteItem} 
                incQuantity={incQuantity} 
                decQuantity={decQuantity}
                quantity={quantities}/>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <FlatList
                data = {cart}
                renderItem={renderCart}
                
                />
            <Text style={styles.price}> Total price is {totalPrice} </Text>
        </View>
    )
}

export default Cart;
