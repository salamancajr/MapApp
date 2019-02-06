import {GET_RESTAURANTS} from "./"

export const getRestaurants = () => {
    return dispatch => {
        fetch("https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Brooklyn&key=AIzaSyBYpM71fQk1jhjgY5dPPjK6szS2jlvkdss")
        .then(data=>data.text())
        .then(dataRes=>dispatch(getRestaurantsLocal(JSON.parse(dataRes).results)))
    }
}

const getRestaurantsLocal = (data) => {
    return {
        type:GET_RESTAURANTS,
        payload:data
    }
}
