import {createStore, combineReducers, applyMiddleware} from "redux";
import restaurants from "./reducers/restaurantsReducer";
import selectedRestaurant from "./reducers/selectedRestaurantReducer";
import pinnedImages from "./reducers/pinnedImagesReducer";
import venueImage from "./reducers/venueImageReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    restaurants,
    selectedRestaurant,
    pinnedImages,
    venueImage

})

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk))
}

export default configureStore;