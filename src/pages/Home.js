import React, {useEffect, useState} from 'react'
import { FlatList, TouchableOpacity, View, Alert, Text } from 'react-native'
import axios from "axios"
import ProductBox from './components/ProductBox';
import styles from "./styles/HomeStyle"
import MainRoundButton from './components/HomeRoundButton';
import { addFav, removeFav } from './redux/actions/favActions';
import { addCart, removeCart } from './redux/actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';




function Home({navigation, route}){
    const URL = "https://dummyjson.com/products";
    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();
    const favs = useSelector((store) => store.favs);
    const cart = useSelector((store) => store.cart);
    
    const user = route.params;
    
    async function fetch(){
        const response = await axios.get(URL);
        setProducts(response.data.products);
    }


    const renderProduct = ({item}) => {
        function handleDetails(){
            navigation.navigate("ProductDetails", item);
        };
        
        const handleFav = () => {
            
    
            if(favs.length == 0){
                dispatch(addFav(item));
            }else{
                for (let i = 0; i < favs.length; i++) {
                    if(favs[i].title == item.title){
                        Alert.alert("Already in favorites!");
                        break;
                    }else if(i == favs.length-1){
                        dispatch(addFav(item)); 
                    }           
                }
            }
            /* console.log(favs); */
        }  

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
        


        return (
           
                <TouchableOpacity onPress={handleDetails}>
                    <ProductBox product={item} handleFav={handleFav} handleCart={handleCart}/> 
                </TouchableOpacity>
            
                
        )
    };

    
    
    

    const separator =  <View style={styles.item}/>

    useEffect(() => {
        fetch();
    }, [])

    return(
        <View style={styles.container}>
     {/*        <View style={styles.button_part}>
                <MainRoundButton />
                <MainRoundButton />
                <MainRoundButton />
            </View> */}
            <Text style={styles.welcome}> Welcome {user.firstName}! </Text>
            <FlatList 
                data={products} 
                renderItem={renderProduct} 
                ItemSeparatorComponent={separator}>
            </FlatList>
        </View>
    )
}

export default Home;