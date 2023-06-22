import {createStore, combineReducers} from "redux";
import changeFav from "./reducers/changeFavorite";
import changeCart from "./reducers/changeCart";

const rootReducer = combineReducers({
    cart: changeCart,
    favs: changeFav,
});

export const store = createStore(rootReducer);