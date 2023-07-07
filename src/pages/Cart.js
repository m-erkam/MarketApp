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
    const [ isEmpty, setIsEmpty ] = useState(true);
   
    const cart = useSelector((store) => store.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("cart");
        console.log(cart);
        console.log("quantities");
        console.log(quantities);

        let newList =[];

        if(quantities.length == 0){
            for (let index = 0; index < cart.length; index++) {
                let itemObject = { title : cart[index].title, quantity : 1, price : cart[index].price}
                newList.push(itemObject);
            }
        }else {
            for (let index = 0; index < cart.length; index++) {
                for(let qindex = 0; qindex < quantities.length; qindex++){
                    console.log("cart[index]");
                    console.log(cart[index]);
                    console.log("quantities[qindex]");
                    console.log(quantities[qindex]);


                    if(quantities[qindex].title == cart[index].title){
                        newList.push(quantities[qindex]);
                        break;
                    }else if(qindex == quantities.length-1 ){
                        let itemObject = { title : cart[index].title, quantity : 1, price : cart[index].price}
                        newList.push(itemObject);
                        break;
                    }
                }
                
            }
        }
        console.log("newlist");
        console.log(newList);
            
        setQuantities(newList);
        
        
            
        
        
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
            if(newList[currentIndex].quantity > 1){
                newList[currentIndex].quantity--;
            }else {
                newList[currentIndex].quantity--;
                deleteItem();
            }
            
            setQuantities(newList);
        }


        return(
            <View>
                {console.log("Renderlanıyor")}
                {}
                {console.log(quantities)}
                
               
                {console.log(currentIndex)}
                <CartItemBox 
                product={item} 
                gotoDetails={gotoDetails} 
                delete={deleteItem} 
                incQuantity={incQuantity} 
                decQuantity={decQuantity}
                
                quantity={quantities.length == 0 || currentIndex == undefined ? 1  : quantities[currentIndex].quantity}/>
                {/* Undefined check solves the problem */}
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <FlatList
                data = {cart}
                renderItem={renderCart}
                />
            <View style = {styles.price}>
                <Text style={styles.price_text}> Total price is {totalPrice} </Text>
            </View>
            
        </View>
    )
}

export default Cart;
