import {GET_RESTAURANT_INFO} from "./"

export const getRestaurantInfo = (placeId, cb) => {
    return dispatch => {
        fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=name,rating,review,formatted_phone_number&key=AIzaSyBYpM71fQk1jhjgY5dPPjK6szS2jlvkdss`)
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