import React, {useEffect, useState} from 'react'
import { FlatList, TouchableOpacity, View, Alert } from 'react-native'
import axios from "axios"
import ProductBox from './components/ProductBox';
import styles from "./styles/HomeStyle"
import MainRoundButton from './components/HomeRoundButton';
import ProductDetails from './ProductDetails';
import { addFav, removeFav } from './redux/actions/favActions';
import { useDispatch, useSelector } from 'react-redux';


function Home({navigation, route}){
    const URL = "https://dummyjson.com/products";
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const dispatch = useDispatch();
    const favs = useSelector((store) => store.favs);
    
    
    async function fetch(){
        const response = await axios.get(URL);
        setProducts(response.data.products);
    }


    const renderProduct = ({item}) => {
        function handleDetails(){
            navigation.navigate("ProductDetails", item);
        };
        
        const handleFav = () => {
            console.log(favs);
    
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


            
                   
            
        }  
        


        return (<TouchableOpacity onPress={handleDetails}>
            <ProductBox product={item} handleFav={handleFav} handleCart={handleCart}/> 
        </TouchableOpacity>)
    };

    
    
    const handleCart = (product) => {
        setCart([...cart, product]);
    }

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
            <FlatList 
                data={products} 
                renderItem={renderProduct} 
                ItemSeparatorComponent={separator}>
            </FlatList>
        </View>
    )
}

export default Home;