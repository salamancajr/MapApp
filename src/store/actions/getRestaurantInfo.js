import {GET_RESTAURANT_INFO} from "./";
import API_KEY from "../../utils/apiKey";

export const getRestaurantInfo = (placeId, cb) => {
    return dispatch => {
        fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=name,rating,review,formatted_phone_number&key=${API_KEY}`)
        .then(data=>data.json())
        .then(dataRes=>dispatch(getRestaurantInfoLocal(dataRes, cb)))
    }
}

const getRestaurantInfoLocal = (data, cb) => {
    cb()
    return {
        type:GET_RESTAURANT_INFO,
        payload:data
    }
}