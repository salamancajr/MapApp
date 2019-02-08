import {GET_RESTAURANTS} from "./"

export const getRestaurants = () => {
    return dispatch => {
        Promise.all(["Brooklyn", "Queens", "Manhattan", "Bronx", "Staten%20Island"].map(borough=>
            fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+${borough}&key=AIzaSyBYpM71fQk1jhjgY5dPPjK6szS2jlvkdss`).then(data=>data.text())
            .then(dataRes=>JSON.parse(dataRes).results)
        ))

        .then(res=>{
            let array = [...res[0], ...res[1], ...res[2], ...res[3], ...res[4]]

            dispatch(getRestaurantsLocal(array))})
    }
}

const getRestaurantsLocal = (data) => {
    return {
        type:GET_RESTAURANTS,
        payload:data
    }
}
