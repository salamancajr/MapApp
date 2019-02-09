import {GET_RESTAURANTS} from "./";
import API_KEY from "../../utils/apiKey";

export const getRestaurants = () => {
    return dispatch => {
        Promise.all(["Brooklyn", "Queens", "Manhattan", "Bronx", "Staten%20Island"].map(borough=>
            fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+${borough}&key=${API_KEY}`).then(data=>data.text())
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
