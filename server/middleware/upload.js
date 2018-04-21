require('dotenv').config()

const Multer = require('multer');
const Storage = require('@google-cloud/storage');

const CloudBucket = process.env.GCS_BUCKET;


const storage = Storage({
    projectId: 'firebase-asset-management-syst',
    keyFilename: 'Asset Management System-d4ef48c82e2f.json',
})

const bucket = storage.bucket(CloudBucket);

const getPublicUrl = (filename) => {
    console.log('masuk middleware', filename)
    return `https://storage.googleapis.com/${CloudBucket}/${filename}`
}


const sendUploadToGCS = (req, res, next) =>{
    if(!req.file){
        return next();
    }else{
        let gcsfilename = new Date().toISOString() + req.file.originalname;
        let file = bucket.file(gcsfilename);

        const stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        })

        stream.on('error', (err) => {
            req.file.cloudStorageError = err
            next(err)
        })
        
        stream.on('finish', () => {
            req.file.cloudStorageObject = gcsfilename
            file.makePublic().then(() => {
                req.file.cloudStoragePublicUrl = getPublicUrl(gcsfilename)
                next()
            })
        })
        
        stream.end(req.file.buffer)
    }
}

const multer = Multer({
    storage: Multer.MemoryStorage,
})

module.exports = {
    getPublicUrl,
    sendUploadToGCS,
    multer
}