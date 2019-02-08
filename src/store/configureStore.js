import {createStore, combineReducers, applyMiddleware} from "redux";
import restaurants from "./reducers/restaurantsReducer";
import selectedRestaurant from "./reducers/selectedRestaurantReducer";
import pinnedImages from "./reducers/pinnedImagesReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    restaurants,
    selectedRestaurant,
    pinnedImages
})

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk))
}

export default configureStore;