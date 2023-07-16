import React, { useEffect, useState } from 'react'
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItemBox from './components/CartItemBox';
import { removeCart, replaceCart } from './redux/actions/cartActions';
import styles from "./styles/CartStyle";
import AsyncStorage from '@react-native-async-storage/async-storage';


function Cart({ navigation, route }) {

    const [totalPrice, setTotalPrice] = useState(0);
    const [quantities, setQuantities] = useState([]);
    const [isBeginning, setIsBeginning] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const user = route.params;
    const cart = useSelector((store) => store.cart);
    const dispatch = useDispatch();
    const cartKey = user.firstName + "cart";
    console.log(cartKey);


    const getMyObject = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(cartKey);
            console.log("get kısmı");
            console.log(jsonValue);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log("error get object");
        }

        console.log('Done.')
    }
    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            console.log(jsonValue);
            await AsyncStorage.setItem(cartKey, jsonValue);
        } catch (e) {
            // saving error
        }
    };

    let cartObject = {
        cart: cart
    };

    console.log(cart);

    console.log("cartObject");
    console.log(cartObject);


    const store = async (object) => {
        await storeData(object);
    }

    useEffect(() => {

        let newList = [];

        if (quantities.length == 0) {
            for (let index = 0; index < cart.length; index++) {
                let itemObject = { title: cart[index].title, quantity: 1, price: cart[index].price }
                newList.push(itemObject);
            }
        } else {
            for (let index = 0; index < cart.length; index++) {
                for (let qindex = 0; qindex < quantities.length; qindex++) {
                    if (quantities[qindex].title == cart[index].title) {
                        newList.push(quantities[qindex]);
                        break;
                    } else if (qindex == quantities.length - 1) {
                        let itemObject = { title: cart[index].title, quantity: 1, price: cart[index].price }
                        newList.push(itemObject);
                        break;
                    }
                }

            }
        }
        setQuantities(newList);
        store(cartObject);

    }, [cart]);


    useEffect(() => {
        if (!isBeginning) {
            let total = 0;
            quantities.forEach(element => {
                total += element.price * element.quantity;
            });
            setTotalPrice(total);
        } else if (isBeginning) {
            setIsBeginning(false);
        }
    }, [quantities]);



    const renderCart = ({ item }) => {
        let currentIndex;
        for (let index = 0; index < quantities.length; index++) {
            const product = quantities[index];

            if (item.title == product.title) {
                currentIndex = index;
            }
        }

        const gotoDetails = () => {
            navigation.navigate("ProductDetails", item);
        }
        const deleteItem = () => {
            let newList = [];
            let isRemoved = false;
            for (let index = 0; index < quantities.length; index++) {
                if (item.title != quantities[index].title && !isRemoved) {
                    newList[index] = quantities[index];
                } else if (item.title != quantities[index].title && isRemoved) {
                    newList[index - 1] = quantities[index];
                } else {
                    isRemoved = true;
                }
            }
            setQuantities(newList);
            dispatch(removeCart(item));
            quantities.length == 0 ? setIsEmpty(true) : setIsEmpty(false)
            console.log(quantities);
            console.log(cart);

        }
        const incQuantity = () => {
            let newList;
            newList = [...quantities];
            newList[currentIndex].quantity++;
            setQuantities(newList);
        }

        const decQuantity = () => {
            let newList;
            newList = [...quantities];
            if (newList[currentIndex].quantity > 1) {
                newList[currentIndex].quantity--;
            } else {
                newList[currentIndex].quantity--;
                deleteItem();
            }

            setQuantities(newList);
        }


        return (
            <View>
                {console.log("Renderlanıyor")}
                <CartItemBox
                    product={item}
                    gotoDetails={gotoDetails}
                    delete={deleteItem}
                    incQuantity={incQuantity}
                    decQuantity={decQuantity}

                    quantity={quantities.length == 0 || currentIndex == undefined ? 1 : quantities[currentIndex].quantity} />
                {/* Undefined check solves the problem */}
            </View>
        )
    }

    const separator = <View style={styles.separator} />

    return (
        <View style={styles.container}>
            <View style={styles.top_bar}>
                <Text style={styles.top_text}> My Cart </Text>
            </View>

            <FlatList
                data={cart}
                renderItem={renderCart}
                ItemSeparatorComponent={separator}
            />
            <View style={styles.price}>
                <Text style={styles.price_text}> Total price is {totalPrice} </Text>
                <TouchableOpacity style={styles.buy_button}>
                    <Text style={styles.buy_text}> Buy! </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Cart;
