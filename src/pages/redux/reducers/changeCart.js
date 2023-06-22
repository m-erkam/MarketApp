import * as actionTypes from "../actions/cartActions";
const initState = []


const changeCart = (state = initState, action) => {
    switch(action.type){
        case(actionTypes.addCart().type):
            return [...state, action.payload];
        default:
            return state;
    }
}

export default changeCart;
