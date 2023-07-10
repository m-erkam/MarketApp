import * as actionTypes from "../actions/cartActions";
import { Alert } from 'react-native'
const initState = []


const changeCart = (state = initState, action) => {
    console.log(action.type);
    if (action.type == actionTypes.removeCart().type){
        
        let newList = [];
        let isRemoved = false;
        
        for (let index = 0; index < state.length; index++) {
            
            
            if(action.payload != state[index] && !isRemoved){
                newList[index] = state[index];
            }else if(action.payload != state[index] && isRemoved){
                newList[index-1] = state[index];
            }else{
                isRemoved = true;
            }    
        }
        
        state = newList;
        return newList;
    }else if (action.type == actionTypes.addCart().type){
        if(state.length == 0){
            return [...state, action.payload];
        }else{
            for (let i = 0; i < state.length; i++) {
                if(state[i].title == action.payload.title){
                    Alert.alert("Already in cart!");
                    return state;
                }else if(i == state.length-1){
                    return [...state, action.payload];
                }           
            }
        }
    }else {
        return state;
    }


    
}

export default changeCart;
