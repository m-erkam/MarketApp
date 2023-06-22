import * as actionTypes from "../actions/favActions";
const initState = [];

function changeFav(state = initState, action){
    switch (action.type) {
        case (actionTypes.addFav().type):
            return [...state, action.payload];
                    
     /*    case (actionTypes.removeFav):
            return initState.;     */
        default:
            return state;
    }
}

export default changeFav;
