import React, {useEffect, useState} from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import axios from "axios"
import ProductBox from './components/ProductBox';
import styles from "./styles/MainPageStyle"
import MainRoundButton from './components/MainRoundButton';
import ProductDetails from './ProductDetails';


function MainPage({navigation}){
    const URL = "https://dummyjson.com/products";
    const [products, setProducts] = useState([]);
    const [currentItem, setCurrentItem] = useState("");

    async function fetch(){
        const response = await axios.get(URL);
        setProducts(response.data.products);
    }

    

    const renderProduct = ({item}) => {
        function handleDetails(){
            navigation.navigate("ProductDetails", item);
        };


    return (<TouchableOpacity onPress={handleDetails}>
        <ProductBox product={item}/> 
    </TouchableOpacity>)};


    const separator =  <View style={styles.item}/>

    useEffect(() => {
        fetch();
    }, [])

    return(
        <View style={styles.container}>
            <View style={styles.button_part}>
                <MainRoundButton />
                <MainRoundButton />
                <MainRoundButton />
            </View>
            <FlatList 
                data={products} 
                renderItem={renderProduct} 
                ItemSeparatorComponent={separator}>
            </FlatList>
        </View>
    )
}

export default MainPage;