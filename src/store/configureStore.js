import {createStore, combineReducers, applyMiddleware} from "redux";
import restaurants from "./reducers/restaurantsReducer";
import selectedRestaurant from "./reducers/selectedRestaurantReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    restaurants,
    selectedRestaurant
})

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk))
}

export default configureStore;