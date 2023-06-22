import {createStore, combineReducers} from "redux";
import changeFav from "./reducers/changeFavorite";

const rootReducer = combineReducers({
    favs: changeFav,
});

export const store = createStore(rootReducer);