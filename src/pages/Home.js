import React, {useEffect, useState} from 'react'
import { FlatList, TouchableOpacity, View, Alert, Text, TextInput, Modal, ScrollView } from 'react-native'
import axios from "axios"
import ProductBox from './components/ProductBox';
import styles from "./styles/HomeStyle"
import MainRoundButton from './components/HomeRoundButton';
import { addFav, removeFav } from './redux/actions/favActions';
import { addCart, removeCart } from './redux/actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";



function Home({navigation, route}){
    const URL = "https://dummyjson.com/products";
    const [products, setProducts] = useState([]);
    const [manipulatedList, setManipulatedList] = useState([]);
    const [searchedItem, setSearchedItem] = useState("");
    const [filterVisible, setFilterVisible] = useState(false);
    const [filterBrandVisible, setFilterBrandVisible] = useState(false);
    const [filterCategoryVisible, setFilterCategoryVisible] = useState(false);
    const [sortVisible, setSortVisible] = useState(false);

    const dispatch = useDispatch();
    const favs = useSelector((store) => store.favs);
    const cart = useSelector((store) => store.cart);
    
    const user = route.params;
    

    async function fetch(){
        const response = await axios.get(URL);
        setProducts(response.data.products);
        setManipulatedList(response.data.products);
    }

    useEffect(() => {
        fetch();
    }, [])


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

    const searchItem = (item) => {
   
        const lowerTitle = item.title.toLowerCase();
        return lowerTitle.match(searchedItem.toLowerCase());
    }
    
    const changeSearched = (text) => {
        setSearchedItem(text);
    }
    
    

    useEffect(()=>{
        setManipulatedList(products.filter(searchItem));
    }, [searchedItem]);
   

   
    const sortProducts = (option) => {
        console.log(products);
        switch(option){
            case("alpha"):
                setManipulatedList(products.sort(compareAlpha));
                break;
            case("increasing"):
                setManipulatedList(products.sort(compareIncPrice));
                break;
            case("decreasing"):
                setManipulatedList(products.sort(compareDecPrice));
                break;
            case("default"):{
                setManipulatedList(products.sort(compareId));
                break;
            }
        }
    }

    const compareAlpha = (a, b) => {
        if(a.title.toLowerCase() > b.title.toLowerCase()){
            return 1;
        }else if (a.title.toLowerCase() < b.title.toLowerCase()){
            return -1;
        }else {
            return 0;
        }
    }

    const compareIncPrice = (a, b) => {
        if(a.price > b.price){
            return 1;
        }else if (a.price < b.price){
            return -1;
        }else {
            return 0;
        }
    }

    const compareDecPrice = (a, b) => {
        if(a.price < b.price){
            return 1;
        }else if (a.price > b.price){
            return -1;
        }else {
            return 0;
        }
    }

    const compareId = (a, b) => {
        if(a.id > b.id){
            return 1;
        }else if (a.id < b.id){
            return -1;
        }else {
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
        if (type == "smartphones"){
            setManipulatedList(products.filter(categoryFilterSmart));
        }else if (type == "laptops"){
            setManipulatedList(products.filter(categoryFilterLaptop));
        }else if (type == "fragrances"){
            setManipulatedList(products.filter(categoryFilterFragrance));
        }else if (type == "skincare"){
            setManipulatedList(products.filter(categoryFilterSkin));
        }else if (type == "groceries"){
            setManipulatedList(products.filter(categoryFilterGroceries));
        }else if (type == "home-decoration"){
            setManipulatedList(products.filter(categoryFilterHome));
        }
    }

    const resetFilter = () => {
        setManipulatedList(products);
    }


    return(
        <View style={styles.container}>
            <Modal 
                visible={filterVisible}
                animationType="fade"
                >
                <View style={{flex:1}}>
                    <View style={styles.modal}>
                        <TouchableOpacity onPress={() => {setFilterVisible(false), setFilterCategoryVisible(true)}} style={{backgroundColor:"white",padding:10,}}>
                            <Text> Category </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setFilterVisible(false), setFilterBrandVisible(true)}} style={{backgroundColor:"white",padding:10,}}>
                            <Text> Brand </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setFilterVisible(false), resetFilter()}} style={{backgroundColor:"white",padding:10,}}>
                            <Text> Reset Filters </Text>
                        </TouchableOpacity>
                    </View>  
                </View>     
            </Modal>

            <Modal 
                visible={filterBrandVisible}
                animationType="fade"
                transparent={true}
                >
                <View style={{flex:1}}>
                    <View style={styles.modal}>
                        <ScrollView>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> Apple </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> Samsung </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> OPPO </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> Huawei </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> Microsoft Surface </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> Infinix </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> HP Pavilion </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> Impression of Acqua Di Gio </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> Royal_Mirage </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> Fog Scent Xpressio </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> Al Munakh </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> Lord - Al-Rehab </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> L'Oreal Paris </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> Hemani Tea </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> Dermive </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> ROREC White Rice </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> Fair & Clear </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> Saaf & Khaas </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> Bake Parlor Big </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> Baking Food Items </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> fauji </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> Dry Rose </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> Boho Decor </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> Flying Wooden </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> LED Lights </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> luxury palace </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterBrandVisible(false)}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> Golden </Text>
                            </TouchableOpacity>
                        </ScrollView>
                        
                    </View>  
                </View>     
            </Modal>

            <Modal 
                visible={filterCategoryVisible}
                animationType="fade"
                transparent={true}
                >
                <View style={{flex:1}}>
                    <View style={styles.modal}>
                        <ScrollView>
                            <TouchableOpacity onPress={() => {setFilterCategoryVisible(false), filterProductsCategory("smartphones")}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> smartphones </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterCategoryVisible(false), filterProductsCategory("laptops")}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> laptops </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterCategoryVisible(false), filterProductsCategory("fragrances")}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> fragrances </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterCategoryVisible(false), filterProductsCategory("skincare")}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> skincare </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterCategoryVisible(false), filterProductsCategory("groceries")}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> groceries </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFilterCategoryVisible(false), filterProductsCategory("home-decoration")}} style={{backgroundColor:"white",padding:10,}}>
                                <Text> home-decoration </Text>
                            </TouchableOpacity>
                        </ScrollView>
                        
                    </View>  
                </View>     
            </Modal>

            <Modal 
                visible={sortVisible}
                animationType="fade"
                >
                <View style={{flex:1, padding:5, borderWidth:1}}>
                    <View style={styles.modal}>
                        <TouchableOpacity onPress={() => {setSortVisible(false), sortProducts("default")}} style={{backgroundColor:"white",padding:10,}}>
                            <Text style={{fontWeight:"bold"}}> Featured </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setSortVisible(false), sortProducts("alpha")}} style={{backgroundColor:"white",padding:10,}}>
                            <Text style={{fontWeight:"bold"}}> Alphabetically </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setSortVisible(false), sortProducts("increasing")}} style={{backgroundColor:"white",padding:10,}}>
                            <Text style={{fontWeight:"bold"}}> Increasing Price </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setSortVisible(false), sortProducts("decreasing")}} style={{backgroundColor:"white",padding:10,}}>
                            <Text style={{fontWeight:"bold"}}> Decreasing Price </Text>
                        </TouchableOpacity>
                        
                    </View>  
                </View>     
            </Modal>



            <Text style={styles.welcome}> Welcome {user.firstName}! </Text>
            <View style={styles.options}>
                <View style={styles.search}>
                    <TextInput style={styles.search_text} placeholder='Search' value={searchedItem} onChangeText={changeSearched}/>
                </View>
        
                <TouchableOpacity style={styles.option_button} onPress={() => setFilterVisible(true)}>
                    <MaterialCommunityIcons name="filter" color={"black"} size={40} />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.option_button} onPress={() => setSortVisible(true)}>
                    <MaterialCommunityIcons name="view-list" color={"black"} size={40} />
                </TouchableOpacity>
                
            </View>
            <FlatList 
                data={manipulatedList} 
                renderItem={renderProduct} 
                ItemSeparatorComponent={separator}
                style={{marginBottom: 100}}/>
        </View>
    )
}

export default Home;