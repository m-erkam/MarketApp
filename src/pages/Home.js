import React, { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity, View, Alert, Text, TextInput, Modal, ScrollView, ActivityIndicator } from 'react-native'
import axios from "axios"
import ProductBox from './components/ProductBox';
import styles from "./styles/HomeStyle"
import MainRoundButton from './components/HomeRoundButton';
import { addFav, removeFav, replaceFav } from './redux/actions/favActions';
import { addCart, removeCart, replaceCart } from './redux/actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Home({ navigation, route }) {
    const URL = "https://dummyjson.com/products";
    const [products, setProducts] = useState([]);
    const [manipulatedList, setManipulatedList] = useState([]);
    const [searchedItem, setSearchedItem] = useState("");
    const [filterVisible, setFilterVisible] = useState(false);
    const [filterBrandVisible, setFilterBrandVisible] = useState(false);
    const [filterCategoryVisible, setFilterCategoryVisible] = useState(false);
    const [sortVisible, setSortVisible] = useState(false);
    const [isEnabled, setIsEnabled ] = useState(true);
    const [isFetchingCart, setIsFetchingCart ] = useState(true);
    const [isFetchingFav, setIsFetchingFav ] = useState(true);

    const dispatch = useDispatch();
    const favs = useSelector((store) => store.favs);
    const cart = useSelector((store) => store.cart);

    console.log("favs");
    console.log(favs);
    console.log("cart");
    
    console.log(cart);


    const user = route.params;
    const cartKey = user.firstName + "cart";
    const favKey = user.firstName + "favs";

    function setTimePassed() {
        setIsEnabled(false);
    }
    async function fetch() {
        const response = await axios.get(URL);
        setProducts(response.data.products);
        setManipulatedList(response.data.products);
        /* setTimeout( () => {
            setTimePassed();
         },1000);
        */
    }

    

    useEffect(() => {
        fetch();
    }, [])

    useEffect(() => {
        getMyCartObject();
    }, [])

    useEffect(() => {
        getMyFavObject();
    }, [])

    const getMyCartObject = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(cartKey);
            console.log("get kısmı");
            console.log(JSON.parse(jsonValue));

            if(JSON.parse(jsonValue) == null){
                let object = {cart:cart};
                console.log("merhaba");
                setIsFetchingCart(false);
                return object;
            }else if(JSON.parse(jsonValue).cart != undefined){
                console.log("doğru yer")
                dispatch(replaceCart(JSON.parse(jsonValue).cart));
                setIsFetchingCart(false);
                return JSON.parse(jsonValue).cart;
            }
            else{
                console.log("yanlış yer")
                return null;
            }
        } catch (e) {
            console.log(e);
            console.log("error get object");
        }  
    }

    const getMyFavObject = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(favKey);
            console.log("get kısmı");
            console.log(JSON.parse(jsonValue));

           

            if (JSON.parse(jsonValue) == null) {
                console.log("null kısmı")
                setIsFetchingFav(false);
                return {favs:favs};
            }else if(JSON.parse(jsonValue).favs != undefined){
                console.log("doğru yer")
                dispatch(replaceFav(JSON.parse(jsonValue).favs));
                setIsFetchingFav(false);
                return JSON.parse(jsonValue).favs;
            }else {
                console.log("yanlış yer")
                return null;
            }
        } catch (e) {
            console.log(e);
            console.log("error get object");
        }  
    }


    const renderProduct = ({ item }) => {
        function handleDetails() {
            navigation.navigate("ProductDetails", item);
        };

        const handleFav = () => {
            dispatch(addFav(item));
        }

        const handleCart = () => {
            dispatch(addCart(item));
        }

        return (
            <TouchableOpacity onPress={handleDetails}>
                <ProductBox product={item} handleFav={handleFav} handleCart={handleCart} />
            </TouchableOpacity>
        )
    };

    const separator = <View style={styles.item} />

    const searchItem = (item) => {

        const lowerTitle = item.title.toLowerCase();
        return lowerTitle.match(searchedItem.toLowerCase());
    }

    const changeSearched = (text) => {
        setSearchedItem(text);
    }



    useEffect(() => {
        setManipulatedList(products.filter(searchItem));
    }, [searchedItem]);



    const sortProducts = (option) => {

        switch (option) {
            case ("alpha"):
                setManipulatedList(manipulatedList.sort(compareAlpha));
                break;
            case ("increasing"):
                setManipulatedList(manipulatedList.sort(compareIncPrice));
                break;
            case ("decreasing"):
                setManipulatedList(manipulatedList.sort(compareDecPrice));
                break;
            case ("default"):
                setManipulatedList(manipulatedList.sort(compareId));
                break;
        }
    }

    const compareAlpha = (a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
        } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
        } else {
            return 0;
        }
    }

    const compareIncPrice = (a, b) => {
        if (a.price > b.price) {
            return 1;
        } else if (a.price < b.price) {
            return -1;
        } else {
            return 0;
        }
    }

    const compareDecPrice = (a, b) => {
        if (a.price < b.price) {
            return 1;
        } else if (a.price > b.price) {
            return -1;
        } else {
            return 0;
        }
    }

    const compareId = (a, b) => {
        if (a.id > b.id) {
            return 1;
        } else if (a.id < b.id) {
            return -1;
        } else {
            return 0;
        }
    }

    const categoryFilterSmart = (product) => {
        return product.category.match("smartphones");
    }
    const categoryFilterLaptop = (product) => {
        return product.category.match("laptops");
    }
    const categoryFilterFragrance = (product) => {
        return product.category.match("fragrances");
    }
    const categoryFilterSkin = (product) => {
        return product.category.match("skincare");
    }
    const categoryFilterGroceries = (product) => {
        return product.category.match("groceries");
    }
    const categoryFilterHome = (product) => {
        return product.category.match("home-decoration");
    }

    const filterProductsCategory = (type) => {
        if (type == "smartphones") {
            setManipulatedList(products.filter(categoryFilterSmart));
        } else if (type == "laptops") {
            setManipulatedList(products.filter(categoryFilterLaptop));
        } else if (type == "fragrances") {
            setManipulatedList(products.filter(categoryFilterFragrance));
        } else if (type == "skincare") {
            setManipulatedList(products.filter(categoryFilterSkin));
        } else if (type == "groceries") {
            setManipulatedList(products.filter(categoryFilterGroceries));
        } else if (type == "home-decoration") {
            setManipulatedList(products.filter(categoryFilterHome));
        }
    }

    const resetFilter = () => {
        setManipulatedList(products);
    }


    return (

        <View style={styles.container}>
            <Modal
                visible={isFetchingCart}
                animationType="fade"
            >
                <View style={styles.load_mod_in}>
                    <ActivityIndicator size={50}/>
                </View>
            </Modal>

            <Modal
                visible={filterVisible}
                animationType="fade"
                style={styles.modal}
                transparent={true}

            >
                <View style={styles.category_container}>
                    <View style={styles.inner_modal}>
                        <ScrollView style={styles.modal_scroll}>
                            <TouchableOpacity onPress={() => { setFilterVisible(false), setFilterCategoryVisible(true) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Category </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterVisible(false), setFilterBrandVisible(true) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Brand </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterVisible(false), resetFilter() }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Reset Filters </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={filterBrandVisible}
                animationType="fade"
                transparent={true}
                style={styles.modal}
            >
                <View style={styles.category_container}>
                    <View style={styles.inner_modal}>
                        <ScrollView style={styles.modal_scroll}>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Apple </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Samsung </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> OPPO </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Huawei </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Microsoft Surface </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Infinix </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> HP Pavilion </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Impression of Acqua Di Gio </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Royal_Mirage </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Fog Scent Xpressio </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Al Munakh </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Lord - Al-Rehab </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> L'Oreal Paris </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Hemani Tea </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Dermive </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> ROREC White Rice </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Fair & Clear </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Saaf & Khaas </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Bake Parlor Big </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Baking Food Items </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> fauji </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Dry Rose </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Boho Decor </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Flying Wooden </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> LED Lights </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> luxury palace </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterBrandVisible(false) }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Golden </Text>
                            </TouchableOpacity>
                        </ScrollView>

                    </View>
                </View>
            </Modal>

            <Modal
                visible={filterCategoryVisible}
                animationType="fade"
                transparent={true}
                style={styles.modal}
            >
                <View style={styles.category_container}>
                    <View style={styles.inner_modal}>
                        <ScrollView style={styles.modal_scroll}>
                            <TouchableOpacity onPress={() => { setFilterCategoryVisible(false), filterProductsCategory("smartphones") }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> smartphones </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterCategoryVisible(false), filterProductsCategory("laptops") }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> laptops </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterCategoryVisible(false), filterProductsCategory("fragrances") }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> fragrances </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterCategoryVisible(false), filterProductsCategory("skincare") }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> skincare </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterCategoryVisible(false), filterProductsCategory("groceries") }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> groceries </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setFilterCategoryVisible(false), filterProductsCategory("home-decoration") }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> home-decoration </Text>
                            </TouchableOpacity>
                        </ScrollView>

                    </View>
                </View>
            </Modal>

            <Modal
                visible={sortVisible}
                animationType="fade"
                transparent={true}
                style={styles.modal}
            >
                <View style={styles.category_container}>
                    <View style={styles.inner_modal}>
                        <ScrollView style={styles.modal_scroll}>
                            <TouchableOpacity onPress={() => { setSortVisible(false), sortProducts("default") }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Featured </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setSortVisible(false), sortProducts("alpha") }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Alphabetically </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setSortVisible(false), sortProducts("increasing") }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Increasing Price </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setSortVisible(false), sortProducts("decreasing") }} style={{ padding: 10, }}>
                                <Text style={styles.filter_text}> Decreasing Price </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>


           {/*  <SkeletonPlaceholder enabled={isEnabled}> */}
                <Text style={styles.welcome}> Welcome {user.firstName}! </Text>
                <View style={styles.options}>
                    <View style={styles.search}>
                        <TextInput style={styles.search_text} placeholder='Search' value={searchedItem} onChangeText={changeSearched} />
                    </View>
                    <View style={styles.option_button}>
                        <TouchableOpacity onPress={() => setFilterVisible(true)}>
                            <MaterialCommunityIcons name="filter" color={"#ff9800"} size={40} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.option_button}>
                        <TouchableOpacity onPress={() => setSortVisible(true)}>
                            <MaterialCommunityIcons name="view-list" color={"#ff9800"} size={40} />
                        </TouchableOpacity>
                    </View>


                </View>
                {/* <SkeletonPlaceholder enabled={isEnabled}> */}
                    <FlatList
                        data={manipulatedList}
                        renderItem={renderProduct}
                        ItemSeparatorComponent={separator}
                        style={{ marginBottom: 100 }} />
                {/* </SkeletonPlaceholder> */}
            {/* </SkeletonPlaceholder> */}

        </View>


    )
}

export default Home;