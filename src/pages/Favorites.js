import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import FavoriteBox from './components/FavoriteBox';
import styles from "./styles/FavoritesStyle";
import { addFav, removeFav } from './redux/actions/favActions';
import { addCart, removeCart } from './redux/actions/cartActions';

function Favorites({navigation}){
    const favs = useSelector((store) => store.favs);
    const cart = useSelector((store) => store.cart);
    const dispatchFav = useDispatch();
    const dispatchCart = useDispatch();

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