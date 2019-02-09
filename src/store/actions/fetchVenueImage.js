import {SAVE_VENUE_IMAGE} from "./"
import API_KEY from "../../utils/apiKey";

export const fetchVenueImage = (image, cb) => {
    return dispatch => {
        fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${image}&key=${API_KEY}`)
        .then((image)=>{

            return dispatch(saveVenueImageLocal(image, cb))
        })
        .catch(e=>console.log('e', e))
    }
}

const saveVenueImageLocal = (image, cb) => {
    cb(image)
    return {
        type: SAVE_VENUE_IMAGE,
        payload: image
    }
}