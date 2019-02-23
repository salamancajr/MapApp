import {GET_PINNED_IMAGES} from "./"

export const getPinnedImages = (email) => {
    console.log('email', email);

    return dispatch => {
        fetch(`https://white-imprint-202116.firebaseio.com/placefor${email}.json`)
        .catch(err => alert("error loading pinned images"))
        .then(res => res.json())
        .then(resData => {
            console.log('resData', resData);

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