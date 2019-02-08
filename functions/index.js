const functions = require('firebase-functions');
const cors = require("cors")({origin:true});
const fs = require("fs");
const UUID = require("uuid-v4");
const googleCloudConfig = {
    projectId: "white-imprint-202116",
    keyFilename:"MapApp.json"
}

const googleCloudStorage = require("@google-cloud/storage")(googleCloudConfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.saveImage = functions.https.onRequest((request, response) => {
    cors(request, response, ()=>{
        const body = JSON.parse(request.body);
        fs.writeFileSync("/tmp/saved-image.jpg", body.image, "base64", err=>{
            console.log(err);
            return response.status(500).json({error:err})
        })
        const bucket = googleCloudStorage.bucket("white-imprint-202116.appspot.com");
        const uuid = UUID()
        bucket.upload("/tmp/saved-image.jpg", {
            uploadType:"media",
            destination:"/places/" + uuid + ".jpg",
            metadata:{
                metadata:{
                    contentType:"image/jpeg",
                    firebaseStorageDownloadTokens: uuid
                }

            }
        }, (err, file)=>{
            if(!err){
                response.status(201).json({
                    imageUrl:"https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(file.name) + "?alt=media&token=" + uuid
                })
            } else {
                console.log('err', err);
                response.status(500).json({error:err});

            }
        });
    });
});
