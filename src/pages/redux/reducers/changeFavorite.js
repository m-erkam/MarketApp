import * as actionTypes from "../actions/favActions";
import { Alert } from 'react-native'
const initState = [];

function changeFav(state = initState, action){
    if (action.type == actionTypes.removeFav().type){
        
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
    }else if (action.type == actionTypes.addFav().type){
        if(state.length == 0){
            return [...state, action.payload];
        }else{
            for (let i = 0; i < state.length; i++) {
                if(state[i].title == action.payload.title){
                    Alert.alert("Already in favorites!");
                    return state;
                }else if(i == state.length-1){
                    return [...state, action.payload];
                }           
            }
        }
        
    }else if(action.type == actionTypes.replaceFav().type){
        return action.payload;
    
    }else {
        return state;
    }

}

export default changeFav;
