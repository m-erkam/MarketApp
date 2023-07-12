import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Login from './pages/Login';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import SignUp from './pages/SignUp';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import { store } from './pages/redux/store';
import { Provider } from 'react-redux';


function App(){
    const Stack = createNativeStackNavigator();

    const Tab = createMaterialBottomTabNavigator();

    const Main = (params) => {
        const user = params.route.params;
        return(
            <Provider store={store}>
                <Tab.Navigator barStyle={{backgroundColor:"white", height:70}}  >
                    <Tab.Screen name='Home' 
                                component={Home} 
                                initialParams={user} 
                                options={{tabBarLabel:'Home', 
                                        tabBarIcon:() => (<MaterialCommunityIcons name="home-outline" color="#ff9800" size={25} />)
                                        }}/>
                    
                    <Tab.Screen name='Favorites' 
                                component={Favorites} 
                                options={{tabBarLabel:'Favorites', 
                                        tabBarIcon:() => (
                                            <MaterialCommunityIcons name="heart-outline" color="#ff9800" size={25} />
                    )}}/>
                    
                    <Tab.Screen name='Cart' 
                                initialParams={user} 
                                component={Cart} 
                                options={{tabBarLabel:'Cart', 
                                        tabBarIcon:() => (
                                            <MaterialCommunityIcons name="cart-outline" color="#ff9800" size={25} />),
                                            }}/>
                    
                    <Tab.Screen name='Profile' 
                                component={Profile}  
                                initialParams={user}
                                options={{tabBarLabel:'Profile', 
                                        tabBarIcon:() => (
                                            <MaterialCommunityIcons name="account-outline" color="#ff9800" size={25} />
                    )}} />
                </Tab.Navigator>
            </Provider>
        )
    }

    const RoofCart = (params) => {
        const user = params.route.params;
        return(
            <Provider store={store}>
                <Stack.Navigator>
                    <Stack.Screen name='Main' component={Main} options={{headerShown:false, statusBarColor:"#ff9800"}} initialParams={user}/>
                    <Stack.Screen name='ProductDetails' component={ProductDetails} options={{headerStyle:{backgroundColor:"#ff9800"}, title:""}}/>
                </Stack.Navigator>
            </Provider>
        )
    }

    return(
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name='Login' component={Login} options={{headerShown:false, statusBarColor:"#ff9800", }}/>
                <Stack.Screen name='SignUp' component={SignUp } options={{statusBarColor:"#ff9800",}}/>
                <Stack.Screen name='RoofCart' component={RoofCart} options={{headerShown:false, statusBarColor:"#ff9800",}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )

}


export default App;