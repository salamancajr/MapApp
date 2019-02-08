import {GET_PINNED_IMAGES} from "./"

export const getPinnedImages = () => {
    return dispatch => {
        fetch("https://white-imprint-202116.firebaseio.com/place.json")
        .catch(err => alert("error loading pinned images"))
        .then(res => res.json())
        .then(resData => {
            let pinnedPlaces = []
            for (let key in resData){

                pinnedPlaces.push({
                    ...resData[key],
                    id:key
                })
            }
            dispatch(savePinnedImages(pinnedPlaces))
        })
    }
}

const savePinnedImages = (images) => {
    return {
        type:GET_PINNED_IMAGES,
        payload:images
    }
}