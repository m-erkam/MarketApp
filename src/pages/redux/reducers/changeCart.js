import * as actionTypes from "../actions/cartActions";
const initState = []


const changeCart = (state = initState, action) => {
    console.log(action.type);
    if (action.type == actionTypes.removeCart().type){
        console.log("Aaaaaa");
        let newList = [];
        let isRemoved = false;
        console.log(action);
        for (let index = 0; index < state.length; index++) {
            console.log(isRemoved);
            console.log(state[index]);
            
            if(action.payload != state[index] && !isRemoved){
                newList[index] = state[index];
            }else if(action.payload != state[index] && isRemoved){
                newList[index-1] = state[index];
            }else{
                isRemoved = true;
            }    
        }
        console.log(newList);
        state = newList;
        return newList;
    }else if (action.type == actionTypes.addCart().type){

        console.log(action);
        return [...state, action.payload];
    }else {
        return state;
    }


    /* switch(action.type){
        case(actionTypes.addCart().type):
            return [...state, action.payload];
        case(actionTypes.removeCart().type):
            console.log("AAAAAAAAAAAA");
            {
                console.log("NEDEN BURAYA GİRİYORSUN");
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
            }
        default:
            return state;
    } */
}

export default changeCart;
