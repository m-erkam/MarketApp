import React, { useEffect } from 'react'
import { View, FlatList, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import FavoriteBox from './components/FavoriteBox';
import styles from "./styles/FavoritesStyle";
import { addFav, removeFav } from './redux/actions/favActions';
import { addCart, removeCart } from './redux/actions/cartActions';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Favorites({navigation, route}){
    const user = route.params;
    const favs = useSelector((store) => store.favs);
    const cart = useSelector((store) => store.cart);
    const dispatchFav = useDispatch();
    const dispatchCart = useDispatch();

    const favKey = user.firstName + "favs";
    let favObject = { favs:favs };

    console.log(favKey);
    console.log(favObject);

    const getMyObject = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(favKey);
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
            await AsyncStorage.setItem(favKey, jsonValue);
        } catch (e) {
            console.log(e);
            console.log("saving error")
        }
    };



    const renderFav = ({item}) => {
        const gotoDetails = () => {
            navigation.navigate("ProductDetails", item);
        }
        const handleCart = () => {
            dispatchCart(addCart(item));
        }

        const handleFav = () => {
            dispatchFav(removeFav(item));
        }

        

        return(
            <View>
                <FavoriteBox product={item} gotoDetails={gotoDetails} handleFav={handleFav} handleCart={handleCart}/>
            </View>
            
        )
    }
    
    

    const store = async (object) => {
        await storeData(object);
    }

    useEffect(()=>{
        store(favObject);
    }, [favs]);

    const itemSeparator = <View style={styles.separator}/>

    return(
        <View style={styles.container}>
            <View style={styles.top_bar}>
                <Text style={styles.title}> Favorites </Text>
            </View>
            <FlatList 
                data={favs}
                renderItem={renderFav} 
                ItemSeparatorComponent={itemSeparator}
            >
            </FlatList>
        </View>
    )
}



export default Favorites;