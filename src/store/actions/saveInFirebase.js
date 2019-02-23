export const saveInFirebase = (image, email, coords, cb) => {
    return dispatch => {

        fetch("https://us-central1-white-imprint-202116.cloudfunctions.net/saveImage", {
            method:"POST",
            body:JSON.stringify({image:image.data})
        })
        .catch(e=>console.log('error', e))
        .then(res=>res.json())
        .then(resParsed=>{
            return fetch(`https://white-imprint-202116.firebaseio.com/placefor${email}.json`, {
                method:"POST",
                "Content-type":"application/json",
                body:JSON.stringify({
                    coordinates:coords, image:resParsed.imageUrl
                })
            }).then(res=>cb())
        })
    }
}