import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { useSelector } from 'react-redux';
import FavoriteBox from './components/FavoriteBox';
import styles from "./styles/FavoritesStyle"

function Favorites({navigation}){
    const favs = useSelector((store) => store.favs);

    const renderFav = ({item}) => {
        const gotoDetails = () => {
            navigation.navigate("ProductDetails", item);
        }

        return(
            <View>
                <FavoriteBox product={item} gotoDetails={gotoDetails}/>
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