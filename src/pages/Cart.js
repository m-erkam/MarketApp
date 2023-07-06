import React, { useEffect, useState } from 'react'
import { FlatList, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItemBox from './components/CartItemBox';
import { removeCart } from './redux/actions/cartActions';
import styles from "./styles/CartStyle";


function Cart({navigation}){
    const [ totalPrice, setTotalPrice ] = useState(0);
    const [ quantities, setQuantities ] = useState([]);
    const [ isBeginning, setIsBeginning ] = useState(false);
    const [ isEmpty, setIsEmpty ] = useState(false);
   
    const cart = useSelector((store) => store.cart);
    const dispatch = useDispatch();

    /* useEffect(() => {
        for (let index = 0; index < cart.length; index++) {
            let itemObject = { title : cart[index].title, quantity : 1, price : cart[index].price}
            setQuantities(current => [...current, itemObject]);
        }

        let total = 0;
        cart.forEach(element => {
            total += element.price ;
        });
        setTotalPrice(total);
        
    }, []); */

    
    useEffect(() => {
        if(!isBeginning){
            let newList =[];
            for (let index = 0; index < cart.length; index++) {
                let itemObject = { title : cart[index].title, quantity : 1, price : cart[index].price}
                newList.push(itemObject);
            }
            setQuantities(newList);
        }
        
    }, [cart]);


    useEffect(() => {
        if(!isBeginning){
            
            let total = 0;
            quantities.forEach(element => {
                total += element.price * element.quantity ;
            });
            setTotalPrice(total);
        }else if(isBeginning){
            setIsBeginning(false);
        }
    }, [quantities]);

    

    const renderCart = ({item}) => {
        let currentIndex;

        for (let index = 0; index < quantities.length; index++) {
            const product = quantities[index];

            {console.log(item)}
            {console.log(product)}
            if(item.title == product.title){
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
            
                
                if(item.title != quantities[index].title && !isRemoved){
                    newList[index] = quantities[index];
                }else if(item.title != quantities[index].title && isRemoved){
                    newList[index-1] = quantities[index];
                }else{
                    isRemoved = true;
                }    
            }
            setQuantities(newList);
            dispatch(removeCart(item));
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
            if(newList[currentIndex].quantity > 1){
                newList[currentIndex].quantity--;
            }else {
                newList[currentIndex].quantity--;
                deleteItem();
            }
            
            setQuantities(newList);
        }

        

        /* console.log(quantities); */
        return(
            <View>
                {console.log("Renderlanıyor")}
                {quantities.length == 0 ? setIsEmpty(true) : setIsEmpty(false) }
                {console.log(quantities)}
               
               
                {console.log(currentIndex)}
                <CartItemBox 
                product={item} 
                gotoDetails={gotoDetails} 
                delete={deleteItem} 
                incQuantity={incQuantity} 
                decQuantity={decQuantity}
                
                quantity={quantities.length == 0 ||currentIndex == undefined ? 1  : quantities[currentIndex].quantity}/>
                
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
