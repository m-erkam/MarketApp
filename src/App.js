import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import SignUp from './pages/SignUp';
import ProductDetails from './pages/ProductDetails';


function App(){
    const Stack = createNativeStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
                <Stack.Screen name='MainPage' component={MainPage} />
                <Stack.Screen name='Favorites' component={Favorites} />
                <Stack.Screen name='Cart' component={Cart} />
                <Stack.Screen name='SignUp' component={SignUp} />
                <Stack.Screen name='ProductDetails' component={ProductDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}



export default App;