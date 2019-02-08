export const saveInFirebase = (image, coords) => {
    console.log('image', image.data);

    return dispatch => {

        fetch("https://us-central1-white-imprint-202116.cloudfunctions.net/saveImage", {
            method:"POST",
            body:JSON.stringify({image:image.data})
        })
        .catch(e=>console.log('error', e))
        .then(res=>res.json())
        .then(resParsed=>{
            return fetch("https://white-imprint-202116.firebaseio.com/place.json", {
                    method:"POST",
                    "Content-type":"application/json",
                    body:JSON.stringify({coordinates:coords, image:resParsed.imageUrl})
                }).then(res=>console.log('res', res)
                )
        })
    }
}